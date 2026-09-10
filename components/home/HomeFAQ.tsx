"use client";
import { useRef } from "react";
import Link from "next/link";
import SplitText from "@/components/effects/SplitText";
import SmsCTA from "@/components/ui/SmsCTA";
import { HOME_FAQS } from "@/lib/faq-data";

// Inline FAQ between the AboutStrip ("The signature") and the final CTA.
// Pure typography on the ink ground — no glass, no video. The page has had
// enough material by here; this is the breather before the close.
//
// Built on native <details>/<summary> so keyboard, focus, and screen-reader
// support come for free. The "+" affordance is rendered via a ::marker
// replacement (display: list-item is suppressed) and CSS rotates it when
// the parent is open. One row open at a time is enforced via an
// onClick handler that closes siblings; we don't fight the DOM here.

export default function HomeFAQ() {
  // Track the open row so we can collapse siblings when a new one opens.
  // Using a ref instead of state because each <details> manages its own
  // open state in the DOM — we just enforce single-open across them.
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    const opened = e.currentTarget;
    if (!opened.open) return;
    const wrap = wrapperRef.current;
    if (!wrap) return;
    wrap.querySelectorAll("details").forEach((d) => {
      if (d !== opened) d.open = false;
    });
  }

  return (
    <section
      aria-labelledby="home-faq-heading"
      data-theme="dark"
      className="relative w-full text-bone px-6 py-20 md:px-10 md:py-28"
    >
      {/* Section label — Anton uppercase, no chapter numeral. Dark register
          (text-bone). §07 is the back-half dark interlude — breaks the
          paper run between Selected work and FinalCTA so the bottom of
          the page doesn't read as one continuous cream slab. */}
      <div className="relative z-10 mx-auto mb-10 max-w-3xl md:mb-14">
        <p className="font-display uppercase tracking-[0.10em] text-left text-bone text-3xl md:text-5xl leading-none">
          Common questions
        </p>
      </div>

      {/* Display headline — quieter than other chapters (8–10vw), since this
          is a typographic interview moment. */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <SplitText
          as="h2"
          id="home-faq-heading"
          className="font-display leading-[1.05] tracking-[-0.02em] text-bone text-[clamp(2.5rem,8vw,5.5rem)]"
          reveal="mount"
          mountDelayMs={300}
          staggerMs={22}
        >
          {"The parts\npeople ask about."}
        </SplitText>
      </div>

      {/* FAQ rows. max-w narrow, hairline dividers, "+" affordance. */}
      <div
        ref={wrapperRef}
        className="home-faq mx-auto mt-16 max-w-3xl md:mt-20 divide-y divide-bone/10 border-y border-bone/10"
      >
        {HOME_FAQS.map((item, i) => (
          <details
            key={i}
            onToggle={handleToggle}
            className="home-faq__row group py-6 md:py-8"
          >
            <summary
              className="home-faq__summary flex cursor-pointer items-start gap-4 md:gap-6 list-none outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              <span className="font-mono text-bone/60 text-sm pt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-bone text-lg md:text-xl leading-snug">
                {item.question}
              </span>
              <span
                aria-hidden
                className="home-faq__plus shrink-0 text-bone text-2xl leading-none transition-transform duration-300 ease-out"
              >
                +
              </span>
            </summary>
            <div className="mt-5 pl-10 pr-2 md:pl-12 md:pr-16 text-bone/80 max-w-[60ch]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Closing line + SMS CTA to keep the urgent path one tap away. */}
      <div className="mx-auto mt-12 max-w-3xl flex flex-wrap items-center gap-6">
        <p className="text-bone/80">More questions? Text us a photo —</p>
        <SmsCTA location="home-faq" />
        <Link
          href="/faq"
          className="text-bone underline underline-offset-4 decoration-bone/40 hover:decoration-bone transition-colors"
        >
          All questions
        </Link>
      </div>

      <style jsx>{`
        :global(.home-faq__row[open] .home-faq__plus) {
          transform: rotate(45deg);
        }
        :global(.home-faq__summary::-webkit-details-marker) {
          display: none;
        }
      `}</style>
    </section>
  );
}
