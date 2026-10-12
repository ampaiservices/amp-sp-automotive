// Convert JPGs to WebP with sharp (originals are deleted).
//
//   node scripts/jpg-to-webp.ts public/hero-clips/frames
//   node scripts/jpg-to-webp.ts public/chapter-clips/05-workshop-poster.jpg
//
// Arguments may be directories (every *.jpg inside is converted) or single
// files. Paths are relative to the repo root. Quality 82 keeps the hero
// scrub frames visually indistinguishable from the q:v 1 JPEG source at
// roughly half the bytes; WebP (not AVIF) because the scrub decodes up to
// 60 frames/sec and WebP decodes markedly faster.
// Run under Node (sharp hangs under Bun on some machines).
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, resolve } from "node:path";

const QUALITY = 82;

function collect(target: string): string[] {
  if (statSync(target).isDirectory()) {
    return readdirSync(target)
      .filter((f) => f.endsWith(".jpg"))
      .sort()
      .map((f) => join(target, f));
  }
  return target.endsWith(".jpg") ? [target] : [];
}

async function main() {
  const targets = process.argv.slice(2);
  if (!targets.length) {
    console.error("Usage: node scripts/jpg-to-webp.ts <dir-or-file> [...]");
    process.exit(1);
  }
  // Dedupe: a directory plus a file inside it must not convert twice.
  const files = [...new Set(targets.flatMap(collect).map((f) => resolve(f)))];
  console.log(`Converting ${files.length} JPGs to WebP (q${QUALITY})...`);
  let totalIn = 0;
  let totalOut = 0;
  for (const inPath of files) {
    const outPath = inPath.replace(/\.jpg$/, ".webp");
    totalIn += statSync(inPath).size;
    await sharp(inPath).webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
    totalOut += statSync(outPath).size;
    unlinkSync(inPath);
  }
  console.log(
    `Done. JPG total: ${(totalIn / 1024 / 1024).toFixed(1)} MB -> WebP total: ${(totalOut / 1024 / 1024).toFixed(1)} MB`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
