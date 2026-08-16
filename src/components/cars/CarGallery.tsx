"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoImage from "@/components/ui/PhotoImage";
import Lightbox from "@/components/ui/Lightbox";

export default function CarGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:grid-rows-2 sm:h-[440px] lg:h-[560px]">
      <button
        type="button"
        onClick={() => openAt(0)}
        className="group relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto"
      >
        <PhotoImage
          src={photos[0]}
          alt={title}
          priority
          sizes="(min-width: 640px) 66vw, 100vw"
          className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
        />
      </button>

      {photos.slice(1, 3).map((photo, i) => (
        <button
          key={photo}
          type="button"
          onClick={() => openAt(i + 1)}
          className="group relative aspect-[4/3] overflow-hidden sm:aspect-auto"
        >
          <PhotoImage
            src={photo}
            alt={`${title} — fotografie ${i + 2}`}
            sizes="(min-width: 640px) 33vw, 100vw"
            className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
          />
          {i === 1 && photos.length > 3 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-graphite/55">
              <span className="font-sans text-sm uppercase tracking-[0.1em] text-white">
                Zobrazit všech {photos.length} fotografií
              </span>
            </div>
          ) : null}
        </button>
      ))}
      {photos.length < 3
        ? Array.from({ length: 3 - photos.length }).map((_, i) => (
            <div key={`empty-${i}`} className="hidden aspect-[4/3] sm:block" />
          ))
        : null}

      <AnimatePresence>
        {open ? (
          <Lightbox
            photos={photos}
            index={index}
            onClose={() => setOpen(false)}
            onIndexChange={setIndex}
            title={title}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
