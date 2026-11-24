import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

for (const [route, language] of [["index.html", "es"], ["en/index.html", "en"]]) {
  const html = readFileSync(`out/${route}`, "utf8");
  assert.match(html, new RegExp(`<html lang="${language}"`));
  assert.match(html, /CommerceFlow/);
  assert.match(html, /LedgerCore/);
  assert.match(html, /KnowledgeAI/);
  for (const section of ["main", "projects", "experience", "contact"]) {
    assert.match(html, new RegExp(`id="${section}"`));
  }
  assert.match(html, new RegExp(`/cv/luciano-lattante-${language}.pdf`));
  assert.ok(statSync(`out/cv/luciano-lattante-${language}.pdf`).size > 1500);
  assert.ok(readFileSync(`out/cv/luciano-lattante-${language}.pdf`).subarray(0, 5).toString() === "%PDF-");
}
console.log("Both locale routes, section targets, project evidence, and résumé files exported.");
