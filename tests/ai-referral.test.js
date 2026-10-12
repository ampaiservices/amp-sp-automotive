import { test, expect, mock, afterEach } from 'bun:test';
mock.module('@/lib/analytics', () => ({ track: () => {} }));
const { detectAiSource } = await import('../components/analytics/AiReferral');

function visit(href, referrer = '') {
  Object.defineProperty(globalThis, 'window', { value: { location: new URL(href) }, configurable: true });
  Object.defineProperty(globalThis, 'document', { value: { referrer }, configurable: true });
}
afterEach(() => {
  delete globalThis.window;
  delete globalThis.document;
});

test('ChatGPT utm_source is detected', () => {
  visit('https://www.spmotorworks.com/porsche-collision-repair-sarasota?utm_source=chatgpt.com');
  expect(detectAiSource()).toBe('ChatGPT');
});

test('AI assistant referrer is detected', () => {
  visit('https://www.spmotorworks.com/contact', 'https://www.perplexity.ai/search?q=x');
  expect(detectAiSource()).toBe('Perplexity');
});

test('ordinary Bing search is not an AI referral', () => {
  visit('https://www.spmotorworks.com/', 'https://www.bing.com/search?q=exotic+collision+sarasota');
  expect(detectAiSource()).toBeNull();
});

test('Copilot referrer is detected', () => {
  visit('https://www.spmotorworks.com/', 'https://copilot.microsoft.com/');
  expect(detectAiSource()).toBe('Copilot');
});

test('no signal returns null', () => {
  visit('https://www.spmotorworks.com/');
  expect(detectAiSource()).toBeNull();
});
