import Link from "next/link";
import type { Car } from "@/lib/types";
import { displayName, formatMileage, formatPrice, fuelLabels } from "@/lib/utils";
import PhotoImage from "@/components/ui/PhotoImage";
import { TagBadge, StatusBadge } from "@/components/ui/Badge";

export default function CarCard({
  car,
  priority = false,
}: {
  car: Car;
  priority?: boolean;
}) {
  return (
    <Link href={`/vozy/${car.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <PhotoImage
          src={car.photos[0]}
          alt={displayName(car)}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.045]"
        />
        <div className="corner-frame">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {car.status !== "available" ? (
            <TagBadge>{car.status === "reserved" ? "Rezervováno" : car.status === "preparing" ? "Připravujeme" : "Prodáno"}</TagBadge>
          ) : null}
          {car.tags
            ?.filter((t) => t !== "Rezervováno")
            .map((tag) => <TagBadge key={tag}>{tag}</TagBadge>)}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-graphite/55 to-transparent px-4 py-3 opacity-0 transition-opacity duration-500 ease-[var(--ease-premium)] group-hover:opacity-100">
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-white">
            Detail vozu
          </span>
          <span className="translate-x-0 font-sans text-white transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-graphite">{displayName(car)}</h3>
          <p className="mt-1.5 font-sans text-[13.5px] text-graphite-soft">
            {car.year} · {formatMileage(car.mileage)} · {car.powerKw} kW ·{" "}
            {fuelLabels[car.fuel]}
          </p>
        </div>
        <div className="text-right">
          <p className="whitespace-nowrap font-display text-lg text-graphite">
            {formatPrice(car.price)}
          </p>
          {car.vatDeductible && car.priceWithoutVat ? (
            <p className="mt-0.5 whitespace-nowrap font-sans text-[11px] text-graphite-faint">
              {formatPrice(car.priceWithoutVat)} bez DPH
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-2">
        <StatusBadge status={car.status} />
      </div>
    </Link>
  );
}
