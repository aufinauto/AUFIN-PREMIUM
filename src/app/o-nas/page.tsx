import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PhotoImage from "@/components/ui/PhotoImage";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import Index from "@/components/ui/Index";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Specializujeme se na sportovní, prémiové a zajímavé automobily. Nabídku nestavíme na množství, ale na pečlivém výběru.",
  alternates: { canonical: "/o-nas" },
};

const values = [
  {
    title: "Výběr",
    text: "Nechceme mít stovky anonymních vozů. Každý automobil v nabídce prošel individuálním posouzením.",
  },
  {
    title: "Transparentnost",
    text: "U každého vozu chceme zákazníkovi poskytnout maximum dostupných informací o historii a stavu.",
  },
  {
    title: "Osobní přístup",
    text: "Každý obchod řešíme individuálně — od prvního kontaktu až po předání vozu.",
  },
  {
    title: "Kompletní servis",
    text: "Prodej, výkup, protiúčet, financování a administrativa na jednom místě.",
  },
];

export default function ONasPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 lg:px-10 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">O nás</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-3xl font-display text-4xl font-normal leading-[1.15] text-graphite balance sm:text-6xl">
            Auta vybíráme stejně, jako bychom je kupovali sami.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite-soft">
            Specializujeme se na sportovní, prémiové a zajímavé automobily.
            Nabídku nestavíme na množství. Každý vůz vybíráme individuálně s
            důrazem na stav, historii a specifikaci.
          </p>
        </Reveal>
      </div>

      <Reveal y={0} className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
        <PhotoImage
          src="/images/sections/about-showroom.jpg"
          alt="Partnerský showroom SilverCars"
          sizes="100vw"
          className="h-full w-full"
        />
      </Reveal>

      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <StaggerItem key={v.title} className="border-t border-stone-200 pt-6">
              <Index n={i + 1} />
              <h3 className="mt-5 font-display text-xl text-graphite">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">{v.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-graphite/15 pt-14 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="max-w-xl font-display text-4xl font-normal leading-[1.1] text-graphite balance sm:text-5xl">
              Máte dotaz nebo hledáte konkrétní vůz?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-graphite px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-accent"
            >
              Kontaktovat nás
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
