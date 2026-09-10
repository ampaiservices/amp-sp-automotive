import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, PHONE, CITY, REGION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms for using the ${SITE_NAME} website.`,
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <section className="bg-ink px-6 md:px-10 pt-40 pb-24">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 display-lg text-bone">Terms of use.</h1>
        <p className="annotation text-graphite mt-5">Last updated: August 31, 2026</p>

        <div className="editorial mt-10 max-w-[65ch] space-y-7 text-bone/85">
          <p>
            This website belongs to {SITE_NAME}, a collision repair shop in {CITY}, {REGION}.
            By using it you agree to the terms below.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            Estimates are not quotes
          </h2>
          <p>
            Photo estimates and anything discussed by phone or text are preliminary. The real
            scope of collision damage is only known after disassembly and inspection. A written
            estimate provided after inspection is what governs the work, and even that can
            change if hidden damage is found — we document and tell you before proceeding.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            Site content
          </h2>
          <p>
            The photos, text, and design on this site are ours. Build photos show real work on
            real cars; do not reuse them commercially without asking. Vehicle manufacturer
            names (Lamborghini, McLaren, Ferrari, Porsche, Audi) are trademarks of their
            respective owners — we are an independent repair shop and are not affiliated with,
            endorsed by, or certified by any of them unless expressly stated.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            No warranties on the website
          </h2>
          <p>
            We work to keep the information here accurate, but the site is provided as-is.
            Repair timelines, processes, and insurance outcomes described on this site are
            general information, not a promise about your specific car or claim. The warranty
            that matters is the written workmanship warranty you receive with a completed
            repair.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            Questions
          </h2>
          <p>Call or text {PHONE}.</p>
        </div>
      </div>
    </section>
  );
}
