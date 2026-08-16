"use client";

import { usePathname } from "next/navigation";

const PHONE = "+420777123456";
const PHONE_DISPLAY = "+420 777 123 456";

export default function MobileStickyCTA() {
  const pathname = usePathname();
  const isCarDetail = /^\/vozy\/[^/]+$/.test(pathname ?? "");

  if (!isCarDetail) return null;

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
      <a
        href="#zajem"
        className="flex flex-col items-center justify-center gap-1 bg-graphite py-3 font-sans text-[11px] uppercase tracking-[0.08em] text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 4h16v12H8l-4 4z" />
        </svg>
        Mám zájem
      </a>
    </div>
  );
}
