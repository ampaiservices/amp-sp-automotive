import { test, expect, mock, afterEach } from 'bun:test';
const gtm = mock(() => {});
const ga = { get calls() { return (window.dataLayer ?? []).map(command => Array.from(command)); } };
mock.module('@next/third-parties/google', () => ({ sendGTMEvent: gtm }));
const { track } = await import('../lib/analytics');
Object.defineProperty(globalThis, "window", { value: {}, configurable: true });
afterEach(() => {
  gtm.mockReset();
  Object.defineProperty(globalThis, "window", { value: {}, configurable: true });
  delete process.env.NEXT_PUBLIC_GTM_ID;
  delete process.env.NEXT_PUBLIC_GA4_ID;
});
test('direct GA maps only successful deliveries to leads without personal data', () => {
  process.env.NEXT_PUBLIC_GA4_ID = 'G-TEST123';
  track('contact_submit_success');
  track('estimate_submit_success');
  track('phone_cta_click', { location: 'header' });
  track('sms_cta_click', { location: 'footer' });
  expect(ga.calls).toEqual([
    ['event', 'generate_lead', { form_name: 'contact' }],
    ['event', 'generate_lead', { form_name: 'estimate' }],
    ['event', 'phone_cta_click', { location: 'header' }],
    ['event', 'sms_cta_click', { location: 'footer' }],
  ]);
  expect(gtm).not.toHaveBeenCalled();
});
test('GTM retains existing container mappings without duplicate GA events', () => {
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-TEST';
  process.env.NEXT_PUBLIC_GA4_ID = 'G-TEST123';
  track('contact_submit_success');
  expect(gtm).toHaveBeenCalledWith({event: 'contact_submit_success'});
  expect(ga.calls).toEqual([]);
});
test('missing and malformed IDs do not send events', () => {
  track('contact_submit_success');
  process.env.NEXT_PUBLIC_GA4_ID = "bad';id";
  track('contact_submit_success');
  expect(ga.calls).toEqual([]);
  expect(gtm).not.toHaveBeenCalled();
});
test('analytics exceptions cannot interrupt form delivery UI', () => {
  process.env.NEXT_PUBLIC_GA4_ID = 'G-TEST123';
  Object.defineProperty(window, 'dataLayer', { get() { throw new Error('blocked'); } });
  expect(() => track('contact_submit_success')).not.toThrow();
});

test('events before Google initializes are preserved as standard queue commands', () => {
  process.env.NEXT_PUBLIC_GA4_ID = 'G-TEST123';
  track('contact_submit_success');
  const queued = window.dataLayer;
  expect(Object.prototype.toString.call(queued[0])).toBe('[object Arguments]');
  window.dataLayer = window.dataLayer || [];
  expect(window.dataLayer).toBe(queued);
  expect(ga.calls[0][1]).toBe('generate_lead');
});
