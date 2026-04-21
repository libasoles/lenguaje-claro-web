import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const htmlOutputPath = path.join(publicDir, "waitlist-email-preview.html");
const textOutputPath = path.join(publicDir, "waitlist-email-preview.txt");
const emailModulePath = path.join(
  repoRoot,
  "netlify/functions/_lib/waitlist-email.mjs",
);
const emailTemplatePath = path.join(
  repoRoot,
  "netlify/functions/_lib/templates/waitlist-thanks.html",
);
const isWatchMode = process.argv.includes("--watch");

async function loadEmailModule() {
  const moduleUrl = new URL(
    `../netlify/functions/_lib/waitlist-email.mjs?ts=${Date.now()}`,
    import.meta.url,
  );

  return import(moduleUrl.href);
}

async function generatePreview() {
  const { buildWaitlistThanksEmail } = await loadEmailModule();
  const { html, text, subject } = buildWaitlistThanksEmail();

  await mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeFile(htmlOutputPath, html, "utf8"),
    writeFile(textOutputPath, text, "utf8"),
  ]);

  console.log(
    `[preview:email] generated "${path.relative(repoRoot, htmlOutputPath)}" and "${path.relative(repoRoot, textOutputPath)}" for "${subject}"`,
  );
}

async function readSnapshot() {
  const files = [emailModulePath, emailTemplatePath];
  const parts = await Promise.all(
    files.map(async (file) => {
      const info = await stat(file);
      return `${path.relative(repoRoot, file)}:${info.size}:${info.mtimeMs}`;
    }),
  );

  return parts.join("|");
}

async function main() {
  await generatePreview();

  if (!isWatchMode) {
    return;
  }

  const pollIntervalMs = 300;
  let previousSnapshot = await readSnapshot();
  let checking = false;

  const interval = setInterval(async () => {
    if (checking) return;
    checking = true;

    try {
      const nextSnapshot = await readSnapshot();

      if (nextSnapshot !== previousSnapshot) {
        previousSnapshot = nextSnapshot;
        await generatePreview();
      }
    } catch (error) {
      console.error(`[preview:email] ${error.message}`);
    } finally {
      checking = false;
    }
  }, pollIntervalMs);

  console.log(
    `[preview:email] watching netlify/functions/_lib (${pollIntervalMs}ms polling)`,
  );

  const stopWatching = () => {
    clearInterval(interval);
    process.exit(0);
  };

  process.on("SIGINT", stopWatching);
  process.on("SIGTERM", stopWatching);
}

main().catch((error) => {
  console.error(`[preview:email] ${error.message}`);
  process.exitCode = 1;
});
