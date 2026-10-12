import { SITE_URL } from "@/lib/site";

// schema.org BreadcrumbList. `items` excludes Home, which is always first.
// Paths begin with "/".
export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
