import assert from "node:assert/strict";
import test from "node:test";

import { endpointFor, rectsForPage } from "../public/resaltador-visor.mjs";

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
  );

  assert.deepEqual(rects, [
    { id: "a1", color: "#f00", left: 20, top: 40, width: 40, height: 40 },
  ]);
});

test("usa el servidor local al abrir el visor desde localhost", () => {
  assert.equal(endpointFor({ hostname: "localhost" }), "http://localhost:8080/");
  assert.equal(endpointFor({ hostname: "example.com" }), "/api/resaltador");
});
