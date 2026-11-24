import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const basePath = "/portfolio-web";
const env = {
  ...process.env,
  NEXT_PUBLIC_PORTFOLIO_BASE_PATH: basePath,
  PORTFOLIO_TEST_BASE_PATH: basePath,
};

const runner = (entry, ...args) => execFileSync(process.execPath, [entry, ...args], {
  env,
  stdio: "inherit",
});
runner("scripts/generate-cv.mjs");
runner(require.resolve("next/dist/bin/next"), "build");
writeFileSync("out/.nojekyll", "");
runner("scripts/verify-export.mjs");
