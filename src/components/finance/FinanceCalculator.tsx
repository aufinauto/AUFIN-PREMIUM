"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const TERMS = [24, 36, 48, 60];

interface FinanceCalculatorProps {
  initialPrice?: number;
  priceEditable?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FinanceCalculator({
  initialPrice = 1000000,
  priceEditable = false,
  ctaHref = "/financovani",
  ctaLabel = "Získat konkrétní nabídku",
}: FinanceCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [term, setTerm] = useState(48);

  const downPayment = useMemo(
    () => Math.round((price * downPaymentPct) / 100),
    [price, downPaymentPct]
  );
  const financedAmount = Math.max(price - downPayment, 0);
  const monthlyEstimate = Math.round(financedAmount / term);

  return (
    <div className="border border-stone-200 bg-white p-6 sm:p-8">
      {priceEditable ? (
        <div className="mb-7">
          <label className="mb-2 block font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
            Cena vozu
          </label>
          <input
            type="number"
            step={10000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="w-full border-b border-stone-200 bg-transparent py-2 font-display text-2xl text-graphite focus:border-graphite focus:outline-none"
          />
        </div>
      ) : (
        <div className="mb-7 flex items-baseline justify-between">
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
            Cena vozu
          </span>
          <span className="font-display text-2xl text-graphite">{formatPrice(price)}</span>
        </div>
      )}

      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <label className="font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
            Akontace
          </label>
          <span className="font-sans text-sm text-graphite">
            {downPaymentPct} % · {formatPrice(downPayment)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={80}
          step={5}
          value={downPaymentPct}
          onChange={(e) => setDownPaymentPct(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <div className="mb-7">
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
          Doba financování
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TERMS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={`border px-2 py-2.5 font-sans text-sm transition-colors ${
                term === t
                  ? "border-graphite bg-graphite text-white"
                  : "border-stone-200 text-graphite-soft hover:border-graphite"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-200 pt-6">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
          Orientační měsíční splátka
        </p>
        <p className="mt-2 font-display text-3xl text-graphite">
          od {formatPrice(monthlyEstimate)}
          <span className="ml-1 font-sans text-sm text-graphite-faint">/ měsíc</span>
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-graphite-faint">
          Orientační výpočet bez úroku a poplatků, slouží pouze pro ilustraci.
          Konkrétní podmínky financování závisí na individuálním posouzení
          žadatele a schválení financující institucí.
        </p>
      </div>

      <Link
        href={ctaHref}
        className="mt-6 flex w-full items-center justify-center bg-graphite px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
