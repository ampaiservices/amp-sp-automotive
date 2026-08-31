import { SITE_URL } from "@/lib/site";

// Stable @id anchors for the site-wide JSON-LD graph. Per-page nodes
// reference these instead of re-declaring the business/site inline.
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// JSON.stringify does not sanitize for XSS in a <script> context — a
// literal "</script>" inside data would break out of the tag. Escaping
// "<" as its unicode escape is the documented Next.js JSON-LD guidance.
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// WebPage node with SpeakableSpecification — tells voice assistants and AI
// answer engines which passages to read aloud / extract. Pages tag their h1
// with .speakable-title and their lead paragraph with .speakable-summary.
export function speakablePage(path: string, name: string) {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-title", ".speakable-summary"],
    },
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
