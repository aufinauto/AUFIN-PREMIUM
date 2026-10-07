import type { Metadata } from "next";
import VozyPageClient from "@/components/cars/VozyPageClient";
import Reveal from "@/components/ui/Reveal";
import { getAllCars } from "@/lib/cars-data";

const title = "Prémiové vozy na prodej Praha";
const description =
  "Aktuální nabídka prověřených prémiových a sportovních vozů. BMW, Mercedes-Benz, Audi a další. Financování, protiúčet a prohlídka vozů v Praze.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/vozy" },
  openGraph: {
    title: `${title} | ICONcars`,
    description,
  },
};

export default async function VozyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const cars = await getAllCars();

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 pb-3 pt-8 lg:px-10 lg:pb-6 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
            Nabídka
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-5xl font-normal text-graphite sm:text-6xl">
            Prémiové a sportovní vozy skladem
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-graphite-soft">
            Pečlivě vybrané prémiové a sportovní ojeté vozy s prověřenou
            historií. Vozy si můžete osobně prohlédnout v našem showroomu v
            Praze.
          </p>
        </Reveal>
      </div>

      <VozyPageClient cars={cars} initialQuery={q ?? ""} />
    </div>
  );
}
