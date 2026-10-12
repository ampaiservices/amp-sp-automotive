import type { Brand } from "./brands-data";

// Plain-text Q&A rendered as native <details> so it is readable without JS,
// crawlable by AI search bots, and needs no motion handling. The same
// entries feed the FAQPage JSON-LD emitted by BrandPage.
export default function BrandFAQ({ brand }: { brand: Brand }) {
  return (
    <section className="bg-ink px-6 md:px-10 py-24 md:py-32 border-t border-divider">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">{"// "}{brand.name} owners ask</p>
        <h2 className="mt-4 display-md">Straight answers, {brand.name}-specific.</h2>

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {brand.faqs.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-bone text-lg md:text-xl leading-snug [&::-webkit-details-marker]:hidden">
                <span>{f.question}</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-display text-graphite group-open:rotate-45 transition-transform motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[70ch] text-bone/85">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
