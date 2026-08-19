"use client";

import { useState } from "react";

export default function TagsEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const text = draft.trim();
    if (!text || value.includes(text)) return;
    onChange([...value, text]);
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...value];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      {value.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {value.map((tag, i) => (
            <div
              key={tag}
              className="flex items-center gap-2 border border-stone-200 bg-white px-3 py-1.5"
            >
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Posunout výš"
                  className="leading-none text-graphite-faint hover:text-graphite disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  aria-label="Posunout níž"
                  className="leading-none text-graphite-faint hover:text-graphite disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <span className="flex-1 font-sans text-sm text-graphite">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Odebrat ${tag}`}
                className="text-graphite-faint hover:text-status-reserved"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-sans text-sm text-graphite-faint">Zatím žádné štítky.</p>
      )}

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Přidat štítek…"
          className="w-full max-w-xs border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
        />
        <button
          type="button"
          onClick={addTag}
          className="shrink-0 border border-graphite/25 px-3 py-2 font-sans text-[13px] text-graphite hover:border-graphite"
        >
          +
        </button>
      </div>
    </div>
  );
}
