"use client";

import { useState, type FormEvent } from "react";
import { CurrencyInput, Field, Input, Select, Textarea } from "@/components/ui/FormField";
import { submitLead } from "@/lib/submitLead";
import type { Car } from "@/lib/types";
import { displayName } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export default function FinanceForm({
  cars,
  preselectedCarSlug,
}: {
  cars: Car[];
  preselectedCarSlug?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [applicantType, setApplicantType] = useState("Fyzická osoba");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await submitLead("finance", Object.fromEntries(form.entries()));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-stone-200 bg-white p-8 text-center">
        <p className="font-display text-2xl text-graphite">Poptávka odeslána.</p>
        <p className="mt-3 font-sans text-sm text-graphite-soft">
          Ozveme se vám s návrhem financování co nejdříve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-stone-200 bg-white p-6 sm:p-8">
      <h3 className="font-display text-2xl text-graphite">Nezávazně poptat financování</h3>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Jméno" htmlFor="f-name" required>
          <Input id="f-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Telefon" htmlFor="f-phone" required>
          <Input id="f-phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="E-mail" htmlFor="f-email" required>
            <Input id="f-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>
        <Field label="Vybraný vůz" htmlFor="f-car">
          <Select id="f-car" name="car" defaultValue={preselectedCarSlug ?? ""}>
            <option value="">Nemám vybráno / jiný vůz</option>
            {cars.map((c) => (
              <option key={c.slug} value={c.slug}>
                {displayName(c)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Cena vozu" htmlFor="f-price">
          <CurrencyInput id="f-price" name="price" value={price} onChange={setPrice} />
        </Field>
        <Field label="Výše akontace" htmlFor="f-down">
          <CurrencyInput
            id="f-down"
            name="downPayment"
            value={downPayment}
            onChange={setDownPayment}
          />
        </Field>
        <Field label="Preferovaná délka" htmlFor="f-term">
          <Select id="f-term" name="term" defaultValue="48">
            <option value="24">24 měsíců</option>
            <option value="36">36 měsíců</option>
            <option value="48">48 měsíců</option>
            <option value="60">60 měsíců</option>
          </Select>
        </Field>
        <Field label="Typ žadatele" htmlFor="f-type">
          <Select
            id="f-type"
            name="applicantType"
            value={applicantType}
            onChange={(e) => setApplicantType(e.target.value)}
          >
            <option>Fyzická osoba</option>
            <option>Firma</option>
          </Select>
        </Field>
        {applicantType === "Firma" ? (
          <Field label="IČO" htmlFor="f-ico">
            <Input id="f-ico" name="ico" inputMode="numeric" />
          </Field>
        ) : null}
        <div className="sm:col-span-2">
          <Field label="Poznámka" htmlFor="f-note">
            <Textarea id="f-note" name="note" rows={3} />
          </Field>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 font-sans text-[13px] leading-relaxed text-graphite-soft">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-graphite" />
        Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky financování.
      </label>

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
        {status === "submitting" ? "Odesílám…" : "Nezávazně poptat financování"}
      </button>
    </form>
  );
}
