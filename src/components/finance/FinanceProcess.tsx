import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import Index from "@/components/ui/Index";

const steps = [
  {
    title: "Vyberete vůz",
    text: "Najdete si automobil z naší nabídky nebo nám řeknete, jaký vůz hledáte.",
  },
  {
    title: "Nastavíme financování",
    text: "Společně nastavíme akontaci, dobu financování a další parametry.",
  },
  {
    title: "Připravíme nabídku",
    text: "Předáme podklady finančnímu partnerovi a připravíme konkrétní nabídku.",
  },
  {
    title: "Převezmete vůz",
    text: "Po schválení vyřešíme potřebnou administrativu a automobil si převezmete.",
  },
];

export default function FinanceProcess() {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <StaggerItem key={step.title} className="border-t border-stone-200 pt-6">
          <Index n={i + 1} />
          <h3 className="mt-5 font-display text-xl text-graphite">{step.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">{step.text}</p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
