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

The static export is in `out/`. It contains both locales and the generated PDFs. A static host can serve this output without runtime secrets or APIs. Update the project evidence links when the verification baseline changes. Canonical site URLs can be configured once a public production domain is selected.
