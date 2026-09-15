/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document from "../components/Document.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Resaltador de PDF | Lenguaje Claro",
  url: "https://extensionlenguajeclaro.com.ar/resaltador.html",
  description:
    "Una herramienta para analizar PDFs jurídicos y devolverlos con los hallazgos de Lenguaje Claro resaltados.",
  inLanguage: "es-AR",
  isPartOf: {
    "@type": "WebSite",
    name: "Lenguaje Claro",
    url: "https://extensionlenguajeclaro.com.ar/",
  },
};

export default function ResaltadorPage() {
  return (
    <Document
      title="Resaltador de PDF | Lenguaje Claro"
      description="Analizá un PDF jurídico y obtené un PDF anotado con los hallazgos de Lenguaje Claro resaltados."
      canonical="https://extensionlenguajeclaro.com.ar/resaltador.html"
      ogDescription="Una herramienta para analizar PDFs jurídicos y devolverlos con los hallazgos de Lenguaje Claro resaltados."
      twitterDescription="Analizá un PDF jurídico y obtené un PDF anotado con los hallazgos de Lenguaje Claro resaltados."
      structuredData={structuredData}
      extraHead={<link rel="stylesheet" href="resaltador.css" />}
      afterBody={
        <>
          <script type="module" src="resaltador-uploader.js"></script>
          <script type="module" src="resaltador-visor.js"></script>
        </>
      }
    >
      <Header />
      <main>
        <section class="resaltador-hero">
          <div class="wrap resaltador-hero-grid">
            <div class="resaltador-intro">
              <span class="resaltador-eyebrow">
                <span aria-hidden="true"></span> Resaltador
              </span>
              <h1>
                Cargá un <em>archivo PDF</em>.
              </h1>
              <p class="resaltador-lede">
                Subí un PDF y recibí una versión anotada. Asegurate de no
                exponer datos sensibles.
              </p>
              <div class="uploader" data-resaltador-uploader data-state="idle">
                <label
                  class="uploader-drop"
                  data-uploader-dropzone
                  for="resaltador-file-input"
                >
                  <input
                    type="file"
                    id="resaltador-file-input"
                    class="sr-only"
                    accept="application/pdf,.pdf"
                    data-uploader-input
                  />
                  <span class="uploader-drop-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 3v11" />
                      <path d="M7.5 10.5L12 15l4.5-4.5" />
                      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                  </span>
                  <span class="uploader-drop-text">
                    Soltá el PDF acá o{" "}
                    <span class="uploader-drop-link">elegí un archivo</span>
                  </span>
                  <span class="uploader-hint">
                    PDF · hasta 5 MB · hasta 100 páginas
                  </span>
                </label>

                <p class="uploader-server-note">
                  <strong>Importante:</strong> este archivo se envía a un
                  servidor para analizarlo, y podría re-enviarse a una IA. Es
                  importante que tu archivo esté previamente anonimizado, o no
                  exponga datos sensibles.
                </p>

                <p
                  class="uploader-status"
                  role="status"
                  data-uploader-status
                  hidden
                ></p>
              </div>
            </div>

            <div
              class="resaltador-preview"
              aria-label="Vista previa de un PDF anotado"
            >
              <div class="resaltador-preview-top">
                <span>PDF anotado</span>
                <span>página 4 de 12</span>
              </div>
              <div class="resaltador-paper">
                <span class="resaltador-paper-label">EXPEDIENTE · 2026</span>
                <p>
                  Se hace saber que la presentación <mark>será analizada</mark>{" "}
                  dentro del plazo correspondiente.
                </p>
                <p>
                  La parte interesada deberá acompañar la documentación que
                  estime pertinente para acreditar lo solicitado.
                </p>
                <p>
                  Por lo expuesto, se dispone{" "}
                  <mark>proceder a la notificación</mark> de las personas
                  involucradas.
                </p>
                <div class="resaltador-legend">
                  <span></span> Voz pasiva
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="resaltador-notice">
          <div class="wrap resaltador-notice-inner">
            <span class="resaltador-notice-icon" aria-hidden="true">
              !
            </span>
            <p>
              <strong>Importante:</strong> el Resaltador envía el PDF a un
              servidor para analizarlo. Es un servicio distinto de la Extensión,
              que analiza los documentos de Google Docs en tu navegador sin IA.
              Es posible que aquí usemos una IA, por lo cual tu PDF no debería
              exponer datos sensibles.
            </p>
          </div>
        </section>

        <section class="wrap visor" data-resaltador-visor hidden>
          <div class="visor-header">
            <div>
              <span class="resaltador-kicker">Vista del documento</span>
              <h2>Hallazgos.</h2>
            </div>
            <div class="visor-controls">
              <div class="visor-zoom-controls">
                <button
                  type="button"
                  data-visor-zoom-out
                  aria-label="Alejar el PDF"
                >
                  −
                </button>
                <button
                  type="button"
                  data-visor-zoom-in
                  aria-label="Acercar el PDF"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                class="btn btn-primary visor-download"
                data-visor-download
                hidden
              >
                Descargar PDF anotado
              </button>
              <p role="status" data-visor-status></p>
              <button
                type="button"
                class="btn btn-ghost visor-retry"
                data-visor-retry
                hidden
              >
                Reintentar
              </button>
            </div>
          </div>
          <div class="visor-loading" data-visor-loading role="status" hidden>
            <span class="visor-loading-spinner" aria-hidden="true"></span>
            <p>Analizando el PDF…</p>
          </div>
          <p class="visor-scanned" data-visor-scanned hidden></p>
          <div class="visor-layout">
            <div class="visor-pages" data-visor-pages></div>
            <aside class="visor-detail" data-visor-detail aria-live="polite">
              <p>Los hallazgos aparecerán acá cuando termine el análisis.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </Document>
  );
}
