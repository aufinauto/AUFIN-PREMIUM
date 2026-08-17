import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-32 text-center lg:px-10">
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl text-graphite sm:text-5xl">
        Tato stránka neexistuje.
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-graphite-soft">
        Stránka, kterou hledáte, byla přesunuta nebo již není dostupná.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex items-center justify-center bg-graphite px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
      >
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}
