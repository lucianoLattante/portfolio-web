import type { Metadata } from "next";
import type { ReactNode } from "react";
import career from "../content/career.json";

export type Locale = "es" | "en";

export function localeMetadata(locale: Locale): Metadata {
  const copy = career[locale];
  return {
    title: `${career.name} · ${copy.role}`,
    description: copy.intro,
    alternates: { languages: { es: "/", en: "/en/", "x-default": "/" } },
  };
}

// Apply the saved theme before paint so the header and page use the same palette.
const bootTheme = `try {
  var t = localStorage.getItem('portfolio-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (_) {}`;

export function Layout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: bootTheme }} /></head>
      <body>{children}</body>
    </html>
  );
}
