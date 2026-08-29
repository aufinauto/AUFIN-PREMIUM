"use client";

import { useRef, useState, type FormEvent } from "react";
import { Field, Input, Textarea, CurrencyInput } from "@/components/ui/FormField";
import { submitLead } from "@/lib/submitLead";
import { compressImage } from "@/lib/compressImage";
import { createSellCarUploadUrls } from "@/app/actions/sellCarUpload";
import { trackEvent } from "@/lib/analytics";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

interface PendingPhoto {
  file: File;
  previewUrl: string;
  uploadedUrl: string | null;
  uploading: boolean;
  error: boolean;
}

export default function SellCarForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [photos, setPhotos] = useState<PendingPhoto[]>([]);
  const [priceValue, setPriceValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (files.length === 0) return;

    const newEntries: PendingPhoto[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploadedUrl: null,
      uploading: true,
      error: false,
    }));
    setPhotos((prev) => [...prev, ...newEntries]);

    try {
      const targets = await createSellCarUploadUrls(files.map((f) => f.name));
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const target = targets[i];
        try {
          const uploadBody = await compressImage(file);
          const res = await fetch(target.signedUrl, {
            method: "PUT",
            headers: { "Content-Type": "image/jpeg" },
            body: uploadBody,
          });
          if (!res.ok) throw new Error("upload_failed");
          setPhotos((prev) =>
            prev.map((p) =>
              p.file === file ? { ...p, uploadedUrl: target.publicUrl, uploading: false } : p
            )
          );
        } catch {
          setPhotos((prev) =>
            prev.map((p) => (p.file === file ? { ...p, uploading: false, error: true } : p))
          );
        }
      }
    } catch {
      setPhotos((prev) =>
        prev.map((p) =>
          newEntries.includes(p) ? { ...p, uploading: false, error: true } : p
        )
      );
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const uploadedPhotoUrls = photos.map((p) => p.uploadedUrl).filter((u): u is string => !!u);
    try {
      await submitLead("sell-car", {
        ...Object.fromEntries(form.entries()),
        photoCount: photos.length,
        photos: uploadedPhotoUrls,
      });
      setStatus("success");
      trackEvent("generate_lead", { form_name: "vykup_vozidel" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-stone-200 bg-white p-10 text-center lg:p-12">
        <p className="font-display text-2xl text-graphite">
          Děkujeme. Váš vůz jsme přijali k posouzení.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-graphite-soft">
          Po prověření údajů se vám ozveme s dalšími informacemi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-stone-200 bg-white p-8 lg:p-10">
      {/* O VOZE */}
      <Reveal>
        <div className="mb-10 border-b border-stone-200 pb-10">
          <h3 className="font-display text-xl text-graphite">O voze</h3>
        </div>
      </Reveal>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          <Field label="Očekávaná cena" htmlFor="s-price">
            <CurrencyInput
              id="s-price"
              name="expectedPrice"
              value={priceValue}
              onChange={setPriceValue}
            />
          </Field>
        </div>
      </div>

      {/* KONTAKTNÍ ÚDAJE */}
      <Reveal>
        <div className="mb-10 border-b border-stone-200 pb-10">
          <h3 className="font-display text-xl text-graphite">Kontaktní údaje</h3>
        </div>
      </Reveal>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      </div>

      {/* DALŠÍ INFORMACE */}
      <Reveal>
        <div className="mb-10 border-b border-stone-200 pb-10">
          <h3 className="font-display text-xl text-graphite">Další informace</h3>
        </div>
      </Reveal>

      <div className="mb-10">
        <Field label="Poznámka" htmlFor="s-note">
          <Textarea
            id="s-note"
            name="note"
            rows={4}
            placeholder="Popište stav vozu, jakékoliv vady či zvláštnosti…"
          />
        </Field>
      </div>

      {/* FOTOGRAFIE */}
      <Reveal>
        <div className="mb-10 border-b border-stone-200 pb-10">
          <h3 className="font-display text-xl text-graphite">Fotografie vozu</h3>
          <p className="mt-3 text-[15px] text-graphite-soft">
            Nahrajte několik fotografií exteriéru, interiéru a případných vad. Pomůže nám to
            připravit přesnější nabídku.
          </p>
        </div>
      </Reveal>

      <div className="mb-10">
        <Field label="Fotografie" htmlFor="s-photos">
          <div className="border-2 border-dashed border-stone-300 bg-stone-50 px-6 py-8 text-center transition-colors hover:border-stone-400 hover:bg-stone-100">
            <input
              ref={fileInputRef}
              id="s-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              className="hidden"
            />
            <label htmlFor="s-photos" className="cursor-pointer">
              <p className="font-sans text-sm text-graphite">Přetáhněte fotografie sem</p>
              <p className="mt-2 font-sans text-xs text-graphite-faint">nebo klikněte pro výběr</p>
            </label>
          </div>
          {photos.length > 0 && (
            <div className="mt-4">
              <p className="mb-3 font-sans text-xs uppercase tracking-[0.08em] text-graphite-faint">
                Nahráno fotografií: {photos.length}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden border border-stone-200">
                    <img
                      src={photo.previewUrl}
                      alt={`Preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {photo.uploading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="font-sans text-[11px] text-white">Nahrávám…</span>
                      </div>
                    ) : photo.error ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-status-reserved/70">
                        <span className="font-sans text-[11px] text-white">Chyba</span>
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Field>
      </div>

      {/* ERROR */}
      {status === "error" && (
        <div className="mb-6 border border-status-reserved/30 bg-status-reserved/5 p-4">
          <p className="font-sans text-sm text-status-reserved">
            Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám zavolejte na{" "}
            <a href="tel:+420704901148" className="underline">
              +420 704 901 148
            </a>
            .
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-6">
        <button
          type="submit"
          disabled={status === "submitting" || photos.some((p) => p.uploading)}
          className="w-full bg-graphite px-8 py-4 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent disabled:opacity-50 sm:py-3.5"
        >
          {status === "submitting"
            ? "Odesílám…"
            : photos.some((p) => p.uploading)
              ? "Nahrávám fotky…"
              : "Odeslat vůz k posouzení"}
        </button>
        <p className="text-center font-sans text-xs text-graphite-faint">
          Odesláním formuláře nevzniká žádný závazek k prodeji vozu.
        </p>
      </div>
    </form>
  );
}
