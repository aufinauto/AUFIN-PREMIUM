"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Car } from "@/lib/types";
import { displayName, formatMileage, formatPrice } from "@/lib/utils";

export default function HeaderSearch({ cars }: { cars: Car[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = useMemo(() => {
    if (query.trim().length < 1) return [];
    const q = query.toLowerCase();
    return cars
      .filter((car) => displayName(car).toLowerCase().includes(q))
      .slice(0, 5);
  }, [cars, query]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Hledat vozy"
        className="flex h-9 w-9 items-center justify-center text-graphite transition-colors hover:text-accent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-12 w-[92vw] max-w-sm border border-stone-200 bg-white/95 p-2 shadow-[0_20px_60px_-15px_rgba(23,24,26,0.2)] backdrop-blur-md sm:w-96"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Hledat podle značky nebo modelu…"
              className="w-full border-b border-stone-200 bg-transparent px-3 py-3 font-sans text-sm text-graphite placeholder:text-graphite-faint focus:outline-none"
            />
            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1">
                {results.map((car) => (
                  <li key={car.id}>
                    <Link
                      href={`/vozy/${car.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-4 px-3 py-3 transition-colors hover:bg-stone-50"
                    >
                      <span>
                        <span className="block font-sans text-sm text-graphite">
                          {displayName(car)}
                        </span>
                        <span className="block font-sans text-xs text-graphite-faint">
                          {car.year} · {formatMileage(car.mileage)}
                        </span>
                      </span>
                      <span className="font-sans text-sm text-graphite-soft">
                        {formatPrice(car.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.length > 0 ? (
              <p className="px-3 py-6 text-center font-sans text-sm text-graphite-faint">
                Žádné vozy neodpovídají hledání.
              </p>
            ) : (
              <p className="px-3 py-6 text-center font-sans text-sm text-graphite-faint">
                Zkuste např. „M340i“ nebo „911“
              </p>
            )}
            {query.length > 0 ? (
              <Link
                href={`/vozy?q=${encodeURIComponent(query)}`}
                onClick={() => setOpen(false)}
                className="block border-t border-stone-200 px-3 py-3 text-center font-sans text-xs uppercase tracking-[0.14em] text-accent transition-colors hover:text-graphite"
              >
                Zobrazit všechny výsledky
              </Link>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
