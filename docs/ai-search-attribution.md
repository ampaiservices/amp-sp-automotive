# SP Automotive: AI search discovery and lead attribution

## Implemented in this branch

- One stable `AutoBodyShop` entity (`<configured SITE_URL>/#business`). Brand and paint services reference it. City-level address retained; Sarasota city-center coordinates removed because they do not locate the shop. No street address, certifications or reviews invented.
- `/llms.txt` generated at build time from shared business constants and existing service routes. Includes inquiry links and repair explainers; does not promote seeded builds as completed customer work. This is a supplemental discovery index, with no promised ranking or citation effect.
- Sitemap preserves all existing routes and omits automatic build timestamps masquerading as content revision dates. Existing wildcard robots policy already allows public crawling and stays in place.
- Site-wide first-visit capture, optional evidence in both forms, server-derived classification, email attribution details, and nested `attribution` in both Sheets webhook payloads.
- Existing BotID checks, upload limits/endpoints, validation and delivery semantics preserved. Email must succeed for a successful response. A failed sheet append remains nonfatal. Retries after an email failure can create another sheet row; existing delivery is not idempotent.

## Evidence contract and precedence

These are reported browser observations and campaign labels. All can be absent or spoofed; server validation makes them bounded and consistently classified, not independently authenticated.

| Priority | Evidence | Classification |
| --- | --- | --- |
| 1 | `gclid`, `gbraid`, `wbraid`, `msclkid` | `paid` / `click_id` |
| 2 | Recognized paid UTM medium (see `PAID_MEDIA` in `lib/attribution.ts`) | `paid` / `utm` |
| 3 | Exact supported AI UTM source | `ai_referral` / `utm` |
| 4 | Other valid UTM fields | `campaign` / `utm` |
| 5 | Supported AI referrer hostname or its subdomain | `ai_referral` / `referrer` |
| 6 | Recognized search referrer | `organic_search` / `referrer` |
| 7 | Other external referrer | `referral` / `referrer` |
| 8 | `fbclid` alone | `campaign` / `click_id` (organic Meta clicks also use it) |
| 9 | No usable evidence, including internal referrers | `direct_or_unknown` / `none` |

AI providers: ChatGPT (`chatgpt.com`, `chat.openai.com`), Perplexity (`perplexity.ai`), Claude (`claude.ai`), Gemini (`gemini.google.com`), Copilot (`copilot.microsoft.com`). UTM source also accepts `chatgpt`, `openai`, `perplexity`, `claude`, `gemini`, `copilot`. Bing's general hostname is search evidence, not enough to identify Copilot. Search matching currently covers google.com, bing.com, duckduckgo.com, search.yahoo.com, search.brave.com; other regional/search hosts conservatively remain referrals.

Paid evidence overrides AI labels; `ai_provider` is `none` for paid traffic. Non-AI campaign tags override a conflicting referrer. Original supported evidence remains in private lead records so an operator can inspect disagreements. New providers/aliases require a reviewed code change and test.

## Capture and privacy

First visit per tab is stored in `sessionStorage` for at most 24 hours from capture, across internal navigation and reloads. It is first-touch, not last-touch or cross-device attribution. Closing the tab normally ends it; browser session restoration may retain storage until expiry. No cookies or cross-tab identity are added. With blocked storage, memory preserves the first visit during client navigation; a full reload can lose it. Unknown/malformed storage recovers without blocking submission. The root capture component runs after hydration; if JavaScript never runs, this mechanism cannot observe a visit.

Allowed private evidence: five UTMs (`source`, `medium`, `campaign`, `content`, `term`), five click identifiers above, recognized landing path, and external referrer hostname only. Campaign fields must be ASCII labels using letters, digits, `. _ ~ -`, up to 120 characters; IDs up to 200. Spaces, email addresses, URLs and other arbitrary values are dropped. Landing query/fragment and all referrer paths/query/fragment/credentials are excluded. Unknown landing paths are blank; build-detail paths reduce to `/builds`. Missing legacy evidence remains a valid lead. Keep campaign naming free of personal/vehicle information even in private records.

The API ignores submitted derived labels and recalculates them. Successful responses return only three enums: `source_group`, `source_evidence`, `ai_provider`. Only these enums accompany conversion events; raw campaign fields, paths, referrers, click IDs, contact/vehicle fields and photos never enter the new analytics payloads. Existing site analytics providers have their own collection settings and are outside this new payload contract. Private email/Sheet retention follows existing lead-retention practices; review these extra fields under that policy.

