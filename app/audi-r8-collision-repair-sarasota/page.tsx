import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { getBrand } from "@/components/brand/brands-data";
import { pageMetadata } from "@/lib/seo";

const brand = getBrand("audi-r8-collision-repair-sarasota")!;

export const metadata: Metadata = pageMetadata({
  title: brand.metaTitle,
  description: brand.metaDescription,
  path: `/${brand.slug}`,
});

export default function Page() {
  return <BrandPage brand={brand} />;
}
