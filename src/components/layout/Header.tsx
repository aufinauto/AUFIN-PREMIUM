"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";
import LogoMark from "@/components/ui/LogoMark";
import HomeLogoLink from "@/components/ui/HomeLogoLink";

const NAV_LINKS = [
  { href: "/vozy", label: "Vozy" },
  { href: "/financovani", label: "Financování" },
  { href: "/prodej-vozu", label: "Prodej vašeho vozu" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[var(--ease-premium)] ${
          scrolled
            ? "border-b border-stone-200 bg-white/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-500 ease-[var(--ease-premium)] lg:px-10 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <HomeLogoLink className="flex items-center gap-2.5 font-display text-[22px] italic tracking-tight text-graphite transition-opacity duration-300 hover:opacity-70">
            <LogoMark className="h-8 w-8" />
            Aufin
          </HomeLogoLink>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-reveal font-sans text-[13.5px] uppercase tracking-[0.08em] text-graphite-soft transition-colors hover:text-graphite"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <HeaderSearch />
            <Link
              href="/prodej-vozu"
              className="ml-2 hidden items-center rounded-full border border-accent/50 px-5 py-2.5 font-sans text-[13px] uppercase tracking-[0.1em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white lg:inline-flex"
            >
              Nabídnout vůz
            </Link>
            <button
              type="button"
              aria-label="Otevřít menu"
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="h-px w-5 bg-graphite" />
              <span className="h-px w-5 bg-graphite" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}
