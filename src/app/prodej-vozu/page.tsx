import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SellCarForm from "@/components/sell/SellCarForm";
import PhotoImage from "@/components/ui/PhotoImage";

export const metadata: Metadata = {
  title: "Prodej vašeho vozu",
  description:
    "Nabídněte nám své auto. Po základním prověření Vám připravíme individuální nabídku výkupu nebo protiúčtu.",
  alternates: { canonical: "/prodej-vozu" },
};

export default function ProdejVozuPage() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-24">
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Prodej vozu
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-md font-display text-5xl font-normal leading-[1.05] text-graphite balance sm:text-6xl">
              Chcete prodat svůj vůz?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Nabídněte nám své auto. Po základním prověření Vám
              připravíme individuální nabídku výkupu nebo protiúčtu.
            </p>
          </Reveal>
        </div>
        <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <PhotoImage
            src="/images/sections/sell-car-hero.jpg"
            alt="Prodej a výkup vozu"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full"
          />
        </Reveal>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <SellCarForm />
      </div>
    </div>
  );
}
