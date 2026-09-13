/** Pure helpers for the PDF viewer. Coordinates arrive in PDF points and are
 * projected through pdf.js for the viewport currently being rendered. */
export function rectsForPage(hallazgos, pageNumber, viewport) {
  return hallazgos.flatMap((hallazgo) =>
    (hallazgo.pintado === false ? [] : hallazgo.rects || [])
      .filter((rectangulo) => rectangulo.pagina === pageNumber)
      .map((rectangulo) => {
        const [x0, y0, x1, y1] = rectangulo.rect;
        const [left, top] = viewport.convertToViewportPoint(x0, y0);
        const [right, bottom] = viewport.convertToViewportPoint(x1, y1);
        return {
          id: hallazgo.id,
          color: hallazgo.color,
          left: Math.min(left, right),
          top: Math.min(top, bottom),
          width: Math.abs(right - left),
          height: Math.abs(bottom - top),
        };
      }),
  );
}

export function endpointFor(location, configuredEndpoint) {
  if (configuredEndpoint) return configuredEndpoint;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "http://localhost:8080/";
  }
  return "/api/resaltador";
}
