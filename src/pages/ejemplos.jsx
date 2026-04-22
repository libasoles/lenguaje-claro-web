/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document, { InlineStyle } from "../components/Document.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SharedScripts from "../components/SharedScripts.jsx";
import ejemplosData from "./ejemplos.json";

const ruleCopy = {
  arcaismos: {
    title: "Arcaísmos innecesarios",
    description:
      "Expresiones heredadas de la práctica jurídica que pueden decirse con palabras actuales.",
  },
  "titulos-honorificos": {
    title: "Títulos honoríficos",
    description:
      "Tratamientos ceremoniales que suelen agregar distancia sin aportar precisión.",
  },
  tecnicismos: {
    title: "Tecnicismos",
    description:
      "Términos jurídicos o administrativos que conviene reemplazar cuando no son imprescindibles.",
  },
  vaguedades: {
    title: "Vaguedades",
    description:
      "Palabras imprecisas que piden datos concretos, porcentajes, plazos o referencias verificables.",
  },
  rodeos: {
    title: "Rodeos innecesarios",
    description:
      "Frases largas que pueden resolverse con una construcción más directa.",
  },
  "voz-pasiva": {
    title: "Voz pasiva",
    description:
      "Construcciones donde la acción queda escondida y puede pasar a voz activa.",
  },
  queismo: {
    title: "Queísmo y dequeísmo",
    description:
      "Usos frecuentes de “que” y “de que” que merecen revisión contextual.",
  },
  nominalizacion: {
    title: "Nominalizaciones",
    description:
      "Sustantivos de acción y fórmulas con verbo soporte que pueden escribirse como verbos.",
  },
  numeros: {
    title: "Números",
    description:
      "Números escritos con palabras o romanos que pueden expresarse con cifras más legibles.",
  },
  "siglas-sin-puntos": {
    title: "Siglas sin puntos",
    description:
      "Siglas escritas con puntos que pueden normalizarse a la forma compacta.",
  },
};

