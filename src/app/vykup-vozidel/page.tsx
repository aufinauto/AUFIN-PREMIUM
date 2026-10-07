import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import SellCarForm from "@/components/sell/SellCarForm";
import PhotoImage from "@/components/ui/PhotoImage";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { NAP } from "@/lib/site";

const title = "Výkup aut Praha | Prémiové a sportovní vozy";
const description =
  "Výkup aut v Praze a po celé ČR. Nezávazné ocenění vozu, výkup prémiových i sportovních aut, vozů na úvěr či leasing. Administrativu a přepis vyřešíme za vás.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/vykup-vozidel" },
  openGraph: {
    title: `${title} | ICONcars`,
    description,
  },
};

const steps = [
  {
    number: "01",
    title: "Pošlete nám informace o voze",
    description: "Značka, model, rok výroby, nájezd, VIN, výbava a fotografie.",
  },
  {
    number: "02",
    title: "Vůz předběžně oceníme",
    description: "Na základě informací vám připravíme orientační nabídku.",
  },
  {
    number: "03",
    title: "Prohlédneme vůz",
    description: "Ověříme stav, historii a dokumentaci vozu.",
  },
  {
    number: "04",
    title: "Dokončíme výkup",
    description: "Podepíšeme smlouvu, vyřešíme platbu a administrativu.",
  },
];

const whatWeBuy = [
  "Osobní automobily napříč značkami, palivy i kategoriemi",
  "Prémiové a sportovní vozy — naše dlouhodobá specializace",
  "Doplacené i financované vozy — pomůžeme vyplatit zůstatek úvěru nebo leasingu",
  "Vozy k okamžitému výkupu i jako protiúčet při koupi jiného vozu z naší nabídky",
];

const priceFactors = [
  "Značka, model a motorizace",
  "Rok výroby",
  "Nájezd kilometrů",
  "Technický stav",
  "Stav karoserie a interiéru",
  "Výbava",
  "Servisní historie",
  "Původ vozidla",
  "Počet majitelů",
  "Aktuální situace na trhu",
];

const faqs = [
  {
    q: "Jak rychle dokážete auto vykoupit?",
    a: "Ve většině případů dokážeme výkup dokončit během jednoho pracovního dne — pokud máte k dispozici všechny potřebné dokumenty a nevzniknou komplikace, například s doplacením financování.",
  },
  {
    q: "Je ocenění auta zdarma?",
    a: "Ano. Ocenění vozu je zdarma a nezávazné — odeslání formuláře ani prvotní posouzení vás k ničemu nezavazuje a je jen na vás, zda nabídku přijmete.",
  },
  {
    q: "Musím přijet s autem do Prahy?",
    a: "Ne. K prvnímu posouzení stačí vyplnit formulář a přiložit fotografie vozu. S výkupem pomáháme zákazníkům z celé České republiky — prohlídku a předání vozu domluvíme individuálně.",
  },
  {
    q: "Vykupujete auta na úvěr nebo leasing?",
    a: "Ano. Pokud vůz ještě splácíte, pomůžeme i s vyřešením zůstatku úvěru nebo leasingu jako součástí výkupu.",
  },
  {
    q: "Vykupujete havarovaná auta?",
    a: "Ano, vykupujeme i havarovaná a poškozená auta. Pošlete nám informace o voze a fotografie poškození a připravíme vám individuální nabídku.",
  },
  {
    q: "Jaké dokumenty potřebuji k výkupu?",
    a: "Přesný seznam dokumentů se liší podle toho, zda vůz prodáváte jako soukromá osoba nebo firma a zda je doplacený. Probereme to individuálně po prvotním posouzení.",
  },
  {
    q: "Kdy dostanu peníze za auto?",
    a: "Ve většině případů už do jednoho pracovního dne. Platba probíhá většinou bankovním převodem, po individuální domluvě je možná i platba v hotovosti.",
  },
  {
    q: "Vyřídíte přepis vozidla?",
    a: "Ano. Přepis vozidla a související administrativu vyřídíme my v rámci výkupu — nemusíte nic dalšího zařizovat.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VykupVozidelPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-8 lg:px-16 lg:py-16">
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Výkup vozidel ICONcars
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-lg font-display text-5xl font-normal leading-[1.05] text-graphite balance sm:text-6xl">
              Výkup aut v Praze – rychle, férově a bez starostí
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Vykupujeme prémiové, sportovní i běžné osobní vozy v Praze a po
              celé ČR. Vůz individuálně oceníme, připravíme nabídku výkupu a
              postaráme se o smlouvy, přepis i související administrativu.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <ul className="space-y-3">
              {["Individuální ocenění vozu", "Peníze za vůz už do 1 pracovního dne", "Kompletní administrativu vyřešíme za vás"].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-px w-3 shrink-0 bg-accent" />
                  <span className="text-sm text-graphite-soft">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <a
              href="#poptavka"
              className="inline-flex items-center justify-center bg-graphite px-8 py-4 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-accent"
            >
              Chci ocenit vůz
            </a>
          </Reveal>
        </div>

        <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <PhotoImage
            src="/images/sections/sell-car.jpg"
            alt="Výkup vozidla ICONcars"
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
            Jak probíhá výkup auta
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* WHAT WE BUY + PRICE FACTORS */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">
                  Co vykupujeme
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 max-w-md font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
                  Vykupujeme vozy různých značek a kategorií
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-graphite-soft">
                  Zaměřujeme se především na prémiové, sportovní a zánovní
                  automobily. Vykupujeme například vozy BMW, Mercedes-Benz,
                  Audi, Porsche, Volkswagen, Škoda, CUPRA, Volvo, Land Rover a
                  další.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3">
                  {whatWeBuy.map((b) => (
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

            <div>
              <Reveal>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">
                  Ocenění vozu
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 max-w-md font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
                  Co ovlivňuje výkupní cenu
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3">
                  {priceFactors.map((b) => (
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

      {/* FINANCED CAR SECTION */}
      <section className="mx-auto max-w-[900px] px-6 py-10 text-center lg:px-10 lg:py-16">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">
            Financovaný vůz
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
            Výkup auta na úvěr nebo leasing
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-graphite-soft">
            Máte vůz, který je stále financovaný? I tak může být výkup možný.
            Podle konkrétní situace prověříme možnosti doplacení financování a
            převodu vozidla.
          </p>
        </Reveal>
      </section>

      {/* FAQ SECTION */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-[900px] px-6 py-10 lg:px-10 lg:py-16">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
              Časté otázky k výkupu
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <FaqAccordion items={faqs} />
          </Reveal>

          <Reveal delay={0.1} className="mt-10 text-center">
            <p className="text-[15px] text-graphite-soft">
              Máte jinou otázku? Napište nám na{" "}
              <a href={`mailto:${NAP.email}`} className="underline-reveal text-graphite">
                {NAP.email}
              </a>{" "}
              nebo zavolejte na{" "}
              <a href={`tel:${NAP.phone}`} className="underline-reveal text-graphite">
                {NAP.phoneDisplay}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>

      {/* FORM SECTION */}
      <div id="poptavka" className="mx-auto max-w-[1000px] scroll-mt-24 px-6 py-10 lg:px-10 lg:py-16">
        <Reveal className="mb-10 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent">Nezávazná poptávka</p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
            Nechte si zdarma ocenit svůj vůz
          </h2>
        </Reveal>
        <SellCarForm />
      </div>
    </div>
  );
}
