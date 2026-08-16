"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { cars } from "@/lib/cars-data";
import {
  defaultFilterState,
  type FilterState,
} from "@/lib/filters";
import {
  bodyTypeLabels,
  drivetrainLabels,
  fuelLabels,
  statusLabels,
  transmissionLabels,
} from "@/lib/utils";
import type {
  BodyType,
  CarStatus,
  DrivetrainType,
  FuelType,
  TransmissionType,
} from "@/lib/types";
import { CheckRow, FilterGroupLabel, RangePair } from "./filter-controls";

export default function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (updater: (f: FilterState) => FilterState) => void;
  resultCount: number;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).sort(),
    []
  );

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-graphite/30 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
              <h2 className="font-display text-xl text-graphite">Všechny filtry</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Zavřít filtry"
                className="flex h-9 w-9 items-center justify-center text-graphite"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <section className="mb-8">
                <FilterGroupLabel>Značka</FilterGroupLabel>
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
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Cena (Kč)</FilterGroupLabel>
                <RangePair
                  min={filters.priceMin}
                  max={filters.priceMax}
                  onMinChange={(v) => setFilters((f) => ({ ...f, priceMin: v }))}
                  onMaxChange={(v) => setFilters((f) => ({ ...f, priceMax: v }))}
                  step={50000}
                />
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Rok výroby</FilterGroupLabel>
                <RangePair
                  minLabel="Od roku"
                  maxLabel="Do roku"
                  min={filters.yearMin}
                  max={filters.yearMax}
                  onMinChange={(v) => setFilters((f) => ({ ...f, yearMin: v }))}
                  onMaxChange={(v) => setFilters((f) => ({ ...f, yearMax: v }))}
                />
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Nájezd (km)</FilterGroupLabel>
                <RangePair
                  min={filters.mileageMin}
                  max={filters.mileageMax}
                  onMinChange={(v) => setFilters((f) => ({ ...f, mileageMin: v }))}
                  onMaxChange={(v) => setFilters((f) => ({ ...f, mileageMax: v }))}
                  step={1000}
                />
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Výkon (kW)</FilterGroupLabel>
                <RangePair
                  min={filters.powerMin}
                  max={filters.powerMax}
                  onMinChange={(v) => setFilters((f) => ({ ...f, powerMin: v }))}
                  onMaxChange={(v) => setFilters((f) => ({ ...f, powerMax: v }))}
                  step={10}
                />
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Palivo</FilterGroupLabel>
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
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Převodovka</FilterGroupLabel>
                {(Object.keys(transmissionLabels) as TransmissionType[]).map((t) => (
                  <CheckRow
                    key={t}
                    label={transmissionLabels[t]}
                    checked={filters.transmissions.includes(t)}
                    onChange={() =>
                      setFilters((f) => ({
                        ...f,
                        transmissions: toggle(f.transmissions, t),
                      }))
                    }
                  />
                ))}
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Pohon</FilterGroupLabel>
                {(Object.keys(drivetrainLabels) as DrivetrainType[]).map((d) => (
                  <CheckRow
                    key={d}
                    label={drivetrainLabels[d]}
                    checked={filters.drivetrains.includes(d)}
                    onChange={() =>
                      setFilters((f) => ({ ...f, drivetrains: toggle(f.drivetrains, d) }))
                    }
                  />
                ))}
              </section>

              <section className="mb-8">
                <FilterGroupLabel>Karoserie</FilterGroupLabel>
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
              </section>

              <section className="mb-8">
                <FilterGroupLabel>DPH</FilterGroupLabel>
                <CheckRow
                  label="Možnost odpočtu DPH"
                  checked={filters.vatDeductible}
                  onChange={(v) => setFilters((f) => ({ ...f, vatDeductible: v }))}
                />
              </section>

              <section>
                <FilterGroupLabel>Dostupnost</FilterGroupLabel>
                {(Object.keys(statusLabels) as CarStatus[]).map((s) => (
                  <CheckRow
                    key={s}
                    label={statusLabels[s]}
                    checked={filters.statuses.includes(s)}
                    onChange={() =>
                      setFilters((f) => ({ ...f, statuses: toggle(f.statuses, s) }))
                    }
                  />
                ))}
              </section>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-stone-200 px-6 py-5">
              <button
                type="button"
                onClick={() => setFilters(() => defaultFilterState)}
                className="font-sans text-sm uppercase tracking-[0.08em] text-graphite-soft hover:text-graphite"
              >
                Vymazat vše
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-graphite px-6 py-3.5 text-center font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent sm:flex-none"
              >
                Zobrazit {resultCount} vozů
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
