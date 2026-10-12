# AI search push - off-site work

Client: SP Automotive Collision & Repair (spmotorworks.com)
Date: 2026-09-17
Trigger: a customer told Serge ChatGPT recommended the shop. The citation came from the Porsche brand page. This doc covers the work that lives outside the codebase.

## Why this matters

ChatGPT, Perplexity, and Google AI answers cite a business when (a) a page answers the question in plain language and (b) other sources confirm the business exists and is what the page says it is. The site now handles (a) for eight brands. Everything below is (b).

One warning up front: sp-automotive.com is a different shop in San Diego, CA, with its own Instagram (@sp_automotivesocal). AI models will blend the two if the Sarasota profiles are thin. Use the full name "SP Automotive Collision & Repair" and "Sarasota, FL" on every profile.

## 1. Facts to collect from Serge (needed before the schema can be completed)

The site has empty slots waiting for these. Nothing is published until the value is confirmed.

- Street address, if he is willing to publish one. If not, the shop stays city-level.
- Google Business Profile share link (Maps > Share > Copy link).
- Instagram handle.
- Facebook page URL, if one exists.
- Yelp listing URL, if one exists.
- Current Google review count and star rating, read off the live profile.

Where they go: `lib/site.ts`, constants STREET_ADDRESS, SAME_AS, REVIEWS. One PR, five minutes.

## 2. Google Business Profile checklist

- Business name exactly "SP Automotive Collision & Repair". No keywords stuffed in.
- Primary category: Auto body shop. Secondary: Auto repair shop, Auto painting.
- Website: https://www.spmotorworks.com (with www).
- Phone: (941) 599-4025.
- Hours: Mon to Sat 9am to 5pm, and turn on "appointment required" if Google offers it for the category.
- Services list: add one entry per brand page with the page URL as the link (Porsche collision repair, Ferrari collision repair, and so on). Google surfaces these and AI answers read them.
- Description (750 char max), plain English, mention Sarasota, exotic and luxury collision, owner-operated, OEM procedures. No superlatives.
- Photos: at least ten recent shop and car photos. Before and after pairs from the builds gallery are ideal.
- Q&A: seed three questions from the brand FAQs and answer them as the owner.
- Reviews: ask every completed job for a Google review by text with the direct review link. Reply to every review. Review velocity is the strongest single local signal.

## 3. Bing Places

ChatGPT search uses Bing's index. Most small shops have no Bing listing at all.

- Go to bingplaces.com and use "Import from Google Business Profile" so the two stay in sync.
- Verify the same name, phone, website, and hours.
- Add the same photos.

## 4. Other citations (do once, in this order)

1. Apple Business Connect (Apple Maps). Free. Same NAP.
2. Yelp. Claim or create. Yelp is heavily cited by ChatGPT for local service questions.
3. Carwise and AutoBody-Review. Both appear in search results for "auto body Sarasota" and are read by AI models.
4. BBB profile, if Serge wants it. Trust signal more than traffic.

## 5. Mentions that carry weight for exotic owners

Pick two or three. Each is one email or one post, not a campaign.

- Porsche Club of America, Suncoast Florida Region: ask to be listed as a member-recommended body shop or to sponsor one event. Their site and newsletter are exactly what AI models read when asked "Porsche body shop Sarasota".
- Ferrari Club of America, Florida region. Same ask.
- Rennlist and FerrariChat forums: a short owner-style post from a real customer, or Serge answering a technical question in the Florida regional subforum. Do not post ads.
- Sarasota Exotic Car Fest and local cars-and-coffee organizers: a vendor listing or a mention in their vendor page.
- Local press: Sarasota Herald-Tribune business section and SRQ Magazine run "local expert" pieces. Pitch the ADAS or paint-match explainer as a story angle.
- Reddit r/sarasota: only answer when someone asks for a body shop recommendation. One honest reply from a customer beats anything from the shop.

## 6. Measuring it

Once GA4 is configured in Vercel (NEXT_PUBLIC_GA4_ID or NEXT_PUBLIC_GTM_ID), the site fires an `ai_referral` event with the assistant name whenever someone arrives from ChatGPT, Perplexity, Claude, Gemini, or Copilot. The contact and estimate forms now ask "How did you find us?" and pre-select the AI option for those visitors, and the answer reaches Serge's email and the lead sheet.

Monthly check: ask ChatGPT, Perplexity, and Google AI Mode the same five questions and record whether the shop is named.

1. Who repairs Porsche collision damage in Sarasota?
2. Best exotic car body shop near Sarasota FL
3. Lamborghini paint match Sarasota
4. Ferrari collision repair Tampa Bay area
5. Where to fix a G-Wagon Brabus after an accident in Florida

Takeaway: the site is already citable; the profiles are what make the citation stick.
