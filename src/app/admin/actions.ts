"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { createCar, deleteCar, updateCar } from "@/lib/cars-data";
import { CAR_PHOTOS_BUCKET, supabaseAdmin } from "@/lib/supabaseClient";
import { slugify } from "@/lib/utils";
import type { Car, EquipmentGroup } from "@/lib/types";

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

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
  const year = Number(formData.get("year"));
  const mileage = Number(formData.get("mileage") ?? 0);
  const powerKw = Number(formData.get("powerKw") ?? 0);
  const color = String(formData.get("color") ?? "").trim();
  const price = parseMoney(formData, "price") ?? 0;

  if (!brand || !model || !year || !color || !price) {
    return { error: "Vyplňte prosím značku, model, rok výroby, barvu a cenu." };
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

  const newFiles = formData
    .getAll("newPhotos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  for (const file of newFiles) {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
    const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabaseAdmin.storage
      .from(CAR_PHOTOS_BUCKET)
      .upload(path, buffer, { contentType: file.type || "image/jpeg", upsert: false });
    if (uploadError) {
      return { error: `Nahrání fotky "${file.name}" selhalo: ${uploadError.message}` };
    }
    const { data: pub } = supabaseAdmin.storage.from(CAR_PHOTOS_BUCKET).getPublicUrl(path);
    photos.push(pub.publicUrl);
  }

  const description = String(formData.get("description") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const tags = formData.getAll("tags").map(String) as NonNullable<Car["tags"]>;

  const history: Car["history"] = {
    verifiedOrigin: formData.get("history.verifiedOrigin") === "on",
    serviceHistory: formData.get("history.serviceHistory") === "on",
    vinChecked: formData.get("history.vinChecked") === "on",
    noLegalDefects: formData.get("history.noLegalDefects") === "on",
    independentInspection: formData.get("history.independentInspection") === "on",
    originCountry: textOrUndefined(formData, "history.originCountry"),
    owners: formData.get("history.owners") ? Number(formData.get("history.owners")) : undefined,
  };

  const carInput: Omit<Car, "id" | "createdAt"> = {
    slug,
    status: String(formData.get("status") ?? "available") as Car["status"],
    brand,
    model,
    version,
    year,
    registrationDate: textOrUndefined(formData, "registrationDate"),
    mileage,
    price,
    priceWithoutVat: parseMoney(formData, "priceWithoutVat"),
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
    owners: formData.get("owners") ? Number(formData.get("owners")) : undefined,
    serviceHistory: formData.get("serviceHistory") === "on",
    stkValidUntil: textOrUndefined(formData, "stkValidUntil"),
    description,
    equipment,
    history,
    photos,
    tags,
    featured: formData.get("featured") === "on",
  };

  try {
    if (carId) {
      await updateCar(carId, carInput);
    } else {
      await createCar(carInput);
    }
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
