"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

// The answer stays in the DOM at all times (collapsed via grid-template-rows,
// not unmounted) so its text is present in the rendered HTML for crawlers,
// matching the visible FAQPage JSON-LD content.
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-200 border-t border-stone-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-lg text-graphite">{item.q}</span>
              <span
                aria-hidden
                className={`shrink-0 font-sans text-xl text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-premium)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-graphite-soft">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
