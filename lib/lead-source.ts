// "How did you find us" options. Shared by both forms and both API routes so
// the allowlist and the UI cannot drift. AI assistants get one bucket; the
// detected assistant name (from AiReferral) is appended in the payload.

export const LEAD_SOURCES = [
  "Google search",
  "ChatGPT or another AI assistant",
  "Instagram",
  "Referred by a friend or another shop",
  "Insurance or dealer referral",
  "Other",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const AI_SOURCE: LeadSource = "ChatGPT or another AI assistant";

export function isLeadSource(v: unknown): v is LeadSource {
  return typeof v === "string" && (LEAD_SOURCES as readonly string[]).includes(v);
}
