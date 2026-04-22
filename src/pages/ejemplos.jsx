/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document, { InlineScript } from "../components/Document.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
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

const EXAMPLES_PER_RULE = 12;

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
      metrics.examples += Math.min(rows.length, EXAMPLES_PER_RULE);
      return metrics;
    },
    { rules: 0, examples: 0 },
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-AR").format(value);
}

const examplesDemoSequence = [
  { t: "Ante el " },
  { lookup: "honorable tribunal", text: "honorable tribunal" },
  { t: ", solicito a " },
  { lookup: "V.S.", text: "V.S." },
  { t: " que, " },
  { lookup: "en el momento actual", text: "en el momento actual" },
  { t: ", se autorice " },
  {
    lookup: "proceder a la interposición",
    text: "proceder a la interposición",
  },
  { t: " del recurso previsto en el Capítulo " },
  { lookup: "Capítulo IV", text: "IV", from: "IV" },
  { t: ". " },
  {
    lookup: "La medida fue aprobada por el Senado",
    text: "La medida fue aprobada por el Senado",
  },
  { t: " sin " },
  { lookup: "poner de manifiesto", text: "poner de manifiesto" },
  { t: " los fundamentos. No corresponde " },
  { lookup: "afirmar de que", text: "afirmar de que" },
  { t: " la " },
  { lookup: "mora", text: "mora" },
  { t: " generó " },
  { lookup: "mucho", text: "mucho" },
  { t: " perjuicio; por eso pido revisar el informe " },
  { lookup: "U.N.E.S.C.O", text: "U.N.E.S.C.O" },
  { t: " " },
  { lookup: "in fine", text: "in fine" },
  { t: "." },
];

function normalizeLookup(value) {
  return String(value || "").toLocaleLowerCase("es-AR");
}

function findDemoHallazgo(reglas, lookup) {
  const target = normalizeLookup(lookup);

  for (const regla of reglas) {
    for (const ejemplo of regla.ejemplos || []) {
      for (const hallazgo of ejemplo.hallazgos || []) {
        const candidates = [ejemplo.texto, hallazgo.textoDetectado].map(
          normalizeLookup,
        );

        if (candidates.includes(target)) {
          return { regla, ejemplo, hallazgo };
        }
      }
    }
  }

  throw new Error(
    `No se encontró el hallazgo "${lookup}" en src/pages/ejemplos.json`,
  );
}

function buildExamplesDemoSegments(reglas) {
  let markIndex = 0;

  return examplesDemoSequence.map((segment) => {
    if (segment.t) return segment;

    const { regla, ejemplo, hallazgo } = findDemoHallazgo(
      reglas,
      segment.lookup,
    );
    const suggestions = Array.isArray(hallazgo.sugerencias)
      ? hallazgo.sugerencias
      : [];
    const firstSuggestion = suggestions[0] || "";

    if (!firstSuggestion) {
      throw new Error(
        `El hallazgo "${segment.lookup}" no tiene sugerencias en src/pages/ejemplos.json`,
      );
    }

    markIndex += 1;

    return {
      m: `examples-${markIndex}`,
      kind: regla.id,
      text: segment.text || hallazgo.textoDetectado || ejemplo.texto,
      from: segment.from || hallazgo.textoDetectado || ejemplo.texto,
      to: firstSuggestion,
      label: getRuleTitle(regla),
      color: regla.color || "var(--accent)",
      applicable: hallazgo.aplicable === true,
      suggestions,
      description: hallazgo.descripcion || getRuleDescription(regla),
    };
  });
}

function serializeForInlineScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
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
        {reglas.map((regla, index) => (
          <a key={regla.id} href={`#${regla.id}`}>
            <span className="snum">{String(index + 1).padStart(2, "0")}</span>
            <span>{getRuleTitle(regla)}</span>
          </a>
        ))}
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
            <th className="col-suggestions">Sugerencias</th>
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
          <span>{String(index + 1).padStart(2, "0")} · muestra aleatoria</span>
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
const examplesDemoSegments = buildExamplesDemoSegments(reglas);
const examplesPageScript = String.raw`
(function () {
  const sampleSize = ${EXAMPLES_PER_RULE};

  function shuffle(items) {
    const shuffled = items.slice();

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }

    return shuffled;
  }

  document.querySelectorAll(".examples-table tbody").forEach(function (tbody) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    if (rows.length <= sampleSize) return;

    const selected = shuffle(
      rows.map(function (row, index) {
        return { row, index };
      }),
    )
      .slice(0, sampleSize)
      .sort(function (a, b) {
        return a.index - b.index;
      });

    tbody.replaceChildren(
      ...selected.map(function (entry) {
        return entry.row;
      }),
    );
  });

  const body = document.getElementById("examples-demo-body");
  if (!body || !window.LenguajeClaroDemo) return;

  window.LenguajeClaroDemo.init({
    body,
    segments: ${serializeForInlineScript(examplesDemoSegments)},
    autoCycle: false,
    openOnHover: true,
  });
})();
`.trim();

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
      extraHead={<link rel="stylesheet" href="ejemplos.css" />}
      afterBody={
        <>
          <script src="demo.js"></script>
          <InlineScript code={examplesPageScript} />
        </>
      }
    >
      <Header />
      <main>
        <section className="examples-hero wrap">
          <span className="eyebrow">
            <span className="dot"></span> Catálogo de reglas
          </span>
          <h1>
            Ejemplos de texto remarcado por la extensión <em>Lenguaje Claro</em>
            .
          </h1>
          <p className="examples-lede">
            Hasta doce ejemplos al azar de cada categoría, y las alternativas
            que se proponen. Algunas sugerencias permiten reemplazos directos;
            otras solo llamados de atención.
          </p>

          <div className="examples-stats" aria-label="Resumen de ejemplos">
            <div className="examples-stat">
              <strong>{formatNumber(metrics.rules)}</strong>
              <span>Reglas activas</span>
            </div>
            <div className="examples-stat">
              <strong>{formatNumber(metrics.examples)}</strong>
              <span>Casos visibles</span>
            </div>
            <div className="examples-stat">
              <strong>{formatNumber(EXAMPLES_PER_RULE)}</strong>
              <span>Máximo por regla</span>
            </div>
          </div>
        </section>

        <section
          className="wrap examples-demo-wrap"
          aria-label="Demostración de sugerencias"
        >
          <div id="examples-demo" className="demo-card examples-demo-card">
            <div className="demo-bar">
              <span className="traffic" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="tab">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "#4285f4" }}
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                </svg>
                Recurso · ejemplo.docx
              </span>
              <span className="demo-host">ejemplos.json</span>
            </div>
            <div className="demo-body" id="examples-demo-body"></div>
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
