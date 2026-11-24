import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, resolve, sep } from "node:path";
import { after, before, test } from "node:test";

const require = createRequire(resolve(process.env.PORTFOLIO_BROWSER_TOOLS ?? ".", "package.json"));
const { chromium } = require("playwright");

const root = resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
};

let server;
let browser;
let origin;

before(async () => {
  server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, "http://127.0.0.1").pathname;
      const file = resolve(root, "." + pathname + (pathname.endsWith("/") ? "index.html" : ""));
      if (!file.startsWith(root + sep)) {
        response.writeHead(404).end();
        return;
      }
      const body = await readFile(file);
      response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" }).end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((done, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", done);
  });
  origin = "http://127.0.0.1:" + server.address().port;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  if (server?.listening) await new Promise(done => server.close(done));
});

async function withPage(task, options = {}) {
  const page = await browser.newPage(options);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    await task(page);
    assert.deepEqual(errors, [], "The page raised unexpected script errors");
  } finally {
    await page.context().close();
  }
}

test("keyboard skips the header and reaches the main content", async () => {
  await withPage(async page => {
    await page.goto(origin + "/");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("href"), "#main");
    await page.keyboard.press("Enter");
    await page.waitForURL("**/#main");
    assert.equal(await page.locator(":focus").getAttribute("id"), "main");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("href"), "#projects");
  });
});

test("theme switches by keyboard and persists across both languages and reloads", async () => {
  await withPage(async page => {
    await page.goto(origin + "/");
    const initialBackground = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor);
    const spanishTheme = page.getByRole("button", { name: "Tema claro" });
    await spanishTheme.press("Space");
    await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
    assert.equal(await spanishTheme.getAttribute("aria-pressed"), "true");
    const lightBackground = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor);
    assert.notEqual(lightBackground, initialBackground);

    await page.getByRole("link", { name: "English" }).click();
    await page.waitForURL("**/en/");
    await page.reload();
    await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    const englishTheme = page.getByRole("button", { name: "Light theme" });
    await page.waitForFunction(() => document.querySelector(".theme-button")?.getAttribute("aria-pressed") === "true");
    await englishTheme.press("Space");
    await page.waitForFunction(() => document.documentElement.dataset.theme === "dark");

    await page.getByRole("link", { name: "Español" }).click();
    await page.waitForURL(origin + "/");
    assert.equal(await page.locator("html").getAttribute("lang"), "es");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  });
});

test("both CV links download valid PDF files", async () => {
  await withPage(async page => {
    for (const [route, label, locale] of [["/", "Descargar CV", "es"], ["/en/", "Download résumé", "en"]]) {
      await page.goto(origin + route);
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("link", { name: label }).click(),
      ]);
      assert.equal(download.suggestedFilename(), "luciano-lattante-" + locale + ".pdf");
      const content = await readFile(await download.path());
      assert.equal(content.subarray(0, 5).toString(), "%PDF-");
      assert.ok(content.length > 1500);
    }
  });
});

test("both languages fit a mobile viewport and respect reduced motion", async () => {
  await withPage(async page => {
    for (const route of ["/", "/en/"]) {
      await page.goto(origin + route, { waitUntil: "load" });
      assert.equal(await page.locator("html").evaluate(node => getComputedStyle(node).scrollBehavior), "auto");
      assert.ok(await page.locator("html").evaluate(node => node.scrollWidth <= node.clientWidth));
    }
  }, { viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
});
