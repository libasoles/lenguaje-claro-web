import { rectsForPage, endpointFor } from "./resaltador-visor.mjs";

const PDFJS_LIB_URL = new URL("vendor/pdfjs/pdf.min.mjs", import.meta.url);
const PDFJS_WORKER_URL = new URL("vendor/pdfjs/pdf.worker.min.mjs", import.meta.url);

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

function renderHallazgoDetail(detail, hallazgo) {
  detail.replaceChildren();
  if (!hallazgo) return;
  const title = document.createElement("h3");
  title.textContent = hallazgo.nombre;
  const description = document.createElement("p");
  description.textContent = hallazgo.descripcion;
  detail.append(title, description);
  if (hallazgo.sugerencias.length) {
    const suggestions = document.createElement("p");
    suggestions.textContent = `Sugerencia: ${hallazgo.sugerencias.join(" · ")}`;
    detail.append(suggestions);
  }
}

async function renderPage({ pdf, pageNumber, hallazgos, shell, scale }) {
  const page = await pdf.getPage(pageNumber);
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
  for (const rect of rectsForPage(hallazgos, pageNumber, viewport)) {
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
  const counts = root.querySelector("[data-visor-counts]");
  const scanned = root.querySelector("[data-visor-scanned]");
  const endpoint = endpointFor(window.location, root.dataset.endpoint);
  let hallazgosActuales = [];
  let pdfActual;
  let scale = 1.35;

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

  window.addEventListener("resaltador:file-ready", async (event) => {
    const { file } = event.detail;
    root.hidden = false;
    pages.replaceChildren();
    counts.replaceChildren();
    setText(status, "Analizando el PDF…");
    try {
      const response = await fetch(endpoint, { method: "POST", body: file });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.mensaje || "No pudimos analizar el PDF.");
      const hallazgos = payload.hallazgos;
      hallazgosActuales = hallazgos;
      const hallazgosVisibles = hallazgos.filter(
        (hallazgo) => hallazgo.pintado !== false && hallazgo.rects.length,
      );
      const grouped = new Map();
      for (const hallazgo of hallazgosVisibles) {
        grouped.set(hallazgo.regla, [...(grouped.get(hallazgo.regla) || []), hallazgo]);
      }
      for (const group of grouped.values()) {
        const item = document.createElement("li");
        item.style.setProperty("--hallazgo-color", group[0].color);
        item.textContent = `${group[0].nombre}: ${group.length}`;
        counts.append(item);
      }
      const scannedPages = payload.metadatos.paginas_sin_texto;
      setText(scanned, scannedPages.length ? `No se analizaron las páginas ${scannedPages.join(", ")} porque no tienen texto seleccionable.` : "");
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
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            renderWhenVisible(entry.target).catch(() => {
              entry.target.textContent = "No se pudo mostrar esta página.";
            });
          }
        }
      }, { root: pages, rootMargin: "320px" });
      for (let pageNumber = 1; pageNumber <= pdfActual.numPages; pageNumber += 1) {
        const shell = document.createElement("article");
        shell.className = "visor-page visor-page-pending";
        shell.dataset.page = String(pageNumber);
        shell.textContent = `Cargando página ${pageNumber}…`;
        pages.append(shell);
        observer.observe(shell);
      }
      setText(status, `${hallazgos.length} hallazgos encontrados.`);
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      setText(status, error.message || "No pudimos analizar el PDF. Intentá de nuevo.");
    }
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
