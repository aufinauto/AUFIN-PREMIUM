import type { Metadata } from "next";
import { getCarBySlug } from "@/lib/cars-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import FinanceProcess from "@/components/finance/FinanceProcess";
import FinanceCalculator from "@/components/finance/FinanceCalculator";
import FinanceForm from "@/components/finance/FinanceForm";

export const metadata: Metadata = {
  title: "Financování",
  description:
    "Financování vozu podle vašich možností. Spolupracujeme s bankovními a finančními partnery a připravíme individuální nabídku.",
  alternates: { canonical: "/financovani" },
};

export default async function FinancovaniPage({
  searchParams,
}: {
  searchParams: Promise<{ vuz?: string }>;
}) {
  const { vuz } = await searchParams;
  const selectedCar = vuz ? getCarBySlug(vuz) : undefined;

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 lg:px-10 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
            Financování
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-2xl font-display text-5xl font-normal leading-[1.05] text-graphite sm:text-6xl">
            Vaše auto. Financování podle vás.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-graphite-soft">
            Vyberte si vůz a my vám pomůžeme najít vhodný způsob financování.
            Spolupracujeme s bankovními a finančními partnery a připravíme
            individuální nabídku.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <SectionHeader eyebrow="Jak to funguje" title="Čtyři kroky k novému vozu" />
        <div className="mt-14">
          <FinanceProcess />
        </div>
      </div>

      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10">
          <SectionHeader
            eyebrow="Kalkulačka"
            title="Spočítejte si orientační splátku"
            description="Výpočet je orientační. Konkrétní podmínky vždy závisí na schválení financující institucí."
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <FinanceCalculator
              initialPrice={selectedCar?.price ?? 1000000}
              priceEditable={!selectedCar}
              ctaHref="#poptavka"
              ctaLabel="Přejít na poptávku"
            />
            <div className="flex flex-col justify-center gap-6 text-[15px] leading-relaxed text-graphite-soft">
              {selectedCar ? (
                <p>
                  Kalkulačka je předvyplněna cenou vozu{" "}
                  <span className="text-graphite">
                    {selectedCar.brand} {selectedCar.model}
                  </span>
                  .
                </p>
              ) : null}
              <p>
                Financování zajišťujeme ve spolupráci s externími bankovními a
                finančními partnery. Nejde o žádnou formu financování bez
                registru — jedná se o standardní úvěr nebo leasing v rámci
                běžného schvalovacího procesu.
              </p>
              <p>
                Konkrétní úroková sazba, výše splátky i podmínky se odvíjí od
                individuálního posouzení žadatele a zvolené finanční
                instituce. Garantované schválení předem neposkytujeme.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="poptavka" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <FinanceForm preselectedCarSlug={selectedCar?.slug} />
        </div>
      </div>
    </div>
  );
}
