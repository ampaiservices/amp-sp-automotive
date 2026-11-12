import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";
import { BUILDS } from "@/components/builds/builds-data";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until real per-page revision dates are maintained.
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    ...BRANDS.map((b) => ({
      url: `${SITE_URL}/${b.slug}`,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/builds`, priority: 0.9 },
    ...BUILDS.map((b) => ({
      url: `${SITE_URL}/builds/${b.slug}`,
      priority: 0.85,
    })),
    { url: `${SITE_URL}/body-kits`, priority: 0.85 },
    { url: `${SITE_URL}/paint-work`, priority: 0.85 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.8 },
    { url: `${SITE_URL}/estimate`, priority: 0.8 },
    { url: `${SITE_URL}/faq`, priority: 0.7 },
    { url: `${SITE_URL}/explainers/adas`, priority: 0.6 },
    { url: `${SITE_URL}/explainers/paint-match`, priority: 0.6 },
    { url: `${SITE_URL}/explainers/oem-parts`, priority: 0.6 },
  ];
}
