import { test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import LocalBusinessJsonLd from "../components/seo/LocalBusinessJsonLd";
import { GET } from "../app/llms.txt/route";
import sitemap from "../app/sitemap";
import { SITE_URL, SITE_NAME, BUSINESS_ID } from "../lib/site";

test("business schema keeps one stable identity without invented coordinates/address", () => {
  const html = renderToStaticMarkup(LocalBusinessJsonLd());
  const data = JSON.parse(html.match(/<script[^>]*>(.*?)<\/script>/s)[1]);
  expect(data).toMatchObject({
    "@type": "AutoBodyShop",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    address: { addressLocality: "Sarasota", addressRegion: "FL" },
  });
  expect(data.geo).toBeUndefined();
  expect(data.address.streetAddress).toBeUndefined();
});

test("llms index shares configured canonical URLs and avoids seeded builds/testimonials", async () => {
  const response = GET();
  expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  const text = await response.text();
  expect(text).toContain(SITE_NAME);
  expect(text).toContain("appointment only");
  for (const path of ["/", "/contact", "/estimate", "/faq", "/sitemap.xml"])
    expect(text).toContain(`(${SITE_URL}${path})`);
  expect(text).not.toContain("/builds/");
  expect(text).not.toMatch(/lifetime|3–8|testimonial|certified/i);
});

test("sitemap retains unique canonical routes without fabricated modification dates", () => {
  const entries = sitemap();
  expect(entries.length).toBeGreaterThan(15);
  expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
  expect(
    entries.every((entry) => entry.url.startsWith(`${SITE_URL}/`) && !entry.lastModified),
  ).toBe(true);
});
