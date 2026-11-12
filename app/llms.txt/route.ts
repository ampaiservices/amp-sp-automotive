import { BRANDS } from "@/components/brand/brands-data";
import { SITE_NAME, SITE_URL, PHONE, CITY, REGION, HOURS_LABEL, BY_APPOINTMENT } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const link = (title: string, path: string) => `- [${title}](${SITE_URL}${path})`;
  const text = [
    `# ${SITE_NAME}`,
    "",
    `> Automotive collision repair in ${CITY}, ${REGION}.`,
    "",
    `Phone: ${PHONE}. Call or text photos of vehicle damage to discuss the repair.`,
    `Hours: ${HOURS_LABEL}.${BY_APPOINTMENT ? " Visits by appointment only; contact the shop to arrange a visit." : ""}`,
    "Location is published at city level. Contact the shop for directions; no street address or precise coordinates are provided here.",
    "",
    "## Business and inquiries",
    link("Home", "/"),
    link("About the shop", "/about"),
    link("Contact", "/contact"),
    link("Request an estimate", "/estimate"),
    link("Published questions and answers", "/faq"),
    "",
    "## Services",
    ...BRANDS.map((brand) => link(`${brand.name} collision repair in Sarasota`, `/${brand.slug}`)),
    link("Paint work", "/paint-work"),
    link("Body kits", "/body-kits"),
    "",
    "## Repair explainers",
    link("ADAS", "/explainers/adas"),
    link("Paint matching", "/explainers/paint-match"),
    link("OEM parts", "/explainers/oem-parts"),
    "",
    "## Discovery",
    link("Sitemap", "/sitemap.xml"),
    "",
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
