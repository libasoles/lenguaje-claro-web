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
      afterBody={<script type="module" src="resaltador-uploader.js"></script>}
    >
      <Header />
      <main>
        <section class="resaltador-hero">
          <div class="wrap resaltador-hero-grid">
            <div class="resaltador-intro">
              <span class="resaltador-eyebrow">
                <span aria-hidden="true"></span> Resaltador de PDF
              </span>
              <h1>
                Leé el expediente con <em>otra claridad</em>.
              </h1>
              <p class="resaltador-lede">
                Subí un PDF y recibí un PDF anotado: los tramos que activan una
                Regla quedan resaltados sobre el documento original, con una
                página de hallazgos al final.
              </p>
              <div class="uploader" data-resaltador-uploader data-state="idle">
                <label class="uploader-drop" data-uploader-dropzone for="resaltador-file-input">
                  <input
                    type="file"
                    id="resaltador-file-input"
                    class="sr-only"
                    accept="application/pdf,.pdf"
                    data-uploader-input
                  />
                  <span class="uploader-drop-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3v11" />
                      <path d="M7.5 10.5L12 15l4.5-4.5" />
                      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                  </span>
                  <span class="uploader-drop-text">
                    Soltá el PDF acá o{" "}
                    <span class="uploader-drop-link">elegí un archivo</span>
                  </span>
                  <span class="uploader-hint">PDF · hasta 5 MB · hasta 100 páginas</span>
                </label>

                <p class="uploader-server-note">
                  <strong>Antes de soltarlo:</strong> este archivo se envía a
                  un servidor para analizarlo.
                </p>

                <p
                  class="uploader-status"
                  role="status"
                  data-uploader-status
                  hidden
                ></p>

                <button
                  type="button"
                  class="uploader-reset"
                  data-uploader-reset
                  hidden
                >
                  Elegir otro archivo
                </button>
              </div>
            </div>

            <div class="resaltador-preview" aria-label="Vista previa de un PDF anotado">
              <div class="resaltador-preview-top">
                <span>PDF anotado</span>
                <span>página 4 de 12</span>
              </div>
              <div class="resaltador-paper">
                <span class="resaltador-paper-label">EXPEDIENTE · 2026</span>
                <p>Se hace saber que la presentación será analizada dentro del plazo correspondiente.</p>
                <p>
                  La parte interesada deberá acompañar la documentación que
                  estime pertinente para acreditar lo solicitado.
                </p>
                <p>
                  Por lo expuesto, se dispone <mark>proceder a la notificación</mark>{" "}
                  de las personas involucradas.
                </p>
                <div class="resaltador-legend">
                  <span></span> Rodeo innecesario
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="resaltador-notice">
          <div class="wrap resaltador-notice-inner">
            <span class="resaltador-notice-icon" aria-hidden="true">!</span>
            <p>
              <strong>Importante:</strong> el Resaltador envía el PDF a un
              servidor para analizarlo. Es un servicio distinto de la Extensión,
              que analiza los documentos de Google Docs en tu navegador.
            </p>
          </div>
        </section>

        <section class="wrap resaltador-section">
          <div class="resaltador-section-header">
            <span class="resaltador-kicker">01 — El resultado</span>
            <div>
              <h2>El mismo PDF, con una guía de lectura.</h2>
              <p>
                El contenido y el diseño del documento se conservan. Las
                anotaciones ayudan a revisar cada Hallazgo sin salir del PDF.
              </p>
            </div>
          </div>
          <div class="resaltador-results">
            <article>
              <span class="resaltador-number">01</span>
              <h3>Hallazgos en contexto</h3>
              <p>
                Cada resaltado señala el tramo de texto que activó una Regla y
                usa el color de esa Regla.
              </p>
            </article>
            <article>
              <span class="resaltador-number">02</span>
              <h3>Sugerencias claras</h3>
              <p>
                La página de hallazgos reúne el término original, la Regla y
                las sugerencias para su revisión.
              </p>
            </article>
            <article>
              <span class="resaltador-number">03</span>
              <h3>Páginas sin texto</h3>
              <p>
                Si el PDF incluye una Página sin texto, se informa para que
                puedas distinguirla de las páginas analizadas.
              </p>
            </article>
          </div>
        </section>

        <section class="resaltador-difference">
          <div class="wrap resaltador-difference-inner">
            <span class="resaltador-kicker">02 — Dos servicios</span>
            <div>
              <h2>Para PDF, un análisis más profundo.</h2>
              <p>
                El Resaltador trabaja sobre un Documento Analizado. Eso permite
                revisar Reglas que necesitan entender la estructura de una
                oración, además de las expresiones que se detectan en el texto.
              </p>
              <a class="resaltador-link" href="index.html#comparacion">
                Conocé la Extensión <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Document>
  );
}
