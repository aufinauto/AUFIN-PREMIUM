import "server-only";
import { cache } from "react";
import type { Car } from "./types";
import { supabaseAdmin } from "./supabaseClient";

type CarRow = Record<string, unknown>;

function rowToCar(row: CarRow): Car {
  return {
    id: row.id as string,
    slug: row.slug as string,
    status: row.status as Car["status"],
    brand: row.brand as string,
    model: row.model as string,
    version: (row.version as string) ?? "",
    year: row.year as number,
    registrationDate: (row.registration_date as string) ?? undefined,
    mileage: row.mileage as number,
    price: row.price as number,
    priceWithoutVat: (row.price_without_vat as number) ?? undefined,
    vatDeductible: Boolean(row.vat_deductible),
    fuel: row.fuel as Car["fuel"],
    transmission: row.transmission as Car["transmission"],
    drivetrain: row.drivetrain as Car["drivetrain"],
    powerKw: row.power_kw as number,
    engineCapacity: (row.engine_capacity as number) ?? undefined,
    bodyType: row.body_type as Car["bodyType"],
    color: row.color as string,
    vin: (row.vin as string) ?? undefined,
    origin: (row.origin as string) ?? undefined,
    owners: (row.owners as number) ?? undefined,
    serviceHistory: (row.service_history as boolean) ?? undefined,
    stkValidUntil: (row.stk_valid_until as string) ?? undefined,
    description: (row.description as string[]) ?? [],
    equipment: (row.equipment as Car["equipment"]) ?? [],
    history: (row.history as Car["history"]) ?? {},
    photos: (row.photos as string[]) ?? [],
    tags: (row.tags as Car["tags"]) ?? undefined,
    featured: Boolean(row.featured),
    createdAt: row.created_at as string,
  };
}

function carToRow(input: Partial<Car>): CarRow {
  const row: CarRow = {};
  if (input.id !== undefined) row.id = input.id;
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.status !== undefined) row.status = input.status;
  if (input.brand !== undefined) row.brand = input.brand;
  if (input.model !== undefined) row.model = input.model;
  if (input.version !== undefined) row.version = input.version;
  if (input.year !== undefined) row.year = input.year;
  if (input.registrationDate !== undefined) row.registration_date = input.registrationDate || null;
  if (input.mileage !== undefined) row.mileage = input.mileage;
  if (input.price !== undefined) row.price = input.price;
  if (input.priceWithoutVat !== undefined) row.price_without_vat = input.priceWithoutVat ?? null;
  if (input.vatDeductible !== undefined) row.vat_deductible = input.vatDeductible;
  if (input.fuel !== undefined) row.fuel = input.fuel;
  if (input.transmission !== undefined) row.transmission = input.transmission;
  if (input.drivetrain !== undefined) row.drivetrain = input.drivetrain;
  if (input.powerKw !== undefined) row.power_kw = input.powerKw;
  if (input.engineCapacity !== undefined) row.engine_capacity = input.engineCapacity ?? null;
  if (input.bodyType !== undefined) row.body_type = input.bodyType;
  if (input.color !== undefined) row.color = input.color;
  if (input.vin !== undefined) row.vin = input.vin || null;
  if (input.origin !== undefined) row.origin = input.origin || null;
  if (input.owners !== undefined) row.owners = input.owners ?? null;
  if (input.serviceHistory !== undefined) row.service_history = input.serviceHistory ?? null;
  if (input.stkValidUntil !== undefined) row.stk_valid_until = input.stkValidUntil || null;
  if (input.description !== undefined) row.description = input.description;
  if (input.equipment !== undefined) row.equipment = input.equipment;
  if (input.history !== undefined) row.history = input.history;
  if (input.photos !== undefined) row.photos = input.photos;
  if (input.tags !== undefined) row.tags = input.tags ?? [];
  if (input.featured !== undefined) row.featured = input.featured;
  if (input.createdAt !== undefined) row.created_at = input.createdAt;
  return row;
}

export const getAllCars = cache(async function getAllCars(): Promise<Car[]> {
  const { data, error } = await supabaseAdmin
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load cars: ${error.message}`);
  return (data ?? []).map(rowToCar);
});

export const getCarBySlug = cache(async function getCarBySlug(
  slug: string
): Promise<Car | undefined> {
  const { data, error } = await supabaseAdmin
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load car: ${error.message}`);
  return data ? rowToCar(data) : undefined;
});

export const getCarById = cache(async function getCarById(
  id: string
): Promise<Car | undefined> {
  const { data, error } = await supabaseAdmin
    .from("cars")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load car: ${error.message}`);
  return data ? rowToCar(data) : undefined;
});

export async function getFeaturedCars(): Promise<Car[]> {
  const all = await getAllCars();
  return all.filter((car) => car.featured);
}

export async function getAvailableCars(): Promise<Car[]> {
  const all = await getAllCars();
  return all.filter((car) => car.status !== "sold");
}

export async function createCar(
  input: Omit<Car, "id" | "createdAt"> & { id?: string }
): Promise<Car> {
  const row = carToRow({
    ...input,
    id: input.id ?? crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  const { data, error } = await supabaseAdmin.from("cars").insert(row).select().single();
  if (error) throw new Error(`Failed to create car: ${error.message}`);
  return rowToCar(data);
}

export async function updateCar(id: string, input: Partial<Car>): Promise<Car> {
  const row = carToRow(input);
  const { data, error } = await supabaseAdmin
    .from("cars")
    .update(row)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update car: ${error.message}`);
  return rowToCar(data);
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("cars").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete car: ${error.message}`);
}
