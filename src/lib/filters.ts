import type {
  BodyType,
  Car,
  CarStatus,
  DrivetrainType,
  FuelType,
  TransmissionType,
} from "./types";
import { displayName } from "./cars-data";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "mileage-asc"
  | "power-desc";

export interface FilterState {
  query: string;
  brands: string[];
  bodyTypes: BodyType[];
  fuels: FuelType[];
  transmissions: TransmissionType[];
  drivetrains: DrivetrainType[];
  statuses: CarStatus[];
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  mileageMin: number | null;
  mileageMax: number | null;
  powerMin: number | null;
  powerMax: number | null;
  vatDeductible: boolean;
  sort: SortOption;
}

export const defaultFilterState: FilterState = {
  query: "",
  brands: [],
  bodyTypes: [],
  fuels: [],
  transmissions: [],
  drivetrains: [],
  statuses: [],
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  mileageMin: null,
  mileageMax: null,
  powerMin: null,
  powerMax: null,
  vatDeductible: false,
  sort: "newest",
};

export function applyFilters(cars: Car[], f: FilterState): Car[] {
  let result =
    f.statuses.length > 0
      ? cars.filter((car) => f.statuses.includes(car.status))
      : cars.filter((car) => car.status !== "sold");

  if (f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    result = result.filter((car) => displayName(car).toLowerCase().includes(q));
  }
  if (f.brands.length > 0) {
    result = result.filter((car) => f.brands.includes(car.brand));
  }
  if (f.bodyTypes.length > 0) {
    result = result.filter((car) => f.bodyTypes.includes(car.bodyType));
  }
  if (f.fuels.length > 0) {
    result = result.filter((car) => f.fuels.includes(car.fuel));
  }
  if (f.transmissions.length > 0) {
    result = result.filter((car) => f.transmissions.includes(car.transmission));
  }
  if (f.drivetrains.length > 0) {
    result = result.filter((car) => f.drivetrains.includes(car.drivetrain));
  }
  if (f.priceMin != null) result = result.filter((car) => car.price >= f.priceMin!);
  if (f.priceMax != null) result = result.filter((car) => car.price <= f.priceMax!);
  if (f.yearMin != null) result = result.filter((car) => car.year >= f.yearMin!);
  if (f.yearMax != null) result = result.filter((car) => car.year <= f.yearMax!);
  if (f.mileageMin != null)
    result = result.filter((car) => car.mileage >= f.mileageMin!);
  if (f.mileageMax != null)
    result = result.filter((car) => car.mileage <= f.mileageMax!);
  if (f.powerMin != null) result = result.filter((car) => car.powerKw >= f.powerMin!);
  if (f.powerMax != null) result = result.filter((car) => car.powerKw <= f.powerMax!);
  if (f.vatDeductible) result = result.filter((car) => car.vatDeductible);

  switch (f.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "mileage-asc":
      result = [...result].sort((a, b) => a.mileage - b.mileage);
      break;
    case "power-desc":
      result = [...result].sort((a, b) => b.powerKw - a.powerKw);
      break;
    default:
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return result;
}

export function countActiveFilters(f: FilterState): number {
  let count = 0;
  if (f.brands.length) count += f.brands.length;
  if (f.bodyTypes.length) count += f.bodyTypes.length;
  if (f.fuels.length) count += f.fuels.length;
  if (f.transmissions.length) count += f.transmissions.length;
  if (f.drivetrains.length) count += f.drivetrains.length;
  if (f.statuses.length) count += f.statuses.length;
  if (f.priceMin != null || f.priceMax != null) count += 1;
  if (f.yearMin != null || f.yearMax != null) count += 1;
  if (f.mileageMin != null || f.mileageMax != null) count += 1;
  if (f.powerMin != null || f.powerMax != null) count += 1;
  if (f.vatDeductible) count += 1;
  return count;
}
