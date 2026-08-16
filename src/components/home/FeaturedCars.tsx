import Link from "next/link";
import { getFeaturedCars } from "@/lib/cars-data";
import CarCard from "@/components/cars/CarCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

export default function FeaturedCars() {
  const featured = getFeaturedCars().slice(0, 4);

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-6 pt-24 lg:px-10 lg:pb-8 lg:pt-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeader eyebrow="Aktuálně v nabídce" title="Vybrané vozy" />
        <Link
          href="/vozy"
          className="underline-reveal hidden shrink-0 font-sans text-sm uppercase tracking-[0.1em] text-graphite sm:inline-block"
        >
          Zobrazit všechny vozy →
        </Link>
      </div>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
        {featured.map((car, i) => (
          <StaggerItem key={car.id}>
            <CarCard car={car} priority={i === 0} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-14 sm:hidden">
        <Link
          href="/vozy"
          className="inline-flex items-center border border-graphite/25 px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-graphite"
        >
          Zobrazit všechny vozy →
        </Link>
      </div>
    </section>
  );
}
