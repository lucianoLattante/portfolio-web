import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";

const base = process.env.PORTFOLIO_TEST_BASE_PATH ?? "";
const publicOrigin = "https://lucianolattante.github.io";
const root = resolve("out");

for (const [route, language, url] of [["index.html", "es", "/"], ["en/index.html", "en", "/en/"]]) {
  const html = readFileSync(resolve(root, route), "utf8");
  assert.ok(html.includes('<html lang="' + language + '"'));
  for (const project of ["CommerceFlow", "LedgerCore", "KnowledgeAI"]) assert.ok(html.includes(project));
  for (const section of ["main", "projects", "experience", "contact"]) {
    assert.ok(html.includes('id="' + section + '"'));
  }
  for (const localePath of ["/", "/en/"]) {
    assert.ok(html.includes('href="' + base + localePath + '"'));
  }
  assert.ok(html.includes('href="' + base + "/cv/luciano-lattante-" + language + '.pdf"'));
  for (const [, reference] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    assert.ok(reference.startsWith(base + "/"), reference);
    const pathname = new URL(reference, publicOrigin).pathname.slice(base.length);
    const target = resolve(root, "." + pathname + (pathname.endsWith("/") ? "index.html" : ""));
    assert.ok(target.startsWith(root + sep) && statSync(target).isFile(), reference);
  }
  const pdf = readFileSync(resolve(root, "cv/luciano-lattante-" + language + ".pdf"), "latin1");
  assert.ok(pdf.startsWith("%PDF-") && pdf.length > 1500);
  for (const fact of ["JUnit", "Mockito", "Alkemy", "Egg Education", "EF SET", "CommerceFlow", "LedgerCore", "KnowledgeAI"]) {
    assert.ok(pdf.includes(fact), fact);
  }
  assert.ok(pdf.includes("/Subtype /Link"));
  if (base) assert.ok(html.includes('rel="canonical" href="' + publicOrigin + base + url + '"'));
}

const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
assert.ok(sitemap.includes("<loc>" + publicOrigin + base + "/</loc>"));
assert.ok(sitemap.includes("<loc>" + publicOrigin + base + "/en/</loc>"));
if (base) assert.ok(statSync(resolve(root, ".nojekyll")).isFile());
console.log("Verified locale navigation, local resources, canonical URLs, sitemap and both CVs.");
