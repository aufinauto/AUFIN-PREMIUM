import type { Car } from "@/lib/types";
import CarCard from "./CarCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

export default function CarGrid({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="border-t border-stone-200 py-24 text-center">
        <p className="font-display text-2xl text-graphite">Žádné vozy neodpovídají zvoleným filtrům</p>
        <p className="mt-3 font-sans text-sm text-graphite-soft">
          Zkuste upravit nebo vymazat některá z kritérií.
        </p>
      </div>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <StaggerItem key={car.id}>
          <CarCard car={car} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
