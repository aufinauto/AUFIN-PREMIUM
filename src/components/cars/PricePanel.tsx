import Link from "next/link";
import type { Car } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

const PHONE = "+420777123456";
const PHONE_DISPLAY = "+420 777 123 456";

export default function PricePanel({ car }: { car: Car }) {
  return (
    <div className="border border-stone-200 bg-white p-6 sm:p-8">
      <StatusBadge status={car.status} />

      <div className="mt-4">
        <p className="font-display text-4xl text-graphite">{formatPrice(car.price)}</p>
        {car.priceWithoutVat ? (
          <p className="mt-1.5 font-sans text-sm text-graphite-faint">
            {formatPrice(car.priceWithoutVat)} bez DPH
          </p>
        ) : null}
        {car.vatDeductible ? (
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-accent">
            Možnost odpočtu DPH
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col gap-3">
        <Link
          href={`/financovani?vuz=${car.slug}`}
          className="flex items-center justify-center bg-graphite px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
        >
          Financování
        </Link>
        <a
          href="#zajem"
          className="flex items-center justify-center border border-graphite/25 px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-graphite transition-colors hover:border-graphite"
        >
          Mám zájem
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 border border-stone-200 px-4 py-3 font-sans text-[13px] text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
          >
            Zavolat
          </a>
          <a
            href={`https://wa.me/${PHONE.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-stone-200 px-4 py-3 font-sans text-[13px] text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
          >
            WhatsApp
          </a>
        </div>
        <p className="text-center font-sans text-xs text-graphite-faint">{PHONE_DISPLAY}</p>
      </div>
    </div>
  );
}
