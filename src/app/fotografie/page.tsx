import type { Metadata } from "next";
import { photoCredits } from "@/lib/photo-credits";

export const metadata: Metadata = {
  title: "Zdroje fotografií",
  alternates: { canonical: "/fotografie" },
};

export default function FotografiePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl text-graphite sm:text-5xl">Zdroje fotografií</h1>
      <p className="mt-6 text-[15.5px] leading-relaxed text-graphite-soft">
        Do doby, než bude web doplněn o vlastní fotografie skutečné nabídky
        vozů, používáme na ilustračních snímcích volně licencované fotografie
        z Wikimedia Commons. Níže je jejich úplný seznam s autory a licencemi.
      </p>
      <ul className="mt-10 space-y-4">
        {photoCredits.map((credit) => (
          <li key={credit.url} className="border-t border-stone-200 pt-4 text-sm">
            <a
              href={credit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-reveal text-graphite"
            >
              {credit.title}
            </a>
            <span className="text-graphite-faint"> — {credit.author}, {credit.license}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
