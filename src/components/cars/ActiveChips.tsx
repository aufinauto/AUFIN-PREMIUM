"use client";

import { defaultFilterState, type FilterState } from "@/lib/filters";
import {
  bodyTypeLabels,
  drivetrainLabels,
  formatPrice,
  fuelLabels,
  statusLabels,
  transmissionLabels,
} from "@/lib/utils";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

export default function ActiveChips({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: (updater: (f: FilterState) => FilterState) => void;
}) {
  const chips: Chip[] = [];

  filters.brands.forEach((b) =>
    chips.push({
      key: `brand-${b}`,
      label: b,
      onRemove: () =>
        setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
    })
  );
  filters.bodyTypes.forEach((bt) =>
    chips.push({
      key: `body-${bt}`,
      label: bodyTypeLabels[bt],
      onRemove: () =>
        setFilters((f) => ({ ...f, bodyTypes: f.bodyTypes.filter((x) => x !== bt) })),
    })
  );
  filters.fuels.forEach((fuel) =>
    chips.push({
      key: `fuel-${fuel}`,
      label: fuelLabels[fuel],
      onRemove: () =>
        setFilters((f) => ({ ...f, fuels: f.fuels.filter((x) => x !== fuel) })),
    })
  );
  filters.transmissions.forEach((t) =>
    chips.push({
      key: `trans-${t}`,
      label: transmissionLabels[t],
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          transmissions: f.transmissions.filter((x) => x !== t),
        })),
    })
  );
  filters.drivetrains.forEach((d) =>
    chips.push({
      key: `drive-${d}`,
      label: drivetrainLabels[d],
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          drivetrains: f.drivetrains.filter((x) => x !== d),
        })),
    })
  );
  filters.statuses.forEach((s) =>
    chips.push({
      key: `status-${s}`,
      label: statusLabels[s],
      onRemove: () =>
        setFilters((f) => ({ ...f, statuses: f.statuses.filter((x) => x !== s) })),
    })
  );
  if (filters.yearMin != null) {
    chips.push({
      key: "year",
      label: `${filters.yearMin}+`,
      onRemove: () => setFilters((f) => ({ ...f, yearMin: null, yearMax: null })),
    });
  }
  if (filters.priceMax != null) {
    chips.push({
      key: "price",
      label: `do ${formatPrice(filters.priceMax)}`,
      onRemove: () => setFilters((f) => ({ ...f, priceMin: null, priceMax: null })),
    });
  }
  if (filters.vatDeductible) {
    chips.push({
      key: "vat",
      label: "Odpočet DPH",
      onRemove: () => setFilters((f) => ({ ...f, vatDeductible: false })),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-2 border border-stone-200 bg-stone-50 px-3 py-1.5 font-sans text-xs text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
        >
          {chip.label}
          <span aria-hidden>×</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => setFilters(() => defaultFilterState)}
        className="font-sans text-xs uppercase tracking-[0.1em] text-accent hover:text-graphite"
      >
        Vymazat vše
      </button>
    </div>
  );
}
