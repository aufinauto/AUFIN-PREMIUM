export type CarStatus = "available" | "reserved" | "sold" | "preparing";

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type TransmissionType = "automatic" | "manual";

export type DrivetrainType = "fwd" | "rwd" | "awd";

export type BodyType =
  | "sedan"
  | "combi"
  | "coupe"
  | "suv"
  | "cabrio"
  | "hatchback"
  | "pickup";

export interface EquipmentGroup {
  category:
    | "Komfort"
    | "Technologie"
    | "Bezpečnost"
    | "Asistenti"
    | "Sport"
    | "Exteriér"
    | "Interiér";
  items: string[];
}

export interface CarHistory {
  verifiedOrigin?: boolean;
  serviceHistory?: boolean;
  vinChecked?: boolean;
  noLegalDefects?: boolean;
  independentInspection?: boolean;
  originCountry?: string;
  owners?: number;
}

export interface Car {
  id: string;
  slug: string;
  status: CarStatus;
  brand: string;
  model: string;
  version: string;
  year: number;
  registrationDate?: string;
  mileage: number;
  price: number;
  priceWithoutVat?: number;
  vatDeductible: boolean;
  fuel: FuelType;
  transmission: TransmissionType;
  drivetrain: DrivetrainType;
  powerKw: number;
  engineCapacity?: number;
  bodyType: BodyType;
  color: string;
  vin?: string;
  origin?: string;
  owners?: number;
  serviceHistory?: boolean;
  stkValidUntil?: string;
  description: string[];
  equipment: EquipmentGroup[];
  history: CarHistory;
  photos: string[];
  tags?: string[];
  featured?: boolean;
  createdAt: string;
}
