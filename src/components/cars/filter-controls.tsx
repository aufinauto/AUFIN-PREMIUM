"use client";

import type { ReactNode } from "react";

export function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2 font-sans text-sm text-graphite-soft transition-colors hover:text-graphite">
      <span className="flex items-center gap-3">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
            checked ? "border-graphite bg-graphite" : "border-graphite/30"
          }`}
        >
          {checked ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M4 12l6 6L20 6" />
            </svg>
          ) : null}
        </span>
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </label>
  );
}

export function RangePair({
  minLabel = "Od",
  maxLabel = "Do",
  min,
  max,
  onMinChange,
  onMaxChange,
  step = 1,
}: {
  minLabel?: string;
  maxLabel?: string;
  min: number | null;
  max: number | null;
  onMinChange: (v: number | null) => void;
  onMaxChange: (v: number | null) => void;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        step={step}
        placeholder={minLabel}
        value={min ?? ""}
        onChange={(e) => onMinChange(e.target.value === "" ? null : Number(e.target.value))}
        className="w-full border border-stone-200 bg-transparent px-3 py-2.5 font-sans text-sm text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
      />
      <span className="h-px w-3 shrink-0 bg-stone-300" />
      <input
        type="number"
        step={step}
        placeholder={maxLabel}
        value={max ?? ""}
        onChange={(e) => onMaxChange(e.target.value === "" ? null : Number(e.target.value))}
        className="w-full border border-stone-200 bg-transparent px-3 py-2.5 font-sans text-sm text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
      />
    </div>
  );
}

export function FilterGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
      {children}
    </p>
  );
}
