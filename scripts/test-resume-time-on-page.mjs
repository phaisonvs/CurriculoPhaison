import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const buildDir = path.join(projectRoot, "build");
const githubPagesBasePath = "/CurriculoPhaison/";

const expectedTimeEvents = [
  "resume_time_on_page_30s",
  "resume_time_on_page_60s",
  "resume_time_on_page_120s",
  "resume_time_on_page_300s",
  "resume_time_on_page_600s",
];

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
    throw new Error("Failed to start local analytics test server");
  }

  return { server, port: address.port };
}

async function getResumeEvents(page) {
  return page.evaluate(() => {
    const dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    return dataLayer.filter((entry) => {
      if (!entry || typeof entry !== "object") {
        return false;
      }

      return "event" in entry && "event_name" in entry;
    });
  });
}

function getEventCount(events, eventName) {
  return events.filter((event) => event.event_name === eventName).length;
}

function assertMinimalTimePayload(events, eventName) {
  const event = events.find((entry) => entry.event_name === eventName);

  assert.ok(event, `Expected ${eventName} to exist in the dataLayer`);
  assert.deepEqual(
    Object.keys(event).sort(),
    ["event", "event_name", "page_type"],
    `${eventName} should keep the minimal payload shape`,
  );
}

async function main() {
  const buildIndexPath = path.join(buildDir, "index.html");
  const buildExists = await stat(buildIndexPath).then(() => true).catch(() => false);

  if (!buildExists) {
    throw new Error("Build output not found. Run `npx vite build` before running the analytics test.");
  }

  const { server, port } = await startStaticServer();
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.route("https://www.googletagmanager.com/*", (route) =>
      route.fulfill({ status: 204, body: "" }),
    );
    await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
    await page.goto(`http://127.0.0.1:${port}${githubPagesBasePath}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector('[data-ui="resume-sheet"]');
    const transport = await page.evaluate(() => window.__resumeAnalyticsTransport);
    assert.equal(transport, "gtm", "Expected the analytics transport to initialize with GTM");

    let events = await getResumeEvents(page);

    expectedTimeEvents.forEach((eventName) => {
      assert.equal(getEventCount(events, eventName), 0, `${eventName} should not fire before its threshold`);
    });

    await page.clock.runFor("00:30");
    events = await getResumeEvents(page);
    assert.equal(getEventCount(events, "resume_time_on_page_30s"), 1, "30s event should fire once");
    assertMinimalTimePayload(events, "resume_time_on_page_30s");

    await page.clock.runFor("00:30");
    events = await getResumeEvents(page);
    assert.equal(getEventCount(events, "resume_time_on_page_30s"), 1, "30s event should not duplicate");
    assert.equal(getEventCount(events, "resume_time_on_page_60s"), 1, "60s event should fire once");
    assertMinimalTimePayload(events, "resume_time_on_page_60s");

    await page.clock.runFor("01:00");
    events = await getResumeEvents(page);
    assert.equal(getEventCount(events, "resume_time_on_page_120s"), 1, "120s event should fire once");
    assertMinimalTimePayload(events, "resume_time_on_page_120s");

    await page.clock.runFor("03:00");
    events = await getResumeEvents(page);
    assert.equal(getEventCount(events, "resume_time_on_page_300s"), 1, "300s event should fire once");
    assertMinimalTimePayload(events, "resume_time_on_page_300s");

    await page.clock.runFor("05:00");
    events = await getResumeEvents(page);
    assert.equal(getEventCount(events, "resume_time_on_page_600s"), 1, "600s event should fire once");
    assertMinimalTimePayload(events, "resume_time_on_page_600s");

    await page.clock.runFor("00:10");
    events = await getResumeEvents(page);

    expectedTimeEvents.forEach((eventName) => {
      assert.equal(getEventCount(events, eventName), 1, `${eventName} should only fire once per visit`);
    });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
