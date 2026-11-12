# Lead webhooks → Google Sheet (Apps Script)

Both lead funnels (`/contact` and `/estimate`) post submissions to the same Apps Script webhook. The script reads the `kind` field on each payload and appends to the matching tab — `Leads` for `kind: "contact"`, `Estimates` for `kind: "estimate"`. Resend sends the email to Serge in parallel; the sheet is the searchable backup.

## One-time setup

1. In the shared agency workspace, create a Google Sheet titled `SP Automotive — Leads`.
2. Create two tabs:
   - **`Leads`** — headers (row 1, columns A → G):
     `timestamp · name · phone · email · vehicle · description · photoUrls`
   - **`Estimates`** — headers (row 1, columns A → E):
     `timestamp · name · phone · vehicle · photoUrls`
3. Open **Extensions → Apps Script** from the sheet. Paste the script from below.
4. Click **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy the resulting Web app URL. Paste it into Vercel env as `SHEET_WEBHOOK_URL` for both Production and Preview.

## Apps Script

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.kind === "estimate") {
    const sheet = ss.getSheetByName("Estimates");
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.vehicle || "",
      data.photoUrls || "",
    ]);
  } else {
    // Default: contact funnel. Treat anything without a recognized kind as
    // contact so old payloads don't fail silently.
    const sheet = ss.getSheetByName("Leads");
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.vehicle || "",
      data.description || "",
      data.photoUrls || "",
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Re-deploying after a change

Edit the script, then **Deploy → Manage deployments → ✏ → New version → Deploy**. The URL stays the same.

## Attribution columns (application release + Apps Script update)

The application sends validated evidence as nested `data.attribution`. Old deployments ignore this object because their append arrays have fixed columns. To save it, append these headers after the existing seven contact columns (H → V) and five estimate columns (F → T), in this exact order:

`source_group · source_evidence · ai_provider · landing_path · referrer_host · utm_source · utm_medium · utm_campaign · utm_content · utm_term · gclid · gbraid · wbraid · msclkid · fbclid`

Replace `doPost` with the following script, then update the existing deployment to a **New version**. Keep the current URL. Existing columns/rows retain their positions; old application payloads produce blank attribution cells. Stage this with a test Sheet before updating the production script.

```js
function attributionCells(data) {
  const a = data.attribution || {};
  return [
    "source_group", "source_evidence", "ai_provider", "landing_path", "referrer_host",
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "gclid", "gbraid", "wbraid", "msclkid", "fbclid",
  ].map(function (key) { return a[key] || ""; });
}

function sheetText(value) {
  // The webhook is public. Treat every string as text, including legacy fields.
  const text = String(value == null ? "" : value);
  return /^[\s]*[=+@-]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const estimate = data.kind === "estimate";
  const base = estimate
    ? [data.timestamp || new Date().toISOString(), data.name, data.phone, data.vehicle, data.photoUrls]
    : [data.timestamp || new Date().toISOString(), data.name, data.phone, data.email, data.vehicle, data.description, data.photoUrls];
  ss.getSheetByName(estimate ? "Estimates" : "Leads")
    .appendRow(base.concat(attributionCells(data)).map(sheetText));
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Verification

Automated repository tests exercise both API routes with mocked email/Sheet delivery. `tests/apps-script.test.js` checks the attribution script's column order, legacy fallback, tab selection and formula escaping in a mocked Apps Script runtime. No production request is needed for these checks.

For an authorized staging integration check, use fake customer fields and a test Sheet/mailbox. Submit each form once with `?utm_source=chatgpt&utm_medium=referral&utm_campaign=staging_test`, confirm the original columns and 15 new columns, and compare the notification with the returned conversion event. Repeat with no evidence (`direct_or_unknown`) and with `utm_medium=cpc` (`paid`). Test a real upload in a BotID-supported preview environment. No live submissions, script deployment or external mappings were changed by the coding task.

See `docs/ai-search-attribution.md` for capture lifetime, source precedence, privacy limits, GA4/GTM mapping and owner verification items.
