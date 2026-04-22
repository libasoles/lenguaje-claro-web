/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document from "../components/Document.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const mainHtml = (
  <>
    <section class="support-hero">
      <div class="wrap">
        <span class="eyebrow">
          <span class="dot"></span> Soporte y contacto
        </span>
        <h1>
          Hablemos sobre <em>Lenguaje Claro</em>
        </h1>
        <p class="support-lede">
          Preguntas frecuentes sobre la extensión. Medio de contacto para
          sugerencias y propuestas.
        </p>

        <div class="support-meta">
          Actualizado: 19 de abril de 2026 · Proyecto independiente. No
          corremos.
        </div>
      </div>
    </section>

    <section class="wrap support-shell">
      <div class="support-layout">
        <div class="support-stack">
          <article class="support-card" id="contacto">
            <span class="section-label">01 — Contacto</span>
            <h2>Canal oficial de soporte</h2>
            <p>
              Todas las consultas de soporte se canalizan por LinkedIn. Si tenés
              un problema con la extensión, una duda sobre permisos o querés
              avisar un comportamiento inesperado, escribí por ese medio con la
              mayor cantidad de contexto posible.
            </p>
            <div class="support-actions">
              <a
                class="support-link-card support-link-person"
                href="https://www.linkedin.com/in/guillermo-perez-farquharson/"
                target="_blank"
                rel="noopener"
              >
                <img
                  class="support-avatar"
                  src="assets/guillermo-linkedin-avatar.jpg"
                  alt="Foto de perfil de Guillermo Perez"
                  width="84"
                  height="84"
                  loading="lazy"
                />
                <span class="support-link-copy">
                  <strong>Escribir por LinkedIn</strong>
                  <span>linkedin.com/in/guillermo-perez-farquharson ↗</span>
                </span>
              </a>
              <a class="support-link-card" href="legal.html#contacto">
                <strong>Privacidad y datos</strong>
                <span>
                  La página legal resume el uso de datos, permisos y el canal de
                  contacto para consultas relacionadas.
                </span>
              </a>
            </div>
          </article>

          <article class="support-card" id="antes-de-escribir">
            <span class="section-label">02 — Antes de escribir</span>
            <h2>Qué información conviene enviar</h2>
            <ol class="support-steps">
              <li>Describí qué pasó y qué esperabas que ocurriera.</li>
              <li>
                Indicá si el problema ocurre dentro de Google Docs y en qué
                navegador o versión de Chrome lo viste.
              </li>
              <li>
                Si podés reproducirlo, detallá los pasos exactos y compartí un
                ejemplo sin datos sensibles.
              </li>
              <li>
                Si enviás capturas o texto, remové información personal o
                confidencial antes de compartirla.
              </li>
            </ol>
            <p class="support-note">
              Lenguaje Claro está en beta pública. El soporte se atiende de
              forma independiente y en tiempos razonables, pero no existe una
              mesa de ayuda con tiempos de respuesta garantizados.
            </p>
          </article>

          <article class="support-card" id="faq">
            <span class="section-label">03 — FAQ</span>
            <h2>Problemas frecuentes</h2>
            <div class="faq-list">
              <details class="faq-item">
                <summary>
                  La extensión no aparece o no responde dentro de Google Docs
                </summary>
                <p>
                  Verificá que esté habilitada en Chrome, recargá la pestaña de
                  Google Docs y probá cerrar y volver a abrir el documento. Si
                  el problema sigue, escribí por LinkedIn indicando los pasos
                  para reproducirlo.
                </p>
              </details>
              <details class="faq-item">
                <summary>No puedo completar la autorización con Google</summary>
                <p>
                  Revisá que estés usando una sesión activa en Chrome y que el
                  flujo de autorización no haya sido bloqueado por el navegador
                  o una política de tu cuenta. Si aparece un mensaje de error,
                  copialo textual en tu consulta.
                </p>
              </details>
              <details class="faq-item">
                <summary>
                  La sugerencia marcada por la extensión no es correcta
                </summary>
                <p>
                  Compartí la frase original, la sugerencia propuesta y una
                  breve explicación de por qué no aplica. Ese contexto permite
                  revisar posibles falsos positivos en las reglas.
                </p>
              </details>
              <details class="faq-item">
                <summary>
                  Quiero consultar sobre privacidad, permisos o tratamiento de
                  datos
                </summary>
                <p>
                  Consultá primero la <a href="legal.html">página legal</a>. Si
                  necesitás seguimiento, escribí por LinkedIn incluyendo el
                  detalle del caso.
                </p>
              </details>
            </div>
          </article>
        </div>

        <aside class="support-side">
          <div class="support-card">
            <span class="section-label">Alcance</span>
            <h3>Qué cubre esta página</h3>
            <ul class="support-list">
              <li>Instalación y uso básico en Google Docs</li>
              <li>Permisos y autorización con Google</li>
              <li>Errores técnicos y comportamientos inesperados</li>
              <li>Consultas generales sobre el proyecto</li>
            </ul>
          </div>
          <div class="support-card">
            <span class="section-label">Enlaces</span>
            <h3>Accesos rápidos</h3>
            <ul class="support-list">
              <li>
                <a href="index.html">Sitio principal</a>
              </li>
              <li>
                <a href="legal.html">Privacidad y términos</a>
              </li>
              <li>
                <a
                  href="https://github.com/libasoles/lenguaje-claro"
                  target="_blank"
                  rel="noopener"
                >
                  Código fuente ↗
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </>
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Soporte | Lenguaje Claro para Google Docs",
      url: "https://extensionlenguajeclaro.com.ar/support.html",
      description:
        "Página oficial de soporte de Lenguaje Claro. Incluye ayuda para instalación, uso en Google Docs, permisos y consultas generales mediante LinkedIn.",
      inLanguage: "es-AR",
      isPartOf: {
        "@type": "WebSite",
        name: "Lenguaje Claro",
        url: "https://extensionlenguajeclaro.com.ar/",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Lenguaje Claro",
      url: "https://extensionlenguajeclaro.com.ar/",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Google Chrome",
      browserRequirements:
        "Google Chrome o navegadores compatibles con extensiones de Chrome",
      inLanguage: "es-AR",
    },
  ],
};

export default function SupportPage() {
  return (
    <Document
      title="Soporte | Lenguaje Claro para Google Docs"
      description="Página oficial de soporte de Lenguaje Claro. Incluye ayuda para instalación, uso en Google Docs, permisos y consultas generales mediante LinkedIn."
      canonical="https://extensionlenguajeclaro.com.ar/support.html"
      ogDescription="Página oficial de soporte de Lenguaje Claro. Consultas sobre instalación, permisos y funcionamiento mediante LinkedIn."
      twitterDescription="Página oficial de soporte de Lenguaje Claro con ayuda para instalación, permisos y funcionamiento."
      structuredData={structuredData}
      extraHead={<link rel="stylesheet" href="support.css" />}
    >
      <Header />
      <main>{mainHtml}</main>
      <Footer />
    </Document>
  );
}
