import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, PHONE, CITY, REGION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE_NAME} handles the information you send us.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: false },
};

// Legal pages share a plain editorial layout — no cinema treatment.
// Noindexed and excluded from the sitemap; they exist for people, not
// rankings.
export default function PrivacyPage() {
  return (
    <section className="bg-ink px-6 md:px-10 pt-40 pb-24">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 display-lg text-bone">Privacy policy.</h1>
        <p className="annotation text-graphite mt-5">Last updated: August 31, 2026</p>

        <div className="editorial mt-10 max-w-[65ch] space-y-7 text-bone/85">
          <p>
            This is the plain-English version of how {SITE_NAME} (&ldquo;we&rdquo;) handles
            your information. We are a collision repair shop in {CITY}, {REGION} — we collect
            what we need to look at your car and call you back, and not much else.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            What we collect
          </h2>
          <p>
            When you use the contact or estimate forms, we receive what you type: your name,
            phone number, email if you give one, details about your car and the damage, and
            any photos you upload. When you call or text {PHONE}, we see your number the same
            way any phone does.
          </p>
          <p>
            Like most websites, we also use analytics tools that collect standard usage data —
            pages visited, device type, approximate location from your IP address. We use this
            to understand how the site is used, not to identify you.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            What we do with it
          </h2>
          <p>
            We use your information to respond to your request, write your estimate, and do
            the work you hire us for. Form submissions are delivered to us by email and stored
            with our website hosting provider. Photos you upload are stored securely so we can
            review the damage.
          </p>
          <p>
            We do not sell your information. We do not share it with anyone except the service
            providers that run this website (hosting, email delivery, analytics) and, when you
            hire us for an insurance repair, your insurance carrier as needed to process the
            claim.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            How long we keep it
          </h2>
          <p>
            Repair records are kept for as long as we are required to for warranty and legal
            purposes. Form submissions that do not turn into jobs are kept only as long as
            useful for follow-up. If you want your information deleted, call or text {PHONE}{" "}
            and we will remove what we are not legally required to keep.
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-bone leading-[1.1]">
            Questions
          </h2>
          <p>
            Call or text {PHONE}. You will reach the owner, not a call center.
          </p>
        </div>
      </div>
    </section>
  );
}
