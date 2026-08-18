import type { Car } from "@/lib/types";
import {
  bodyTypeLabels,
  drivetrainLabels,
  formatDate,
  formatMileage,
  fuelLabels,
  kwToHp,
  transmissionLabels,
} from "@/lib/utils";

export default function CarSpecs({ car }: { car: Car }) {
  const rows: [string, string][] = [
    ...(car.registrationDate
      ? ([["První registrace", formatDate(car.registrationDate)]] as [string, string][])
      : []),
    ["Nájezd", formatMileage(car.mileage)],
    ["Výkon", `${car.powerKw} kW (${kwToHp(car.powerKw)} k)`],
    ...(car.engineCapacity
      ? ([["Objem motoru", `${(car.engineCapacity / 1000).toFixed(1)} l`]] as [string, string][])
      : []),
    ["Palivo", fuelLabels[car.fuel]],
    ["Převodovka", transmissionLabels[car.transmission]],
    ["Pohon", drivetrainLabels[car.drivetrain]],
    ["Karoserie", bodyTypeLabels[car.bodyType]],
    ["Barva", car.color],
    ...(car.origin ? ([["Země původu", car.origin]] as [string, string][]) : []),
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-6 border-b border-stone-200 py-3.5"
        >
          <dt className="font-sans text-[13.5px] text-graphite-faint">{label}</dt>
          <dd className="font-sans text-[14.5px] text-graphite">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
