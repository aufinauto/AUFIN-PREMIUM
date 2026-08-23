import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import SellCarForm from "@/components/sell/SellCarForm";
import PhotoImage from "@/components/ui/PhotoImage";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { NAP } from "@/lib/site";

const title = "Výkup vozidel Praha";
const description =
  "Vykoupíme váš vůz rychle, férově a diskrétně — včetně prémiových a sportovních automobilů i vozidel na úvěr nebo leasing. Nezávazné posouzení, Praha i celá ČR.";

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
    title: "Pošlete nám vůz",
    description: "Vyplňte formulář se základními údaji a přiložte fotografie vozu.",
  },
  {
    number: "02",
    title: "Posoudíme stav vozu",
    description: "Zkontrolujeme historii, výbavu a technický stav podle zaslaných podkladů.",
  },
  {
    number: "03",
    title: "Připravíme nabídku",
    description: "Ozveme se s individuální nabídkou výkupu nebo protiúčtu.",
  },
  {
    number: "04",
    title: "Domluvíme předání",
    description: "Po odsouhlasení nabídky se domluvíme na předání vozu a administrativě.",
  },
];

const whatWeBuy = [
  "Osobní automobily napříč značkami, palivy i kategoriemi",
  "Prémiové a sportovní vozy — naše dlouhodobá specializace",
  "Doplacené i financované vozy — pomůžeme vyplatit zůstatek úvěru nebo leasingu",
  "Vozy k okamžitému výkupu i jako protiúčet při koupi jiného vozu z naší nabídky",
];

const priceFactors = [
  "Celkový stav karoserie, interiéru a mechaniky",
  "Počet najetých kilometrů",
  "Servisní historie a pravidelnost údržby",
  "Výbava a specifikace vozu",
  "Aktuální poptávka po daném modelu na trhu",
];

const faqs = [
  {
    q: "Vykupujete i prémiová a sportovní vozidla?",
    a: "Ano — na prémiové a sportovní vozy se dlouhodobě specializujeme. Výkup ale rozhodně není jen pro ně, vykoupíme i běžné automobily libovolné značky.",
  },
  {
    q: "Jak rychle dokážete auto vykoupit?",
    a: "Ve většině případů dokážeme výkup dokončit během jednoho pracovního dne — pokud máte k dispozici všechny potřebné dokumenty a nevzniknou komplikace, například s doplacením financování.",
  },
  {
    q: "Musím s autem přijet osobně?",
    a: "Ne, k prvnímu posouzení stačí vyplnit formulář a přiložit fotografie vozu. Pokud vám to ale vyhovuje víc, klidně přijeďte i osobně — domluvíme se individuálně.",
  },
  {
    q: "Jaké dokumenty budu k výkupu potřebovat?",
    a: "Přesný seznam dokumentů se liší podle toho, zda vůz prodáváte jako soukromá osoba nebo firma a zda je doplacený. Probereme to individuálně po prvotním posouzení.",
  },
  {
    q: "Vykupujete i financovaná nebo leasingová vozidla?",
    a: "Ano. Pokud vůz ještě splácíte, pomůžeme i s vyřešením zůstatku úvěru nebo leasingu jako součástí výkupu.",
  },
  {
    q: "Jak probíhá platba?",
    a: "Platba probíhá většinou bankovním převodem. Po individuální domluvě je možná i platba v hotovosti.",
  },
  {
    q: "Kdo řeší přepis vozidla?",
    a: "Přepis vozidla a související administrativu vyřídíme my v rámci výkupu — nemusíte nic dalšího zařizovat.",
  },
  {
    q: "Zavazuje mě odeslání poptávky k něčemu?",
    a: "Ne. Odeslání formuláře ani prvotní posouzení vozu vás k ničemu nezavazuje — nabídku k výkupu dostanete až po prověření vozu a je jen na vás, zda ji přijmete.",
  },
  {
    q: "Vykupujete vozidla i mimo Prahu?",
    a: "Ano. Přestože primárně působíme v Praze, s výkupem vozidla pomáháme zákazníkům z celé České republiky.",
  },
  {
    q: "Co ovlivňuje výslednou výkupní cenu?",
    a: "Nejvíc záleží na celkovém stavu vozu, počtu najetých kilometrů, servisní historii, výbavě a také na aktuální poptávce po konkrétním modelu na trhu.",
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
              Výkup vozidel
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-lg font-display text-5xl font-normal leading-[1.05] text-graphite balance sm:text-6xl">
              Vykoupíme váš vůz rychle, férově a bez starostí
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Individuální ocenění prémiových, sportovních i běžných vozů.
              Výkup vyřešíme rychle, bezpečně a včetně veškeré
              administrativy.
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
              Nechat nacenit vůz
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
            Jak výkup probíhá
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
                  Vykupujeme vozidla všech značek a kategorií
                </h2>
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
            Nechte si vůz nacenit
          </h2>
        </Reveal>
        <SellCarForm />
      </div>
    </div>
  );
}
