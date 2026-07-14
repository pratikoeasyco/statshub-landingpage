import type { MetadataRoute } from "next";

/* Necessário para a exportação estática (npm run build:static). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://statshub.com.br/sitemap.xml",
  };
}
