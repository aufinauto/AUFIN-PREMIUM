import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PhotoImage from "@/components/ui/PhotoImage";

export default function SellCarSection() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-0 lg:grid-cols-2">
        <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[520px]">
          <PhotoImage
            src="/images/sections/sell-car.jpg"
            alt="Výkup a protiúčet vozu"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full"
          />
        </Reveal>

        <div className="px-6 py-8 lg:px-16 lg:py-0">
          <Reveal>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Prodej vozu
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-md font-display text-4xl font-normal leading-[1.1] text-graphite balance sm:text-5xl">
              Chcete prodat svůj vůz?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-soft">
              Nabídněte nám své auto. Po základním prověření Vám
              připravíme individuální nabídku výkupu nebo protiúčtu.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-9">
            <Link
              href="/prodej-vozu"
              className="inline-flex items-center justify-center bg-accent px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-graphite"
            >
              Nabídnout vůz
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
