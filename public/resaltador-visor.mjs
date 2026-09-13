/** Pure helpers for the PDF viewer.
 *
 * El servidor calcula los rects con PyMuPDF, que usa origen arriba-izquierda
 * (`y` crece hacia abajo, igual que el canvas). `viewport.convertToViewportPoint`
 * de pdf.js espera en cambio el espacio PDF estándar: origen abajo-izquierda,
 * `y` crece hacia arriba. Sin la conversión, cada resaltado queda reflejado
 * verticalmente respecto del texto que debería cubrir. `pageHeight` es el
 * alto de la página sin escalar (PDF points), el mismo que ya usa PyMuPDF
 * para calcular sus rects. */
export function rectsForPage(hallazgos, pageNumber, viewport, pageHeight) {
  return hallazgos.flatMap((hallazgo) =>
    (hallazgo.pintado === false ? [] : hallazgo.rects || [])
      .filter((rectangulo) => rectangulo.pagina === pageNumber)
      .map((rectangulo) => {
        const [x0, y0, x1, y1] = rectangulo.rect;
        const [left, top] = viewport.convertToViewportPoint(x0, pageHeight - y0);
        const [right, bottom] = viewport.convertToViewportPoint(x1, pageHeight - y1);
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

/** C4: nombre del PDF anotado, derivado del original. */
export function nombreDeDescarga(nombreOriginal) {
  const base = (nombreOriginal || "documento").replace(/\.pdf$/i, "");
  return `${base}-revisado.pdf`;
}

/** Decodifica el PDF anotado que A10 manda en base64 dentro del JSON. */
export function bytesDeBase64(base64) {
  const binario = atob(base64);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i += 1) bytes[i] = binario.charCodeAt(i);
  return bytes;
}

/** C5: un mensaje por código de error del servidor (ver `handler.CodigoDeError`),
 * más "ERROR_DE_RED" para cuando el `fetch` ni siquiera vuelve con una
 * respuesta (timeout, sin conexión, CORS). `reintentable` distingue el único
 * caso del ticket que ofrece un botón de reintentar: una falla del servidor
 * o de la red, donde repetir el mismo request puede andar. Los demás códigos
 * describen un problema del archivo que no se arregla reintentando el mismo
 * request: hace falta otro archivo, y para eso ya está el uploader. */
const ESTADO_POR_CODIGO_DE_ERROR = {
  "PDF_CON_CONTRASEÑA": {
    mensaje: "Este PDF tiene contraseña. Quitásela y volvé a subirlo.",
    reintentable: false,
  },
  PDF_INVALIDO: {
    mensaje: "El archivo no es un PDF válido o está dañado.",
    reintentable: false,
  },
  DEMASIADO_GRANDE: {
    mensaje: "El PDF supera el tamaño máximo permitido.",
    reintentable: false,
  },
  DEMASIADAS_PAGINAS: {
    mensaje: "El PDF supera la cantidad máxima de páginas permitida.",
    reintentable: false,
  },
  ERROR_INTERNO: {
    mensaje: "No pudimos analizar el PDF por un error del servidor. Reintentá.",
    reintentable: true,
  },
  ERROR_DE_RED: {
    mensaje: "No pudimos conectar con el servidor. Reintentá.",
    reintentable: true,
  },
  TIMEOUT: {
    mensaje: "El análisis tardó demasiado y lo interrumpimos. Reintentá.",
    reintentable: true,
  },
};

export function estadoDeErrorServidor(codigo) {
  return ESTADO_POR_CODIGO_DE_ERROR[codigo] || ESTADO_POR_CODIGO_DE_ERROR.ERROR_INTERNO;
}

/** C5: el caso que decide si vale la pena construir OCR — el PDF entero es
 * una imagen, no un documento con texto seleccionable. */
export function esTodoEscaneado(cantidadDePaginas, paginasSinTexto) {
  return cantidadDePaginas > 0 && paginasSinTexto.length === cantidadDePaginas;
}
