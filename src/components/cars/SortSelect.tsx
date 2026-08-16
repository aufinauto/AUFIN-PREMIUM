"use client";

import type { SortOption } from "@/lib/filters";

const options: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Nejnovější" },
  { value: "price-asc", label: "Cena od nejnižší" },
  { value: "price-desc", label: "Cena od nejvyšší" },
  { value: "mileage-asc", label: "Nejnižší nájezd" },
  { value: "power-desc", label: "Nejvyšší výkon" },
];

export default function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="cursor-pointer appearance-none border border-stone-200 bg-transparent py-2.5 pl-4 pr-9 font-sans text-[13px] text-graphite-soft transition-colors hover:border-graphite hover:text-graphite focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-graphite-soft"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
