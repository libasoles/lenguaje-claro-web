/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { useEffect } from "preact/hooks";

const DEFAULT_OG_IMAGE =
  "https://extensionlenguajeclaro.com.ar/assets/og-image.png";
const DEFAULT_OG_IMAGE_ALT =
  "Vista previa de Lenguaje Claro, una extensión de Chrome para mejorar la escritura jurídica en Google Docs.";

export function InlineScript({ code, type }) {
  const props = type ? { type } : {};

  return <script {...props} dangerouslySetInnerHTML={{ __html: code }} />;
}

export function InlineStyle({ css }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Document({
  title,
  description,
  canonical,
  keywords,
  author,
  ogTitle = title,
  ogDescription = description,
  ogUrl = canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  structuredData,
  extraHead,
  children,
  afterBody,
}) {
  return (
    <html lang="es-AR" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        {author ? <meta name="author" content={author} /> : null}
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lenguaje Claro" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:locale" content="es_AR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />

        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <link rel="icon" type="image/svg+xml" href="assets/logo.svg" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W4QVKY0PQE"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
           window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-W4QVKY0PQE");
        `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
      const stored = localStorage.getItem("theme");
      document.documentElement.dataset.theme = stored || "light";
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }

    // Toggle tema
    window.addEventListener("DOMContentLoaded", function () {
      const root = document.documentElement;
      const toggle = document.getElementById("theme-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", function () {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch (error) {}
      });
    });
        `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Toggle menú hamburguesa
    window.addEventListener("DOMContentLoaded", function () {
      const btn = document.querySelector(".nav-hamburger");
      const links = document.querySelector(".nav-links");
      if (!btn || !links) return;

      btn.addEventListener("click", function () {
        const isOpen = links.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      links.addEventListener("click", function (e) {
        const target = e.target;
        if (target && target.tagName === "A") {
          links.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });
        `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        // Install button clicks
           document
             .querySelectorAll('a[href="#descargar"], a.nav-cta')
             .forEach(function (el) {
               el.addEventListener("click", function () {
                 trackEvent("launch_cta_click", {
                   event_label: el.textContent.trim(),
                 });
               });
             });
        `,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Geist:wght@300;400;500;600&family=Fraunces:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="styles.css" />

        {structuredData ? <JsonLd data={structuredData} /> : null}
        {extraHead}
      </head>

      <body data-accent="terracotta" data-type="geist">
        {children}
        {afterBody}
      </body>
    </html>
  );
}
