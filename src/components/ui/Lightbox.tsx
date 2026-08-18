"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PhotoImage from "./PhotoImage";

interface LightboxProps {
  photos: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  title: string;
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  title,
}: LightboxProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = () => onIndexChange((index + 1) % photos.length);
  const prev = () => onIndexChange((index - 1 + photos.length) % photos.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + photos.length) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos.length, onClose, onIndexChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex flex-col bg-graphite"
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx > 60) prev();
        if (dx < -60) next();
        setTouchStartX(null);
      }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <p className="font-sans text-sm text-white/70">
          {index + 1} / {photos.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít galerii"
          className="flex h-9 w-9 items-center justify-center text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Předchozí fotografie"
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-accent-soft"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden"
          >
            <PhotoImage
              src={photos[index]}
              alt={`${title} — fotografie ${index + 1}`}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={next}
          aria-label="Další fotografie"
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-accent-soft"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto px-6 pb-6">
        {photos.map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => onIndexChange(i)}
            className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity ${
              i === index ? "opacity-100 ring-1 ring-white" : "opacity-45 hover:opacity-75"
            }`}
          >
            <PhotoImage src={photo} alt="" sizes="80px" className="h-full w-full" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
