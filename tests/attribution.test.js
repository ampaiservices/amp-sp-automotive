import { test, expect } from "bun:test";
import { captureAttribution, normalizeAttribution, analyticsAttribution } from "../lib/attribution";

const visit = (query = "", referrer = "") =>
  captureAttribution(`https://www.spmotorworks.com/paint-work${query}`, referrer);

test("recognizes observed AI hosts and strips private URL details", () => {
  for (const [host, provider] of [
    ["chatgpt.com", "chatgpt"],
    ["chat.openai.com", "chatgpt"],
    ["www.perplexity.ai", "perplexity"],
    ["claude.ai", "claude"],
    ["gemini.google.com", "gemini"],
    ["copilot.microsoft.com", "copilot"],
  ]) {
    const evidence = visit(
      "?email=private@example.com#photos",
      `https://${host}/private-chat?vehicle=secret`,
    );
    expect(evidence).toMatchObject({
      source_group: "ai_referral",
      source_evidence: "referrer",
      ai_provider: provider,
      referrer_host: host,
      landing_path: "/paint-work",
    });
    expect(JSON.stringify(evidence)).not.toMatch(/private|secret|photos|email|vehicle/);
  }
});

test("paid evidence takes priority over AI and referral evidence", () => {
  expect(visit("?utm_source=chatgpt&utm_medium=cpc", "https://perplexity.ai")).toMatchObject({
    source_group: "paid",
    source_evidence: "utm",
    ai_provider: "none",
  });
  for (const key of ["gclid", "gbraid", "wbraid", "msclkid"]) {
    expect(visit(`?${key}=abc123&utm_source=chatgpt`)).toMatchObject({
      source_group: "paid",
      source_evidence: "click_id",
      ai_provider: "none",
      [key]: "abc123",
    });
  }
});

test("Meta click markers alone do not prove paid traffic", () => {
  expect(visit("?fbclid=abc123")).toMatchObject({
    source_group: "campaign",
    source_evidence: "click_id",
  });
  expect(visit("?fbclid=abc123&utm_source=chatgpt&utm_medium=paid-social")).toMatchObject({
    source_group: "paid",
    source_evidence: "utm",
    ai_provider: "none",
  });
});

test("campaign evidence stays distinct from observed referrers and unknown traffic", () => {
  expect(visit("?utm_source=chatgpt.com")).toMatchObject({
    source_group: "ai_referral",
    source_evidence: "utm",
    ai_provider: "chatgpt",
  });
  expect(
    visit("?utm_source=newsletter&utm_campaign=fall_2026", "https://chatgpt.com"),
  ).toMatchObject({
    source_group: "campaign",
    source_evidence: "utm",
    ai_provider: "none",
    utm_campaign: "fall_2026",
  });
  expect(visit()).toMatchObject({ source_group: "direct_or_unknown", source_evidence: "none" });
  expect(visit("", "https://www.google.com/search?q=private")).toMatchObject({
    source_group: "organic_search",
  });
  expect(visit("", "https://bing.com/chat")).toMatchObject({
    source_group: "organic_search",
    ai_provider: "none",
  });
});

test("does not misclassify lookalike domains, internal referrers or invented client groups", () => {
  for (const host of ["chatgpt.com.evil.test", "fakechatgpt.com", "perplexity.ai.evil.test"])
    expect(visit("", `https://${host}`)).toMatchObject({
      source_group: "referral",
      ai_provider: "none",
    });
  for (const host of ["spmotorworks.com", "www.spmotorworks.com"])
    expect(visit("", `https://${host}/contact`)).toMatchObject({
      source_group: "direct_or_unknown",
      referrer_host: "",
    });
  expect(
    normalizeAttribution({
      source_group: "ai_referral",
      ai_provider: "chatgpt",
      referrer_host: "chatgpt.com/private?q=1",
    }),
  ).toMatchObject({ source_group: "direct_or_unknown", ai_provider: "none", referrer_host: "" });
  expect(visit("?utm_source=constructor")).toMatchObject({ source_group: "campaign" });
});

test("malformed optional evidence, unknown paths and private campaigns are bounded", () => {
  for (const value of [null, [], "oops", 123, { utm_source: {}, gclid: ["bad"] }])
    expect(() => normalizeAttribution(value)).not.toThrow();
  expect(
    normalizeAttribution({
      utm_source: "a".repeat(121),
      utm_campaign: "email@example.com",
      utm_content: "https://private.test",
      landing_path: "/customer/jane",
      referrer_host: "<script>",
    }),
  ).toEqual(normalizeAttribution(null));
  expect(
    captureAttribution("https://www.spmotorworks.com/builds/urus-1016?name=jane", "").landing_path,
  ).toBe("/builds");
  expect(
    analyticsAttribution({
      ...visit("?utm_source=chatgpt"),
      email: "private@example.com",
      photoUrls: ["https://photos.test/a"],
    }),
  ).toEqual({ source_group: "ai_referral", source_evidence: "utm", ai_provider: "chatgpt" });
  expect(
    analyticsAttribution({
      source_group: "private",
      source_evidence: "anything",
      ai_provider: "x",
    }),
  ).toEqual({});
});

test("missing landing paths remain unknown after normalization round trips", () => {
  const first = captureAttribution("https://www.spmotorworks.com/customer/private-id", "");
  expect(first.landing_path).toBe("");
  expect(normalizeAttribution(first).landing_path).toBe("");
});
