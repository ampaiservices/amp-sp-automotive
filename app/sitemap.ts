import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";
import { BUILDS } from "@/components/builds/builds-data";

// Fixed literal, bumped when content meaningfully changes. `new Date()` here
// would stamp every URL with the build time, which destroys lastmod as a
// crawl signal.
const LAST_MODIFIED = new Date("2026-08-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_MODIFIED;
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...BRANDS.map((b) => ({
      url: `${SITE_URL}/${b.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/builds`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...BUILDS.map((b) => ({
      url: `${SITE_URL}/builds/${b.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { url: `${SITE_URL}/body-kits`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/paint-work`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/estimate`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/explainers/adas`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/explainers/paint-match`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/explainers/oem-parts`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
