import {
  PHONE,
  SITE_URL,
  SITE_NAME,
  CITY,
  REGION,
  POSTAL_CODE,
  BY_APPOINTMENT,
  HOURS_DAYS,
  HOURS_OPEN,
  HOURS_CLOSE,
  BUSINESS_ID,
} from "@/lib/site";

export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      postalCode: POSTAL_CODE,
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: CITY },
    image: `${SITE_URL}/logos/sp-mark.png`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: HOURS_DAYS,
        opens: HOURS_OPEN,
        closes: HOURS_CLOSE,
      },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "byAppointmentOnly",
        value: BY_APPOINTMENT,
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
