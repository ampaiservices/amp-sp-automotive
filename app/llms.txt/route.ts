import {
  SITE_NAME,
  SITE_URL,
  PHONE,
  CITY,
  REGION,
  POSTAL_CODE,
  STREET_ADDRESS,
  HOURS_LABEL,
} from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";

// llms.txt — the AI-search entry point (llmstxt.org convention). Built from
// lib/site.ts so the domain and NAP stay in one place.
export const dynamic = "force-static";

export function GET() {
  const address = [STREET_ADDRESS, `${CITY}, ${REGION} ${POSTAL_CODE}`]
    .filter(Boolean)
    .join(", ");

  const body = `# ${SITE_NAME}

> Exotic collision repair in ${CITY}, ${REGION} — Lamborghini, McLaren, Ferrari, Porsche, Audi R8. Owner-operated by Serge. OEM parts only, in-house paint match and ADAS recalibration, insurance handled end-to-end. By appointment, ${HOURS_LABEL}, ${PHONE}.

Address: ${address}

## Services

- [Collision repair](${SITE_URL}/): factory-correct exotic collision repair — frame, panels, paint, ADAS
${BRANDS.map((b) => `- [${b.name} collision repair](${SITE_URL}/${b.slug})`).join("\n")}
- [Body kits](${SITE_URL}/body-kits): aftermarket aero installation and paint match
- [Paint work](${SITE_URL}/paint-work): exotic paint refinish and factory color match

## How it works

- [Photo estimate](${SITE_URL}/estimate): send 3 photos, get a callback
- [FAQ](${SITE_URL}/faq): timeline, OEM parts, insurance, total loss, storage, delivery
- [About Serge](${SITE_URL}/about): the owner-operator behind every repair
- [Contact](${SITE_URL}/contact)

## Guides

- [ADAS recalibration on exotics](${SITE_URL}/explainers/adas)
- [What factory paint match actually means](${SITE_URL}/explainers/paint-match)
- [OEM parts — and why aftermarket fails on exotics](${SITE_URL}/explainers/oem-parts)

## Work

- [Builds](${SITE_URL}/builds): completed repairs and body-kit builds with photos

## Details

- [Full business details](${SITE_URL}/llms-full.txt): service area, complete FAQ, and everything above in long form
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
