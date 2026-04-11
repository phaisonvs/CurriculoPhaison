import { createServer } from "node:http";
import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const buildDir = path.join(projectRoot, "build");
const publicDir = path.join(projectRoot, "public");
const outputPdfPath = path.join(publicDir, "curriculo-phaison.pdf");
const buildPdfPath = path.join(buildDir, "curriculo-phaison.pdf");
const githubPagesBasePath = "/CurriculoPhaison/";

const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
]);

function getContentType(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

function safeResolve(requestPath) {
  const normalized = path.normalize(decodeURIComponent(requestPath)).replace(/^([/\\])+/, "");
  const resolved = path.resolve(buildDir, normalized);

  if (resolved !== buildDir && !resolved.startsWith(`${buildDir}${path.sep}`)) {
    return null;
  }

  return resolved;
}

function stripGitHubPagesBasePath(requestPath) {
  if (requestPath === githubPagesBasePath || requestPath === githubPagesBasePath.slice(0, -1)) {
    return "/";
  }

  if (requestPath.startsWith(githubPagesBasePath)) {
    return `/${requestPath.slice(githubPagesBasePath.length)}`;
  }

  return requestPath;
}

async function resolveFilePath(requestPath) {
  const resolved = safeResolve(requestPath);

  if (!resolved) {
    return null;
  }

  try {
    const fileStats = await stat(resolved);

    if (fileStats.isDirectory()) {
      return path.join(resolved, "index.html");
    }

    return resolved;
  } catch {
    return null;
  }
}

async function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const requestPath = stripGitHubPagesBasePath(url.pathname === "/" ? "/index.html" : url.pathname);
      const filePath = (await resolveFilePath(requestPath)) ?? path.join(buildDir, "index.html");
      const body = await readFile(filePath);

      res.writeHead(200, {
        "Content-Type": getContentType(filePath),
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error instanceof Error ? error.message : "Failed to serve resume build");
    }
  });

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Failed to start local PDF server");
  }

  return { server, port: address.port };
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const buildIndexPath = path.join(buildDir, "index.html");
  const buildExists = await stat(buildIndexPath).then(() => true).catch(() => false);

  if (!buildExists) {
    throw new Error("Build output not found. Run `npm run build` before generating the PDF.");
  }

  const { server, port } = await startStaticServer();
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 1800 },
    });

    await page.emulateMedia({ media: "print" });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    await page.waitForSelector('[data-ui="resume-sheet"]');
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.pdf({
      path: outputPdfPath,
      format: "A4",
      margin: { top: "5mm", right: "0", bottom: "5mm", left: "0" },
      preferCSSPageSize: true,
      printBackground: true,
    });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  await copyFile(outputPdfPath, buildPdfPath);
  console.log(`Generated PDF: ${outputPdfPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
