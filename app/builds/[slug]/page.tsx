import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildPage from "@/components/builds/BuildPage";
import { BUILDS, getBuild } from "@/components/builds/builds-data";
import { SITE_URL } from "@/lib/site";
import { WEBSITE_ID, breadcrumbList } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return BUILDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) return {};
  return {
    title: build.metaTitle,
    description: build.metaDescription,
    alternates: { canonical: `${SITE_URL}/builds/${slug}` },
    openGraph: {
      title: build.metaTitle,
      description: build.metaDescription,
      images: [build.kitImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: build.metaTitle,
        description: build.metaDescription,
        url: `${SITE_URL}/builds/${slug}`,
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${build.kitImage}`,
        },
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbList([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Builds", url: `${SITE_URL}/builds` },
        { name: build.metaTitle, url: `${SITE_URL}/builds/${slug}` },
      ]),
    ],
  };
  return (
    <>
      <JsonLd data={jsonLd} />
      <BuildPage build={build} />
    </>
  );
}
