"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCarBySlug } from "@/lib/cars-data";

const PHONE = "+420777123456";
const PHONE_DISPLAY = "+420 777 123 456";

export default function MobileStickyCTA() {
  const pathname = usePathname();
  const isCarDetail = /^\/vozy\/[^/]+$/.test(pathname ?? "");

  if (!isCarDetail) return null;

  const slug = pathname?.split("/").pop();
  const car = slug ? getCarBySlug(slug) : null;

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
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          Financování
        </Link>
      ) : null}
    </div>
  );
}
