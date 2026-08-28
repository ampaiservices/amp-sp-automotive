import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Robots-protocol note: a crawler that matches a named group ignores the
// "*" group entirely, so the disallows must be repeated in both rules.
const DISALLOW = ["/api/", "/type-ramp"];

// Explicit allow for AI-search crawlers (GEO). These would already match
// "*", but naming them is a deliberate signal that AI ingestion is wanted —
// and keeps them unaffected if "*" ever tightens.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
      { userAgent: "*", allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
