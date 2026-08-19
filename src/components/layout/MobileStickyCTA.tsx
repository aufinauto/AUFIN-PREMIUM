"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Car } from "@/lib/types";

const PHONE = "+420777123456";
const PHONE_DISPLAY = "+420 777 123 456";

export default function MobileStickyCTA({ cars }: { cars: Car[] }) {
  const pathname = usePathname();
  const isCarDetail = /^\/vozy\/[^/]+$/.test(pathname ?? "");

  if (!isCarDetail) return null;

  const slug = pathname?.split("/").pop();
  const car = slug ? cars.find((c) => c.slug === slug) : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-stone-200 bg-white/95 backdrop-blur-md lg:hidden">
      <a
        href={`tel:${PHONE}`}
        aria-label={`Zavolat na ${PHONE_DISPLAY}`}
        className="flex flex-col items-center justify-center gap-1 border-r border-stone-200 py-3 font-sans text-[11px] uppercase tracking-[0.08em] text-graphite"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 5c0 8.8 6.2 15 15 15l1-3.4-4.4-1.7-1.6 1.7a12 12 0 0 1-6.6-6.6l1.7-1.6L7.4 4z" />
        </svg>
        Zavolat
      </a>
      <a
        href={`https://wa.me/${PHONE.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontaktovat přes WhatsApp"
        className="flex flex-col items-center justify-center gap-1 border-r border-stone-200 py-3 font-sans text-[11px] uppercase tracking-[0.08em] text-graphite"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 20l1.3-4A8 8 0 1 1 9 19.5z" />
        </svg>
        WhatsApp
      </a>
      {car ? (
        <Link
          href={`/financovani?vuz=${car.slug}`}
          className="flex flex-col items-center justify-center gap-1 bg-graphite py-3 font-sans text-[11px] uppercase tracking-[0.08em] text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 6.5C10.5 5.3 8.5 4.5 6 4.5 4.9 4.5 4 5.4 4 6.5v11c0 1.1.9 2 2 2 2.5 0 4.5.8 6 2 1.5-1.2 3.5-2 6-2 1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2-2.5 0-4.5.8-6 2z" />
            <path d="M12 6.5v13" />
          </svg>
          Financování
        </Link>
      ) : null}
    </div>
  );
}
