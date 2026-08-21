"use client";

import { useRef, useState } from "react";
import PhotoImage from "@/components/ui/PhotoImage";
import { createUploadUrls } from "@/app/admin/actions";

export default function PhotoManager({
  photos,
  onChange,
  folder,
}: {
  photos: string[];
  onChange: (next: string[]) => void;
  folder: string;
}) {
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function move(index: number, dir: -1 | 1) {
    const next = [...photos];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (files.length === 0) return;

    setError(null);
    setProgress({ done: 0, total: files.length });

    const uploaded: string[] = [];
    try {
      const uploadTargets = await createUploadUrls(
        folder,
        files.map((f) => f.name)
      );

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const target = uploadTargets[i];
        const res = await fetch(target.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!res.ok) {
          throw new Error(`Nahrání fotky "${file.name}" selhalo (${res.status}).`);
        }
        uploaded.push(target.publicUrl);
        onChange([...photos, ...uploaded]);
        setProgress({ done: i + 1, total: files.length });
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Nahrání fotek se nezdařilo. Zkuste to prosím znovu."
      );
    } finally {
      setProgress(null);
    }
  }

  return (
    <div>
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo, i) => (
            <div
              key={photo}
              className="relative aspect-[4/3] overflow-hidden border border-stone-200"
            >
              <PhotoImage src={photo} alt="" sizes="200px" className="h-full w-full" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-graphite/70 px-1.5 py-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="px-1 text-white disabled:opacity-30"
                  aria-label="Posunout doleva"
                >
                  ‹
                </button>
                <span className="font-sans text-[10px] text-white/70">{i + 1}</span>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === photos.length - 1}
                  className="px-1 text-white disabled:opacity-30"
                  aria-label="Posunout doprava"
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="px-1 text-white hover:text-status-reserved"
                  aria-label="Smazat fotku"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-sans text-sm text-graphite-faint">Zatím žádné fotky.</p>
      )}

      <div className="mt-4">
        <label className="font-sans text-xs uppercase tracking-[0.12em] text-graphite-faint">
          Přidat nové fotky
        </label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesSelected}
          disabled={progress !== null}
          className="mt-2 block w-full font-sans text-sm text-graphite file:mr-4 file:border file:border-graphite/25 file:bg-white file:px-4 file:py-2 file:font-sans file:text-sm file:text-graphite hover:file:border-graphite disabled:opacity-50"
        />
        {progress ? (
          <p className="mt-2 font-sans text-sm text-graphite-soft">
            Nahrávám fotku {progress.done + 1} z {progress.total}…
          </p>
        ) : null}
        {error ? (
          <p className="mt-2 font-sans text-sm text-status-reserved">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
