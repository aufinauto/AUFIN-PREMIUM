import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

const points = [
  {
    title: "Kvalitní vozidla",
    text: "Pečlivě vybrané vozy s prověřenou historií a stavem.",
    icon: (
      <path d="M4 16.5l1.6-4.8A2 2 0 0 1 7.5 10.3h9a2 2 0 0 1 1.9 1.4l1.6 4.8M4 16.5h16M4 16.5v2.8a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7v-1.3m12 1.3v1.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7v-2.8M7.5 13.8h9" />
    ),
  },
  {
    title: "Partnerský showroom",
    text: "Zázemí a kontakty partnerského showroomu SilverCars.",
    icon: (
      <path d="M4 20V9l8-4 8 4v11M4 20h16M9 20v-5h6v5M9 12h.01M15 12h.01M9 8.5h.01M15 8.5h.01" />
    ),
  },
  {
    title: "Osobní přístup",
    text: "Individuální poradenství při výběru i financování.",
    icon: (
      <path d="M15.5 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 20c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5" />
    ),
  },
];

export default function TrustPillars() {
  return (
    <section className="border-y border-stone-200 bg-graphite text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-accent-soft">
            Proč zvolit nás
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-normal leading-[1.1] text-white sm:text-5xl">
            Záruka spolehlivosti <span className="italic text-accent-soft">a férovosti.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
          {points.map((p) => (
            <StaggerItem key={p.title} className="border-t border-white/15 pt-6">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-soft"
              >
                {p.icon}
              </svg>
              <h3 className="mt-5 font-display text-lg text-white">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{p.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
