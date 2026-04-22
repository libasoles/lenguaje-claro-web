/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import Document, { InlineStyle } from "../components/Document.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const mainHtml = String.raw`<!-- HERO -->
      <div class="legal-hero wrap">
        <div class="eyebrow">
          <span class="dot"></span> Documentos legales
        </div>
        <h1>Privacidad, <em>términos</em> y condiciones.</h1>
        <p class="legal-meta">
          Extensión Lenguaje Claro · versión 0.1.x · Última actualización: 18 de
          abril de 2026
        </p>
      </div>

      <!-- BODY -->
      <div class="wrap">
        <div class="legal-layout">
          <!-- SIDEBAR -->
          <aside class="legal-sidebar">
            <nav aria-label="Índice de secciones">
              <div class="sidebar-section">Privacidad</div>
              <a href="#pp-descripcion"
                ><span class="snum">§1</span> Descripción</a
              >
              <a href="#pp-datos"
                ><span class="snum">§2</span> Datos recopilados</a
              >
              <a href="#pp-permisos"
                ><span class="snum">§3</span> Permisos y alcance</a
              >
              <a href="#pp-oauth"><span class="snum">§4</span> Google OAuth</a>
              <a href="#pp-limited-use"
                ><span class="snum">§5</span> Limited Use</a
              >
              <a href="#pp-terceros"
                ><span class="snum">§6</span> Servicios de terceros</a
              >
              <a href="#pp-menores"
                ><span class="snum">§7</span> Menores de edad</a
              >
              <a href="#pp-cambios"><span class="snum">§8</span> Cambios</a>

              <div class="sidebar-section">Términos</div>
              <a href="#tos-uso"><span class="snum">§9</span> Uso permitido</a>
              <a href="#tos-licencia"><span class="snum">§10</span> Licencia</a>
              <a href="#tos-disponibilidad"
                ><span class="snum">§11</span> Disponibilidad</a
              >

              <div class="sidebar-section">Responsabilidades</div>
              <a href="#disc-exactitud"
                ><span class="snum">§12</span> Exactitud de sugerencias</a
              >
              <a href="#disc-limitacion"
                ><span class="snum">§13</span> Limitación de responsabilidad</a
              >
              <a href="#disc-google"
                ><span class="snum">§14</span> Relación con Google</a
              >

              <div class="sidebar-section">Contacto</div>
              <a href="#contacto"><span class="snum">§15</span> Contacto</a>
            </nav>
          </aside>

          <!-- ARTICLE -->
          <div class="legal-article">
            <!-- Mobile TOC -->
            <details class="legal-toc-mobile">
              <summary>Índice de secciones <span>↓</span></summary>
              <ol>
                <li>
                  <a href="#pp-descripcion">Descripción de la extensión</a>
                </li>
                <li><a href="#pp-datos">Datos recopilados</a></li>
                <li><a href="#pp-permisos">Permisos y alcance</a></li>
                <li>
                  <a href="#pp-oauth">Google OAuth y API de Documentos</a>
                </li>
                <li>
                  <a href="#pp-limited-use">Uso de Google APIs y Limited Use</a>
                </li>
                <li><a href="#pp-terceros">Servicios de terceros</a></li>
                <li><a href="#pp-menores">Menores de edad</a></li>
                <li><a href="#pp-cambios">Cambios a esta política</a></li>
                <li><a href="#tos-uso">Uso permitido</a></li>
                <li><a href="#tos-licencia">Licencia</a></li>
                <li><a href="#tos-disponibilidad">Disponibilidad</a></li>
                <li><a href="#disc-exactitud">Exactitud de sugerencias</a></li>
                <li>
                  <a href="#disc-limitacion">Limitación de responsabilidad</a>
                </li>
                <li><a href="#disc-google">Relación con Google</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ol>
            </details>

            <!-- ======== PRIVACY POLICY ======== -->
            <section id="privacidad">
              <span class="section-label">01 — Política de privacidad</span>
              <h2>Cómo tratamos <em>tus datos</em>.</h2>
              <p>
                Esta política describe qué información recopila, accede o
                utiliza la extensión <strong>Lenguaje Claro</strong> y cómo se
                usan los permisos que solicita. Aplica a la versión actual de la
                extensión y a las futuras versiones que se distribuyan a través
                de la Chrome Web Store.
              </p>
            </section>

            <section id="pp-descripcion">
              <h3>§1 — Descripción de la extensión</h3>
              <p>
                <strong>Lenguaje Claro</strong> es una extensión de Chrome de
                código abierto (licencia MIT) que analiza el texto de documentos
                de Google Docs y sugiere mejoras de estilo basadas en principios
                de lenguaje claro aplicados al ámbito jurídico. Detecta
                arcaísmos, tecnicismos, nominalizaciones, voz pasiva, rodeos
                innecesarios, queísmo/dequeísmo y números escritos con palabras.
              </p>
              <p>
                El análisis de las reglas se ejecuta dentro del navegador del
                usuario, utilizando patrones de texto predefinidos empaquetados
                con la extensión. La extensión no se conecta a servidores
                propios ni a servicios de terceros ajenos a Google. Para
                funcionar, se comunica únicamente con Google OAuth y con la API
                de Google Docs para leer el documento activo y, cuando el
                usuario lo confirma, enviar la instrucción necesaria para
                aplicar un reemplazo en ese mismo documento. No utiliza
                servicios de inteligencia artificial en la nube ni telemetría
                propia.
              </p>
            </section>

            <section id="pp-datos">
              <h3>§2 — Datos recopilados</h3>

              <div class="callout">
                <strong>Resumen:</strong> la extensión no recopila ni retiene
                datos personales ni contenido de documentos en servidores
                propios. El sitio web sí puede tratar la dirección de email que
                una persona deja voluntariamente en la lista de espera de la
                versión Pro.
              </div>

              <p>Distinguimos entre dos contextos distintos:</p>
              <ul>
                <li>
                  <strong>Extensión de Chrome</strong> — la extensión no
                  recopila nombre, apellido, dirección de email, identificadores
                  de cuenta ni contenido de documentos en infraestructura
                  propia. Se opera únicamente en Google Docs. El análisis corre
                  localmente en el navegador.
                </li>
                <li>
                  <strong>Contenido de documentos</strong> — el texto de tus
                  documentos no se almacena en nuestros servidores. La extensión
                  accede al documento activo mediante la API de Google Docs para
                  analizarlo y, si el usuario acepta una sugerencia, envía a
                  Google Docs la instrucción necesaria para aplicar ese cambio.
                </li>
                <li>
                  <strong>Historial de navegación</strong> — la extensión no
                  accede al historial de páginas visitadas ni monitorea la
                  navegación del usuario. Cuando el usuario abre el popup, la
                  extensión puede leer temporalmente la URL de la pestaña activa
                  para determinar si corresponde a un Google Doc y mostrar los
                  controles adecuados. Esa URL no se almacena ni se transmite.
                </li>
                <li>
                  <strong>Telemetría de uso</strong> — no registramos qué reglas
                  están activas, cuántas sugerencias se aceptan o rechazan,
                  tiempo de sesión ni ningún otro evento de uso.
                </li>
                <li>
                  <strong>Datos de autenticación</strong> — los tokens de acceso
                  OAuth son gestionados por Chrome. La extensión no los persiste
                  en almacenamiento propio ni los comparte con terceros; solo
                  los usa en memoria durante la sesión para autenticar las
                  solicitudes a la API de Google Docs.
                </li>
                <li>
                  <strong>Preferencias del usuario</strong> — los estados de
                  activación de la extensión se guardan localmente en <code>chrome.storage</code>. En particular, se conserva si la
                  extensión está habilitada globalmente
                  (<code>extensionEnabled</code>) y los IDs de documentos donde
                  el usuario la desactiva (<code>disabledDocs</code>). Esa
                  información permanece en el navegador del usuario, no se
                  transmite a servidores propios ni a terceros, y no contiene
                  contenido de documentos.
                </li>
                <li>
                  <strong>Datos de ubicación o dispositivo</strong> — no
                  accedemos a la geolocalización, identificadores de hardware ni
                  información del sistema operativo.
                </li>
                <li>
                  <strong>Lista de espera del sitio web</strong> — si una
                  persona deja voluntariamente su email para ser avisada sobre
                  Lenguaje Claro Pro, esa dirección se almacena en una base de
                  datos.
                </li>
                <li>
                  <strong>Correo transaccional</strong> — al registrarse en la
                  waitlist, el sitio puede enviar un mail de confirmación. Ese
                  email se usa para confirmar la suscripción y, más adelante,
                  para avisar el lanzamiento de la versión Pro.
                </li>
              </ul>
            </section>

            <section id="pp-permisos">
              <h3>§3 — Permisos solicitados y alcance de ejecución</h3>
              <p>
                La extensión solicita los siguientes permisos en su manifiesto.
                Además, sus scripts solo se cargan dentro de <code>docs.google.com</code> y la funcionalidad de revisión se
                inicializa sobre documentos válidos de Google Docs. Cada permiso
                o alcance tiene un propósito único y necesario para el
                funcionamiento de la herramienta:
              </p>

              <table class="perm-table">
                <thead>
                  <tr>
                    <th>Permiso</th>
                    <th>Justificación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>identity</code></td>
                    <td>
                      Gestionar el flujo de autenticación OAuth 2.0 con Google,
                      necesario para obtener acceso a la API de Google Docs y
                      leer el texto del documento activo.
                    </td>
                  </tr>
                  <tr>
                    <td><code>storage</code></td>
                    <td>
                      Guardar localmente el estado global de activación de la
                      extensión (<code>extensionEnabled</code>) y la lista de
                      IDs de documentos donde el usuario la desactiva
                      (<code>disabledDocs</code>). Los datos se almacenan
                      exclusivamente en el navegador del usuario mediante <code>chrome.storage</code> y no se transmiten fuera del
                      equipo.
                    </td>
                  </tr>
                  <tr>
                    <td><code>activeTab</code></td>
                    <td>
                      Permitir que, cuando el usuario abre el popup, la
                      extensión acceda temporalmente a la pestaña activa y a su
                      URL para detectar si la página actual es un Google Doc y
                      mostrar el toggle por documento. Esto evita solicitar el
                      permiso más amplio <code>tabs</code> o acceso permanente a
                      todas las pestañas del navegador.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code
                        >host_permissions: https://docs.googleapis.com/*</code
                      >
                    </td>
                    <td>
                      Realizar llamadas a la API de Google Docs (v1) para leer
                      el documento activo y aplicar cambios aceptados por el
                      usuario. Sin este permiso no es posible acceder al
                      contenido mediante la API oficial.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code
                        >content_scripts.matches:
                        https://docs.google.com/*</code
                      >
                    </td>
                    <td>
                      Los scripts de la extensión solo se cargan en <code>docs.google.com</code>. La revisión del texto y la
                      interfaz de sugerencias se inicializan sobre documentos
                      válidos de Google Docs; la extensión no se activa en otros
                      dominios.
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                La extensión no solicita permisos de lectura de pestañas
                (<code>tabs</code>), historial (<code>history</code>), cookies
                (<code>cookies</code>), red (<code>webRequest</code>) ni ningún
                otro permiso sensible adicional.
              </p>
            </section>

            <section id="pp-oauth">
              <h3>§4 — Google OAuth y API de Google Docs</h3>
              <p>
                Para leer el contenido del documento y aplicar reemplazos
                confirmados por el usuario, la extensión solicita autorización
                OAuth 2.0 al usuario con el scope:
              </p>
              <p><code>https://www.googleapis.com/auth/documents</code></p>
              <p>
                Este scope permite leer y modificar documentos de Google Docs. <strong
                  >La extensión únicamente lee el texto del documento
                  activo</strong
                >
                para aplicar las reglas de análisis estilístico. Si el usuario
                acepta una sugerencia, la extensión envía a Google Docs la
                instrucción necesaria para aplicar ese reemplazo en el documento
                activo.
              </p>
              <p>La extensión <strong>nunca</strong>:</p>
              <ul>
                <li>
                  Accede a documentos distintos del que está abierto en la
                  pestaña activa.
                </li>
                <li>
                  Lee el listado de documentos del usuario en Google Drive.
                </li>
                <li>
                  Realiza modificaciones automáticas sin confirmación explícita
                  del usuario.
                </li>
                <li>
                  Almacena el contenido del documento en servidores propios ni
                  lo comparte con terceros ajenos a Google.
                </li>
                <li>Comparte el token de acceso con terceros.</li>
              </ul>
              <p>
                El token de acceso OAuth es gestionado por el propio Chrome a
                través del permiso <code>identity</code>. La extensión lo
                utiliza únicamente para autenticar las solicitudes a la API de
                Google Docs durante la sesión activa.
              </p>
            </section>

            <section id="pp-limited-use">
              <h3>
                §5 — Uso de información recibida desde Google APIs (Limited Use)
              </h3>
              <p>
                Lenguaje Claro utiliza la información recibida desde Google APIs
                únicamente para ofrecer y mejorar la funcionalidad visible de la
                extensión: leer el documento activo en Google Docs para detectar
                problemas de estilo y, si el usuario lo confirma explícitamente,
                aplicar los cambios seleccionados.
              </p>
              <p>
                No usamos esa información para publicidad, perfilado,
                entrenamiento de modelos, venta de datos ni para fines ajenos a
                la funcionalidad principal de la extensión. No compartimos el
                contenido de los documentos con terceros ni permitimos acceso
                humano a ese contenido, salvo con consentimiento explícito del
                usuario, por motivos de seguridad o cuando exista obligación
                legal.
              </p>
              <p>
                El uso de la información recibida desde Google APIs adherirá a
                la Chrome Web Store User Data Policy, incluidos los requisitos
                de Limited Use.
              </p>
            </section>

            <section id="pp-terceros">
              <h3>§6 — Servicios de terceros</h3>
              <p>
                La extensión se comunica únicamente con los servicios de Google
                necesarios para su funcionamiento:
              </p>
              <ul>
                <li>
                  <strong>Google Docs API (docs.googleapis.com)</strong> — para
                  leer el texto del documento activo. Esta comunicación está
                  protegida por el token OAuth del usuario y la política de
                  privacidad de Google.
                </li>
                <li>
                  <strong>Google OAuth 2.0</strong> — para gestionar la
                  autenticación. El flujo lo maneja Chrome de forma nativa a
                  través del permiso <code>identity</code>.
                </li>
              </ul>
              <p>
                En relación con la extensión, no se utiliza ningún otro servicio
                externo: sin modelos de inteligencia artificial, sin servicios
                de crash reporting y sin telemetría propia.
              </p>
              <p>
                El <strong>sitio web</strong> de la extensión
                (<code>extensionlenguajeclaro.com.ar</code>) utiliza Google
                Analytics para medir visitas a la página de presentación.
                Además, el formulario de la lista de espera almacena email en
                una base de datos. Estas tomas de datos son independiente del
                funcionamiento de la extensión y no afectan ni estan
                relacionadas al procesamiento de documentos dentro de la misma.
              </p>
            </section>

            <section id="pp-menores">
              <h3>§7 — Menores de edad</h3>
              <p>
                Esta extensión está dirigida a profesionales del derecho,
                estudiantes de derecho y personas adultas que trabajan con
                documentos jurídicos. No está dirigida a menores de 13 años. No
                recopilamos conscientemente información de menores de esa edad.
              </p>
            </section>

            <section id="pp-cambios">
              <h3>§8 — Cambios a esta política</h3>
              <p>
                Si en el futuro se incorporan funciones que impliquen un
                tratamiento distinto de datos personales al aquí descripto —por
                ejemplo, nuevas automatizaciones del sitio o una versión con
                análisis semántico en la nube— ello se documentará con claridad
                en esta página.
              </p>
              <p>
                Cualquier cambio relevante a esta política de privacidad se
                notificará mediante una actualización visible en la Chrome Web
                Store y, de ser posible, mediante un aviso dentro de la
                extensión.
              </p>
              <p style="color: var(--ink-3); font-size: 13px">
                Versión actual de esta política: 1.1 · Fecha: 20 de abril de
                2026.
              </p>
            </section>

            <!-- ======== TERMS OF SERVICE ======== -->
            <section id="terminos">
              <span class="section-label">02 — Términos de uso</span>
              <h2>Condiciones de <em>uso</em>.</h2>
              <p>
                Al instalar y utilizar la extensión <strong>Lenguaje Claro</strong>, el usuario acepta los
                siguientes términos. Si no está de acuerdo con alguno de ellos,
                debe desinstalar la extensión.
              </p>
            </section>

            <section id="tos-uso">
              <h3>§9 — Uso permitido</h3>
              <p>
                La extensión está diseñada para asistir a profesionales y
                estudiantes del derecho en la mejora estilística de textos
                jurídicos en Google Docs, siguiendo principios de lenguaje
                claro. Su uso implica aceptar que:
              </p>
              <ul>
                <li>
                  Las sugerencias son orientativas y no constituyen
                  asesoramiento legal ni lingüístico profesional.
                </li>
                <li>
                  El usuario es el único responsable de las modificaciones que
                  realice en sus documentos.
                </li>
                <li>
                  La extensión no debe utilizarse para ningún propósito ilegal o
                  que viole los términos de servicio de Google.
                </li>
                <li>
                  Queda prohibido el uso de la extensión para recopilar, extraer
                  o procesar masivamente contenido de documentos de terceros sin
                  su consentimiento.
                </li>
              </ul>
            </section>

            <section id="tos-licencia">
              <h3>§10 — Licencia de uso</h3>
              <p>
                El código fuente de la extensión está publicado bajo la <strong>licencia MIT</strong>. Esto significa que cualquier
                persona puede usar, copiar, modificar, fusionar, publicar,
                distribuir, sublicenciar y/o vender copias del software, sujeto
                a las condiciones de dicha licencia.
              </p>
              <p>
                El código fuente completo está disponible en: <a
                  href="https://github.com/libasoles/lenguaje-claro"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/libasoles/lenguaje-claro ↗
                </a>
              </p>
              <p>
                La licencia MIT no incluye garantías de ningún tipo. El software
                se distribuye "tal cual", sin garantía de funcionamiento
                correcto, continuidad del servicio ni adecuación a un propósito
                específico.
              </p>
            </section>

            <section id="tos-disponibilidad">
              <h3>§11 — Disponibilidad y mantenimiento</h3>
              <p>
                La extensión se encuentra actualmente en <strong>beta pública</strong>. Puede contener errores,
                comportamientos inesperados o limitaciones no documentadas. El
                autor se reserva el derecho de:
              </p>
              <ul>
                <li>
                  Modificar, actualizar o discontinuar la extensión en cualquier
                  momento, sin previo aviso.
                </li>
                <li>
                  Cambiar la funcionalidad, las reglas de análisis o la interfaz
                  en futuras versiones.
                </li>
                <li>
                  Retirar la extensión de la Chrome Web Store si así lo
                  considerara necesario.
                </li>
              </ul>
              <p>
                No existe un acuerdo de nivel de servicio (SLA) ni compromiso de
                tiempo de actividad. El uso de la extensión es voluntario y a
                riesgo del usuario.
              </p>
            </section>

            <!-- ======== DISCLAIMER ======== -->
            <section id="responsabilidades">
              <span class="section-label"
                >03 — Exención de responsabilidades</span
              >
              <h2>Limitaciones y <em>advertencias</em>.</h2>
            </section>

            <section id="disc-exactitud">
              <h3>§12 — Exactitud de las sugerencias</h3>
              <p>
                Las sugerencias que genera la extensión se basan en patrones de
                texto predefinidos aplicados localmente. El análisis es
                sintáctico superficial y <strong>no comprende el contexto semántico</strong> de los
                documentos. Por esta razón:
              </p>
              <ul>
                <li>
                  Algunas sugerencias pueden ser incorrectas en contextos
                  específicos (falsos positivos).
                </li>
                <li>
                  La extensión puede no detectar todos los problemas de estilo
                  presentes en un documento (falsos negativos).
                </li>
                <li>
                  Las sugerencias de voz pasiva y de vaguedades requieren
                  revisión manual, ya que la herramienta no puede reconstruir el
                  texto exacto sin conocer el sujeto real de la oración o el
                  dato concreto.
                </li>
                <li>
                  Las sugerencias no constituyen revisión legal, gramatical
                  profesional ni asesoramiento de ningún tipo.
                </li>
              </ul>
              <p>
                El usuario debe revisar cada sugerencia antes de aplicarla. La
                extensión es una herramienta de asistencia, no un corrector
                automático definitivo.
              </p>
            </section>

            <section id="disc-limitacion">
              <h3>§13 — Limitación de responsabilidad</h3>
              <p>
                En la máxima medida permitida por la ley aplicable, el autor y
                desarrollador de la extensión <strong>Lenguaje Claro</strong> (Guillermo Perez) no será responsable por:
              </p>
              <ul>
                <li>
                  Pérdida de datos, documentos o trabajo derivada del uso de la
                  extensión.
                </li>
                <li>
                  Errores introducidos en documentos legales o de cualquier otro
                  tipo como consecuencia de aceptar sugerencias incorrectas.
                </li>
                <li>
                  Consecuencias legales, laborales, académicas o de cualquier
                  índole derivadas del uso de la herramienta.
                </li>
                <li>
                  Interrupciones en el servicio de Google Docs o la Chrome Web
                  Store que afecten el funcionamiento de la extensión.
                </li>
                <li>
                  Incompatibilidades con versiones futuras del navegador Chrome
                  o de Google Docs.
                </li>
              </ul>
              <p>
                El uso de la extensión es voluntario y el usuario asume toda la
                responsabilidad por las decisiones que tome a partir de las
                sugerencias generadas.
              </p>
            </section>

            <section id="disc-google">
              <h3>§14 — Relación con Google</h3>
              <p>
                <strong>Lenguaje Claro</strong> es un proyecto independiente
                desarrollado por Guillermo Perez. No está afiliado, patrocinado
                ni respaldado por Google LLC. "Google Docs", "Google Chrome" y
                "Chrome Web Store" son marcas registradas de Google LLC.
              </p>
              <p>
                El uso de la API de Google Docs por parte de esta extensión está
                sujeto a los <a
                  href="https://developers.google.com/terms"
                  target="_blank"
                  rel="noopener"
                >
                  Términos de Servicio de las APIs de Google ↗
                </a> y a la <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener"
                >
                  Política de Privacidad de Google ↗ </a
                >.
              </p>
              <p>
                Al instalar la extensión y autorizar el acceso OAuth, el usuario
                también acepta las condiciones de uso de las APIs de Google
                aplicables.
              </p>
            </section>

            <!-- ======== CONTACT ======== -->
            <section id="contacto">
              <span class="section-label">04 — Contacto</span>
              <h2>¿Tenés <em>preguntas</em>?</h2>
              <p>
                Para dudas sobre esta política de privacidad, reportes de
                errores, solicitudes relacionadas con tus datos o cualquier
                consulta sobre el funcionamiento de la extensión, podés
                comunicarte a través de LinkedIn. Si buscás una referencia
                rápida para soporte, también podés visitar la <a href="support.html">página de soporte</a>.
              </p>
              <ul>
                <li>
                  <strong>LinkedIn:</strong>
                  <a
                    href="https://www.linkedin.com/in/guillermo-perez-farquharson/"
                    target="_blank"
                    rel="noopener"
                  >
                    linkedin.com/in/guillermo-perez-farquharson ↗
                  </a>
                </li>
              </ul>
              <p>
                Haré lo posible por responder en un plazo razonable, teniendo
                en cuenta que este es un proyecto desarrollado
                y mantenido en mi tiempo libre.
              </p>
            </section>
          </div>
          <!-- /legal-article -->
        </div>
        <!-- /legal-layout -->
      </div>
      <!-- /wrap -->`;
const legalStyles = String.raw`/* ── Legal page ── */
      .legal-hero {
        padding-block: clamp(48px, 8vw, 96px) clamp(24px, 4vw, 48px);
        border-bottom: 1px solid var(--rule);
      }
      .legal-hero .eyebrow {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: 16px;
      }
      .legal-hero h1 {
        font-family: var(--font-serif);
        font-size: clamp(28px, 5vw, 48px);
        font-weight: 400;
        line-height: 1.15;
        margin: 0 0 16px;
        color: var(--ink);
      }
      .legal-hero h1 em {
        font-style: italic;
        color: var(--accent);
      }
      .legal-meta {
        font-size: 13px;
        color: var(--ink-3);
        font-family: var(--font-mono);
      }

      /* ── Two-col layout ── */
      .legal-layout {
        display: grid;
        grid-template-columns: 220px 1fr;
        gap: clamp(32px, 5vw, 72px);
        padding-block: clamp(40px, 6vw, 72px);
        align-items: start;
      }
      @media (max-width: 780px) {
        .legal-layout {
          grid-template-columns: 1fr;
        }
        .legal-sidebar {
          display: none;
        }
      }

      /* ── Sidebar ── */
      .legal-sidebar {
        position: sticky;
        top: 72px;
      }
      .legal-sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .legal-sidebar a {
        display: flex;
        align-items: baseline;
        gap: 10px;
        font-size: 13px;
        color: var(--ink-3);
        text-decoration: none;
        padding: 6px 10px;
        border-radius: var(--radius-sm);
        transition:
          background 0.15s,
          color 0.15s;
      }
      .legal-sidebar a:hover {
        background: var(--bg-sunk);
        color: var(--ink);
      }
      .legal-sidebar .snum {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--accent);
        flex-shrink: 0;
        width: 28px;
      }
      .sidebar-section {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-3);
        padding: 18px 10px 4px;
      }

      /* ── Article prose ── */
      .legal-article {
        max-width: 680px;
      }
      .legal-article section {
        margin-bottom: clamp(40px, 6vw, 64px);
        padding-bottom: clamp(40px, 6vw, 64px);
        border-bottom: 1px solid var(--rule);
      }
      .legal-article section:last-child {
        border-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      .legal-article .section-label {
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
        border-radius: 99px;
        margin-bottom: 16px;
      }
      .legal-article h2 {
        font-family: var(--font-serif);
        font-size: clamp(20px, 3vw, 28px);
        font-weight: 400;
        margin: 0 0 20px;
        color: var(--ink);
      }
      .legal-article h2 em {
        font-style: italic;
        color: var(--accent);
      }
      .legal-article h3 {
        font-size: 15px;
        font-weight: 600;
        margin: 28px 0 8px;
        color: var(--ink);
        letter-spacing: -0.01em;
      }
      .legal-article p {
        margin: 0 0 14px;
        color: var(--ink-2);
        line-height: 1.7;
      }
      .legal-article ul,
      .legal-article ol {
        margin: 0 0 14px;
        padding-left: 20px;
        color: var(--ink-2);
        line-height: 1.7;
      }
      .legal-article li {
        margin-bottom: 6px;
      }
      .legal-article strong {
        color: var(--ink);
        font-weight: 600;
      }
      .legal-article a {
        color: var(--accent);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      code {
        font-family: var(--font-mono);
        font-size: 0.88em;
        background: var(--bg-sunk);
        padding: 2px 6px;
        border-radius: 4px;
      }

      /* ── Permission table ── */
      .perm-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin: 16px 0 24px;
      }
      .perm-table th {
        text-align: left;
        font-size: 11px;
        font-family: var(--font-mono);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ink-3);
        padding: 8px 12px;
        border-bottom: 1px solid var(--rule-strong);
      }
      .perm-table td {
        padding: 10px 12px;
        vertical-align: top;
        border-bottom: 1px solid var(--rule);
        color: var(--ink-2);
      }
      .perm-table td:first-child {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--ink);
        white-space: nowrap;
      }
      .perm-table tr:last-child td {
        border-bottom: 0;
      }

      /* ── Callout box ── */
      .callout {
        background: var(--accent-soft);
        border-left: 3px solid var(--accent);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        padding: 14px 18px;
        margin: 20px 0;
        font-size: 14px;
        color: var(--accent-ink);
        line-height: 1.6;
      }
      .callout strong {
        color: var(--accent-ink);
      }

      /* ── TOC mobile ── */
      .legal-toc-mobile {
        display: none;
        background: var(--bg-elev);
        border: 1px solid var(--rule);
        border-radius: var(--radius);
        padding: 16px;
        margin-bottom: 32px;
        font-size: 13px;
      }
      @media (max-width: 780px) {
        .legal-toc-mobile {
          display: block;
        }
      }
      .legal-toc-mobile summary {
        cursor: pointer;
        font-weight: 600;
        color: var(--ink);
        list-style: none;
        display: flex;
        justify-content: space-between;
      }
      .legal-toc-mobile ol {
        margin: 12px 0 0;
        padding-left: 16px;
        color: var(--ink-2);
      }
      .legal-toc-mobile a {
        color: var(--accent);
        text-decoration: none;
      }`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Política de Privacidad y Términos | Lenguaje Claro para Google Docs",
  url: "https://extensionlenguajeclaro.com.ar/legal.html",
  description:
    "Política de privacidad y términos de Lenguaje Claro. Explica cómo la extensión usa Google OAuth y la API de Google Docs para leer el documento activo y aplicar cambios confirmados por el usuario.",
  inLanguage: "es-AR",
  isPartOf: {
    "@type": "WebSite",
    name: "Lenguaje Claro",
    url: "https://extensionlenguajeclaro.com.ar/",
  },
};

export default function LegalPage() {
  return (
    <Document
      title="Política de Privacidad y Términos | Lenguaje Claro para Google Docs"
      description="Política de privacidad y términos de Lenguaje Claro. Explica cómo la extensión usa Google OAuth y la API de Google Docs para leer el documento activo y aplicar cambios confirmados por el usuario."
      canonical="https://extensionlenguajeclaro.com.ar/legal.html"
      structuredData={structuredData}
      extraHead={<InlineStyle css={legalStyles} />}
    >
      <Header />
      <main dangerouslySetInnerHTML={{ __html: mainHtml }} />
      <Footer />
    </Document>
  );
}
