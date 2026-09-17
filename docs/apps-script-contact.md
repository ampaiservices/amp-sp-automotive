# Lead webhooks → Google Sheet (Apps Script)

Both lead funnels (`/contact` and `/estimate`) post submissions to the same Apps Script webhook. The script reads the `kind` field on each payload and appends to the matching tab — `Leads` for `kind: "contact"`, `Estimates` for `kind: "estimate"`. Resend sends the email to Serge in parallel; the sheet is the searchable backup.

## One-time setup

1. In the shared agency workspace, create a Google Sheet titled `SP Automotive — Leads`.
2. Create two tabs:
   - **`Leads`** — headers (row 1, columns A → H):
     `timestamp · name · phone · email · vehicle · description · photoUrls · source`
   - **`Estimates`** — headers (row 1, columns A → E):
     `timestamp · name · phone · vehicle · photoUrls · source`
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
      data.source || "",
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
      data.source || "",
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Re-deploying after a change

Edit the script, then **Deploy → Manage deployments → ✏ → New version → Deploy**. The URL stays the same.

## Verification

After deploy, run from a terminal:

```bash
# Contact (lands in the Leads tab)
curl -X POST -H "Content-Type: application/json" \
  -d '{"kind":"contact","timestamp":"2026-01-01T00:00:00Z","name":"Test","phone":"941","email":"t@t","vehicle":"Test","description":"Test","photoUrls":""}' \
  "$SHEET_WEBHOOK_URL"

# Estimate (lands in the Estimates tab)
curl -X POST -H "Content-Type: application/json" \
  -d '{"kind":"estimate","timestamp":"2026-01-01T00:00:00Z","name":"Test","phone":"941","vehicle":"Test","photoUrls":""}' \
  "$SHEET_WEBHOOK_URL"
```

Expected: a new row in the matching tab and `{"ok":true}` returned for each.
