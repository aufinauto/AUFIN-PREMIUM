import type { Metadata } from "next";
import { getCarBySlug } from "@/lib/cars-data";
import Reveal from "@/components/ui/Reveal";
import PhotoImage from "@/components/ui/PhotoImage";
import FinanceCalculator from "@/components/finance/FinanceCalculator";
import FinanceForm from "@/components/finance/FinanceForm";

export const metadata: Metadata = {
  title: "Financování",
  description:
    "Financování vozu podle vašich možností. Spolupracujeme s bankovními a finančními partnery a připravíme individuální nabídku.",
  alternates: { canonical: "/financovani" },
};

const benefits = [
  "Individuální nastavení akontace",
  "Možnost různých délek financování",
  "Financování pro fyzické osoby i firmy",
  "Financování vozů s odpočtem DPH",
];

export default async function FinancovaniPage({
  searchParams,
}: {
  searchParams: Promise<{ vuz?: string }>;
}) {
  const { vuz } = await searchParams;
  const selectedCar = vuz ? getCarBySlug(vuz) : undefined;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-8 lg:px-16 lg:py-16">
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Financování
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-md font-display text-5xl font-normal leading-[1.05] text-graphite balance sm:text-6xl">
              Vaše auto. Financování podle vás.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Vyberte si vůz a my vám pomůžeme najít vhodný způsob
              financování. Spolupracujeme s bankovními a finančními partnery
              a připravíme individuální nabídku. Rádi zajistíme financování i
              pro vůz, který není z naší nabídky.
            </p>
          </Reveal>
        </div>
        <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <PhotoImage
            src="/images/sections/finance-mercedes-new.jpg"
            alt="Financování vozu"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover object-center"
          />
        </Reveal>
      </div>

      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal y={0}>
              <FinanceCalculator
                initialPrice={selectedCar?.price ?? 1000000}
                priceEditable={!selectedCar}
                ctaHref="#poptavka"
                ctaLabel="Přejít na poptávku"
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">
                  Kalkulačka
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 max-w-md font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
                  Spočítejte si orientační splátku
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-graphite-soft">
                  {selectedCar ? (
                    <>
                      Kalkulačka je předvyplněna cenou vozu{" "}
                      <span className="text-graphite">
                        {selectedCar.brand} {selectedCar.model}
                      </span>
                      .{" "}
                    </>
                  ) : null}
                  Financování zajišťujeme ve spolupráci s prověřenými
                  bankovními a leasingovými partnery. Ke každé poptávce
                  přistupujeme individuálně a najdeme řešení, které odpovídá
                  vašim možnostem.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-8 space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-3 h-px w-4 shrink-0 bg-accent" />
                      <span className="text-[15px] leading-relaxed text-graphite-soft">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div id="poptavka" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">
                Poptávka
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-md font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
                Nezávazně nás kontaktujte
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-graphite-soft">
                Vyplňte formulář a do 24 hodin se vám ozveme s orientační
                nabídkou financování. Preferujete telefon? Zavolejte nám na{" "}
                <a href="tel:+420777123456" className="underline-reveal text-graphite">
                  +420 777 123 456
                </a>{" "}
                nebo napište na{" "}
                <a href="mailto:info@aufin.cz" className="underline-reveal text-graphite">
                  info@aufin.cz
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={0.15} y={0} className="relative mt-10 aspect-[4/3] overflow-hidden">
              <PhotoImage
                src="/images/sections/finance-interior.jpg"
                alt="Interiér vozu"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
              />
            </Reveal>
          </div>

          <Reveal y={0} delay={0.05}>
            <FinanceForm preselectedCarSlug={selectedCar?.slug} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
