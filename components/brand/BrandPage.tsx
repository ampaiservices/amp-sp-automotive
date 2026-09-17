import BrandHero from "./BrandHero";
import BrandServices from "./BrandServices";
import BrandModels from "./BrandModels";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import FinalCTA from "@/components/cta/FinalCTA";
import BrandPageView from "@/components/analytics/BrandPageView";
import { PUBLISHED_TESTIMONIALS } from "@/components/testimonials/testimonials-data";
import { SITE_NAME, SITE_URL, PHONE, CITY } from "@/lib/site";
import { corroboration, postalAddress } from "@/components/seo/LocalBusinessJsonLd";
import BrandFAQ from "./BrandFAQ";
import type { Brand } from "./brands-data";

// Reusable composition for every brand-specific landing page. One Brand entry
// in brands-data.ts produces the full page; the per-brand page.tsx files just
// import this with their Brand object.

export default function BrandPage({ brand }: { brand: Brand }) {
  const hasBrandTestimonials = PUBLISHED_TESTIMONIALS.some((t) => t.brand === brand.brandKey);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} Collision Repair`,
    description: brand.metaDescription,
    provider: {
      "@type": "AutoBodyShop",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE,
      address: postalAddress(),
      ...corroboration(),
    },
    areaServed: { "@type": "City", name: CITY },
    serviceType: `${brand.name} collision repair, paint, frame, and ADAS recalibration`,
    url: `${SITE_URL}/${brand.slug}`,
    brand: { "@type": "Brand", name: brand.name },
  };

  // Owner questions, phrased the way people ask an AI assistant. Same
  // FAQPage shape as /faq so answer engines can lift a single Q&A.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BrandPageView brand={brand.brandKey} />
      <BrandHero brand={brand} />
      <BrandServices brand={brand} />
      <BrandModels brand={brand} />
      <BrandFAQ brand={brand} />
      {hasBrandTestimonials && (
        <TestimonialsSection
          brand={brand.brandKey}
          heading={`From ${brand.name} owners.`}
        />
      )}
      <FinalCTA />
    </>
  );
}
