import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import PhotoImage from "@/components/ui/PhotoImage";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte nás. Vozy si můžete prohlédnout v partnerském showroomu SilverCars v pražském Karlíně. Telefon, e-mail, otevírací doba a formulář.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 pb-3 pt-8 lg:px-10 lg:pb-8 lg:pt-20">
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">Kontakt</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-5xl font-normal text-graphite sm:text-6xl">
            Rádi vás uvidíme v showroomu.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-graphite-soft">
            Vozy si můžete prohlédnout v showroomu našeho partnera{" "}
            <span className="text-graphite">SilverCars</span> v pražském
            Karlíně.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-3 lg:px-10 lg:pb-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <PhotoImage
              src="/images/sections/contact-showroom-new.jpg"
              alt="Partnerský showroom SilverCars"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
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

            <Reveal delay={0.05}>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
                  Kontakt
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-graphite">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href="tel:+420777123456"
                    className="underline-reveal font-display text-xl text-graphite"
                  >
                    +420 777 123 456
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-graphite">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a
                    href="mailto:info@aufin.cz"
                    className="underline-reveal font-display text-xl text-graphite"
                  >
                    info@aufin.cz
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-graphite">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <a
                    href="https://wa.me/420777123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-reveal font-display text-xl text-graphite"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
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
        </div>

        {/* HOW TO CONTACT SECTION */}
        <div className="mt-20">
          <Reveal className="mb-16 text-center">
            <h2 className="font-display text-4xl font-normal leading-[1.1] text-graphite sm:text-5xl">
              Jak nás můžete kontaktovat
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            <Reveal>
              <div className="flex flex-col">
                <p className="font-display text-2xl font-normal text-graphite">01</p>
                <h3 className="mt-4 font-display text-lg text-graphite">Zavolejte nám</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">
                  Pro rychlý dotaz nebo domluvu schůzky.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex flex-col">
                <p className="font-display text-2xl font-normal text-graphite">02</p>
                <h3 className="mt-4 font-display text-lg text-graphite">Napište nám</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">
                  Přes formulář, e-mail nebo WhatsApp.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col">
                <p className="font-display text-2xl font-normal text-graphite">03</p>
                <h3 className="mt-4 font-display text-lg text-graphite">Navštivte showroom</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-soft">
                  Vozy si můžete prohlédnout osobně v partnerském showroomu SilverCars.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal y={0}>
            <div className="flex flex-col">
              <p className="mb-4 font-sans text-sm text-graphite-soft">
                Zadejte do map „SilverCars" a ono vás to nasměruje na správné místo.
              </p>
              <div className="relative aspect-[4/3] overflow-hidden border border-stone-200 grayscale-[0.3] contrast-[1.05]">
                <iframe
                  title="Mapa — Rustonka RII, Rohanské nábřeží 693/10, Praha 8"
                  src="https://www.google.com/maps?q=Rohansk%C3%A9%20n%C3%A1b%C5%99e%C5%BE%C3%AD%20693%2F10%2C%20186%2000%20Praha%208&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal y={0} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
