import { test, expect, afterEach } from "bun:test";
let count = 0;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else delete globalThis.window;
  if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
  else delete globalThis.document;
});
function browser(href, referrer, storage) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: new URL(href), sessionStorage: storage },
  });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer } });
}
const load = () => import(`../lib/browser-attribution.ts?case=${++count}`);

test("first visit survives internal navigation and reload without private query data", async () => {
  const data = new Map();
  const storage = {
    getItem: (key) => data.get(key),
    setItem: (key, value) => data.set(key, value),
  };
  browser("https://www.spmotorworks.com/paint-work?utm_source=chatgpt&phone=private", "", storage);
  const first = await load();
  expect(first.getLeadAttribution().ai_provider).toBe("chatgpt");
  window.location = new URL("https://www.spmotorworks.com/estimate?utm_source=newsletter");
  expect(first.getLeadAttribution()).toMatchObject({
    ai_provider: "chatgpt",
    landing_path: "/paint-work",
  });
  const reloaded = await load();
  expect(reloaded.getLeadAttribution()).toEqual(first.getLeadAttribution());
  expect([...data.values()].join()).not.toContain("private");
});

test("blocked storage keeps memory; malformed or expired records recover", async () => {
  const blocked = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
  };
  browser("https://www.spmotorworks.com/?utm_source=perplexity", "", blocked);
  const first = await load();
  expect(() => first.getLeadAttribution()).not.toThrow();
  window.location = new URL("https://www.spmotorworks.com/contact");
  expect(first.getLeadAttribution().ai_provider).toBe("perplexity");
  for (const stored of [
    "bad json",
    JSON.stringify({
      version: 1,
      savedAt: Date.now() - 86400001,
      evidence: { utm_source: "chatgpt" },
    }),
  ]) {
    browser("https://www.spmotorworks.com/contact", "", { getItem: () => stored, setItem() {} });
    expect((await load()).getLeadAttribution().source_group).toBe("direct_or_unknown");
  }
});
