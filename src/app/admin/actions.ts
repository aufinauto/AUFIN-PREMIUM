"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { createCar, deleteCar, updateCar } from "@/lib/cars-data";
import { addEquipmentOptions } from "@/lib/equipmentOptions";
import { CAR_PHOTOS_BUCKET } from "@/lib/supabaseClient";
import { createSignedUploadUrls, type UploadTarget } from "@/lib/uploadUrls";
import { slugify } from "@/lib/utils";
import type { Car, EquipmentGroup } from "@/lib/types";

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function createUploadUrls(
  folder: string,
  fileNames: string[]
): Promise<UploadTarget[]> {
  return createSignedUploadUrls(CAR_PHOTOS_BUCKET, folder, fileNames);
}

const VAT_RATE = 1.21;

function parseMoney(formData: FormData, key: string): number | undefined {
  const raw = String(formData.get(key) ?? "").replace(/[^\d]/g, "");
  return raw ? Number(raw) : undefined;
}

function textOrUndefined(formData: FormData, key: string): string | undefined {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

export async function saveCarAction(
  carId: string | null,
  formData: FormData
): Promise<{ error: string } | void> {
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const version = String(formData.get("version") ?? "").trim();
  const registrationDate = textOrUndefined(formData, "registrationDate");
  const year = registrationDate ? new Date(registrationDate).getFullYear() : NaN;
  const mileage = Number(formData.get("mileage") ?? 0);
  const powerKw = Number(formData.get("powerKw") ?? 0);
  const color = String(formData.get("color") ?? "").trim();
  const price = parseMoney(formData, "price") ?? 0;

  if (!brand || !model || !registrationDate || Number.isNaN(year) || !color || !price) {
    return { error: "Vyplňte prosím značku, model, datum první registrace, barvu a cenu." };
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || `${brand}-${model}-${version}-${year}`);

  let photos: string[] = [];
  try {
    photos = JSON.parse(String(formData.get("photosJson") ?? "[]"));
  } catch {
    photos = [];
  }

  let equipment: EquipmentGroup[] = [];
  try {
    equipment = JSON.parse(String(formData.get("equipmentJson") ?? "[]"));
  } catch {
    equipment = [];
  }

  const description = String(formData.get("description") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  let tags: string[] = [];
  try {
    tags = JSON.parse(String(formData.get("tagsJson") ?? "[]"));
  } catch {
    tags = [];
  }

  const carInput: Omit<Car, "id" | "createdAt" | "history"> = {
    slug,
    status: String(formData.get("status") ?? "available") as Car["status"],
    brand,
    model,
    version,
    year,
    registrationDate,
    mileage,
    price,
    priceWithoutVat: Math.round(price / VAT_RATE),
    vatDeductible: formData.get("vatDeductible") === "on",
    fuel: String(formData.get("fuel")) as Car["fuel"],
    transmission: String(formData.get("transmission")) as Car["transmission"],
    drivetrain: String(formData.get("drivetrain")) as Car["drivetrain"],
    powerKw,
    engineCapacity: formData.get("engineCapacity")
      ? Number(formData.get("engineCapacity"))
      : undefined,
    bodyType: String(formData.get("bodyType")) as Car["bodyType"],
    color,
    vin: textOrUndefined(formData, "vin"),
    origin: textOrUndefined(formData, "origin"),
    stkValidUntil: textOrUndefined(formData, "stkValidUntil"),
    description,
    equipment,
    photos,
    tags,
    featured: formData.get("featured") === "on",
  };

  try {
    if (carId) {
      await updateCar(carId, carInput);
    } else {
      await createCar({ ...carInput, history: {} });
    }
    await addEquipmentOptions(equipment);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Uložení vozu se nezdařilo." };
  }

  revalidatePath("/vozy");
  revalidatePath(`/vozy/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteCarAction(id: string) {
  await deleteCar(id);
  revalidatePath("/vozy");
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
