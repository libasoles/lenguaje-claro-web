import assert from "node:assert/strict";
import test from "node:test";

import {
  bytesDeBase64,
  endpointFor,
  esTodoEscaneado,
  estadoDeErrorServidor,
  nombreDeDescarga,
  rectsForPage,
} from "../public/resaltador-visor.mjs";

test("proyecta cada rect del Hallazgo para la página visible", () => {
  const viewport = {
    convertToViewportPoint: (x, y) => [x * 2, y * 2],
  };
  const rects = rectsForPage(
    [
      {
        id: "a1",
        color: "#f00",
        rects: [
          { pagina: 1, rect: [10, 20, 30, 40] },
          { pagina: 2, rect: [1, 2, 3, 4] },
        ],
      },
      { id: "a2", color: "#000", pintado: false, rects: [{ pagina: 1, rect: [1, 2, 3, 4] }] },
    ],
    1,
    viewport,
    100,
  );

  // pageHeight=100: y0=20 -> 100-20=80 -> *2=160; y1=40 -> 100-40=60 -> *2=120
  assert.deepEqual(rects, [
    { id: "a1", color: "#f00", left: 20, top: 120, width: 40, height: 40 },
  ]);
});

test("invierte el eje Y del rect (PyMuPDF arriba-izquierda) al pasarlo a pdf.js (abajo-izquierda)", () => {
  const puntosConvertidos = [];
  const viewport = {
    convertToViewportPoint: (x, y) => {
      puntosConvertidos.push([x, y]);
      return [x, y];
    },
  };
  rectsForPage(
    [{ id: "a1", color: "#f00", rects: [{ pagina: 1, rect: [0, 10, 5, 30] }] }],
    1,
    viewport,
    200,
  );

  assert.deepEqual(puntosConvertidos, [
    [0, 190], // pageHeight(200) - y0(10)
    [5, 170], // pageHeight(200) - y1(30)
  ]);
});

test("usa el servidor local al abrir el visor desde localhost", () => {
  assert.equal(endpointFor({ hostname: "localhost" }), "http://localhost:8080/");
  assert.equal(endpointFor({ hostname: "example.com" }), "/api/resaltador");
});

test("deriva el nombre de descarga del nombre original", () => {
  assert.equal(nombreDeDescarga("demanda.pdf"), "demanda-revisado.pdf");
  assert.equal(nombreDeDescarga("Demanda.PDF"), "Demanda-revisado.pdf");
  assert.equal(nombreDeDescarga("sin-extension"), "sin-extension-revisado.pdf");
});

test("decodifica el PDF anotado en base64 a bytes", () => {
  const original = new Uint8Array([37, 80, 68, 70, 45]); // "%PDF-"
  const base64 = Buffer.from(original).toString("base64");
  assert.deepEqual(bytesDeBase64(base64), original);
});

test("cada código de error del servidor tiene su propio mensaje", () => {
  const codigos = [
    "PDF_CON_CONTRASEÑA",
    "PDF_INVALIDO",
    "DEMASIADO_GRANDE",
    "DEMASIADAS_PAGINAS",
    "ERROR_INTERNO",
    "ERROR_DE_RED",
    "TIMEOUT",
  ];
  const mensajes = new Set(codigos.map((codigo) => estadoDeErrorServidor(codigo).mensaje));
  assert.equal(mensajes.size, codigos.length, "cada código debe tener un mensaje distinto");
});

test("solo la falla del servidor, la red o el timeout se pueden reintentar", () => {
  assert.equal(estadoDeErrorServidor("ERROR_INTERNO").reintentable, true);
  assert.equal(estadoDeErrorServidor("ERROR_DE_RED").reintentable, true);
  assert.equal(estadoDeErrorServidor("TIMEOUT").reintentable, true);
  assert.equal(estadoDeErrorServidor("PDF_CON_CONTRASEÑA").reintentable, false);
  assert.equal(estadoDeErrorServidor("DEMASIADO_GRANDE").reintentable, false);
});

test("un código desconocido cae en el mensaje genérico de error interno", () => {
  assert.equal(estadoDeErrorServidor("ALGO_NUEVO").mensaje, estadoDeErrorServidor("ERROR_INTERNO").mensaje);
});

test("esTodoEscaneado es true solo cuando ninguna página tiene texto", () => {
  assert.equal(esTodoEscaneado(3, [1, 2, 3]), true);
  assert.equal(esTodoEscaneado(3, [1]), false);
  assert.equal(esTodoEscaneado(3, []), false);
  assert.equal(esTodoEscaneado(0, []), false);
});