const examplesStyles = String.raw`.examples-hero {
        padding-block: clamp(48px, 8vw, 92px) clamp(34px, 5vw, 58px);
        border-bottom: 1px solid var(--rule);
      }
      .examples-hero h1 {
        font-family: var(--font-serif);
        font-size: clamp(34px, 5vw, 60px);
        font-weight: 400;
        line-height: 1.08;
        letter-spacing: -0.02em;
        max-width: 13ch;
        margin: 20px 0 22px;
        text-wrap: balance;
      }
      .examples-hero h1 em {
        color: var(--accent);
        font-style: italic;
      }
      .examples-hero .eyebrow {
        font-size: 13px;
      }
      .examples-lede {
        max-width: 760px;
        margin: 0;
        color: var(--ink-2);
        font-size: clamp(17px, 2vw, 21px);
        line-height: 1.58;
        text-wrap: pretty;
      }
      .examples-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1px;
        margin-top: clamp(28px, 5vw, 42px);
        border: 1px solid var(--rule);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--rule);
      }
      .examples-stat {
        background: var(--bg);
        padding: 22px 24px;
      }
      .examples-stat strong {
        display: block;
        font-family: var(--font-serif);
        font-size: clamp(30px, 4vw, 44px);
        font-weight: 400;
        line-height: 1;
        color: var(--ink);
      }
      .examples-stat span {
        display: block;
        margin-top: 8px;
        font-family: var(--font-mono);
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-3);
      }
      .examples-shell {
        display: grid;
        grid-template-columns: 240px minmax(0, 1fr);
        gap: clamp(28px, 5vw, 56px);
        padding-block: clamp(42px, 7vw, 76px);
      }
      .examples-sidebar {
        position: sticky;
        top: 84px;
        align-self: start;
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--ink-3);
      }
      .examples-sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .examples-sidebar .sidebar-section {
        margin: 0 0 10px;
        color: var(--ink-2);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .examples-sidebar a {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr) auto;
        gap: 8px;
        align-items: baseline;
        padding: 7px 0;
        color: inherit;
        text-decoration: none;
      }
      .examples-sidebar a:hover {
        color: var(--ink);
      }
      .examples-sidebar .snum {
        color: var(--accent);
      }
      .examples-sidebar .count {
        color: var(--ink-3);
        font-size: 13px;
      }
      .examples-rules {
        display: flex;
        flex-direction: column;
        gap: clamp(34px, 5vw, 56px);
        min-width: 0;
      }
      .examples-rule {
        --rule-color: var(--accent);
        border: 1px solid var(--rule);
        border-top: 3px solid var(--rule-color);
        border-radius: var(--radius-lg);
        background: color-mix(in oklch, var(--bg), var(--bg-elev) 42%);
        overflow: hidden;
      }
      .examples-rule-head {
        padding: clamp(22px, 3vw, 30px);
        border-bottom: 1px solid var(--rule);
      }
      .examples-rule-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-family: var(--font-mono);
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-3);
      }
      .examples-rule-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--rule-color);
      }
      .examples-rule h2 {
        margin: 0 0 10px;
        font-family: var(--font-serif);
        font-size: clamp(28px, 3vw, 38px);
        font-weight: 400;
        line-height: 1.12;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .examples-rule p {
        max-width: 70ch;
        margin: 0;
        color: var(--ink-2);
        font-size: 15px;
        line-height: 1.65;
      }
      .examples-table-wrap {
        overflow-x: auto;
      }
      .examples-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: 14px;
      }
      .examples-table caption {
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        position: absolute;
      }
      .examples-table th,
      .examples-table td {
        padding: 15px 18px;
        border-bottom: 1px solid var(--rule);
        text-align: left;
        vertical-align: top;
      }
      .examples-table th {
        background: var(--bg-sunk);
        color: var(--ink-2);
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .examples-table tr:last-child td {
        border-bottom: 0;
      }
      .examples-table .col-text {
        width: 34%;
      }
      .examples-table .col-suggestions {
        width: 42%;
      }
      .examples-table .col-notes {
        width: 24%;
      }
      .examples-source {
        display: inline;
        color: var(--ink);
        font-weight: 500;
        text-decoration-line: underline;
        text-decoration-style: wavy;
        text-decoration-color: color-mix(in oklch, var(--accent), transparent 35%);
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
      }
      .examples-detected {
        margin-top: 6px;
        font-size: 13px;
        color: var(--ink-3);
      }
      .examples-detected mark {
        background: var(--accent-soft);
        color: var(--accent-ink);
        border-radius: 4px;
        padding: 1px 4px;
      }
      .examples-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .examples-suggestions li {
        padding: 5px 8px;
        border: 1px solid var(--rule);
        border-radius: var(--radius-sm);
        background: var(--bg);
        color: var(--accent-ink);
        line-height: 1.35;
      }
      .examples-suggestions.is-review {
        display: block;
        color: var(--ink-2);
        line-height: 1.5;
      }
      .examples-suggestions.is-review li {
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: inherit;
      }
      .examples-suggestions.is-review li + li {
        margin-top: 6px;
      }
      .examples-note {
        display: flex;
        color: var(--ink-2);
        line-height: 1.55;
      }
      .examples-status {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 8px;
        font-family: var(--font-mono);
        font-size: 13px;
        line-height: 1;
      }
      .examples-status.is-direct {
        background: var(--green-soft);
        color: oklch(0.35 0.1 145);
      }
      .examples-status.is-review {
        background: var(--ochre-soft);
        color: oklch(0.42 0.08 70);
      }
      [data-theme="dark"] .examples-status.is-direct {
        color: oklch(0.82 0.1 145);
      }
      [data-theme="dark"] .examples-status.is-review {
        color: oklch(0.82 0.08 80);
      }
      @media (max-width: 900px) {
        .examples-stats {
          grid-template-columns: 1fr;
        }
        .examples-shell {
          grid-template-columns: 1fr;
        }
        .examples-sidebar {
          position: static;
          border: 1px solid var(--rule);
          border-radius: var(--radius);
          padding: 16px;
          background: var(--bg-elev);
        }
        .examples-sidebar nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px 18px;
        }
        .examples-sidebar .sidebar-section {
          grid-column: 1 / -1;
        }
      }
      @media (max-width: 680px) {
        .examples-sidebar nav {
          grid-template-columns: 1fr;
        }
        .examples-table {
          table-layout: auto;
        }
        .examples-table thead {
          display: none;
        }
        .examples-table tbody,
        .examples-table tr,
        .examples-table td {
          display: block;
          width: 100%;
        }
        .examples-table tr {
          padding: 14px 16px;
          border-bottom: 1px solid var(--rule);
        }
        .examples-table tr:last-child {
          border-bottom: 0;
        }
        .examples-table td {
          border: 0;
          padding: 0;
        }
        .examples-table td + td {
          margin-top: 14px;
        }
        .examples-table td::before {
          content: attr(data-label);
          display: block;
          margin-bottom: 5px;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
      }
      .site-foot .foot-grid h5,
      .site-foot .foot-bottom {
        font-size: 13px;
      }`;

