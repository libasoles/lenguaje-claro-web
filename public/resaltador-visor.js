import {
  bytesDeBase64,
  endpointFor,
  esTodoEscaneado,
  estadoDeErrorServidor,
  nombreDeDescarga,
  rectsForPage,
} from "./resaltador-visor.mjs";
import { track } from "./resaltador-analytics.mjs";

const PDFJS_LIB_URL = new URL("vendor/pdfjs/pdf.min.mjs", import.meta.url);
const PDFJS_WORKER_URL = new URL("vendor/pdfjs/pdf.worker.min.mjs", import.meta.url);

// C5: "Falla o timeout del servidor → reintentar". El Lambda del servidor
// tiene un timeout de 120s (ver infra/resaltador_stack.py); 130s le da
// margen para responder antes de que el cliente lo dé por perdido.
const TIMEOUT_DE_ANALISIS_MS = 130_000;

// Mensajes que van rotando mientras esperamos la respuesta del servidor.
// No reflejan pasos reales (el servidor no informa progreso): son para que
// la espera se sienta activa en vez de una barra de carga congelada.
const PASOS_DE_ANALISIS = [
  "Leyendo el documento…",
  "Buscando voz pasiva y arcaísmos…",
  "Detectando lenguaje ambiguo…",
  "Marcando los hallazgos…",
  "Preparando el PDF anotado…",
];

let pdfjsLibPromise;

function loadPdfjs() {
  pdfjsLibPromise ??= import(PDFJS_LIB_URL.href).then((pdfjsLib) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL.href;
    return pdfjsLib;
  });
  return pdfjsLibPromise;
}

function setText(element, text) {
  element.hidden = !text;
  element.textContent = text || "";
}

function nombreDeCategoria(nombre) {
  return nombre === "Número escrito con palabras" ? "Número con palabras" : nombre;
}

function renderHallazgoDetail(detail, hallazgo) {
  detail.replaceChildren();
  if (!hallazgo) return;
  const title = document.createElement("h3");
  title.textContent = nombreDeCategoria(hallazgo.nombre);
  const description = document.createElement("p");
  description.textContent = hallazgo.descripcion;
  detail.append(title, description);
  // La descripción de varias reglas ya trae la sugerencia citada
  // (`Reemplazar por "X".`); mostrarla de nuevo acá sería redundante.
  if (hallazgo.sugerencias.length && !hallazgo.descripcion.includes(hallazgo.sugerencias[0])) {
    const suggestions = document.createElement("p");
    suggestions.textContent = `Sugerencia: ${hallazgo.sugerencias.join(" · ")}`;
    detail.append(suggestions);
  }
}

function renderHallazgosSummary(detail, hallazgos) {
  detail.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = `${hallazgos.length} hallazgos encontrados.`;
  detail.append(title);

  const grouped = new Map();
  for (const hallazgo of hallazgos) {
    grouped.set(hallazgo.regla, [...(grouped.get(hallazgo.regla) || []), hallazgo]);
  }

  if (!grouped.size) {
    const empty = document.createElement("p");
    empty.textContent = "No encontramos categorías para revisar.";
    detail.append(empty);
    return;
  }

  const list = document.createElement("ul");
  list.className = "visor-hallazgos-list";
  for (const group of grouped.values()) {
    const item = document.createElement("li");
    item.style.setProperty("--hallazgo-color", group[0].color);
    item.textContent = `${nombreDeCategoria(group[0].nombre)}: ${group.length}`;
    list.append(item);
  }
  detail.append(list);
}

