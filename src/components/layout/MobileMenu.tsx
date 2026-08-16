"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import LogoMark from "@/components/ui/LogoMark";
import HomeLogoLink from "@/components/ui/HomeLogoLink";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
        >
          <div className="flex h-20 items-center justify-between px-6">
            <HomeLogoLink
              onNavigate={onClose}
              className="flex items-center gap-2.5 font-display text-xl italic text-graphite transition-opacity duration-300 hover:opacity-70"
            >
              <LogoMark className="h-8 w-8" />
              Aufin
            </HomeLogoLink>
            <button
              type="button"
              aria-label="Zavřít menu"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center text-graphite"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-stone-200 py-5 font-display text-3xl text-graphite transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4 px-6 pb-10"
          >
            <Link
              href="/prodej-vozu"
              onClick={onClose}
              className="flex items-center justify-center border border-graphite bg-graphite px-6 py-4 font-sans text-sm uppercase tracking-[0.1em] text-white"
            >
              Nabídnout vůz
            </Link>
            <a
              href="tel:+420777123456"
              className="text-center font-sans text-sm text-graphite-soft"
            >
              +420 777 123 456
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