function getRuleTitle(regla) {
  return ruleCopy[regla.id]?.title || regla.nombre;
}

function getRuleDescription(regla) {
  return ruleCopy[regla.id]?.description || regla.descripcion;
}

function getRows(regla) {
  return (regla.ejemplos || []).flatMap((ejemplo, ejemploIndex) =>
    (ejemplo.hallazgos || []).map((hallazgo, hallazgoIndex) => ({
      key: `${regla.id}-${ejemploIndex}-${hallazgoIndex}`,
      original: ejemplo.texto,
      detected: hallazgo.textoDetectado || ejemplo.texto,
      suggestions: hallazgo.sugerencias || [],
      description: hallazgo.descripcion,
      applicable: hallazgo.aplicable === true,
    })),
  );
}

function getMetrics(reglas) {
  return reglas.reduce(
    (metrics, regla) => {
      const rows = getRows(regla);
      metrics.rules += 1;
      metrics.examples += rows.length;
      metrics.direct += rows.filter((row) => row.applicable).length;
      return metrics;
    },
    { rules: 0, examples: 0, direct: 0 },
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-AR").format(value);
}

function StatusBadge({ applicable, tooltip }) {
  const label = applicable ? "Reemplazo directo" : "Revisión manual";

  return (
    <span
      className={`examples-status ${applicable ? "is-direct" : "is-review"}`}
      title={tooltip || label}
      aria-label={tooltip ? `${label}: ${tooltip}` : label}
    >
      {label}
    </span>
  );
}

function Sidebar({ reglas }) {
  return (
    <aside className="examples-sidebar">
      <nav aria-label="Índice de reglas">
        <div className="sidebar-section">Reglas</div>
        {reglas.map((regla, index) => {
          const rows = getRows(regla);

          return (
            <a key={regla.id} href={`#${regla.id}`}>
              <span className="snum">{String(index + 1).padStart(2, "0")}</span>
              <span>{getRuleTitle(regla)}</span>
              <span className="count">{rows.length}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

function EjemploTabla({ regla, rows }) {
  return (
    <div className="examples-table-wrap">
      <table className="examples-table">
        <caption>Ejemplos de la regla {getRuleTitle(regla)}</caption>
        <thead>
          <tr>
            <th className="col-text">Texto marcado</th>
            <th className="col-suggestions">Sugerencia</th>
            <th className="col-notes">Criterio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td data-label="Texto marcado">
                <span className="examples-source">{row.original}</span>
                {row.detected !== row.original ? (
                  <div className="examples-detected">
                    Detecta: <mark>{row.detected}</mark>
                  </div>
                ) : null}
              </td>
              <td data-label="Sugerencia">
                <ul
                  className={
                    row.applicable
                      ? "examples-suggestions"
                      : "examples-suggestions is-review"
                  }
                >
                  {row.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </td>
              <td data-label="Criterio">
                <div className="examples-note">
                  <StatusBadge
                    applicable={row.applicable}
                    tooltip={row.description}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuleSection({ regla, index }) {
  const rows = getRows(regla);

  return (
    <section
      className="examples-rule"
      id={regla.id}
      style={{ "--rule-color": regla.color || "var(--accent)" }}
    >
      <div className="examples-rule-head">
        <div className="examples-rule-meta">
          <span className="examples-rule-dot" aria-hidden="true"></span>
          <span>
            {String(index + 1).padStart(2, "0")} · {formatNumber(rows.length)}{" "}
            ejemplos
          </span>
        </div>
        <h2>{getRuleTitle(regla)}</h2>
        <p>{getRuleDescription(regla)}</p>
      </div>
      <EjemploTabla regla={regla} rows={rows} />
    </section>
  );
}

const reglas = Array.isArray(ejemplosData.reglas) ? ejemplosData.reglas : [];
const metrics = getMetrics(reglas);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ejemplos de reglas | Lenguaje Claro para Google Docs",
  url: "https://extensionlenguajeclaro.com.ar/ejemplos.html",
  description:
    "Catálogo de ejemplos de las reglas de Lenguaje Claro para Google Docs, con textos marcados, sugerencias y criterios de revisión.",
  inLanguage: "es-AR",
  isPartOf: {
    "@type": "WebSite",
    name: "Lenguaje Claro",
    url: "https://extensionlenguajeclaro.com.ar/",
  },
};

export default function Ejemplos() {
  return (
    <Document
      title="Ejemplos de reglas | Lenguaje Claro para Google Docs"
      description="Catálogo de ejemplos de las reglas de Lenguaje Claro para Google Docs, con textos marcados, sugerencias y criterios de revisión."
      canonical="https://extensionlenguajeclaro.com.ar/ejemplos.html"
      ogDescription="Ejemplos concretos de las reglas de Lenguaje Claro: qué texto marca la extensión, qué sugiere y cuándo conviene revisar."
      twitterDescription="Ejemplos concretos de las reglas de Lenguaje Claro para Google Docs."
      structuredData={structuredData}
      extraHead={<InlineStyle css={examplesStyles} />}
      afterBody={<SharedScripts />}
    >
      <Header />
      <main>
        <section className="examples-hero wrap">
          <span className="eyebrow">
            <span className="dot"></span> Catálogo de reglas
          </span>
          <h1>
            Ejemplos de texto detectado por la extensión <em>Lenguaje Claro</em>
            .
          </h1>
          <p className="examples-lede">
            Cada tabla muestra el texto que detecta la extensión, la alternativa
            que propone y el criterio de revisión. Algunas sugerencias son
            reemplazos directos; otras piden completar información precisa.
          </p>

          <div className="examples-stats" aria-label="Resumen de ejemplos">
            <div className="examples-stat">
              <strong>{formatNumber(metrics.rules)}</strong>
              <span>Reglas activas</span>
            </div>
            <div className="examples-stat">
              <strong>{formatNumber(metrics.examples)}</strong>
              <span>Casos de ejemplo</span>
            </div>
            <div className="examples-stat">
              <strong>{formatNumber(metrics.direct)}</strong>
              <span>Reemplazos directos</span>
            </div>
          </div>
        </section>

        <div className="wrap examples-shell">
          <Sidebar reglas={reglas} />
          <article className="examples-rules">
            {reglas.map((regla, index) => (
              <RuleSection key={regla.id} regla={regla} index={index} />
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </Document>
  );
}
