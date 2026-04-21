/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { InlineScript } from "./Document.jsx";

const sharedScripts = String.raw`
(function () {
  const root = document.documentElement;
  let theme = root.dataset.theme || "light";

  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    theme = stored || theme || (prefersDark ? "dark" : "light");
  } catch (error) {
    theme = root.dataset.theme || "light";
  }

  root.dataset.theme = theme;

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Ignore storage errors and keep the current in-memory theme.
    }
  });
})();
`.trim();

export default function SharedScripts() {
  return <InlineScript code={sharedScripts} />;
}
