"use client";

import { useState } from "react";
import type { EquipmentGroup } from "@/lib/types";

const CATEGORIES: EquipmentGroup["category"][] = [
  "Bezpečnostní systémy",
  "Asistenční systémy",
  "Zabezpečení vozidla",
  "Vnitřní výbava a komfort",
  "Palubní systémy a konektivita",
  "Sedadla",
  "Světelná technika",
  "Vnější výbava",
  "Pohon a podvozek",
  "Ostatní",
  "Speciální",
];

// Custom items added by hand here (not picked from the known catalog) go
// into their own category — no need to make the admin pick one each time.
const CUSTOM_ITEM_CATEGORY: EquipmentGroup["category"] = "Speciální";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function EquipmentEditor({
  value,
  onChange,
  options,
}: {
  value: EquipmentGroup[];
  onChange: (next: EquipmentGroup[]) => void;
  options: Record<string, string[]>;
}) {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<Record<string, string[]>>(options);
  const [newItem, setNewItem] = useState("");

  const getItems = (category: string) => value.find((g) => g.category === category)?.items ?? [];

  const getAvailableItems = (category: string) => {
    const known = localOptions[category] ?? [];
    const current = getItems(category);
    const all = Array.from(new Set([...known, ...current])).sort((a, b) => a.localeCompare(b, "cs"));
    const query = normalize(search.trim());
    if (!query) return all;
    return all.filter((item) => normalize(item).includes(query));
  };

  function toggleItem(category: EquipmentGroup["category"], item: string, checked: boolean) {
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

  function addNewItem() {
    const text = newItem.trim();
    if (!text) return;
    if (!getItems(CUSTOM_ITEM_CATEGORY).includes(text)) {
      toggleItem(CUSTOM_ITEM_CATEGORY, text, true);
    }
    setLocalOptions((o) => ({
      ...o,
      [CUSTOM_ITEM_CATEGORY]: o[CUSTOM_ITEM_CATEGORY]?.includes(text)
        ? o[CUSTOM_ITEM_CATEGORY]
        : [...(o[CUSTOM_ITEM_CATEGORY] ?? []), text],
    }));
    setNewItem("");
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Hledat ve výbavě…"
        className="mb-5 w-full border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CATEGORIES.map((category) => {
          const items = getAvailableItems(category);
          if (search.trim() && items.length === 0) return null;
          return (
            <div key={category}>
              <p className="mb-2 font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
                {category}
              </p>
              <div className="flex flex-col gap-1.5">
                {items.length > 0 ? (
                  items.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 font-sans text-[13px] text-graphite"
                    >
                      <input
                        type="checkbox"
                        checked={getItems(category).includes(item)}
                        onChange={(e) => toggleItem(category, item, e.target.checked)}
                        className="h-3.5 w-3.5 shrink-0 accent-graphite"
                      />
                      {item}
                    </label>
                  ))
                ) : (
                  <p className="font-sans text-xs text-graphite-faint">Zatím žádné položky.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-stone-200 pt-6">
        <p className="mb-2 font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
          Přidat novou položku (kategorie „{CUSTOM_ITEM_CATEGORY}“)
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewItem();
              }
            }}
            placeholder="Název položky…"
            className="w-full border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
          />
          <button
            type="button"
            onClick={addNewItem}
            className="shrink-0 border border-graphite/25 px-4 py-2 font-sans text-[13px] text-graphite hover:border-graphite"
          >
            + Přidat
          </button>
        </div>
      </div>
    </div>
  );
}
