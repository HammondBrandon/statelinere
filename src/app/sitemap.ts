import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/properties", "/buy", "/sell", "/property-management", "/about", "/contact", "/journal", "/privacy-policy", "/accessibility"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
