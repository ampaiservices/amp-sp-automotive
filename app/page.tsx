import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { speakablePage } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import HeroVideo from "@/components/hero/HeroVideo";
import TrustStrip from "@/components/home/TrustStrip";
import MeetSerge from "@/components/home/MeetSerge";
import InsuranceHandling from "@/components/home/InsuranceHandling";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedBuilds from "@/components/home/FeaturedBuilds";
import StorageBlock from "@/components/home/StorageBlock";
import BodyworkAndEstimates from "@/components/home/BodyworkAndEstimates";
import AboutStrip from "@/components/about/AboutStrip";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/cta/FinalCTA";

// Section sequence — trust-triad ordering (who → what → how → proof → details → CTA):
//   hero (Totaled / Paid in Full)
//   trust strip (reach-us dateline)
//   meet serge (the "who" — founder intro + portrait, dark surface)
//   carrier handling (the "what" — the unique differentiator)
//   how it works (the "how" — 4-step process)
//   selected work (the "proof of work" — featured builds 1+3 grid;
//     carries id="work" for the nav anchor; stock↔kit crossfade on hover)
//   indoor storage (secondary value prop — spotlight)
//   mobile estimate (secondary value prop — we come to you)
//   the signature (about strip — stats + typographic signature, closing
//     proof beat)
//   common questions (FAQ)
//   next move (final CTA)
//
// `TheMath` (formerly §01 — three big numerals 70% / 100% / +30% about
// insurance gap-closing) was removed 2026-05-16. The "+30% sometimes
// ahead" upside is no longer explicit on the homepage — the hero's
// "You walk away whole — sometimes ahead." carries the spirit; AboutStrip's
// 4-stat row continues to carry the "tabular figures over vague claims"
// voice signal at the closing beat. Component file kept in repo for one
// cycle in case rollback is needed.
//
// Atmosphere is per-section. The html canvas (atmospheric ink gradient,
// `globals.css`) carries the background for sections without their own
// surface treatment.

// Canonical trailing slash matches the sitemap.xml <loc> form so crawlers
// don't see two distinct canonical signatures. Title is absolute — the
// layout template would append the site name a second time.
const HOME_TITLE = "Exotic Collision Repair in Sarasota, FL — SP Automotive";
const HOME_DESCRIPTION =
  "Factory-correct collision repair for Lamborghini, McLaren, Ferrari, Porsche, and Audi R8 in Sarasota. OEM parts, in-house paint match and ADAS recalibration, insurance handled end-to-end. Call (941) 599-4025.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{ "@context": "https://schema.org", ...speakablePage("/", HOME_TITLE) }}
      />
      <HeroVideo />
      <TrustStrip />
      <MeetSerge />
      <InsuranceHandling />
      <HowItWorks />
      <FeaturedBuilds />
      <StorageBlock />
      <BodyworkAndEstimates />
      <AboutStrip />
      <HomeFAQ />
      <FinalCTA homepage />
    </>
  );
}
