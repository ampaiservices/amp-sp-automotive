// Shared, bounded evidence contract. Never accept a client-supplied classification.
export const SOURCE_GROUPS = [
  "paid",
  "ai_referral",
  "organic_search",
  "campaign",
  "referral",
  "direct_or_unknown",
] as const;
export const SOURCE_EVIDENCE = ["click_id", "utm", "referrer", "none"] as const;
export const AI_PROVIDERS = [
  "chatgpt",
  "perplexity",
  "claude",
  "gemini",
  "copilot",
  "none",
] as const;

export type AnalyticsAttribution = {
  source_group: (typeof SOURCE_GROUPS)[number];
  source_evidence: (typeof SOURCE_EVIDENCE)[number];
  ai_provider: (typeof AI_PROVIDERS)[number];
};
const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const PAID_CLICK_KEYS = ["gclid", "gbraid", "wbraid", "msclkid"] as const;
const CLICK_KEYS = [...PAID_CLICK_KEYS, "fbclid"] as const;
const EVIDENCE_KEYS = [...CAMPAIGN_KEYS, ...CLICK_KEYS] as const;
type EvidenceKey = (typeof EVIDENCE_KEYS)[number];
export type LeadAttribution = AnalyticsAttribution &
  Partial<Record<EvidenceKey, string>> & {
    version: 1;
    landing_path: string;
    referrer_host: string;
  };

const AI_HOSTS: Record<string, AnalyticsAttribution["ai_provider"]> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
};
const AI_SOURCES: Record<string, AnalyticsAttribution["ai_provider"]> = {
  chatgpt: "chatgpt",
  openai: "chatgpt",
  perplexity: "perplexity",
  claude: "claude",
  gemini: "gemini",
  copilot: "copilot",
  ...AI_HOSTS,
};
const SEARCH_HOSTS = [
  "google.com",
  "bing.com",
  "duckduckgo.com",
  "search.yahoo.com",
  "search.brave.com",
];
const PAID_MEDIA = new Set([
  "cpc",
  "ppc",
  "paid",
  "paid_search",
  "paid-search",
  "paidsearch",
  "paid_social",
  "paid-social",
  "paidsocial",
  "social_paid",
  "sponsored",
  "display",
  "cpm",
  "cpa",
  "retargeting",
]);
const PUBLIC_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/estimate",
  "/faq",
  "/paint-work",
  "/body-kits",
  "/builds",
  "/explainers/adas",
  "/explainers/paint-match",
  "/explainers/oem-parts",
]);

function host(value: unknown): string {
  if (typeof value !== "string" || value.length > 253) return "";
  const candidate = value.toLowerCase();
  return /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(candidate) ? candidate : "";
}
function matchesHost(value: string, domain: string): boolean {
  return value === domain || value.endsWith(`.${domain}`);
}
function publicPath(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  // Only recognized public paths survive. Unknown paths can contain names or IDs.
  const path = value.replace(/\/$/, "") || "/";
  if (PUBLIC_PATHS.has(path)) return path;
  if (/^\/(lamborghini|mclaren|audi-r8|porsche|ferrari)-collision-repair-sarasota$/.test(path))
    return path;
  if (/^\/builds\/[a-z0-9-]+$/.test(path)) return "/builds";
  return "";
}
function token(value: unknown, max: number): string | undefined {
  // Campaign labels/IDs only, never arbitrary URLs, email addresses or free text.
  if (
    typeof value !== "string" ||
    value.length > max ||
    !/^[a-zA-Z0-9][a-zA-Z0-9._~-]*$/.test(value)
  )
    return;
  return value;
}

export function normalizeAttribution(input: unknown, siteHostname = ""): LeadAttribution {
  const raw =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const fields: Partial<Record<EvidenceKey, string>> = {};
  for (const key of EVIDENCE_KEYS) {
    const value = token(
      raw[key],
      CLICK_KEYS.includes(key as (typeof CLICK_KEYS)[number]) ? 200 : 120,
    );
    if (value) fields[key] = value;
  }
  let referrer = host(raw.referrer_host);
  const ownHost = host(siteHostname).replace(/^www\./, "");
  if (ownHost && (referrer.replace(/^www\./, "") === ownHost || matchesHost(referrer, ownHost)))
    referrer = "";
  let source_group: AnalyticsAttribution["source_group"] = "direct_or_unknown";
  let source_evidence: AnalyticsAttribution["source_evidence"] = "none";
  let ai_provider: AnalyticsAttribution["ai_provider"] = "none";
  const source = fields.utm_source?.toLowerCase() ?? "";
  if (PAID_CLICK_KEYS.some((key) => fields[key])) {
    source_group = "paid";
    source_evidence = "click_id";
  } else if (PAID_MEDIA.has(fields.utm_medium?.toLowerCase() ?? "")) {
    source_group = "paid";
    source_evidence = "utm";
  } else if (Object.hasOwn(AI_SOURCES, source)) {
    source_group = "ai_referral";
    source_evidence = "utm";
    ai_provider = AI_SOURCES[source];
  } else if (CAMPAIGN_KEYS.some((key) => fields[key])) {
    source_group = "campaign";
    source_evidence = "utm";
  } else if (referrer) {
    const aiHost = Object.keys(AI_HOSTS).find((domain) => matchesHost(referrer, domain));
    source_evidence = "referrer";
    if (aiHost) {
      source_group = "ai_referral";
      ai_provider = AI_HOSTS[aiHost];
    } else
      source_group = SEARCH_HOSTS.some((domain) => matchesHost(referrer, domain))
        ? "organic_search"
        : "referral";
  }
  if (source_evidence === "none" && fields.fbclid) {
    // Meta appends fbclid to organic clicks too; it cannot prove paid traffic.
    source_group = "campaign";
    source_evidence = "click_id";
  }
  return {
    version: 1,
    ...fields,
    landing_path: publicPath(raw.landing_path),
    referrer_host: referrer,
    source_group,
    source_evidence,
    ai_provider,
  };
}

export function captureAttribution(url: string, referrer: string): LeadAttribution {
  const landing = new URL(url);
  const raw: Record<string, unknown> = { landing_path: landing.pathname };
  for (const key of EVIDENCE_KEYS) raw[key] = landing.searchParams.get(key);
  try {
    const referring = new URL(referrer);
    if (
      ["https:", "http:"].includes(referring.protocol) &&
      !referring.username &&
      !referring.password
    )
      raw.referrer_host = referring.hostname;
  } catch {
    /* An absent/invalid referrer provides no evidence. */
  }
  return normalizeAttribution(raw, landing.hostname);
}

// Runtime allowlist as well as TypeScript protection. Never forward raw evidence to analytics.
export function analyticsAttribution(input: unknown): Partial<AnalyticsAttribution> {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string, unknown>;
  return {
    ...(SOURCE_GROUPS.includes(raw.source_group as AnalyticsAttribution["source_group"])
      ? { source_group: raw.source_group as AnalyticsAttribution["source_group"] }
      : {}),
    ...(SOURCE_EVIDENCE.includes(raw.source_evidence as AnalyticsAttribution["source_evidence"])
      ? { source_evidence: raw.source_evidence as AnalyticsAttribution["source_evidence"] }
      : {}),
    ...(AI_PROVIDERS.includes(raw.ai_provider as AnalyticsAttribution["ai_provider"])
      ? { ai_provider: raw.ai_provider as AnalyticsAttribution["ai_provider"] }
      : {}),
  };
}
