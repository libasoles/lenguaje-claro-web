/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document, { InlineScript } from "../components/Document.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useEffect } from "preact/hooks";

const mainHtml = (
  <>
    <section class="hero wrap">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">
            <span class="dot"></span> Beta pública · código abierto
          </span>

          <h1 class="hero-title">
            Escritura <em>jurídica</em> que{" "}
            <span class="under">se entiende</span>.
          </h1>

          <p class="hero-lede">
            Una extensión de Chrome que revisa tus textos en Google Docs y
            sugiere mejoras siguiendo los principios del <b>lenguaje claro</b>{" "}
            en el ámbito del derecho.
          </p>

          <div class="cta-row">
            <a
              class="btn btn-primary"
              target="_blank"
              href="https://chromewebstore.google.com/detail/lenguaje-claro/hfjnpkphlmalfdboapcidakmdkbbelja"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <path d="M21.17 8H12M3.95 6.06L8.54 14M10.88 21.94L15.46 14" />
              </svg>
              Instalar en Chrome <span class="arrow">→</span>
            </a>
          </div>

          <div class="meta-row">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              Hecho para Google Docs
            </span>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" />
              </svg>
              Privacidad de datos
            </span>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
              MIT · código abierto
            </span>
          </div>
        </div>

        <div id="demo" class="demo-card">
          <div class="demo-bar">
            <span class="traffic">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span class="tab">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="color: #4285f4"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              </svg>
              Apelación · borrador.docx
            </span>
            <span style="margin-left: auto">docs.google.com</span>
          </div>
          <div class="demo-body" id="demo-body">
            {/* <!-- populated by JS --> */}
          </div>
        </div>
      </div>
    </section>

    <div class="strip wrap">
      <div class="content">
        <span>Para abogadxs</span>
        <span class="sep"></span>
        <span>jueces y juezas</span>
        <span class="sep"></span>
        <span>administración pública</span>
        <span class="sep"></span>
        <span>estudiantes de derecho</span>
        <span class="sep"></span>
        <span>personas redactando contratos</span>
      </div>
    </div>

    <section class="block wrap">
      <div class="block-header">
        <div class="kicker">
          <span class="num">01</span> Por qué existe
        </div>
        <div>
          <h2 class="section-title">
            El derecho se lee <em>poco</em>
            <br />
            porque se escribe <em>mal</em>.
          </h2>
          <p class="section-sub">
            La{" "}
            <a
              href="http://lenguajeclaroargentina.gob.ar/"
              target="_blank"
              rel="noopener"
              style="
                  color: var(--accent);
                  text-decoration: underline;
                  text-underline-offset: 3px;
                "
            >
              Red Argentina de Lenguaje Claro
            </a>
            impulsa una manera de escribir para acercar el derecho a las
            personas. Esta extensión automatiza parte de ese trabajo: detecta
            arcaísmos, títulos honoríficos, siglas con puntos, rodeos y
            tecnicismos mientras redactás, y te sugiere alternativas en lenguaje
            corriente.
          </p>
        </div>
      </div>

      <div class="why-grid">
        <div class="why-cell">
          <div class="why-num">a.</div>
          <div class="why-title">
            Extensión de Chrome enfocada en lenguaje jurídico
          </div>
          <div class="why-body">
            No es un corrector de estilo para lenguaje corriente. Las reglas
            están pensadas para escritos judiciales, contratos, dictámenes y
            resoluciones administrativas.
          </div>
        </div>
        <div class="why-cell">
          <div class="why-num">b.</div>
          <div class="why-title">Mejora tu escritura en Google Docs</div>
          <div class="why-body">
            Similar en espíritu a LanguageTool, ProWritingAid o Hemingway App —
            pero específica para profesionales del derecho. En español.
          </div>
        </div>
        <div class="why-cell">
          <div class="why-num">c.</div>
          <div class="why-title">Tus textos son privados</div>
          <div class="why-body">
            No enviamos documentos a servidores propios ni usamos modelos de IA.
            Las reglas corren localmente y la extensión solo usa servicios de
            Google necesarios para leer el documento activo y aplicar cambios
            confirmados por el usuario.
          </div>
        </div>
      </div>
    </section>

    <section class="block wrap" id="features">
      <div class="block-header">
        <div class="kicker">
          <span class="num">02</span> Características
        </div>
        <div>
          <h2 class="section-title">
            Diez reglas que observa <em>mientras</em> escribís.
          </h2>
          <p class="section-sub">
            Cada regla busca un tipo específico de problema y propone una
            alternativa simple. Podés aceptar el cambio, o ignorarlo.
          </p>
        </div>
      </div>

      <div class="feat-grid">
        <div class="feat">
          <div class="feat-head">
            <span class="idx">01</span> Arcaísmos innecesarios
          </div>
          <h3 class="feat-title">Términos obsoletos del foro.</h3>
          <div class="feat-desc">
            Detecta latinismos y fórmulas anticuadas del lenguaje jurídico y
            propone un equivalente actual.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">in fine</span>
              <span class="arrow">→</span>
              <span class="to">al final</span>
            </div>
            <div class="pair">
              <span class="from">a sensu contrario</span>
              <span class="arrow">→</span>
              <span class="to">en sentido contrario</span>
            </div>
            <div class="pair">
              <span class="from">otrosí digo</span>
              <span class="arrow">→</span>
              <span class="to">además solicito</span>
            </div>
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">02</span> Títulos honoríficos
          </div>
          <h3 class="feat-title">Tratamientos ceremoniales.</h3>
          <div class="feat-desc">
            Señala fórmulas honoríficas o cuasi-nobiliarias y propone nombrar
            directamente el cargo, el órgano o la institución.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">honorable tribunal</span>
              <span class="arrow">→</span>
              <span class="to">tribunal</span>
            </div>
            <div class="pair">
              <span class="from">señora jueza</span>
              <span class="arrow">→</span>
              <span class="to">jueza</span>
            </div>
            <div class="pair">
              <span class="from">excma. cámara</span>
              <span class="arrow">→</span>
              <span class="to">cámara</span>
            </div>
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">03</span> Tecnicismos
          </div>
          <h3 class="feat-title">Jerga legal.</h3>
          <div class="feat-desc">
            Reemplaza términos técnicos por expresiones accesibles para personas
            que no son del derecho.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">prestatario</span>
              <span class="arrow">→</span>
              <span class="to">persona que recibe un préstamo</span>
            </div>
            <div class="pair">
              <span class="from">mora</span>
              <span class="arrow">→</span>
              <span class="to">retraso</span>
            </div>
            <div class="pair">
              <span class="from">enajenar</span>
              <span class="arrow">→</span>
              <span class="to">vender</span>
            </div>
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">04</span> Vaguedades
          </div>
          <h3 class="feat-title">Expresiones imprecisas.</h3>
          <div class="feat-desc">
            Marca palabras que no comunican magnitud o referencia concreta e
            indica qué tipo de dato las reemplazaría.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">mucho</span>
              <span class="arrow">→</span>
              <span class="to">prefiere una cifra o porcentaje</span>
            </div>
            <div class="pair">
              <span class="from">en alguna medida</span>
              <span class="arrow">→</span>
              <span class="to">provee una magnitud específica</span>
            </div>
          </div>
          <div class="feat-note">
            No puede sugerir el texto exacto: el dato preciso depende del
            contexto del documento.
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">05</span> Rodeos innecesarios
          </div>
          <h3 class="feat-title">Frases largas.</h3>
          <div class="feat-desc">
            Identifica perífrasis comunes y propone la forma corta equivalente.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">en el momento actual</span>
              <span class="arrow">→</span>
              <span class="to">ahora</span>
            </div>
            <div class="pair">
              <span class="from">a fin de</span>
              <span class="arrow">→</span>
              <span class="to">para</span>
            </div>
            <div class="pair">
              <span class="from">de conformidad con</span>
              <span class="arrow">→</span>
              <span class="to">según</span>
            </div>
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">06</span> Voz pasiva
          </div>
          <h3 class="feat-title">Pasiva hacia activa.</h3>
          <div class="feat-desc">
            Detecta construcciones pasivas y sugiere reestructurar en voz
            activa, más directa.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">fue interpuesto el recurso</span>
              <span class="arrow">→</span>
              <span class="to">se interpuso el recurso</span>
            </div>
          </div>
          <div class="feat-note">
            No siempre puede reconstruir la oración completa sin conocer el
            sujeto real; algunas sugerencias requieren ajuste manual.
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">07</span> Queísmo y dequeísmo
          </div>
          <h3 class="feat-title">Uso correcto de "de que".</h3>
          <div class="feat-desc">
            Detecta la omisión o el agregado incorrecto de la preposición con
            patrones curados y contexto local.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">me alegro que vengas</span>
              <span class="arrow">→</span>
              <span class="to">me alegro de que vengas</span>
            </div>
            <div class="pair">
              <span class="from">pienso de que</span>
              <span class="arrow">→</span>
              <span class="to">pienso que</span>
            </div>
          </div>
          <div class="feat-note">
            Algunos casos son ambiguos sin análisis sintáctico profundo; puede
            generar falsos positivos en oraciones complejas.
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">08</span> Nominalización
          </div>
          <h3 class="feat-title">Sustantivos de acción por verbos.</h3>
          <div class="feat-desc">
            Encuentra construcciones sustantivadas y sugiere el verbo directo.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">poner en consideración</span>
              <span class="arrow">→</span>
              <span class="to">considerar</span>
            </div>
            <div class="pair">
              <span class="from">dar comienzo</span>
              <span class="arrow">→</span>
              <span class="to">comenzar</span>
            </div>
            <div class="pair">
              <span class="from">realizar una inspección</span>
              <span class="arrow">→</span>
              <span class="to">inspeccionar</span>
            </div>
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">09</span> Números
          </div>
          <h3 class="feat-title">Cifras legibles.</h3>
          <div class="feat-desc">
            Propone reemplazar números escritos con palabras por dígitos, y
            números romanos por arábigos cuando corresponde.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">treinta y dos</span>
              <span class="arrow">→</span>
              <span class="to">32</span>
            </div>
            <div class="pair">
              <span class="from">Artículo XIV</span>
              <span class="arrow">→</span>
              <span class="to">Artículo 14</span>
            </div>
          </div>
          <div class="feat-note">
            Omite "uno/una" en contextos ambiguos (artículo indeterminado vs.
            numeral) para evitar falsos positivos.
          </div>
        </div>

        <div class="feat">
          <div class="feat-head">
            <span class="idx">10</span> Siglas sin puntos
          </div>
          <h3 class="feat-title">Siglas en forma actual.</h3>
          <div class="feat-desc">
            Detecta siglas escritas con puntos y sugiere la forma compacta, que
            es la recomendada para este tipo de abreviaciones.
          </div>
          <div class="feat-ex">
            <div class="pair">
              <span class="from">U.N.E.S.C.O</span>
              <span class="arrow">→</span>
              <span class="to">UNESCO</span>
            </div>
            <div class="pair">
              <span class="from">O.N.U</span>
              <span class="arrow">→</span>
              <span class="to">ONU</span>
            </div>
          </div>
        </div>
      </div>

      <div class="note-box">
        <strong>Nota sobre las limitaciones del análisis local.</strong> Las
        reglas se ejecutan localmente en el navegador, sin servicios externos
        más que la API de Google Docs. Es un proyecto simple, que no usa
        servidores propios ni tampoco IAs, lo cual implica que el sistema no
        comprende la estructura gramatical a fondo ni el significado de las
        oraciones. Como resultado, algunas sugerencias requieren revisión
        manual, ciertos casos ambiguos pueden generar falsos positivos, y reglas
        como voz pasiva o vaguedades no pueden reconstruir ni proponer el texto
        exacto sin conocer el contexto semántico del documento.
      </div>
    </section>

    <section class="block wrap">
      <div class="block-header">
        <div class="kicker">
          <span class="num">03</span> En acción
        </div>
        <div>
          <h2 class="section-title">
            Así se ve en tu <em>Google Docs</em>.
          </h2>
          <p class="section-sub">
            El panel lateral agrupa las sugerencias por categoría y las muestra
            numeradas. Podés aplicar un cambio con un clic o expandir para ver
            la explicación completa.
          </p>
        </div>
      </div>
      <div class="shot-wrap">
        <img
          src="assets/screenshot.png"
          alt="Captura de Google Docs con la extensión Lenguaje Claro abierta en el panel lateral, mostrando sugerencias de arcaísmos, tecnicismos y números en un contrato de ejemplo."
        />
      </div>
      <div class="shot-caption">
        <span>
          Captura sobre un contrato de prestación de servicios profesionales
        </span>
        <span>v0.1.0 · beta</span>
      </div>
    </section>

    {/* <!-- =======================  COMPARISON  ======================= --> */}
    <section class="block wrap" id="comparacion">
      <div class="block-header">
        <div class="kicker">
          <span class="num">04</span> Comparación
        </div>
        <div>
          <h2 class="section-title">
            Complementa otras herramientas — <em>no las reemplaza</em>.
          </h2>
          <p class="section-sub">
            Existen correctores de estilo excelentes en el mercado, pero ninguno
            está enfocado en lenguaje claro aplicado al derecho en español.{" "}
            <b>Lenguaje Claro</b> cubre ese hueco y se puede usar junto a una
            herramienta general como LanguageTool sin superposición: nuestra
            extensión no hace análisis contextual ni semántico.
          </p>
        </div>
      </div>

      <div class="comp-wrap">
        <table class="comp-table">
          <thead>
            <tr>
              <th>Herramienta</th>
              <th>Enfoque</th>
              <th class="centered">Corre local</th>
              <th class="centered">Jurídico</th>
              <th class="centered">Lenguaje claro</th>
            </tr>
          </thead>
          <tbody>
            <tr class="mine">
              <td>
                <div class="tool">
                  Lenguaje Claro<small>esta extensión</small>
                </div>
              </td>
              <td>Lenguaje claro</td>
              <td class="centered">
                <span class="check yes">✓</span>
              </td>
              <td class="centered">
                <span class="check yes">✓</span>
              </td>
              <td class="centered">
                <span class="check yes">✓</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  Grammarly<small>grammarly.com</small>
                </div>
              </td>
              <td>Gramática y estilo general</td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check half">parcial</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  LanguageTool<small>languagetool.org</small>
                </div>
              </td>
              <td>Gramática, ortografía, estilo</td>
              <td class="centered">
                <span class="check half">opcional</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  Wordtune<small>wordtune.com</small>
                </div>
              </td>
              <td>Reescritura con IA</td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  ProWritingAid<small>prowritingaid.com</small>
                </div>
              </td>
              <td>Estilo, narrativa, ritmo</td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check half">parcial</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  Hemingway App<small>hemingwayapp.com</small>
                </div>
              </td>
              <td>Legibilidad, frases largas</td>
              <td class="centered">
                <span class="check yes">✓</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check half">parcial</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tool">
                  Gemini en Docs<small>google.com/gemini</small>
                </div>
              </td>
              <td>Reescritura y asistente IA general</td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
              <td class="centered">
                <span class="check no">×</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="note-box">
        <strong>
          En Argentina no existe una herramienta específica de lenguaje claro
          aplicada al derecho.
        </strong>
        Las alternativas están enfocadas en el idioma inglés o son correctores
        de estilo general.
      </div>
    </section>

    {/* <!-- =======================  PRIVACY  ======================= --> */}
    <section class="block wrap" id="privacidad">
      <div class="block-header">
        <div class="kicker">
          <span class="num">05</span> Privacidad
        </div>
        <div>
          <h2 class="section-title">
            La extensión corre <em>localmente</em>.
          </h2>
          <p class="section-sub">
            No extensión no envía datos a servidores propios, solo interactúa
            con Google Docs. No usa modelos de IA. Las reglas se ejecutan
            localmente en el navegador. La extensión es de código abierto y
            puede auditarse.
          </p>
        </div>
      </div>

      <div class="priv-grid">
        <div class="priv-cell">
          <div class="k">Extensión</div>
          <div class="v">Solo local.</div>
          <div class="d">
            No guardamos texto, telemetría ni identificadores en infraestructura
            propia. Solo se conserva en tu navegador el estado de activación de
            la extensión, es decir, si está prendida o apagada.
          </div>
        </div>
        <div class="priv-cell">
          <div class="k">Alcance</div>
          <div class="v">Google Docs.</div>
          <div class="d">
            La extensión solo se activa y propone cambios en{" "}
            <code style="font-family: var(--font-mono); font-size: 0.9em">
              http://docs.google.com
            </code>
            .
          </div>
        </div>
        <div class="priv-cell">
          <div class="k">Auditable</div>
          <div class="v">Código abierto.</div>
          <div class="d">
            El código fuente completo está publicado bajo licencia MIT.
            Cualquier persona puede revisar qué hace y cómo lo hace.
          </div>
        </div>
      </div>
    </section>

    {/* <!-- =======================  WAITLIST / CTA  ======================= --> */}
    <section class="wrap" id="descargar">
      <div class="cta-block">
        <div>
          <h3>
            Avisame cuando salga la versión <em>Pro</em>.
          </h3>
          <p class="cta-sub">
            La versión actual es gratis. Estamos trabajando en una versión Pro
            con análisis de texto sofisticado, mediante NLP. Si te interesa,
            dejanos tu email.
          </p>
          <div class="cta-tags">
            <span>sin newsletter</span>
            <span>· sin spam</span>
            <span>· solo para darte aviso</span>
          </div>
        </div>
        <div>
          <form
            id="waitlist"
            aria-label="Lista de espera para la versión Pro"
            novalidate
          >
            <input
              id="waitlist-email"
              name="email"
              type="email"
              required
              placeholder="tu@email.com · avisame cuando salga Pro"
              aria-label="Email para la lista de espera"
              inputmode="email"
              autocomplete="email"
            />
            <label class="sr-only" for="waitlist-website">
              No completar este campo
            </label>
            <input
              id="waitlist-website"
              class="sr-only"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />
            <button type="submit">Avisarme</button>
          </form>
          <p class="cta-consent">
            Al dejar tu email, lo usamos para confirmar tu inscripción y
            avisarte cuando salga la versión Pro. Más info en la{" "}
            <a href="legal.html#pp-datos">política de privacidad</a>.
          </p>
          <div
            class="cta-feedback"
            id="cta-feedback"
            role="status"
            aria-live="polite"
          ></div>
        </div>
      </div>
    </section>
  </>
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://extensionlenguajeclaro.com.ar/#website",
      url: "https://extensionlenguajeclaro.com.ar/",
      name: "Lenguaje Claro",
      description:
        "Sitio oficial de Lenguaje Claro, una extensión de Chrome para Google Docs cuyas reglas se ejecutan localmente y que usa solo Google OAuth y Google Docs API para leer el documento activo y aplicar cambios confirmados por el usuario.",
      inLanguage: "es-AR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://extensionlenguajeclaro.com.ar/#app",
      name: "Lenguaje Claro",
      url: "https://extensionlenguajeclaro.com.ar/",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Google Chrome",
      browserRequirements:
        "Google Chrome o navegadores compatibles con extensiones de Chrome",
      description:
        "Extensión de Chrome para Google Docs que revisa la escritura jurídica en Google Docs.",
      image: "https://extensionlenguajeclaro.com.ar/assets/og-image.png",
      screenshot: "https://extensionlenguajeclaro.com.ar/assets/screenshot.png",
      inLanguage: "es-AR",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@type": "Person", name: "Guillermo Perez" },
    },
  ],
};

