import type {
  BodyType,
  Car,
  CarStatus,
  DrivetrainType,
  FuelType,
  TransmissionType,
} from "./types";

// Brands are typed in admin in mixed case ("AUDI", "MERCEDES") — normalize to
// the official spelling so titles, H1s and filters stay consistent.
const brandSpelling: Record<string, string> = {
  "MERCEDES": "Mercedes-Benz",
  "MERCEDES BENZ": "Mercedes-Benz",
  "MERCEDES-BENZ": "Mercedes-Benz",
  "VW": "Volkswagen",
  "SKODA": "Škoda",
  "ŠKODA": "Škoda",
  "LAND ROVER": "Land Rover",
  "LANDROVER": "Land Rover",
  "ALFA ROMEO": "Alfa Romeo",
  "ASTON MARTIN": "Aston Martin",
  "ROLLS ROYCE": "Rolls-Royce",
  "ROLLS-ROYCE": "Rolls-Royce",
  "MCLAREN": "McLaren",
};

const upperCaseBrands = new Set(["BMW", "MINI", "KIA", "SEAT", "CUPRA", "DS", "MG", "BYD"]);

export function formatBrand(brand: string): string {
  const key = brand.trim().replace(/\s+/g, " ").toUpperCase();
  if (brandSpelling[key]) return brandSpelling[key];
  if (upperCaseBrands.has(key)) return key;
  return key
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

export function displayName(car: Car): string {
  return [car.brand, car.model, car.version].filter(Boolean).join(" ");
}

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
  pickup: "Pick-up",
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
