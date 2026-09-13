import assert from "node:assert/strict";
import test from "node:test";

import { track } from "../public/resaltador-analytics.mjs";

test("no lanza cuando window.trackEvent no existe", () => {
  const originalWindow = globalThis.window;
  globalThis.window = {};
  try {
    assert.doesNotThrow(() => track("resaltador_upload", {}));
  } finally {
    globalThis.window = originalWindow;
  }
});

test("delega en window.trackEvent con el nombre y los params dados", () => {
  const originalWindow = globalThis.window;
  const llamadas = [];
  globalThis.window = { trackEvent: (name, params) => llamadas.push({ name, params }) };
  try {
    track("resaltador_descarga", { hallazgos: 7 });
    assert.deepEqual(llamadas, [{ name: "resaltador_descarga", params: { hallazgos: 7 } }]);
  } finally {
    globalThis.window = originalWindow;
  }
});
