import type { MetadataRoute } from "next";
import { localePath, siteOrigin } from "../content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["es", "en"] as const).map(locale => ({
    url: new URL(localePath(locale), siteOrigin).href,
  }));
}
