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
}: {
  value: EquipmentGroup[];
  onChange: (next: EquipmentGroup[]) => void;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const getItems = (category: string) =>
    value.find((g) => g.category === category)?.items ?? [];

  function addItem(category: EquipmentGroup["category"]) {
    const text = (drafts[category] ?? "").trim();
    if (!text) return;
    const existing = value.find((g) => g.category === category);
    const next = existing
      ? value.map((g) =>
          g.category === category ? { ...g, items: [...g.items, text] } : g
        )
      : [...value, { category, items: [text] }];
    onChange(next);
    setDrafts((d) => ({ ...d, [category]: "" }));
  }

  function removeItem(category: string, item: string) {
    onChange(
      value.map((g) =>
        g.category === category ? { ...g, items: g.items.filter((i) => i !== item) } : g
      )
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {CATEGORIES.map((category) => (
        <div key={category}>
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
            {category}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {getItems(category).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 border border-stone-200 bg-white px-2.5 py-1 font-sans text-[12px] text-graphite"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeItem(category, item)}
                  aria-label={`Odebrat ${item}`}
                  className="text-graphite-faint hover:text-status-reserved"
                >
                  ×
                </button>
              </span>
            ))}
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
              placeholder="Přidat položku…"
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
