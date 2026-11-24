export const siteOrigin = "https://lucianolattante.github.io";
export const basePath = process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? "";

export function localePath(locale: "es" | "en") {
  return basePath + (locale === "es" ? "/" : "/en/");
}

export function resumePath(locale: "es" | "en") {
  return basePath + "/cv/luciano-lattante-" + locale + ".pdf";
}
