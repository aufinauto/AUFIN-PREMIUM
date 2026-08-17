import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PhotoImage from "@/components/ui/PhotoImage";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

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
      {/* HERO SECTION */}
      <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-8 lg:px-10 lg:pb-16 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">O nás</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-normal leading-[1.1] text-graphite balance sm:text-7xl">
            Auta vybíráme stejně, jako bychom je kupovali sami.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-soft">
            Specializujeme se na sportovní, prémiové a zajímavé vozy. Nabídku nestavíme na množství, ale na kvalitě.
            Každý automobil vybíráme individuálně s důrazem na stav, historii a specifikaci.
          </p>
        </Reveal>
      </div>

      {/* PHOTOGRAPHY SECTION */}
      <Reveal y={0} className="relative w-full overflow-hidden lg:mx-auto lg:max-w-[1440px] lg:px-10">
        <div className="aspect-[4/3] overflow-hidden lg:aspect-[16/9]">
          <PhotoImage
            src="/images/sections/about-showroom.jpg"
            alt="Showroom Aufin"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* PRINCIPLES SECTION */}
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
        <StaggerGroup className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <StaggerItem key={v.title} className="flex flex-col">
              <p className="font-display text-4xl font-normal text-graphite">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-display text-lg text-graphite">{v.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite-soft">{v.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* BRAND STATEMENT */}
      <div className="bg-stone-50">
        <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-10 lg:py-12">
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-5xl font-normal leading-[1.15] text-graphite balance sm:text-6xl">
              Méně vozů. Vyšší standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite-soft">
              Naší ambicí není mít největší nabídku. Chceme mít auta, za kterými si můžeme stát.
              Každý automobil, který zařadíme do prodeje, musí splňovat naše přísné kritéria.
            </p>
          </Reveal>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
        <div>
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">Hledáte vůz?</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-5xl font-normal leading-[1.1] text-graphite balance sm:text-6xl">
              Hledáte konkrétní vůz?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-soft">
              Pokud ho právě nemáme v nabídce, ozvěte se nám. Rádi s vámi probereme vaše požadavky.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/vozy"
              className="inline-flex items-center justify-center bg-graphite px-8 py-4 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-accent"
            >
              Prohlédnout vozy
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center border border-graphite px-8 py-4 font-sans text-sm uppercase tracking-[0.08em] text-graphite transition-colors duration-300 hover:bg-graphite hover:text-white"
            >
              Kontaktovat nás
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
