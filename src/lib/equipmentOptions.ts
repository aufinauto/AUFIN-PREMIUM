import "server-only";
import { cache } from "react";
import { supabaseAdmin } from "./supabaseClient";
import type { EquipmentGroup } from "./types";

export const getEquipmentOptions = cache(async function getEquipmentOptions(): Promise<
  Record<string, string[]>
> {
  const { data, error } = await supabaseAdmin
    .from("equipment_options")
    .select("category, item")
    .order("item", { ascending: true });
  if (error) throw new Error(`Failed to load equipment options: ${error.message}`);

  const options: Record<string, string[]> = {};
  for (const row of data ?? []) {
    const category = row.category as string;
    (options[category] ??= []).push(row.item as string);
  }
  return options;
});

export async function addEquipmentOptions(equipment: EquipmentGroup[]): Promise<void> {
  const rows = equipment.flatMap((group) =>
    group.items.map((item) => ({ category: group.category, item }))
  );
  if (rows.length === 0) return;

  const { error } = await supabaseAdmin
    .from("equipment_options")
    .upsert(rows, { onConflict: "category,item", ignoreDuplicates: true });
  if (error) throw new Error(`Failed to save equipment options: ${error.message}`);
}
