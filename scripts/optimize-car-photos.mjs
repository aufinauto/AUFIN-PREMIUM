// One-off: shrinks car photos already stored in the Supabase `car-photos`
// bucket (phone originals ~5 MB / 4000+ px) to 2560 px high-quality JPEGs,
// in place — same path, so URLs saved in the `cars` table keep working.
// Every original is first downloaded to BACKUP_DIR.
//
//   node scripts/optimize-car-photos.mjs --dry-run   # only report
//   node scripts/optimize-car-photos.mjs             # backup + replace
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "car-photos";
const MAX_EDGE = 2560;
const QUALITY = 88;
const SKIP_BELOW_BYTES = 1_200_000; // already small enough
const BACKUP_DIR = path.resolve("..", "Dejvetech web zaloha fotek aut");
const dryRun = process.argv.includes("--dry-run");

const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^"|"$/g, "")])
);
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
sharp.cache(false);

const { data: folders, error } = await sb.storage.from(BUCKET).list("", { limit: 1000 });
if (error) throw error;

let before = 0;
let after = 0;
let done = 0;
for (const folder of folders) {
  const { data: files } = await sb.storage.from(BUCKET).list(folder.name, { limit: 1000 });
  for (const file of files ?? []) {
    const key = `${folder.name}/${file.name}`;
    const size = file.metadata?.size ?? 0;
    if (size < SKIP_BELOW_BYTES) continue;

    const { data: blob, error: dlError } = await sb.storage.from(BUCKET).download(key);
    if (dlError) {
      console.error("download failed", key, dlError.message);
      continue;
    }
    const original = Buffer.from(await blob.arrayBuffer());

    const optimized = await sharp(original)
      .rotate() // bake in EXIF orientation
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();

    if (optimized.length >= original.length) continue;
    before += original.length;
    after += optimized.length;
    done++;
    console.log(
      `${dryRun ? "[dry] " : ""}${key}: ${(original.length / 1e6).toFixed(1)} MB -> ${(optimized.length / 1e6).toFixed(2)} MB`
    );
    if (dryRun) continue;

    const backupPath = path.join(BACKUP_DIR, folder.name, file.name);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.writeFileSync(backupPath, original);

    const { error: upError } = await sb.storage.from(BUCKET).upload(key, optimized, {
      contentType: "image/jpeg",
      upsert: true,
      cacheControl: "31536000",
    });
    if (upError) console.error("upload failed", key, upError.message);
  }
}

console.log(
  `\n${dryRun ? "[dry run] " : ""}${done} fotek: ${(before / 1e6).toFixed(0)} MB -> ${(after / 1e6).toFixed(0)} MB` +
    (dryRun ? "" : `\nZáloha originálů: ${BACKUP_DIR}`)
);
