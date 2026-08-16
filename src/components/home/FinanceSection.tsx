import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import PhotoImage from "@/components/ui/PhotoImage";

const benefits = [
  "Individuální nastavení akontace",
  "Možnost různých délek financování",
  "Financování pro fyzické osoby i firmy",
  "Financování vozů s odpočtem DPH",
  "Individuální posouzení nabídky",
  "Vyřízení administrativy na jednom místě",
];

export default function FinanceSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-6 pt-12 lg:px-10 lg:pb-8 lg:pt-16">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="Financování"
            title="Financování bez zbytečných komplikací"
            description="Pomůžeme vám nastavit financování vozu podle vašich možností a preferencí. Spolupracujeme s bankovními a finančními partnery a připravíme individuální nabídku."
          />

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <StaggerItem key={b} className="flex items-start gap-3">
                <span className="mt-3 h-px w-4 shrink-0 bg-accent" />
                <span className="text-[15px] leading-relaxed text-graphite-soft">{b}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2} className="mt-10">
            <Link
              href="/financovani"
              className="inline-flex items-center justify-center bg-graphite px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-accent"
            >
              Spočítat financování
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={32} className="relative aspect-[4/5] overflow-hidden">
          <PhotoImage
            src="/images/sections/finance-interior.jpg"
            alt="Interiér vozu"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
