/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document, { InlineStyle } from "../components/Document.jsx";
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

const supportStyles = String.raw`.support-hero {
        padding-block: clamp(48px, 8vw, 96px) clamp(28px, 4vw, 48px);
        border-bottom: 1px solid var(--rule);
      }
      .support-hero .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: 16px;
      }
      .support-hero h1 {
        font-family: var(--font-serif);
        font-size: clamp(30px, 5vw, 52px);
        font-weight: 400;
        line-height: 1.1;
        margin: 0 0 18px;
        color: var(--ink);
      }
      .support-hero h1 em {
        font-style: italic;
        color: var(--accent);
      }
      .support-lede {
        max-width: 760px;
        font-size: clamp(18px, 2.2vw, 22px);
        line-height: 1.55;
        color: var(--ink-2);
        margin: 0 0 22px;
      }
      .support-meta {
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--ink-3);
      }
      .support-inline-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 18px;
      }
      .support-chip {
        display: inline-flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--rule);
        background: var(--bg-elev);
        color: var(--ink-2);
        text-decoration: none;
        transition:
          transform 0.15s,
          color 0.15s,
          border-color 0.15s;
      }
      .support-chip:hover {
        transform: translateY(-1px);
        color: var(--ink);
        border-color: var(--rule-strong);
      }

      .support-shell {
        padding-block: clamp(36px, 6vw, 72px);
      }
      .support-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);
        gap: clamp(24px, 4vw, 48px);
        align-items: start;
      }
      @media (max-width: 900px) {
        .support-layout {
          grid-template-columns: 1fr;
        }
      }

      .support-stack,
      .support-side {
        display: grid;
        gap: 20px;
      }
      .support-side {
        position: sticky;
        top: 86px;
      }
      @media (max-width: 900px) {
        .support-side {
          position: static;
        }
      }

      .support-card {
        background: var(--bg-elev);
        border: 1px solid var(--rule);
        border-radius: var(--radius-lg);
        padding: clamp(22px, 3vw, 30px);
      }
      .support-card .section-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent);
        background: var(--accent-soft);
        padding: 4px 10px;
        border-radius: 999px;
        margin-bottom: 16px;
      }
      .support-card h2,
      .support-card h3 {
        font-family: var(--font-serif);
        font-weight: 400;
        line-height: 1.15;
        margin: 0 0 16px;
        color: var(--ink);
      }
      .support-card h2 {
        font-size: clamp(24px, 3vw, 34px);
      }
      .support-card h3 {
        font-size: 24px;
      }
      .support-card p,
      .support-card li {
        color: var(--ink-2);
      }

      .support-actions {
        display: grid;
        gap: 14px;
        margin-top: 20px;
      }
      .support-link-card {
        display: block;
        text-decoration: none;
        border: 1px solid var(--rule);
        border-radius: var(--radius);
        padding: 18px 18px 16px;
        background: color-mix(in oklch, var(--bg), var(--bg-elev) 60%);
        transition:
          transform 0.15s,
          border-color 0.15s,
          background 0.15s;
      }
      .support-link-card:hover {
        transform: translateY(-1px);
        border-color: var(--rule-strong);
        background: color-mix(in oklch, var(--accent-soft), var(--bg) 78%);
      }
      .support-link-card strong {
        display: block;
        font-size: 17px;
        color: var(--ink);
        margin-bottom: 6px;
      }
      .support-link-card span {
        display: block;
        color: var(--ink-2);
      }
      .support-link-person {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 16px;
      }
      .support-link-copy {
        min-width: 0;
      }
      .support-avatar {
        width: 84px;
        height: 84px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center 18%;
        flex-shrink: 0;
        border: 1px solid var(--rule);
        box-shadow: 0 10px 24px color-mix(in oklch, var(--ink), transparent 88%);
      }
      @media (max-width: 520px) {
        .support-link-person {
          grid-template-columns: 1fr;
        }
        .support-avatar {
          width: 72px;
          height: 72px;
        }
      }

      .support-steps,
      .support-list {
        margin: 0;
        padding-left: 20px;
      }
      .support-steps li,
      .support-list li {
        margin-bottom: 10px;
      }
      .support-steps li:last-child,
      .support-list li:last-child {
        margin-bottom: 0;
      }
      .support-note {
        margin-top: 18px;
        padding: 14px 16px;
        border-left: 3px solid var(--accent);
        background: color-mix(in oklch, var(--accent-soft), var(--bg) 72%);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }

      .faq-list {
        display: grid;
        gap: 12px;
      }
      .faq-item {
        border: 1px solid var(--rule);
        border-radius: var(--radius);
        background: color-mix(in oklch, var(--bg), var(--bg-elev) 60%);
        padding: 16px 18px;
      }
      .faq-item summary {
        list-style: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        font-weight: 500;
        color: var(--ink);
      }
      .faq-item summary::-webkit-details-marker {
        display: none;
      }
      .faq-item summary::after {
        content: "+";
        font-family: var(--font-mono);
        color: var(--accent);
        flex-shrink: 0;
      }
      .faq-item[open] summary::after {
        content: "−";
      }
      .faq-item p {
        margin: 12px 0 0;
      }`;

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
      extraHead={<InlineStyle css={supportStyles} />}
    >
      <Header />
      <main>{mainHtml}</main>
      <Footer />
    </Document>
  );
}
