/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";

export default function Header() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="index.html" aria-label="Lenguaje Claro — inicio">
          <span className="brand-mark" aria-hidden="true">
            <img src="assets/logo.svg" alt="" />
          </span>
          <span className="brand-name">
            Lenguaje <em>Claro</em>
          </span>
        </a>
        <div className="nav-links">
          <a href="index.html#features">Reglas</a>
          <a href="index.html#comparacion" className="nav-link-hide-sm">
            Comparación
          </a>
          <a href="index.html#privacidad">Privacidad</a>
          <span className="sep nav-link-hide-sm"></span>
          <button
            className="theme-toggle"
            id="theme-toggle"
            aria-label="Cambiar tema"
            title="Cambiar tema claro/oscuro"
          >
            <svg
              className="icon-sun"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg
              className="icon-moon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <a
            className="nav-cta"
            href="https://chromewebstore.google.com/detail/lenguaje-claro/hfjnpkphlmalfdboapcidakmdkbbelja"
            target="_blank"
            rel="noopener"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
            </svg>
            Instalar
          </a>
        </div>
      </div>
    </nav>
  );
}
