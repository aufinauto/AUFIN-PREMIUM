"use client";

import { useMemo, useState } from "react";
import type { EquipmentGroup } from "@/lib/types";

// Category is still tracked per item under the hood (kept for the shared
// equipment_options catalog in Supabase), just not surfaced here — the
// admin sees one flat, checkable list instead of category sections.
const FALLBACK_CATEGORY: EquipmentGroup["category"] = "Ostatní";

export default function EquipmentEditor({
  value,
  onChange,
  options,
}: {
  value: EquipmentGroup[];
  onChange: (next: EquipmentGroup[]) => void;
  options: Record<string, string[]>;
}) {
  const [draft, setDraft] = useState("");
  const [localOptions, setLocalOptions] = useState<Record<string, string[]>>(options);

  const itemToCategory = useMemo(() => {
    const map = new Map<string, string>();
    for (const [category, items] of Object.entries(localOptions)) {
      for (const item of items) map.set(item, category);
    }
    for (const group of value) {
      for (const item of group.items) {
        if (!map.has(item)) map.set(item, group.category);
      }
    }
    return map;
  }, [localOptions, value]);

  const checkedItems = useMemo(() => new Set(value.flatMap((g) => g.items)), [value]);

  const allItems = useMemo(() => {
    const set = new Set<string>([...itemToCategory.keys(), ...checkedItems]);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "cs"));
  }, [itemToCategory, checkedItems]);

  function toggleItem(item: string, checked: boolean) {
    const category = (itemToCategory.get(item) ?? FALLBACK_CATEGORY) as EquipmentGroup["category"];
    if (checked) {
      const existing = value.find((g) => g.category === category);
      const next = existing
        ? value.map((g) => (g.category === category ? { ...g, items: [...g.items, item] } : g))
        : [...value, { category, items: [item] }];
      onChange(next);
    } else {
      onChange(
        value
          .map((g) =>
            g.category === category ? { ...g, items: g.items.filter((i) => i !== item) } : g
          )
          .filter((g) => g.items.length > 0)
      );
    }
  }

  function addItem() {
    const text = draft.trim();
    if (!text) return;
    if (!checkedItems.has(text)) toggleItem(text, true);
    setLocalOptions((o) => ({
      ...o,
      [FALLBACK_CATEGORY]: o[FALLBACK_CATEGORY]?.includes(text)
        ? o[FALLBACK_CATEGORY]
        : [...(o[FALLBACK_CATEGORY] ?? []), text],
    }));
    setDraft("");
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
        {allItems.length > 0 ? (
          allItems.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 font-sans text-[13px] text-graphite"
            >
              <input
                type="checkbox"
                checked={checkedItems.has(item)}
                onChange={(e) => toggleItem(item, e.target.checked)}
                className="h-3.5 w-3.5 shrink-0 accent-graphite"
              />
              {item}
            </label>
          ))
        ) : (
          <p className="font-sans text-xs text-graphite-faint">Zatím žádné položky.</p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder="Přidat novou položku…"
          className="w-full border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
        />
        <button
          type="button"
          onClick={addItem}
          className="shrink-0 border border-graphite/25 px-3 py-2 font-sans text-[13px] text-graphite hover:border-graphite"
        >
          +
        </button>
      </div>
    </div>
  );
}
