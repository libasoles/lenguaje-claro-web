/* =========================================================
   Resaltador — local PDF validation
   Pure logic, no DOM. Runs in the browser (imported by
   resaltador-uploader.js) and in `node --test` (tests/).
   Nothing here ever performs network I/O: every check that
   can be resolved on the client rejects the file before any
   upload would happen.
   ========================================================= */

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_PAGE_COUNT = 100;

const PDF_HEADER = "%PDF-";

export class PdfValidationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "PdfValidationError";
    this.code = code;
  }
}

export function formatMegabytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function exceedsMaxSize(sizeInBytes) {
  return sizeInBytes > MAX_FILE_SIZE_BYTES;
}

export function exceedsMaxPages(pageCount) {
  return pageCount > MAX_PAGE_COUNT;
}

/** True when `bytes` starts with the PDF magic header ("%PDF-"). */
export function hasPdfHeader(bytes) {
  if (!bytes || bytes.length < PDF_HEADER.length) return false;

  for (let i = 0; i < PDF_HEADER.length; i += 1) {
    if (bytes[i] !== PDF_HEADER.charCodeAt(i)) return false;
  }

  return true;
}

/** Reads just the first few bytes of a File/Blob — cheap, no full read. */
export async function readHeaderBytes(file) {
  const slice =
    typeof file.slice === "function" ? file.slice(0, PDF_HEADER.length) : file;
  const buffer = await slice.arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 * Counts pages with a pdf.js document instance. `pdfjsLib` is injected so
 * the browser can pass the vendored build while tests pass pdfjs-dist
 * directly — this module never imports pdfjs-dist itself.
 */
export async function countPdfPages(arrayBuffer, pdfjsLib) {
  let doc;

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });
    doc = await loadingTask.promise;
    return doc.numPages;
  } catch (error) {
    throw new PdfValidationError(
      "unreadable",
      "No pudimos leer este PDF. Puede estar dañado o no ser un PDF real.",
    );
  } finally {
    if (doc) {
      try {
        await doc.destroy();
      } catch {
        // ignore cleanup errors
      }
    }
  }
}

/**
 * Runs every local check for a candidate file, cheapest first, so a bad
 * file is rejected as early as possible and never touches pdf.js:
 *   1. size (from `file.size`, no I/O)
 *   2. real PDF header (reads 5 bytes)
 *   3. page count (reads and parses the full file with pdf.js)
 *
 * Resolves with `{ file, pageCount }` on success, or throws a
 * `PdfValidationError` describing what to show the user.
 */
export async function validateLocalPdf(file, { pdfjsLib }) {
  if (!file) {
    throw new PdfValidationError("no_file", "No se seleccionó ningún archivo.");
  }

  if (exceedsMaxSize(file.size)) {
    throw new PdfValidationError(
      "too_large",
      `El archivo pesa ${formatMegabytes(file.size)}. El límite es 5 MB.`,
    );
  }

  const header = await readHeaderBytes(file);
  if (!hasPdfHeader(header)) {
    throw new PdfValidationError(
      "not_pdf",
      "Este archivo no es un PDF. Revisá que no le hayan cambiado la extensión.",
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const pageCount = await countPdfPages(arrayBuffer, pdfjsLib);

  if (exceedsMaxPages(pageCount)) {
    throw new PdfValidationError(
      "too_many_pages",
      `El PDF tiene ${pageCount} páginas. El límite es ${MAX_PAGE_COUNT}.`,
    );
  }

  return { file, pageCount };
}
