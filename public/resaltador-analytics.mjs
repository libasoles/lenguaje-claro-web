/** C6: envoltorio fino sobre `window.trackEvent` (definido en el `<head>` del
 * sitio, ver `Document.jsx`). Nunca lanza si GA4 todavía no cargó o corre en
 * un entorno sin `window` (los tests de `node --test`).
 *
 * Ningún llamador debe pasar acá el nombre del archivo ni contenido del
 * documento: el criterio de aceptación de C6 es que ningún evento del
 * Resaltador los incluya. */
export function track(name, params) {
  if (typeof window === "undefined") return;
  const trackEvent = window.trackEvent;
  if (typeof trackEvent === "function") trackEvent(name, params);
}
