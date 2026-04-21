/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href="index.html" aria-label="Lenguaje Claro">
              <span className="brand-mark" aria-hidden="true">
                <img src="assets/logo.svg" alt="" />
              </span>
              <span className="brand-name">
                Lenguaje <em>Claro</em>
              </span>
            </a>
            <p className="brand-desc">
              Extensión de Chrome para mejorar la escritura jurídica en Google Docs.
              De código abierto.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href="https://chromewebstore.google.com/detail/lenguaje-claro/hfjnpkphlmalfdboapcidakmdkbbelja"
                target="_blank"
                rel="noopener"
                style={{ color: "white" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Chrome Web Store
              </a>
            </div>
          </div>
          <div>
            <h5>Producto</h5>
            <ul>
              <li>
                <a href="index.html#features">Reglas</a>
              </li>
              <li>
                <a href="index.html#comparacion">Comparación</a>
              </li>
              <li>
                <a href="index.html#privacidad">Privacidad</a>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/lenguaje-claro/hfjnpkphlmalfdboapcidakmdkbbelja"
                  target="_blank"
                >
                  Descargar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Recursos</h5>
            <ul>
              <li>
                <a href="support.html">Soporte</a>
              </li>
              <li>
                <a
                  href="http://lenguajeclaroargentina.gob.ar/"
                  target="_blank"
                  rel="noopener"
                >
                  Red Argentina de Lenguaje Claro ↗
                </a>
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
              <li>
                <a
                  href="https://www.linkedin.com/in/guillermo-perez-farquharson/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn del autor ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li>
                <a href="legal.html">Política de privacidad</a>
              </li>
              <li>
                <a href="legal.html#terminos">Términos de uso</a>
              </li>
              <li>
                <a href="legal.html#responsabilidades">Exención de responsabilidades</a>
              </li>
              <li>
                <a
                  href="https://es.wikipedia.org/wiki/Licencia_MIT"
                  target="_blank"
                  rel="noopener"
                >
                  Licencia MIT ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Guillermo Perez · Desarrollador de Software</span>
          <span>
            Hecho con <span style={{ color: "var(--accent)" }}>♥</span> en Buenos
            Aires
          </span>
        </div>
      </div>
    </footer>
  );
}
