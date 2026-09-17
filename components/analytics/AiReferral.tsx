"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Detects arrivals from AI assistants and records the source for the
// session. Two signals: ChatGPT appends `utm_source=chatgpt.com` to links it
// cites; other assistants show up in document.referrer. The value is kept
// in sessionStorage so the estimate and contact forms can pre-fill
// "How did you find us" and the lead carries the attribution to Serge.

export const AI_SOURCE_KEY = "sp_lead_source";

const AI_HOSTS: Record<string, string> = {
  "chatgpt.com": "ChatGPT",
  "chat.openai.com": "ChatGPT",
  "perplexity.ai": "Perplexity",
  "claude.ai": "Claude",
  "gemini.google.com": "Gemini",
  "copilot.microsoft.com": "Copilot",
  "bing.com": "Copilot",
};

function detect(): string | null {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source")?.toLowerCase() ?? "";
  for (const host in AI_HOSTS) {
    if (utm.includes(host)) return AI_HOSTS[host];
  }
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    for (const host in AI_HOSTS) {
      if (ref === host || ref.endsWith(`.${host}`)) return AI_HOSTS[host];
    }
  } catch {
    // Malformed referrer. Treat as no signal.
  }
  return null;
}

export default function AiReferral() {
  useEffect(() => {
    const source = detect();
    if (!source) return;
    try {
      if (sessionStorage.getItem(AI_SOURCE_KEY)) return;
      sessionStorage.setItem(AI_SOURCE_KEY, source);
    } catch {
      // Storage blocked. Still record the event.
    }
    track("ai_referral", { source, landing: window.location.pathname });
  }, []);
  return null;
}