async function renderPage({ pdf, pageNumber, hallazgos, shell, scale }) {
  const page = await pdf.getPage(pageNumber);
  const pageHeight = page.view[3] - page.view[1];
  const viewport = page.getViewport({ scale });
  shell.replaceChildren();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const layer = document.createElement("div");
  layer.className = "visor-highlights";
  layer.style.width = `${canvas.width}px`;
  layer.style.height = `${canvas.height}px`;
  for (const rect of rectsForPage(hallazgos, pageNumber, viewport, pageHeight)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "visor-highlight";
    button.dataset.hallazgoId = rect.id;
    button.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;--hallazgo-color:${rect.color}`;
    button.setAttribute("aria-label", "Ver detalle del hallazgo");
    layer.append(button);
  }
  shell.append(canvas, layer);
  shell.classList.remove("visor-page-pending");
  await page.render({ canvasContext: context, viewport }).promise;
}

function init() {
  const root = document.querySelector("[data-resaltador-visor]");
  if (!root) return;
  const pages = root.querySelector("[data-visor-pages]");
  const status = root.querySelector("[data-visor-status]");
  const detail = root.querySelector("[data-visor-detail]");
  const scanned = root.querySelector("[data-visor-scanned]");
  const loading = root.querySelector("[data-visor-loading]");
  const loadingStep = root.querySelector("[data-visor-loading-step]");
  const downloadButton = root.querySelector("[data-visor-download]");
  const retryButton = root.querySelector("[data-visor-retry]");
  const endpoint = endpointFor(window.location, root.dataset.endpoint);
  let hallazgosActuales = [];
  let pdfActual;
  let scale = 1.35;
  let archivoActual = null;
  let descargaActual = null; // { bytes, nombre }
  let pasoIntervalId = null;

  function iniciarPasosDeAnalisis() {
    let index = 0;
    loadingStep.textContent = PASOS_DE_ANALISIS[0];
    pasoIntervalId = setInterval(() => {
      index = (index + 1) % PASOS_DE_ANALISIS.length;
      loadingStep.textContent = PASOS_DE_ANALISIS[index];
    }, 2200);
  }

  function detenerPasosDeAnalisis() {
    clearInterval(pasoIntervalId);
    pasoIntervalId = null;
  }

  function rerenderPages() {
    if (!pdfActual) return;
    for (const shell of root.querySelectorAll(".visor-page:not(.visor-page-pending)")) {
      renderPage({
        pdf: pdfActual,
        pageNumber: Number(shell.dataset.page),
        hallazgos: hallazgosActuales,
        shell,
        scale,
      });
    }
  }

  root.querySelector("[data-visor-zoom-in]").addEventListener("click", () => {
    scale = Math.min(2.5, scale + 0.2);
    rerenderPages();
  });
  root.querySelector("[data-visor-zoom-out]").addEventListener("click", () => {
    scale = Math.max(0.75, scale - 0.2);
    rerenderPages();
  });

  root.addEventListener("click", (event) => {
    const id = event.target.closest("[data-hallazgo-id]")?.dataset.hallazgoId;
    if (id) renderHallazgoDetail(detail, hallazgosActuales.find((item) => item.id === id));
  });

  downloadButton.addEventListener("click", () => {
    if (!descargaActual) return;
    // C4: los bytes ya están en memoria desde la respuesta del servidor —
    // entre este clic y el diálogo de guardado no hay ningún request.
    const blob = new Blob([descargaActual.bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = descargaActual.nombre;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    track("resaltador_descarga", { hallazgos: hallazgosActuales.length });
  });

  retryButton.addEventListener("click", () => {
    if (archivoActual) analizar(archivoActual);
  });

  function mostrarErrorDeServidor(codigo) {
    const estado = estadoDeErrorServidor(codigo);
    detenerPasosDeAnalisis();
    loading.hidden = true;
    setText(status, estado.mensaje);
    retryButton.hidden = !estado.reintentable;
    downloadButton.hidden = true;
    track("resaltador_error", { tipo: codigo });
  }

  async function analizar(file) {
    archivoActual = file;
    root.hidden = false;
    pages.replaceChildren();
    detail.replaceChildren();
    downloadButton.hidden = true;
    retryButton.hidden = true;
    descargaActual = null;
    loading.hidden = false;
    setText(status, "");
    setText(scanned, "");
    iniciarPasosDeAnalisis();
    // Movemos el foco a esta sección apenas arranca el análisis: si
    // esperáramos a que termine, el loading quedaría fuera del viewport
    // mientras el usuario sigue mirando el uploader.
    root.scrollIntoView({ behavior: "smooth", block: "start" });

    let response;
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), TIMEOUT_DE_ANALISIS_MS);
    try {
      response = await fetch(endpoint, { method: "POST", body: file, signal: timeoutController.signal });
    } catch (error) {
      mostrarErrorDeServidor(error.name === "AbortError" ? "TIMEOUT" : "ERROR_DE_RED");
      return;
    } finally {
      clearTimeout(timeoutId);
    }

    let payload;
    try {
      payload = await response.json();
    } catch {
      mostrarErrorDeServidor("ERROR_INTERNO");
      return;
    }

    if (!response.ok) {
      mostrarErrorDeServidor(payload.error?.codigo || "ERROR_INTERNO");
      return;
    }

    const hallazgos = payload.hallazgos;
    hallazgosActuales = hallazgos;
    const metadatos = payload.metadatos;
    const scannedPages = metadatos.paginas_sin_texto;

    descargaActual = {
      bytes: bytesDeBase64(payload.pdf_anotado_base64),
      nombre: nombreDeDescarga(file.name),
    };
    downloadButton.hidden = false;

    track("resaltador_analisis_ok", {
      paginas: metadatos.cantidad_de_paginas,
      hallazgos: hallazgos.length,
    });

    if (esTodoEscaneado(metadatos.cantidad_de_paginas, scannedPages)) {
      setText(
        scanned,
        "Este PDF parece ser una imagen escaneada: no tiene texto seleccionable. Todavía no podemos analizar documentos escaneados.",
      );
      track("resaltador_pdf_escaneado", {});
    } else if (scannedPages.length) {
      setText(
        scanned,
        `No se analizaron las páginas ${scannedPages.join(", ")} porque no tienen texto seleccionable.`,
      );
    }

    renderHallazgosSummary(detail, hallazgos);

    const pdfjsLib = await loadPdfjs();
    pdfActual = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const renderWhenVisible = (shell) =>
      renderPage({
        pdf: pdfActual,
        pageNumber: Number(shell.dataset.page),
        hallazgos,
        shell,
        scale,
      });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            renderWhenVisible(entry.target).catch(() => {
              entry.target.textContent = "No se pudo mostrar esta página.";
            });
          }
        }
      },
      { root: pages, rootMargin: "320px" },
    );
    for (let pageNumber = 1; pageNumber <= pdfActual.numPages; pageNumber += 1) {
      const shell = document.createElement("article");
      shell.className = "visor-page visor-page-pending";
      shell.dataset.page = String(pageNumber);
      shell.textContent = `Cargando página ${pageNumber}…`;
      pages.append(shell);
      observer.observe(shell);
    }
    detenerPasosDeAnalisis();
    loading.hidden = true;
    setText(status, "");
  }

  window.addEventListener("resaltador:file-ready", (event) => {
    analizar(event.detail.file);
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
