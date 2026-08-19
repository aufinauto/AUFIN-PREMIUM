"use client";

import { useMemo } from "react";
import type { FilterState } from "@/lib/filters";
import { bodyTypeLabels, fuelLabels, formatPrice } from "@/lib/utils";
import type { BodyType, Car, FuelType } from "@/lib/types";
import Popover from "@/components/ui/Popover";
import { CheckRow, RangePair } from "./filter-controls";

const PRICE_PRESETS = [
  { label: "do 1 000 000 Kč", max: 1_000_000 },
  { label: "do 2 000 000 Kč", max: 2_000_000 },
  { label: "do 3 000 000 Kč", max: 3_000_000 },
];

function chevron(open: boolean) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const triggerClass =
  "inline-flex items-center gap-2 border border-stone-200 px-4 py-2.5 font-sans text-[13px] text-graphite-soft transition-colors hover:border-graphite hover:text-graphite";

export default function QuickFilterBar({
  cars,
  filters,
  setFilters,
  onOpenAll,
  activeCount,
}: {
  cars: Car[];
  filters: FilterState;
  setFilters: (updater: (f: FilterState) => FilterState) => void;
  onOpenAll: () => void;
  activeCount: number;
}) {
  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).sort(),
    [cars]
  );

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Popover
        trigger={({ open }) => (
          <span className={triggerClass}>
            Značka {filters.brands.length ? `(${filters.brands.length})` : ""}
            {chevron(open)}
          </span>
        )}
      >
        <div className="max-h-64 w-56 overflow-y-auto">
          {brands.map((brand) => (
            <CheckRow
              key={brand}
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() =>
                setFilters((f) => ({ ...f, brands: toggle(f.brands, brand) }))
              }
            />
          ))}
        </div>
      </Popover>

      <Popover
        trigger={({ open }) => (
          <span className={triggerClass}>
            Cena {filters.priceMax != null ? `(${formatPrice(filters.priceMax)})` : ""}
            {chevron(open)}
          </span>
        )}
      >
        <div className="w-64">
          {PRICE_PRESETS.map((p) => (
            <CheckRow
              key={p.label}
              label={p.label}
              checked={filters.priceMax === p.max}
              onChange={(checked) =>
                setFilters((f) => ({ ...f, priceMax: checked ? p.max : null }))
              }
            />
          ))}
          <div className="mt-3 border-t border-stone-100 pt-3">
            <RangePair
              min={filters.priceMin}
              max={filters.priceMax}
              onMinChange={(v) => setFilters((f) => ({ ...f, priceMin: v }))}
              onMaxChange={(v) => setFilters((f) => ({ ...f, priceMax: v }))}
              step={50000}
            />
          </div>
        </div>
      </Popover>

      <Popover
        trigger={({ open }) => (
          <span className={triggerClass}>
            Rok {filters.yearMin ? `(od ${filters.yearMin})` : ""}
            {chevron(open)}
          </span>
        )}
      >
        <div className="w-56">
          <RangePair
            minLabel="Od roku"
            maxLabel="Do roku"
            min={filters.yearMin}
            max={filters.yearMax}
            onMinChange={(v) => setFilters((f) => ({ ...f, yearMin: v }))}
            onMaxChange={(v) => setFilters((f) => ({ ...f, yearMax: v }))}
          />
        </div>
      </Popover>

      <Popover
        trigger={({ open }) => (
          <span className={triggerClass}>
            Karoserie {filters.bodyTypes.length ? `(${filters.bodyTypes.length})` : ""}
            {chevron(open)}
          </span>
        )}
      >
        <div className="w-56">
          {(Object.keys(bodyTypeLabels) as BodyType[]).map((bt) => (
            <CheckRow
              key={bt}
              label={bodyTypeLabels[bt]}
              checked={filters.bodyTypes.includes(bt)}
              onChange={() =>
                setFilters((f) => ({ ...f, bodyTypes: toggle(f.bodyTypes, bt) }))
              }
            />
          ))}
        </div>
      </Popover>

      <Popover
        trigger={({ open }) => (
          <span className={triggerClass}>
            Palivo {filters.fuels.length ? `(${filters.fuels.length})` : ""}
            {chevron(open)}
          </span>
        )}
      >
        <div className="w-56">
          {(Object.keys(fuelLabels) as FuelType[]).map((fuel) => (
            <CheckRow
              key={fuel}
              label={fuelLabels[fuel]}
              checked={filters.fuels.includes(fuel)}
              onChange={() =>
                setFilters((f) => ({ ...f, fuels: toggle(f.fuels, fuel) }))
              }
            />
          ))}
        </div>
      </Popover>

      <button
        type="button"
        onClick={onOpenAll}
        className="inline-flex items-center gap-2 border border-graphite px-4 py-2.5 font-sans text-[13px] text-graphite transition-colors hover:bg-graphite hover:text-white"
      >
        Všechny filtry
        {activeCount > 0 ? (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-white">
            {activeCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
