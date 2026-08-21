import type { BodyType, DrivetrainType, EquipmentGroup, FuelType, TransmissionType } from "./types";
import { bodyTypeLabels, formatMileage, kwToHp } from "./utils";

export interface DescriptionInput {
  brand: string;
  model: string;
  version?: string;
  year: number;
  mileage: number;
  powerKw: number;
  fuel: FuelType;
  transmission: TransmissionType;
  drivetrain: DrivetrainType;
  bodyType: BodyType;
  color?: string;
  equipment: EquipmentGroup[];
}

// Accusative/adjective forms for natural sentence flow (the plain labels in
// utils.ts are nominative and don't always fit grammatically mid-sentence).
const fuelAdjective: Record<FuelType, string> = {
  petrol: "benzínovým",
  diesel: "naftovým",
  hybrid: "hybridním",
  electric: "elektrickým",
};

const transmissionAccusative: Record<TransmissionType, string> = {
  automatic: "automatickou",
  manual: "manuální",
};

const drivetrainShort: Record<DrivetrainType, string> = {
  fwd: "přední",
  rwd: "zadní",
  awd: "4x4",
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function joinCzech(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} a ${items[items.length - 1]}`;
}

export function generateDescription(input: DescriptionInput): string[] {
  const name = [input.brand, input.model, input.version].filter(Boolean).join(" ").trim();
  const hp = kwToHp(input.powerKw);
  const transmission = transmissionAccusative[input.transmission] ?? "";
  const drivetrain = drivetrainShort[input.drivetrain] ?? "";
  const fuelAdj = fuelAdjective[input.fuel] ?? "";
  const bodyType = bodyTypeLabels[input.bodyType]?.toLowerCase() ?? "";

  const openers = [
    `${name} z roku ${input.year} nabízí výkon ${hp} k, ${transmission} převodovku a ${drivetrain} pohon.`,
    `Nabízený vůz ${name} spojuje ${hp} k výkonu s karoserií typu ${bodyType} a ${drivetrain} pohonem.`,
    `${name} (${input.year}) je vůz s ${fuelAdj} motorem o výkonu ${hp} k a ${transmission} převodovkou.`,
    `Tento ${name} z roku ${input.year} zaujme kombinací výkonu ${hp} k a spolehlivého ${drivetrain} pohonu.`,
  ];

  const mileageSentences = [
    `Vůz má najeto ${formatMileage(input.mileage)}${input.color ? `, v barvě ${input.color}` : ""}.`,
    `Aktuální nájezd činí ${formatMileage(input.mileage)}${input.color ? ` a vůz je v barvě ${input.color}` : ""}.`,
    `Za sebou má ${formatMileage(input.mileage)}${input.color ? ` a je nabízen v barvě ${input.color}` : ""}.`,
  ];

  const uniqueItems = Array.from(new Set(input.equipment.flatMap((g) => g.items)));
  const highlightItems = uniqueItems.sort(() => Math.random() - 0.5).slice(0, 4);

  const equipmentSentence = highlightItems.length
    ? `Výbava zahrnuje ${joinCzech(highlightItems)}.`
    : "";

  const paragraphs = [
    pick(openers),
    [pick(mileageSentences), equipmentSentence].filter(Boolean).join(" "),
  ];

  return paragraphs.map((p) => p.trim()).filter(Boolean);
}
