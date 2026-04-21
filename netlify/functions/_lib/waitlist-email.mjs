import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const WAITLIST_TEMPLATE_KEY = "waitlist_thanks";
export const SITE_URL = "https://extensionlenguajeclaro.com.ar/";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/guillermo-perez-farquharson/";

function getModuleDir() {
  if (typeof __dirname === "string") {
    return __dirname;
  }

  const metaUrl =
    typeof import.meta !== "undefined" &&
    import.meta &&
    typeof import.meta.url === "string"
      ? import.meta.url
      : null;

  return metaUrl ? path.dirname(fileURLToPath(metaUrl)) : null;
}

function resolveTemplatePath() {
  const roots = [getModuleDir(), process.cwd()].filter(Boolean);
  const candidates = [
    ["templates", "waitlist-thanks.html"],
    ["_lib", "templates", "waitlist-thanks.html"],
    ["netlify", "functions", "_lib", "templates", "waitlist-thanks.html"],
  ];

  for (const root of roots) {
    for (const segments of candidates) {
      const candidatePath = path.resolve(root, ...segments);

      if (existsSync(candidatePath)) {
        return candidatePath;
      }
    }
  }

  throw new Error("Waitlist email template not found");
}

const TEMPLATE_PATH = resolveTemplatePath();
const WAITLIST_EMAIL_TEMPLATE = readFileSync(TEMPLATE_PATH, "utf8");

function renderTemplate(template, vars) {
  return template.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (match, key) => {
    if (!(key in vars)) {
      throw new Error(`Missing email template variable: ${key}`);
    }

    return vars[key];
  });
}

function decodeHtmlEntities(value) {
  return String(value)
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "");
}

function deriveSubjectFromHtml(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);

  if (!match) {
    throw new Error("Email template is missing a <title> tag");
  }

  return decodeHtmlEntities(match[1].trim());
}

function deriveTextFromHtml(html) {
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  content = content.replace(
    /<([a-z0-9:-]+)\b[^>]*data-plain-ignore="true"[^>]*>[\s\S]*?<\/\1>/gi,
    "",
  );

  content = content.replace(
    /<a\b[\s\S]*?href=(["'])(.*?)\1[\s\S]*?>([\s\S]*?)<\/a>/gi,
    (match, quote, href, inner) => {
      const anchorText = decodeHtmlEntities(stripTags(inner)).trim();
      const decodedHref = decodeHtmlEntities(href);

      if (decodedHref.startsWith("mailto:")) {
        return anchorText;
      }

      return anchorText === decodedHref
        ? anchorText
        : `${anchorText} (${decodedHref})`;
    },
  );

  content = content.replace(/<br\s*\/?>/gi, "\n");
  content = content.replace(/<li\b[^>]*>/gi, "- ");
  content = content.replace(
    /<\/(p|div|section|article|header|footer|tr|table|h1|h2|h3|h4|h5|ul|ol|li|td)>/gi,
    "\n",
  );
  content = stripTags(content);
  content = decodeHtmlEntities(content);
  content = content.replace(/\r/g, "");
  content = content.replace(/[ \t]+\n/g, "\n");
  content = content.replace(/\n[ \t]+/g, "\n");
  content = content.replace(/\n{3,}/g, "\n\n");

  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paragraphs.join("\n\n").trim();
}

export function buildWaitlistThanksEmail() {
  const html = renderTemplate(WAITLIST_EMAIL_TEMPLATE, {
    LINKEDIN_URL,
    SITE_URL,
  });

  return {
    subject: deriveSubjectFromHtml(html),
    text: deriveTextFromHtml(html),
    html,
  };
}

export const WAITLIST_EMAIL_SUBJECT = deriveSubjectFromHtml(
  renderTemplate(WAITLIST_EMAIL_TEMPLATE, {
    LINKEDIN_URL,
    SITE_URL,
  }),
);
