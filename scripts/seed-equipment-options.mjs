// One-off: populates the equipment_options library from equipment already
// stored on existing cars, so the admin checkbox list isn't empty at first.
// Run after scripts/migration-equipment-options.sql:
//   node --env-file=.env.local scripts/seed-equipment-options.mjs

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY env vars.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { data: cars, error: fetchError } = await supabase.from("cars").select("equipment");
if (fetchError) {
  console.error("Failed to load cars:", fetchError.message);
  process.exit(1);
}

const seen = new Set();
const rows = [];
for (const car of cars ?? []) {
  for (const group of car.equipment ?? []) {
    for (const item of group.items ?? []) {
      const dedupeKey = `${group.category}|${item}`;
      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey);
        rows.push({ category: group.category, item });
      }
    }
  }
}

if (rows.length === 0) {
  console.log("No equipment found on existing cars — nothing to seed.");
  process.exit(0);
}

const { error: upsertError } = await supabase
  .from("equipment_options")
  .upsert(rows, { onConflict: "category,item", ignoreDuplicates: true });

if (upsertError) {
  console.error("Seed failed:", upsertError.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} equipment options.`);
