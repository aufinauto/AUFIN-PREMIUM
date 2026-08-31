"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { CurrencyInput, Field, Input, Select, Textarea } from "@/components/ui/FormField";
import type { Car, EquipmentGroup } from "@/lib/types";
import {
  bodyTypeLabels,
  drivetrainLabels,
  formatPrice,
  fuelLabels,
  statusLabels,
  transmissionLabels,
} from "@/lib/utils";
import { generateDescription } from "@/lib/generateDescription";
import { saveCarAction, importSautoEquipmentAction } from "@/app/admin/actions";
import EquipmentEditor from "./EquipmentEditor";
import PhotoManager from "./PhotoManager";
import TagsEditor from "./TagsEditor";

const VAT_RATE = 1.21;

export default function CarForm({
  car,
  equipmentOptions = {},
}: {
  car?: Car;
  equipmentOptions?: Record<string, string[]>;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadFolder] = useState(() => car?.slug ?? crypto.randomUUID());
  const [photos, setPhotos] = useState<string[]>(car?.photos ?? []);
  const [equipment, setEquipment] = useState<EquipmentGroup[]>(car?.equipment ?? []);
  const [tags, setTags] = useState<string[]>(car?.tags ?? []);
  const [price, setPrice] = useState(car?.price ? String(car.price) : "");
  const [description, setDescription] = useState(car?.description.join("\n") ?? "");
  const [genError, setGenError] = useState<string | null>(null);
  const [sautoUrl, setSautoUrl] = useState("");
  const [sautoLoading, setSautoLoading] = useState(false);
  const [sautoError, setSautoError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceWithoutVat = price ? Math.round(Number(price) / VAT_RATE) : 0;

  function handleGenerateDescription() {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const brand = String(fd.get("brand") ?? "").trim();
    const model = String(fd.get("model") ?? "").trim();
    const mileage = Number(fd.get("mileage") ?? 0);
    const powerKw = Number(fd.get("powerKw") ?? 0);
    const color = String(fd.get("color") ?? "").trim();

    if (!brand || !model || !mileage || !powerKw || !color) {
      setGenError(
        "Nejdřív vyplňte značku, model, barvu, nájezd a výkon — z toho se popis skládá."
      );
      return;
    }
    setGenError(null);

    const registrationDate = String(fd.get("registrationDate") ?? "");
    const year = registrationDate
      ? new Date(registrationDate).getFullYear()
      : new Date().getFullYear();

    const generated = generateDescription({
      brand,
      model,
      version: String(fd.get("version") ?? "").trim(),
      year,
      mileage,
      powerKw,
      fuel: String(fd.get("fuel") ?? "petrol") as Car["fuel"],
      transmission: String(fd.get("transmission") ?? "automatic") as Car["transmission"],
      drivetrain: String(fd.get("drivetrain") ?? "rwd") as Car["drivetrain"],
      bodyType: String(fd.get("bodyType") ?? "sedan") as Car["bodyType"],
      color,
      equipment,
    });
    setDescription(generated.join("\n"));
  }

  async function handleImportSauto() {
    const url = sautoUrl.trim();
    if (!url) return;
    setSautoLoading(true);
    setSautoError(null);

    const result = await importSautoEquipmentAction(url);
    setSautoLoading(false);

    if ("error" in result) {
      setSautoError(result.error);
      return;
    }

    // Merge into what's already checked, don't replace it.
    setEquipment((prev) => {
      const next = prev.map((g) => ({ ...g, items: [...g.items] }));
      for (const group of result.equipment) {
        const existing = next.find((g) => g.category === group.category);
        if (existing) {
          existing.items = Array.from(new Set([...existing.items, ...group.items]));
        } else {
          next.push({ ...group });
        }
      }
      return next;
    });
    setSautoUrl("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("photosJson", JSON.stringify(photos));
    formData.set("equipmentJson", JSON.stringify(equipment));
    formData.set("tagsJson", JSON.stringify(tags));
    formData.set("description", description);

    try {
      const result = await saveCarAction(car?.id ?? null, formData);
      if (result?.error) {
        setError(result.error);
        setSaving(false);
      }
    } catch {
      setError(
        "Uložení se nezdařilo (možná jsou fotky moc velké nebo vypršelo spojení). Zkuste to prosím znovu."
      );
      setSaving(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 pb-24">
      {error ? (
        <div className="border border-status-reserved/40 bg-status-reserved/5 px-4 py-3 font-sans text-sm text-status-reserved">
          {error}
        </div>
      ) : null}

      <section>
        <h2 className="font-display text-xl text-graphite">Základní informace</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Značka" htmlFor="brand" required>
            <Input id="brand" name="brand" defaultValue={car?.brand} required />
          </Field>
          <Field label="Model" htmlFor="model" required>
            <Input id="model" name="model" defaultValue={car?.model} required />
          </Field>
          <Field label="Verze / doplněk" htmlFor="version">
            <Input id="version" name="version" defaultValue={car?.version} />
          </Field>
          <Field label="Stav nabídky" htmlFor="status">
            <Select id="status" name="status" defaultValue={car?.status ?? "available"}>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <input type="hidden" name="slug" defaultValue={car?.slug} />
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 font-sans text-sm text-graphite">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={car?.featured}
                className="h-4 w-4 accent-graphite"
              />
              Zobrazit na homepage (vybrané vozy)
            </label>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
            Štítky
          </p>
          <TagsEditor value={tags} onChange={setTags} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-graphite">Cena</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="Cena (Kč)" htmlFor="price" required>
            <CurrencyInput id="price" name="price" value={price} onChange={setPrice} />
          </Field>
          <Field label="Cena bez DPH (dopočítá se)" htmlFor="priceWithoutVatDisplay">
            <div className="flex items-center border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-graphite-soft">
              {price ? formatPrice(priceWithoutVat) : "—"}
            </div>
          </Field>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 font-sans text-sm text-graphite">
              <input
                type="checkbox"
                name="vatDeductible"
                defaultChecked={car?.vatDeductible}
                className="h-4 w-4 accent-graphite"
              />
              Možnost odpočtu DPH
            </label>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-graphite">Technické parametry</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Datum první registrace" htmlFor="registrationDate" required>
            <Input
              id="registrationDate"
              name="registrationDate"
              type="date"
              defaultValue={car?.registrationDate}
              required
            />
          </Field>
          <Field label="Barva" htmlFor="color" required>
            <Input id="color" name="color" defaultValue={car?.color} required />
          </Field>
          <Field label="Nájezd (km)" htmlFor="mileage" required>
            <Input id="mileage" name="mileage" type="number" defaultValue={car?.mileage} required />
          </Field>
          <Field label="Výkon (kW)" htmlFor="powerKw" required>
            <Input id="powerKw" name="powerKw" type="number" defaultValue={car?.powerKw} required />
          </Field>
          <Field label="Objem motoru (ccm)" htmlFor="engineCapacity">
            <Input
              id="engineCapacity"
              name="engineCapacity"
              type="number"
              defaultValue={car?.engineCapacity}
            />
          </Field>
          <Field label="Palivo" htmlFor="fuel">
            <Select id="fuel" name="fuel" defaultValue={car?.fuel ?? "petrol"}>
              {Object.entries(fuelLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Převodovka" htmlFor="transmission">
            <Select id="transmission" name="transmission" defaultValue={car?.transmission ?? "automatic"}>
              {Object.entries(transmissionLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Pohon" htmlFor="drivetrain">
            <Select id="drivetrain" name="drivetrain" defaultValue={car?.drivetrain ?? "rwd"}>
              {Object.entries(drivetrainLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Karoserie" htmlFor="bodyType">
            <Select id="bodyType" name="bodyType" defaultValue={car?.bodyType ?? "sedan"}>
              {Object.entries(bodyTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Země původu" htmlFor="origin">
            <Input id="origin" name="origin" defaultValue={car?.origin} />
          </Field>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl text-graphite">Popis vozu</h2>
          <button
            type="button"
            onClick={handleGenerateDescription}
            className="shrink-0 border border-graphite/25 px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-graphite hover:border-graphite"
          >
            Vygenerovat popis
          </button>
        </div>
        <p className="mt-1 font-sans text-xs text-graphite-faint">
          Každý odstavec na nový řádek. Tlačítko sestaví návrh z vyplněných údajů — text si pak
          můžete upravit.
        </p>
        {genError ? (
          <p className="mt-2 font-sans text-xs text-status-reserved">{genError}</p>
        ) : null}
        <div className="mt-4">
          <Textarea
            name="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-graphite">Výbava</h2>
        <p className="mt-1 font-sans text-xs text-graphite-faint">
          Umí doplnit výbavu z odkazu na inzerát sauto.cz — přidá se k tomu, co je už zaškrtnuté.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="url"
            value={sautoUrl}
            onChange={(e) => setSautoUrl(e.target.value)}
            placeholder="https://www.sauto.cz/osobni/detail/..."
            className="w-full border border-stone-200 bg-transparent px-3 py-2 font-sans text-[13px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
          />
          <button
            type="button"
            onClick={handleImportSauto}
            disabled={sautoLoading || !sautoUrl.trim()}
            className="shrink-0 border border-graphite/25 px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-graphite hover:border-graphite disabled:opacity-50"
          >
            {sautoLoading ? "Načítám…" : "Načíst ze Sauto"}
          </button>
        </div>
        {sautoError ? (
          <p className="mt-2 font-sans text-xs text-status-reserved">{sautoError}</p>
        ) : null}
        <div className="mt-5">
          <EquipmentEditor value={equipment} onChange={setEquipment} options={equipmentOptions} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-graphite">Fotky</h2>
        <div className="mt-5">
          <PhotoManager photos={photos} onChange={setPhotos} folder={uploadFolder} />
        </div>
      </section>

      <div className="sticky bottom-0 -mx-6 flex items-center justify-between gap-4 border-t border-stone-200 bg-white/95 px-6 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="font-sans text-sm uppercase tracking-[0.08em] text-graphite-soft hover:text-graphite"
        >
          Zrušit
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-graphite px-8 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent disabled:opacity-50"
        >
          {saving ? "Ukládám…" : "Uložit vůz"}
        </button>
      </div>
    </form>
  );
}