export default function IndexPage() {
  return (
    <Document
      title="Lenguaje Claro — Extensión de Chrome para escritura jurídica"
      description="Extensión de Chrome que detecta arcaísmos, títulos honoríficos, siglas con puntos, tecnicismos, nominalizaciones, voz pasiva y otros problemas de estilo en textos jurídicos dentro de Google Docs."
      keywords="lenguaje claro, plain language, derecho, Argentina, Google Docs, extensión Chrome, escritura jurídica, redacción, arcaísmos, títulos honoríficos, siglas, tecnicismos jurídicos"
      author="Guillermo Perez"
      canonical="https://extensionlenguajeclaro.com.ar/"
      ogTitle="Lenguaje Claro — Escritura jurídica que se entiende"
      ogDescription="Extensión de Chrome que mejora la redacción jurídica en Google Docs. Detecta arcaísmos, títulos honoríficos, siglas con puntos, voz pasiva y más."
      twitterTitle="Lenguaje Claro — Escritura jurídica que se entiende"
      twitterDescription="Extensión de Chrome para Google Docs que detecta arcaísmos, títulos honoríficos, siglas con puntos y otros problemas de estilo en textos jurídicos."
      structuredData={structuredData}
      afterBody={
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
           const waitlistForm = document.getElementById("waitlist");
    const waitlistEmail = document.getElementById("waitlist-email");
    const waitlistFeedback = document.getElementById("cta-feedback");
    const waitlistSubmit = waitlistForm?.querySelector('button[type="submit"]');
    const defaultWaitlistButtonLabel =
      waitlistSubmit?.textContent || "Avisarme";
    let isWaitlistPending = false;

    function trackEvent(name, params) {
      if (typeof gtag !== "function") return;

      gtag("event", name, {
        event_category: "engagement",
        ...params,
      });
    }

    function setWaitlistFeedback(message, state) {
      if (!waitlistFeedback) return;

      waitlistFeedback.textContent = message || "";
      waitlistFeedback.dataset.state = state || "";
      waitlistFeedback.classList.toggle("show", Boolean(message));
    }

    function setWaitlistPending(isPending) {
      if (!waitlistForm || !waitlistSubmit || !waitlistEmail) return;

      isWaitlistPending = isPending;
      waitlistForm.dataset.pending = String(isPending);
      waitlistForm.setAttribute("aria-busy", String(isPending));
      waitlistEmail.readOnly = isPending;
      waitlistEmail.setAttribute("aria-disabled", String(isPending));
      waitlistSubmit.setAttribute("aria-disabled", String(isPending));
      waitlistSubmit.textContent = isPending
        ? "Enviando..."
        : defaultWaitlistButtonLabel;
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (waitlistForm) {
      waitlistForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (isWaitlistPending) return;

        const formData = new FormData(waitlistForm);
        const email = String(formData.get("email") || "")
          .trim()
          .toLowerCase();
        const website = String(formData.get("website") || "").trim();

        setWaitlistFeedback("", "");

        if (!isValidEmail(email)) {
          setWaitlistFeedback("Escribí un email válido.", "error");
          trackEvent("waitlist_signup_error", { reason: "invalid_email" });
          waitlistEmail?.focus();
          return;
        }

        setWaitlistPending(true);

        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, website }),
          });
          const payload = await response.json().catch(function () {
            return {};
          });

          if (!response.ok) {
            const reason = payload.error || "internal_error";
            setWaitlistFeedback(
              "No pudimos registrar tu email en este momento. Probá de nuevo en unos minutos.",
              "error",
            );
            trackEvent("waitlist_signup_error", { reason });
            return;
          }

          waitlistForm.reset();
          setWaitlistFeedback(
            "¡Listo! Te avisamos cuando salga la versión Pro.",
            "success",
          );
          trackEvent("waitlist_signup_success");
        } catch (error) {
          setWaitlistFeedback(
            "No pudimos registrar tu email en este momento. Probá de nuevo en unos minutos.",
            "error",
          );
          trackEvent("waitlist_signup_error", { reason: "network_error" });
        } finally {
          setWaitlistPending(false);
        }
      });
    }
        `,
            }}
          />

          <script src="demo.js"></script>
        </>
      }
    >
      <Header />
      <main id="top">{mainHtml}</main>
      <Footer />
    </Document>
  );
}
