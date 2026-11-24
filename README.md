# Luciano Lattante portfolio

A bilingual backend engineering portfolio built with Next.js, TypeScript and Tailwind. It separates professional experience, personal projects and collaborative work. Project links point to public repositories, architecture notes and completed GitHub Actions runs.

## Run locally

Use Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open the local development URL printed by Next.js. Spanish is at `/` and English at `/en/`. The theme control remembers the selection in the current browser. The résumé PDFs are generated from the same career data as the website and include professional contact links.

## Verify and build

```bash
npm run typecheck
npm run build
node scripts/verify-export.mjs
```

The static export is in `out/`. It contains both locales and the generated PDFs and requires no runtime secrets or APIs. Update project evidence links when the verification baseline changes. The GitHub Pages build includes canonical URLs and a sitemap for the public domain.

The browser checks run against the static export and cover keyboard navigation, language changes, theme persistence, résumé downloads and the mobile reduced-motion layout. To run them after the build:

```bash
npm install --no-save --package-lock=false playwright@1.58.2
npx playwright install --only-shell chromium
node --test scripts/verify-browser.mjs
```

## GitHub Pages build

Run `npm ci` and `npm run build:pages` on Node.js 22 or later. The build verifies the export under `/portfolio-web/` and adds `.nojekyll` so Pages serves the Next.js assets. CI uploads the checked artifact and runs browser checks under that base path. Set `PORTFOLIO_TEST_BASE_PATH=/portfolio-web` when running the browser suite against the Pages build.

The workflow only builds and verifies. To release an approved version, publish the verified contents of `out/`, including `.nojekyll`, to the root of the existing `gh-pages` branch. No source edits or output path rewrites are required. The live site is https://lucianolattante.github.io/portfolio-web/.
