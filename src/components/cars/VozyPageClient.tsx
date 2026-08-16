"use client";

import { useMemo, useState } from "react";
import { cars } from "@/lib/cars-data";
import {
  applyFilters,
  countActiveFilters,
  defaultFilterState,
  type FilterState,
} from "@/lib/filters";
import QuickFilterBar from "./QuickFilterBar";
import FilterDrawer from "./FilterDrawer";
import ActiveChips from "./ActiveChips";
import SortSelect from "./SortSelect";
import CarGrid from "./CarGrid";

export default function VozyPageClient({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [filters, setFiltersState] = useState<FilterState>({
    ...defaultFilterState,
    query: initialQuery,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setFilters = (updater: (f: FilterState) => FilterState) =>
    setFiltersState((prev) => updater(prev));

  const filteredCars = useMemo(() => applyFilters(cars, filters), [filters]);
  const activeCount = countActiveFilters(filters);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-4 lg:px-10">
      <div className="sticky top-16 z-20 -mx-6 border-b border-stone-200 bg-paper/95 px-6 py-4 backdrop-blur-md lg:top-[65px] lg:mx-0 lg:rounded-none lg:border lg:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={filters.query}
              onChange={(e) =>
                setFilters((f) => ({ ...f, query: e.target.value }))
              }
              placeholder="Hledat podle značky nebo modelu…"
              className="w-full max-w-xs border-b border-stone-200 bg-transparent py-2 font-sans text-sm text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none lg:max-w-sm"
            />
            <div className="ml-auto hidden lg:block">
              <SortSelect
                value={filters.sort}
                onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
              />
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-between">
            <QuickFilterBar
              filters={filters}
              setFilters={setFilters}
              onOpenAll={() => setDrawerOpen(true)}
              activeCount={activeCount}
            />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 border border-graphite px-4 py-2.5 font-sans text-[13px] uppercase tracking-[0.06em] text-graphite"
            >
              Filtr
              {activeCount > 0 ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-white">
                  {activeCount}
                </span>
              ) : null}
            </button>
            <SortSelect
              value={filters.sort}
              onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
            />
          </div>

          <ActiveChips filters={filters} setFilters={setFilters} />
        </div>
      </div>

      <p className="mt-6 font-sans text-sm text-graphite-soft">
        {filteredCars.length} {filteredCars.length === 1 ? "vůz" : "vozů"}
      </p>

      <div className="mt-8">
        <CarGrid cars={filteredCars} />
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resultCount={filteredCars.length}
      />
    </div>
  );
}