## Analytics and reporting setup

GTM retains `contact_submit_success` and `estimate_submit_success`. Existing container triggers remain valid. When GTM is configured it is the only transport. Without GTM and with a valid GA4 ID, successful delivery maps once to `generate_lead` with `form_name: contact|estimate`; errors/attempts remain distinct. Attribution cannot interrupt delivery UI.

In GTM, add Data Layer Variables for `source_group`, `source_evidence`, `ai_provider`, and pass them as GA4 event parameters on the existing conversion tags. Ensure each success trigger has one conversion tag and the container is not double-loading GA4. In GA4, register these three event-scoped custom dimensions if needed for reports. The direct fallback sends them automatically. These external account changes have not been made by this branch.

Report weekly by form, source group, provider and evidence type. Keep UTM-claimed AI and observed AI-referrer leads distinguishable. Compare successful website deliveries with email receipts and Sheet rows; reconcile sheet outages and retry duplicates before calculating qualified leads. Revenue/qualified-lead reporting requires operator follow-up, not just a successful form request. Phone/SMS clicks remain intent signals, with no new claim of a completed call or sale. Missing referrers, copied links, privacy tools and untagged app traffic remain unknown, so this cannot measure all AI influence.

## External setup and owner verification

1. Production `NEXT_PUBLIC_SITE_URL` should be `https://www.spmotorworks.com`. On November 12, 2026, ordinary HTTP checks observed the apex redirecting to www, home/contact self-canonicals using www, and robots/llms responding 200. These checks do not establish access for actual search crawler IPs or visibility in AI answers. Existing production URL guards remain intact.
2. Update/redeploy Apps Script and append headers using `docs/apps-script-contact.md`. Until then, the existing fixed-column script ignores attribution even though the webhook receives it. Email retains the new details when form delivery is configured. Application deployment does not update the external Sheet or analytics container.
3. Owner should verify the public business name, phone, city/ZIP, appointment policy and hours against their authoritative business profiles. Publish precise coordinates only with the actual verified shop address and permission to display it.
4. Review existing published FAQs/brand copy for OEM-only parts, in-house ADAS/calibration, repair-time ranges, warranty, insurance/storage/rental/delivery promises and manufacturer certification implications. Repository copy is evidence of what the site says, not independent proof. No new claims have been added here; existing publication gates remain intact. Keep unpublished FAQs/testimonials out of visible output and JSON-LD.
5. Build data explicitly says specs are seeded from kit-manufacturer information and images started as placeholders. Owner must confirm project provenance and customer permission before treating those pages as verified case studies. Existing routes were retained; they are excluded from the expanded llms index. Confirm restoration descriptions before amplifying them.
6. After an authorized release, check the rendered canonical tags, shared business ID, absence of fake geo, sitemap and llms response. Use a staging mailbox, test Sheet and BotID-supported preview environment for end-to-end upload/submission checks. This branch's automated delivery tests mock Resend, Sheets and BotID; they do not prove those external credentials or live integrations work.

## Production readiness

The November 13, 2026 release review found only `NEXT_PUBLIC_SITE_URL` configured in the production Vercel project. The existing contact and estimate pages intentionally show phone/text instructions until `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_RECIPIENT_EMAIL` are configured. Photo uploads also require `BLOB_READ_WRITE_TOKEN`. Do not treat a successful application deployment as activation of form delivery or lead-source reporting.

Enable the forms with verified delivery credentials, add `SHEET_WEBHOOK_URL` and redeploy the updated Apps Script for Sheet attribution, and configure `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA4_ID` plus the reporting mappings above. Then rebuild/redeploy and verify each integration with an authorized test mailbox and Sheet. The phone/text fallback remains available while these integrations are absent.

## Local validation

Run `bun run test`, `bun run lint`, `bun run typecheck`, and `NEXT_PUBLIC_SITE_URL=https://www.spmotorworks.com bun run build`. Tests use fake credentials and mocked delivery boundaries and do not send real email or append external rows. CI runs the tests before lint/typecheck/build. No AI placement, official OpenAI relationship, listing service or guaranteed result is claimed.
