import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
const scripts = [
  ...readFileSync(new URL("../docs/apps-script-contact.md", import.meta.url), "utf8").matchAll(
    /```js\n([\s\S]*?)```/g,
  ),
];
const script = scripts.at(-1)[1];
function append(data) {
  let row, tab;
  const context = {
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName(name) {
          tab = name;
          return {
            appendRow(value) {
              row = Array.from(value);
            },
          };
        },
      }),
    },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: () => ({
        setMimeType() {
          return "ok";
        },
      }),
    },
  };
  runInNewContext(script, context);
  context.doPost({ postData: { contents: JSON.stringify(data) } });
  return { row, tab };
}

test("documented Sheet script appends attribution without shifting legacy columns", () => {
  const base = {
    timestamp: "test",
    name: "Owner",
    phone: "941",
    email: "test@example.test",
    vehicle: "Car",
    description: "Repair",
    photoUrls: "https://photo.test",
  };
  const attribution = Object.fromEntries(
    [
      "source_group",
      "source_evidence",
      "ai_provider",
      "landing_path",
      "referrer_host",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
      "msclkid",
      "fbclid",
    ].map((key) => [key, `value_${key}`]),
  );
  for (const kind of ["contact", "estimate"]) {
    const { row, tab } = append({ ...base, kind, attribution });
    const length = kind === "contact" ? 7 : 5;
    expect(tab).toBe(kind === "contact" ? "Leads" : "Estimates");
    expect(row.slice(0, length)).toEqual(
      kind === "contact"
        ? Object.values(base)
        : [base.timestamp, base.name, base.phone, base.vehicle, base.photoUrls],
    );
    expect(row.slice(length)).toEqual(Object.values(attribution));
    expect(append({ ...base, kind }).row.slice(length)).toEqual(Array(15).fill(""));
  }
});

test("documented Sheet script neutralizes formula cells, including public webhook evidence", () => {
  const { row } = append({
    kind: "estimate",
    name: "=IMPORTXML()",
    phone: "+1941",
    attribution: { utm_source: " @formula" },
  });
  expect(row[1]).toBe("'=IMPORTXML()");
  expect(row[2]).toBe("'+1941");
  expect(row[10]).toBe("' @formula");
});
