import type { Metadata } from "next";
import VozyPageClient from "@/components/cars/VozyPageClient";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Vozy",
  description:
    "Pečlivě vybrané automobily, které máme aktuálně v nabídce. Prohlédněte si prémiové a sportovní vozy Aufin.",
  alternates: { canonical: "/vozy" },
  openGraph: {
    title: "Vozy | Aufin",
    description: "Pečlivě vybrané automobily, které máme aktuálně v nabídce.",
  },
};

export default async function VozyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
            Nabídka
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-5xl font-normal text-graphite sm:text-6xl">
            Vozy
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-graphite-soft">
            Pečlivě vybrané automobily, které máme aktuálně v nabídce.
          </p>
        </Reveal>
      </div>

      <VozyPageClient initialQuery={q ?? ""} />
    </div>
  );
}
