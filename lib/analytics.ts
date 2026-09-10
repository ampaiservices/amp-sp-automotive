import { sendGTMEvent } from "@next/third-parties/google";

type EventMap = {
  phone_cta_click: { location?: string };
  contact_submit_attempt: Record<string, never>;
  contact_submit_success: Record<string, never>;
  contact_submit_error: { reason?: string };
  brand_page_view: { brand: string };
  process_scroll_depth: { depth: 25 | 50 | 75 | 100; beat?: string };
  before_after_interact: { pair_id?: string };
  sms_cta_click: { location?: string };
  estimate_submit_attempt: Record<string, never>;
  estimate_submit_success: Record<string, never>;
  estimate_submit_error: { reason?: string };
};

export function track<K extends keyof EventMap>(
  event: K,
  params?: EventMap[K],
) {
  if (typeof window === "undefined") return;
  try {
    // Keep existing GTM event names and container mappings intact. Only one
    // transport runs, even when both IDs are configured.
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      sendGTMEvent({ event, ...(params ?? {}) });
    } else if (/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_ID ?? "")) {
      const successful = event === "contact_submit_success" || event === "estimate_submit_success";
      const browser = window as Window & { dataLayer?: unknown[] };
      browser.dataLayer ??= [];
      // Queue even before Google's initialization script has run.
      const queue = function (...args: unknown[]) {
        void args;
        // eslint-disable-next-line prefer-rest-params -- Google consumes Arguments objects.
        browser.dataLayer!.push(arguments);
      };
      queue("event", successful ? "generate_lead" : event,
        successful ? { form_name: event === "contact_submit_success" ? "contact" : "estimate" } : (params ?? {}));
    }
  } catch {
    // Tracking must never change the outcome of a successfully delivered lead.
  }
}
