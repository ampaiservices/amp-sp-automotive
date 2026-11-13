import { captureAttribution, normalizeAttribution, type LeadAttribution } from "./attribution";

const STORAGE_KEY = "sp:first-touch:v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
let firstTouch: LeadAttribution | undefined;
let savedAt = 0;

// First visit in this tab, across internal navigation and reloads, for up to 24h.
// Memory survives client navigation if storage is blocked. Nothing here may block a lead.
export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return normalizeAttribution(null);
  if (firstTouch && savedAt <= Date.now() && Date.now() - savedAt < MAX_AGE_MS) return firstTouch;
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "null");
    const evidence = stored?.evidence;
    if (
      stored?.version === 1 &&
      evidence &&
      typeof evidence === "object" &&
      !Array.isArray(evidence) &&
      evidence.version === 1 &&
      typeof evidence.landing_path === "string" &&
      typeof evidence.referrer_host === "string" &&
      Number.isFinite(stored.savedAt) &&
      stored.savedAt <= Date.now() &&
      Date.now() - stored.savedAt < MAX_AGE_MS
    ) {
      firstTouch = normalizeAttribution(evidence, window.location.hostname);
      savedAt = stored.savedAt;
      return firstTouch;
    }
  } catch {
    /* Storage access, quota and malformed JSON are optional failures. */
  }
  savedAt = Date.now();
  try {
    firstTouch = captureAttribution(window.location.href, document.referrer);
  } catch {
    firstTouch = normalizeAttribution(null);
  }
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, savedAt, evidence: firstTouch }),
    );
  } catch {
    /* Keep the in-memory first visit when storage is unavailable. */
  }
  return firstTouch;
}
