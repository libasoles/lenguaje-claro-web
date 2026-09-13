/* =========================================================
   Resaltador — uploader with client-side validation
   Drag & drop + file picker. Everything here runs in the
   browser only: no fetch, no upload — this just validates a
   PDF locally (type, size, page count) and hands the chosen
   File off to whatever consumes it next (see C3).
   ========================================================= */

import { validateLocalPdf, formatMegabytes } from "./resaltador-validation.mjs";

const PDFJS_LIB_URL = new URL("vendor/pdfjs/pdf.min.mjs", import.meta.url);
const PDFJS_WORKER_URL = new URL(
  "vendor/pdfjs/pdf.worker.min.mjs",
  import.meta.url,
);

let pdfjsLibPromise = null;

function loadPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import(PDFJS_LIB_URL.href).then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL.href;
      return lib;
    });
  }

  return pdfjsLibPromise;
}

function pluralPages(count) {
  return count === 1 ? "página" : "páginas";
}

function init() {
  const root = document.querySelector("[data-resaltador-uploader]");
  if (!root) return;

  const dropzone = root.querySelector("[data-uploader-dropzone]");
  const input = root.querySelector("[data-uploader-input]");
  const statusEl = root.querySelector("[data-uploader-status]");
  const resetButton = root.querySelector("[data-uploader-reset]");

  if (!dropzone || !input || !statusEl || !resetButton) return;

  let selectedFile = null;
  let dragDepth = 0;

  function setStatus(kind, message) {
    if (!message) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.removeAttribute("data-kind");
      return;
    }

    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.dataset.kind = kind;
  }

  function setBusy(isBusy) {
    root.dataset.state = isBusy ? "checking" : root.dataset.state;
    dropzone.setAttribute("aria-busy", isBusy ? "true" : "false");
  }

  function reset() {
    selectedFile = null;
    input.value = "";
    root.dataset.state = "idle";
    resetButton.hidden = true;
    setStatus(null);
    window.dispatchEvent(
      new CustomEvent("resaltador:file-cleared", { detail: null }),
    );
  }

  async function handleFiles(fileList) {
    const file = fileList && fileList[0];
    if (!file) return;

    root.dataset.state = "checking";
    resetButton.hidden = true;
    setStatus("checking", `Revisando “${file.name}”…`);

    try {
      const pdfjsLib = await loadPdfjs();
      const { pageCount } = await validateLocalPdf(file, { pdfjsLib });

      selectedFile = file;
      root.dataset.state = "ready";
      resetButton.hidden = false;
      setStatus(
        "ready",
        `Listo: “${file.name}” · ${formatMegabytes(file.size)} · ${pageCount} ${pluralPages(pageCount)}.`,
      );

      window.dispatchEvent(
        new CustomEvent("resaltador:file-ready", {
          detail: { file, pageCount },
        }),
      );
    } catch (error) {
      selectedFile = null;
      input.value = "";
      root.dataset.state = "error";
      resetButton.hidden = true;
      setStatus(
        "error",
        error && error.message
          ? error.message
          : "No pudimos procesar el archivo.",
      );
    } finally {
      setBusy(false);
    }
  }

  input.addEventListener("change", (event) => {
    handleFiles(event.target.files);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      if (eventName === "dragenter") dragDepth += 1;
      root.dataset.state = "dragover";
    });
  });

  dropzone.addEventListener("dragleave", () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) {
      root.dataset.state = selectedFile ? "ready" : "idle";
    }
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dragDepth = 0;
    handleFiles(event.dataTransfer && event.dataTransfer.files);
  });

  resetButton.addEventListener("click", reset);

  root.dataset.state = "idle";

  window.LenguajeClaroResaltadorUploader = {
    getSelectedFile: () => selectedFile,
    reset,
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
