"use client";

import { useState } from "react";
import type { EquipmentGroup } from "@/lib/types";

const CATEGORIES: EquipmentGroup["category"][] = [
  "Komfort",
  "Technologie",
  "Bezpečnost",
  "Asistenti",
  "Sport",
  "Exteriér",
  "Interiér",
];

export default function EquipmentEditor({
  value,
  onChange,
  options,
}: {
  value: EquipmentGroup[];
  onChange: (next: EquipmentGroup[]) => void;
  options: Record<string, string[]>;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [localOptions, setLocalOptions] = useState<Record<string, string[]>>(options);

  const getItems = (category: string) =>
    value.find((g) => g.category === category)?.items ?? [];

  const getAvailableItems = (category: string) => {
    const known = localOptions[category] ?? [];
    const current = getItems(category);
    return Array.from(new Set([...known, ...current])).sort((a, b) => a.localeCompare(b, "cs"));
  };

  function toggleItem(category: EquipmentGroup["category"], item: string, checked: boolean) {
    if (checked) {
      const existing = value.find((g) => g.category === category);
      const next = existing
        ? value.map((g) =>
            g.category === category ? { ...g, items: [...g.items, item] } : g
          )
        : [...value, { category, items: [item] }];
      onChange(next);
    } else {
      onChange(
        value.map((g) =>
          g.category === category ? { ...g, items: g.items.filter((i) => i !== item) } : g
        )
      );
    }
  }

  function addItem(category: EquipmentGroup["category"]) {
    const text = (drafts[category] ?? "").trim();
    if (!text) return;
    if (!getItems(category).includes(text)) {
      toggleItem(category, text, true);
    }
    setLocalOptions((o) => ({
      ...o,
      [category]: o[category]?.includes(text) ? o[category] : [...(o[category] ?? []), text],
    }));
    setDrafts((d) => ({ ...d, [category]: "" }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {CATEGORIES.map((category) => (
        <div key={category}>
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
            {category}
          </p>
          <div className="flex flex-col gap-1.5">
            {getAvailableItems(category).length > 0 ? (
              getAvailableItems(category).map((item) => (
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
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={drafts[category] ?? ""}
              onChange={(e) => setDrafts((d) => ({ ...d, [category]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem(category);
                }
              }}
              placeholder="Přidat novou položku…"
              className="w-full border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem(category)}
              className="shrink-0 border border-graphite/25 px-3 py-2 font-sans text-[13px] text-graphite hover:border-graphite"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
