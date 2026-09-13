import assert from "node:assert/strict";
import test from "node:test";

import * as pdfjsLib from "../node_modules/pdfjs-dist/legacy/build/pdf.mjs";

import {
  MAX_FILE_SIZE_BYTES,
  MAX_PAGE_COUNT,
  PdfValidationError,
  exceedsMaxPages,
  exceedsMaxSize,
  hasPdfHeader,
  validateLocalPdf,
} from "../public/resaltador-validation.mjs";

// pdf.js needs a Node-compatible build (no DOM) to parse documents inside
// `node --test`. It still exercises the exact same code path
// (`countPdfPages`) that the browser uses with the vendored pdf.js build.
// No worker is available under Node, so pdf.js falls back to running
// in-process automatically as long as GlobalWorkerOptions.workerSrc is left
// unset.

function buildMinimalPdf(pageCount) {
  const kids = [];
  for (let i = 0; i < pageCount; i += 1) {
    kids.push(`${3 + i} 0 R`);
  }

  const pageObjects = [];
  for (let i = 0; i < pageCount; i += 1) {
    pageObjects.push(
      `${3 + i} 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>endobj`,
    );
  }

  return [
    "%PDF-1.4",
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
    `2 0 obj<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pageCount} >>endobj`,
    ...pageObjects,
    "trailer",
    "<< /Size 1 /Root 1 0 R >>",
    "%%EOF",
  ].join("\n");
}

function fileFromText(text, { name = "documento.pdf", type = "application/pdf" } = {}) {
  return new File([text], name, { type });
}

test("rejects a file over the 5 MB limit without reading its contents", async () => {
  let readAttempted = false;

  const oversizedFile = {
    name: "expediente.pdf",
    size: MAX_FILE_SIZE_BYTES + 1,
    slice() {
      readAttempted = true;
      throw new Error("should not read an oversized file");
    },
    async arrayBuffer() {
      readAttempted = true;
      throw new Error("should not read an oversized file");
    },
  };

  await assert.rejects(
    () => validateLocalPdf(oversizedFile, { pdfjsLib }),
    (error) => {
      assert.ok(error instanceof PdfValidationError);
      assert.equal(error.code, "too_large");
      assert.match(error.message, /5 MB/);
      return true;
    },
  );

  assert.equal(readAttempted, false, "an oversized file must never be read");
});

test("exceedsMaxSize matches the documented 5 MB threshold", () => {
  assert.equal(exceedsMaxSize(MAX_FILE_SIZE_BYTES), false);
  assert.equal(exceedsMaxSize(MAX_FILE_SIZE_BYTES + 1), true);
});

test("rejects a renamed .docx (wrong content, .pdf extension) as not a real PDF", async () => {
  const fakePdf = fileFromText("PK this is actually a zip/docx payload", {
    name: "contrato.pdf",
    type: "application/pdf",
  });

  await assert.rejects(
    () => validateLocalPdf(fakePdf, { pdfjsLib }),
    (error) => {
      assert.ok(error instanceof PdfValidationError);
      assert.equal(error.code, "not_pdf");
      assert.match(error.message, /no es un PDF/i);
      return true;
    },
  );
});

test("hasPdfHeader only accepts the real %PDF- magic bytes", () => {
  const encoder = new TextEncoder();
  assert.equal(hasPdfHeader(encoder.encode("%PDF-1.7")), true);
  assert.equal(hasPdfHeader(encoder.encode("PKdocx")), false);
  assert.equal(hasPdfHeader(encoder.encode("%PD")), false);
  assert.equal(hasPdfHeader(null), false);
});

test("rejects a PDF with more than 100 pages", async () => {
  const bigPdf = fileFromText(buildMinimalPdf(MAX_PAGE_COUNT + 1));

  await assert.rejects(
    () => validateLocalPdf(bigPdf, { pdfjsLib }),
    (error) => {
      assert.ok(error instanceof PdfValidationError);
      assert.equal(error.code, "too_many_pages");
      assert.match(error.message, /101/);
      assert.match(error.message, /100/);
      return true;
    },
  );
});

test("exceedsMaxPages matches the documented 100-page threshold", () => {
  assert.equal(exceedsMaxPages(MAX_PAGE_COUNT), false);
  assert.equal(exceedsMaxPages(MAX_PAGE_COUNT + 1), true);
});

test("accepts a valid small PDF and hands back the File and page count", async () => {
  const goodPdf = fileFromText(buildMinimalPdf(3), { name: "expediente.pdf" });

  const result = await validateLocalPdf(goodPdf, { pdfjsLib });

  assert.equal(result.pageCount, 3);
  assert.equal(result.file, goodPdf);
  assert.equal(result.file.name, "expediente.pdf");
});

test("rejects with no_file when nothing was selected", async () => {
  await assert.rejects(
    () => validateLocalPdf(null, { pdfjsLib }),
    (error) => {
      assert.ok(error instanceof PdfValidationError);
      assert.equal(error.code, "no_file");
      return true;
    },
  );
});
