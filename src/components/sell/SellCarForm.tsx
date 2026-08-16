"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Textarea } from "@/components/ui/FormField";
import { submitLead } from "@/lib/submitLead";

type Status = "idle" | "submitting" | "success" | "error";

export default function SellCarForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [photos, setPhotos] = useState<File[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await submitLead("sell-car", {
        ...Object.fromEntries(form.entries()),
        photoCount: photos.length,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-stone-200 bg-white p-8 text-center">
        <p className="font-display text-2xl text-graphite">Nabídka odeslána.</p>
        <p className="mt-3 font-sans text-sm text-graphite-soft">
          Po základním prověření vozu se vám ozveme s nabídkou výkupu nebo protiúčtu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-stone-200 bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Značka" htmlFor="s-brand" required>
          <Input id="s-brand" name="brand" required />
        </Field>
        <Field label="Model" htmlFor="s-model" required>
          <Input id="s-model" name="model" required />
        </Field>
        <Field label="Rok výroby" htmlFor="s-year" required>
          <Input id="s-year" name="year" type="number" required min={1970} max={2030} />
        </Field>
        <Field label="Nájezd (km)" htmlFor="s-mileage" required>
          <Input id="s-mileage" name="mileage" type="number" required min={0} />
        </Field>
        <Field label="Motorizace" htmlFor="s-engine">
          <Input id="s-engine" name="engine" placeholder="např. 3.0 benzín, 275 kW" />
        </Field>
        <Field label="VIN" htmlFor="s-vin">
          <Input id="s-vin" name="vin" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Očekávaná cena (Kč)" htmlFor="s-price">
            <Input id="s-price" name="expectedPrice" type="number" step={10000} />
          </Field>
        </div>

        <Field label="Jméno" htmlFor="s-name" required>
          <Input id="s-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Telefon" htmlFor="s-phone" required>
          <Input id="s-phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="E-mail" htmlFor="s-email" required>
            <Input id="s-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Poznámka" htmlFor="s-note">
            <Textarea id="s-note" name="note" rows={3} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Fotografie vozu" htmlFor="s-photos">
            <input
              id="s-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
              className="w-full border border-dashed border-stone-300 bg-transparent px-4 py-6 font-sans text-sm text-graphite-soft file:mr-4 file:border-0 file:bg-graphite file:px-4 file:py-2 file:font-sans file:text-xs file:uppercase file:tracking-[0.08em] file:text-white"
            />
          </Field>
          {photos.length > 0 ? (
            <p className="mt-2 font-sans text-xs text-graphite-faint">
              Vybráno {photos.length} {photos.length === 1 ? "fotografie" : "fotografií"}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-4 font-sans text-sm text-status-reserved">
          Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám zavolejte.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center bg-graphite px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent disabled:opacity-40 sm:w-auto sm:px-10"
      >
        {status === "submitting" ? "Odesílám…" : "Odeslat nabídku vozu"}
      </button>
    </form>
  );
}
