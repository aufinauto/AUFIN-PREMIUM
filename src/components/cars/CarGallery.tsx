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
    <>
      {/* Mobile: one large photo + thumbnail strip */}
      <div className="flex flex-col gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative aspect-[4/3] overflow-hidden"
        >
          <PhotoImage
            src={photos[0]}
            alt={title}
            priority
            sizes="100vw"
            className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
          />
          {photos.length > 1 ? (
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.08em] text-white shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              Více fotek ({photos.length})
            </span>
          ) : null}
        </button>

        {photos.length > 1 ? (
          <div className="grid grid-cols-5 gap-1.5">
            {photos.slice(1, 6).map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => openAt(i + 1)}
                className="group relative aspect-square overflow-hidden"
              >
                <PhotoImage
                  src={photo}
                  alt={`${title} — fotografie ${i + 2}`}
                  sizes="20vw"
                  className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                />
                {i === 4 && photos.length > 6 ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-graphite/55">
                    <span className="font-sans text-xs uppercase tracking-[0.08em] text-white">
                      +{photos.length - 6}
                    </span>
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Tablet/Desktop: grid layout */}
      <div className="hidden grid-cols-1 gap-2 sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:h-[440px] lg:h-[560px]">
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
      </div>

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
    </>
  );
}
