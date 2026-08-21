import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-8 lg:px-10 lg:pb-14 lg:pt-12">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Kontakt"
            title="Ozvěte se nám"
            description="Vozy si můžete prohlédnout v showroomu našeho partnera SilverCars v pražském Karlíně."
          />

          <Reveal delay={0.15}>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
                Kontakt
              </p>
              <a
                href="tel:+420704901148"
                className="underline-reveal mt-3 flex items-center gap-2.5 font-display text-xl text-graphite"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
                  <path d="M6.5 3.5c-1 0-1.8.8-1.8 1.8 0 7.5 6 13.5 13.5 13.5 1 0 1.8-.8 1.8-1.8v-2.2a1 1 0 0 0-.7-1l-3-1a1 1 0 0 0-1.1.3l-1.2 1.5a11 11 0 0 1-5-5l1.5-1.2a1 1 0 0 0 .3-1.1l-1-3a1 1 0 0 0-1-.7Z" />
                </svg>
                +420 704 901 148
              </a>
              <a
                href="mailto:info@aufin.cz"
                className="underline-reveal mt-2 flex items-center gap-2.5 font-display text-xl text-graphite"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
                  <path d="M4 6.5h16v11H4v-11Z" />
                  <path d="M4.5 7l7.5 6 7.5-6" />
                </svg>
                info@aufin.cz
              </a>
              <a
                href="https://wa.me/420704901148"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-reveal mt-2 flex items-center gap-2.5 font-display text-xl text-graphite"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
                  <path d="M12 4.5a7.5 7.5 0 0 0-6.5 11.2L4.5 19.5l4-1.1A7.5 7.5 0 1 0 12 4.5Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
                Partnerský showroom — SilverCars
              </p>
              <p className="mt-3 font-display text-xl text-graphite">
                Rustonka RII
                <br />
                Rohanské nábřeží 693/10
                <br />
                186 00 Praha 8
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
                Otevírací doba
              </p>
              <div className="mt-3 space-y-1.5 font-sans text-[15px] text-graphite-soft">
                <div className="flex justify-between gap-8">
                  <span>Pondělí – Pátek</span>
                  <span className="text-graphite">9:30 – 17:00</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Telefon, e-mail</span>
                  <span className="text-graphite">denně 9:00 – 21:00</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
