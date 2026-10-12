"use client";
import { useEffect } from "react";
import { LEAD_SOURCES, AI_SOURCE } from "@/lib/lead-source";
import { AI_SOURCE_KEY, detectAiSource } from "@/components/analytics/AiReferral";

// Optional "How did you find us" select shared by the contact and estimate
// forms. If AiReferral recorded an AI assistant for this session, the AI
// option is pre-selected and the assistant name rides along as sourceDetail.

type Props = {
  value: string;
  onChange: (source: string, detail: string) => void;
  disabled?: boolean;
  labelClassName: string;
  inputClassName: string;
};

export default function LeadSourceField({ value, onChange, disabled, labelClassName, inputClassName }: Props) {
  useEffect(() => {
    if (value) return;
    // Direct AI landings on /contact or /estimate can mount this before
    // AiReferral has written sessionStorage, so fall back to detecting the
    // referral signal here as well.
    let detected: string | null = null;
    try {
      detected = sessionStorage.getItem(AI_SOURCE_KEY);
    } catch {
      // Storage blocked. Fall through to direct detection.
    }
    detected ??= detectAiSource();
    if (detected) onChange(AI_SOURCE, detected);
    // Run once on mount; a user choice must not be overwritten.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label htmlFor="source" className={labelClassName}>How did you find us? (optional)</label>
      <select
        id="source"
        name="source"
        className={`${inputClassName} appearance-none`}
        value={value}
        onChange={(e) => onChange(e.target.value, "")}
        disabled={disabled}
      >
        <option value="">Choose one</option>
        {LEAD_SOURCES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
