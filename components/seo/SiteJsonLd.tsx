import {
  PHONE,
  SITE_URL,
  SITE_NAME,
  TAGLINE,
  CITY,
  REGION,
  POSTAL_CODE,
  SERVICE_AREAS,
  STREET_ADDRESS,
  SOCIAL_LINKS,
  OWNER_NAME,
  BY_APPOINTMENT,
  HOURS_DAYS,
  HOURS_OPEN,
  HOURS_CLOSE,
  GEO_LAT,
  GEO_LNG,
} from "@/lib/site";
import { BUSINESS_ID, WEBSITE_ID } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

// Site-wide JSON-LD graph: the one place the business and website are
// declared. Every per-page node (Service, FAQPage, TechArticle, …)
// references these via {"@id": BUSINESS_ID} / {"@id": WEBSITE_ID}.
export default function SiteJsonLd() {
  const business = {
    "@type": "AutoBodyShop",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    slogan: TAGLINE,
    url: SITE_URL,
    telephone: PHONE,
    founder: { "@type": "Person", name: OWNER_NAME },
    address: {
      "@type": "PostalAddress",
      ...(STREET_ADDRESS && { streetAddress: STREET_ADDRESS }),
      addressLocality: CITY,
      addressRegion: REGION,
      postalCode: POSTAL_CODE,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LAT,
      longitude: GEO_LNG,
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Florida" },
    })),
    image: `${SITE_URL}/logos/sp-mark.png`,
    ...(SOCIAL_LINKS.length > 0 && { sameAs: SOCIAL_LINKS }),
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

  const webSite = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };

  return (
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [business, webSite] }} />
  );
}
