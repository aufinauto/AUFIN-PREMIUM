import type {
  BodyType,
  CarStatus,
  DrivetrainType,
  FuelType,
  TransmissionType,
} from "./types";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("cs-CZ").format(value);
}

export function formatMileage(value: number): string {
  return `${formatNumber(value)} km`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export const fuelLabels: Record<FuelType, string> = {
  petrol: "Benzín",
  diesel: "Diesel",
  hybrid: "Hybrid",
  "plugin-hybrid": "Plug-in hybrid",
  electric: "Elektro",
};

export const transmissionLabels: Record<TransmissionType, string> = {
  automatic: "Automatická",
  manual: "Manuální",
};

export const drivetrainLabels: Record<DrivetrainType, string> = {
  fwd: "Přední (FWD)",
  rwd: "Zadní (RWD)",
  awd: "4x4 (AWD)",
};

export const bodyTypeLabels: Record<BodyType, string> = {
  sedan: "Sedan",
  combi: "Kombi",
  coupe: "Coupé",
  suv: "SUV",
  cabrio: "Cabrio",
  hatchback: "Hatchback",
  sportovni: "Sportovní",
};

export const statusLabels: Record<CarStatus, string> = {
  available: "Dostupné",
  reserved: "Rezervováno",
  sold: "Prodáno",
  preparing: "Připravujeme",
};

export function kwToHp(kw: number): number {
  return Math.round(kw * 1.35962);
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
