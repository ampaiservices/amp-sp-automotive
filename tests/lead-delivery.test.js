import { test, expect, mock, beforeEach, afterEach } from "bun:test";

// All delivery boundaries are mocked. Never use production credentials or network.
process.env.CONTACT_RECIPIENT_EMAIL = "owner@example.test";
process.env.CONTACT_FROM_EMAIL = "forms@example.test";
process.env.RESEND_API_KEY = "re_mock";
process.env.SHEET_WEBHOOK_URL = "https://sheet.example.test/webhook";
process.env.NEXT_PUBLIC_SITE_URL = "https://www.spmotorworks.com";
let isBot = false;
const send = mock(async () => ({ error: null }));
mock.module("botid/server", () => ({ checkBotId: async () => ({ isBot }) }));
mock.module("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));
const routes = {
  contact: (await import("../app/api/contact/route")).POST,
  estimate: (await import("../app/api/estimate/route")).POST,
};
const originalFetch = globalThis.fetch;
const sheets = mock(async (url) => {
  if (url !== process.env.SHEET_WEBHOOK_URL) throw Error("Unexpected network destination");
  return new Response("{}", { status: 200 });
});
const payload = {
  name: "Test Owner",
  phone: "9410000000",
  email: "test@example.test",
  vehicle: "Test vehicle",
  description: "Test repair",
  photoUrls: ["https://photos.example.test/a.jpg"],
  attribution: {
    utm_source: "chatgpt",
    utm_campaign: "fall_2026",
    landing_path: "/paint-work",
    referrer_host: "chatgpt.com",
    source_group: "paid",
  },
};
function request(data) {
  return new Request("https://www.spmotorworks.com/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
beforeEach(() => {
  isBot = false;
  send.mockClear();
  send.mockImplementation(async () => ({ error: null }));
  sheets.mockClear();
  sheets.mockImplementation(async () => new Response("{}", { status: 200 }));
  globalThis.fetch = sheets;
});
afterEach(() => {
  globalThis.fetch = originalFetch;
});

for (const kind of ["contact", "estimate"]) {
  test(`${kind}: email + sheet receive validated evidence, response exposes only safe enums`, async () => {
    const res = await routes[kind](request(payload));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      attribution: { source_group: "ai_referral", source_evidence: "utm", ai_provider: "chatgpt" },
    });
    const notification = send.mock.calls[0][0];
    expect(notification.html).toContain("fall_2026");
    expect(notification.html).toContain("ai_referral");
    expect(
      notification.subject.startsWith(kind === "contact" ? "New lead" : "Estimate request"),
    ).toBe(true);
    const [url, options] = sheets.mock.calls[0];
    expect(url).toBe("https://sheet.example.test/webhook");
    const row = JSON.parse(options.body);
    expect(row).toMatchObject({
      kind,
      name: payload.name,
      photoUrls: payload.photoUrls[0],
      attribution: { source_group: "ai_referral", utm_campaign: "fall_2026" },
    });
    if (kind === "estimate") {
      expect(row.email).toBeUndefined();
      expect(row.description).toBeUndefined();
    }
  });

  test(`${kind}: BotID and invalid required fields prevent delivery`, async () => {
    isBot = true;
    expect((await routes[kind](request(payload))).status).toBe(403);
    isBot = false;
    expect((await routes[kind](request({ ...payload, name: "" }))).status).toBe(400);
    expect(
      (
        await routes[kind](
          new Request("https://www.spmotorworks.com", { method: "POST", body: "invalid" }),
        )
      ).status,
    ).toBe(400);
    expect(send).not.toHaveBeenCalled();
    expect(sheets).not.toHaveBeenCalled();
  });

  test(`${kind}: corrupt optional attribution does not lose a valid lead`, async () => {
    const res = await routes[kind](
      request({
        ...payload,
        attribution: {
          source_group: "ai_referral",
          utm_source: "<script>alert(1)</script>",
          referrer_host: "https://chatgpt.com/private",
        },
      }),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).attribution.source_group).toBe("direct_or_unknown");
    expect(send.mock.calls[0][0].html).not.toContain("<script>");
  });

  test(`${kind}: legacy request with no attribution remains deliverable`, async () => {
    const { attribution, ...legacy } = payload;
    void attribution;
    expect((await routes[kind](request(legacy))).status).toBe(200);
  });

  test(`${kind}: email failure requires retry; sheet failure stays nonfatal`, async () => {
    send.mockImplementation(async () => ({ error: { message: "mock rejection" } }));
    expect((await routes[kind](request(payload))).status).toBe(502);
    expect(sheets).toHaveBeenCalledTimes(1);
    send.mockImplementation(async () => ({ error: null }));
    sheets.mockImplementation(async () => {
      throw Error("mock sheet outage");
    });
    expect((await routes[kind](request(payload))).status).toBe(200);
  });
}
