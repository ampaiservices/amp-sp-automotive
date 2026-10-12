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
  GEO_LAT,
  GEO_LNG,
  STREET_ADDRESS,
  OWNER_NAME,
  SAME_AS,
  REVIEWS,
} from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";

// Optional corroboration fields. Each is omitted while its source constant
// is empty so the JSON-LD never carries a placeholder.
export function corroboration() {
  return {
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    ...(REVIEWS.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: REVIEWS.rating,
            reviewCount: REVIEWS.count,
            bestRating: 5,
          },
        }
      : {}),
  };
}

export function postalAddress() {
  return {
    "@type": "PostalAddress",
    ...(STREET_ADDRESS ? { streetAddress: STREET_ADDRESS } : {}),
    addressLocality: CITY,
    addressRegion: REGION,
    postalCode: POSTAL_CODE,
    addressCountry: "US",
  };
}

export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    "@id": `${SITE_URL}/#business`,
    address: postalAddress(),
    founder: { "@type": "Person", name: OWNER_NAME },
    knowsAbout: BRANDS.map((b) => `${b.name} collision repair`),
    ...corroboration(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LAT,
      longitude: GEO_LNG,
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
