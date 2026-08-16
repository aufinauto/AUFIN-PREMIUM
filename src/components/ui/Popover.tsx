"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface PopoverProps {
  trigger: (opts: { open: boolean }) => ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  panelClassName?: string;
}

export default function Popover({
  trigger,
  children,
  align = "left",
  panelClassName = "",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {trigger({ open })}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-[calc(100%+10px)] z-30 min-w-[240px] border border-stone-200 bg-white p-4 shadow-[0_20px_60px_-15px_rgba(23,24,26,0.18)] ${
              align === "right" ? "right-0" : "left-0"
            } ${panelClassName}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-sans text-xs uppercase tracking-[0.1em] text-accent hover:text-graphite"
              >
                Hotovo
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
