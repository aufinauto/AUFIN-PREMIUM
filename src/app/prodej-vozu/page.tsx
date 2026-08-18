import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import SellCarForm from "@/components/sell/SellCarForm";
import PhotoImage from "@/components/ui/PhotoImage";

export const metadata: Metadata = {
  title: "Prodej vašeho vozu",
  description:
    "Nabídněte nám své auto. Po základním prověření Vám připravíme individuální nabídku výkupu nebo protiúčtu.",
  alternates: { canonical: "/prodej-vozu" },
};

const steps = [
  {
    number: "01",
    title: "Odešlete údaje",
    description: "Vyplňte základní informace o voze a přiložte fotografie.",
  },
  {
    number: "02",
    title: "Vůz prověříme",
    description: "Zkontrolujeme údaje, historii a základní parametry vozu.",
  },
  {
    number: "03",
    title: "Připravíme nabídku",
    description: "Ozveme se vám s individuální nabídkou výkupu nebo protiúčtu.",
  },
];

const benefits = [
  "Individuální posouzení vozu",
  "Férovou nabídku podle aktuálního trhu",
  "Možnost výkupu nebo protiúčtu",
  "Rychlou zpětnou vazbu",
];

export default function ProdejVozuPage() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-8 lg:px-16 lg:py-16">
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Prodej vozu
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-md font-display text-5xl font-normal leading-[1.05] text-graphite balance sm:text-6xl">
              Nabídněte nám svůj vůz
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Pošlete nám základní informace a fotografie. Vůz prověříme a
              připravíme Vám individuální nabídku výkupu nebo protiúčtu.
            </p>
          </Reveal>

          {/* BENEFITS */}
          <Reveal delay={0.15} className="mt-10">
            <ul className="space-y-3">
              {["Rychlé posouzení", "Výkup nebo protiúčet", "Individuální nabídka"].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-px w-3 shrink-0 bg-accent" />
                  <span className="text-sm text-graphite-soft">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <PhotoImage
            src="/images/sections/sell-car.jpg"
            alt="Prodej a výkup vozu"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover object-center"
          />
        </Reveal>
      </div>

      {/* HOW IT WORKS SECTION */}
      <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
            Jak to funguje
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="flex flex-col">
                <p className="font-display text-3xl font-normal text-graphite">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-lg text-graphite">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* FORM SECTION */}
      <div className="mx-auto max-w-[1000px] border-t border-stone-200 px-6 py-10 lg:px-10 lg:py-16">
        <SellCarForm />
      </div>

    </div>
  );
}
