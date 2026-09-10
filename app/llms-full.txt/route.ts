import {
  SITE_NAME,
  SITE_URL,
  PHONE,
  CITY,
  REGION,
  POSTAL_CODE,
  STREET_ADDRESS,
  HOURS_LABEL,
  SERVICE_AREAS,
  INSTAGRAM_URL,
} from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";
import { PUBLISHED_FAQS } from "@/lib/faq-data";

// Long-form companion to /llms.txt — full business details for AI ingestion.
export const dynamic = "force-static";

export function GET() {
  const address = [STREET_ADDRESS, `${CITY}, ${REGION} ${POSTAL_CODE}`]
    .filter(Boolean)
    .join(", ");
  const profiles = [INSTAGRAM_URL && `- Instagram: ${INSTAGRAM_URL}`]
    .filter(Boolean)
    .join("\n");

  const body = `# ${SITE_NAME}: Full Business Details

## Contact and location

- Address: ${address}
- Phone: ${PHONE} (call or text)
- Hours: ${HOURS_LABEL}, by appointment only
- Website: ${SITE_URL}

## What we do

${SITE_NAME} is an owner-operated exotic collision repair shop in ${CITY}, ${REGION}. Every repair is performed personally by Serge, the owner — no subcontractors. The shop specializes in:

1. Collision repair for ${BRANDS.map((b) => b.name).join(", ")} — frame, aluminum, carbon fiber, and steel construction. OEM parts only.
2. Factory paint match — paint mixed in-house from the manufacturer's color code, verified on test panels under shop and natural light, measured against factory data with a dry-film thickness gauge. Tri-coat finishes get layer-by-layer verification.
3. ADAS recalibration in-house — adaptive cruise, blind-spot, lane-keep, automatic emergency braking, and surround-view cameras recalibrated on manufacturer-grade equipment before the car leaves.
4. Body kit installation — aftermarket aero fitted and paint matched to factory finish.
5. Insurance handling — full damage documentation, supplement writing, and direct negotiation with every major carrier. Not a direct-repair-program shop.
6. Indoor storage — cars stay inside behind a locked roll-up for the duration of the repair.

Repairs typically run three to eight weeks once parts are in hand. Lifetime warranty on workmanship and refinishing for as long as the owner keeps the car.

## Service area

${CITY} and within an hour's drive: ${SERVICE_AREAS.join(", ")} (${REGION}). Mobile photo estimates inside that radius; transport can be arranged from farther out.

## Frequently asked questions

${PUBLISHED_FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}
${profiles ? `\n## Profiles\n\n${profiles}\n` : ""}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
