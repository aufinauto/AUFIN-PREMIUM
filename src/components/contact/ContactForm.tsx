"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Textarea } from "@/components/ui/FormField";
import { submitLead } from "@/lib/submitLead";

type Status = "idle" | "submitting" | "success" | "error";

const inquiryTypes = ["Nákup", "Prodej", "Financování", "Jiný dotaz"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState(inquiryTypes[0]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await submitLead("contact", Object.fromEntries(form.entries()));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="relative border border-stone-200 bg-white p-8 text-center sm:p-10">
        <span className="absolute inset-x-0 top-0 h-1 bg-accent" />
        <p className="font-display text-2xl text-graphite">Zpráva odeslána.</p>
        <p className="mt-3 font-sans text-sm text-graphite-soft">
          Děkujeme, ozveme se vám co nejdříve.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border border-stone-200 bg-white px-6 pb-6 pt-6 sm:px-10 sm:pb-10 sm:pt-8"
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-accent" />

      <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">Napište nám</p>
      <h3 className="mt-3 font-display text-2xl text-graphite">
        Ozveme se vám co nejdříve.
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Jméno" htmlFor="c-name" required>
          <Input id="c-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Telefon" htmlFor="c-phone" required>
          <Input id="c-phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="E-mail" htmlFor="c-email" required>
            <Input id="c-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Typ dotazu" htmlFor="c-type">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {inquiryTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`border px-3 py-2.5 font-sans text-xs uppercase tracking-[0.06em] transition-colors ${
                    type === t
                      ? "border-graphite bg-graphite text-white"
                      : "border-stone-200 text-graphite-soft hover:border-graphite"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input type="hidden" id="c-type" name="type" value={type} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Zpráva" htmlFor="c-message" required>
            <Textarea id="c-message" name="message" rows={5} required />
          </Field>
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
        {status === "submitting" ? "Odesílám…" : "Odeslat zprávu"}
      </button>
    </form>
  );
}
