// One-off migration: re-buckets each existing car's equipment items into the
// new Sauto-derived category taxonomy (src/lib/types.ts), per item — not
// just renaming the old group headers, since a couple of old groups mixed
// items that now belong in two different new categories (e.g. old
// "Bezpečnost" held both alarm/locking items and ABS/ESP items).
//
// Usage: node scripts/migrate-car-equipment-categories.mjs

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnvLocal();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// Exact items already in the equipment_options catalog map straight to their
// category there. These items don't (their car listing used slightly
// different wording than Sauto's exact catalog) — mapped by hand instead of
// guessed, based on what the item actually is.
const OVERRIDES = {
  "Vyhřívání sedadel": "Sedadla",
  "Paměťová sedadla": "Sedadla",
  Klimatizace: "Vnitřní výbava a komfort",
  "Elektricky sklopné tažné zařízení": "Vnější výbava",
  "Elektricky ovládaná okna": "Vnitřní výbava a komfort",
  "Elektricky nastavitelná sedadla": "Sedadla",
  "Apple CarPlay / Android Auto": "Palubní systémy a konektivita",
  "Bang & Olufsen 3D Sound": "Palubní systémy a konektivita",
  "Head-up displej": "Palubní systémy a konektivita",
  Navigace: "Palubní systémy a konektivita",
  "Virtual Cockpit": "Palubní systémy a konektivita",
  "Couvací kamera": "Asistenční systémy",
  "Asistent jízdy v pruhu": "Asistenční systémy",
  "Asistent parkování": "Asistenční systémy",
  '21" kola': "Vnější výbava",
  "LED Digital Light": "Světelná technika",
  "LED Laserlight": "Světelná technika",
  "LED Matrix světlomety": "Světelná technika",
  Alcantara: "Sedadla",
  "Ambientní osvětlení": "Vnitřní výbava a komfort",
};

async function loadCatalogCategoryMap() {
  const { data, error } = await supabase.from("equipment_options").select("category, item");
  if (error) throw new Error(error.message);
  const map = new Map();
  for (const row of data) map.set(row.item, row.category);
  return map;
}

function regroup(equipment, catalogMap) {
  const byCategory = new Map();
  for (const group of equipment) {
    for (const item of group.items) {
      const category = catalogMap.get(item) ?? OVERRIDES[item] ?? "Ostatní";
      const items = byCategory.get(category) ?? [];
      if (!items.includes(item)) items.push(item);
      byCategory.set(category, items);
    }
  }
  return Array.from(byCategory, ([category, items]) => ({ category, items }));
}

const catalogMap = await loadCatalogCategoryMap();
const { data: cars, error } = await supabase.from("cars").select("id, slug, equipment");
if (error) {
  console.error(error.message);
  process.exit(1);
}

for (const car of cars) {
  const next = regroup(car.equipment ?? [], catalogMap);
  const { error: updateError } = await supabase
    .from("cars")
    .update({ equipment: next })
    .eq("id", car.id);
  if (updateError) {
    console.error(`Failed to update ${car.slug}:`, updateError.message);
    continue;
  }
  console.log(`${car.slug}: regrouped into ${next.length} categories`);
}

console.log("Done.");
