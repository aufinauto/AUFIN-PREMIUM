"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/FormField";
import { submitLead } from "@/lib/submitLead";

type Status = "idle" | "submitting" | "success" | "error";

export default function InterestForm({ carLabel }: { carLabel: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [gdpr, setGdpr] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!gdpr) return;

    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await submitLead("interest", {
        car: carLabel,
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        preferredContact: form.get("preferredContact"),
        note: form.get("note"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id="zajem" className="scroll-mt-24 border border-stone-200 bg-white p-8 text-center">
        <p className="font-display text-2xl text-graphite">Děkujeme za zprávu.</p>
        <p className="mt-3 font-sans text-sm text-graphite-soft">
          Ozveme se vám co nejdříve na uvedený kontakt.
        </p>
      </div>
    );
  }

  return (
    <form id="zajem" onSubmit={handleSubmit} className="scroll-mt-24 border border-stone-200 bg-white p-6 sm:p-8">
      <h3 className="font-display text-2xl text-graphite">Mám zájem</h3>
      <p className="mt-2 font-sans text-sm text-graphite-soft">
        {carLabel} — dejte nám vědět a ozveme se vám zpět.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Jméno" htmlFor="name" required>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Telefon" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <Field label="E-mail" htmlFor="email" required>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Preferovaný kontakt" htmlFor="preferredContact">
          <Select id="preferredContact" name="preferredContact" defaultValue="Telefon">
            <option>Telefon</option>
            <option>E-mail</option>
            <option>WhatsApp</option>
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Poznámka" htmlFor="note">
            <Textarea id="note" name="note" rows={3} />
          </Field>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 font-sans text-[13px] leading-relaxed text-graphite-soft">
        <input
          type="checkbox"
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-graphite"
        />
        Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.
      </label>

      {status === "error" ? (
        <p className="mt-4 font-sans text-sm text-status-reserved">
          Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám zavolejte.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || !gdpr}
        className="mt-6 flex w-full items-center justify-center bg-graphite px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent disabled:opacity-40 sm:w-auto sm:px-10"
      >
        {status === "submitting" ? "Odesílám…" : "Odeslat poptávku"}
      </button>
    </form>
  );
}
