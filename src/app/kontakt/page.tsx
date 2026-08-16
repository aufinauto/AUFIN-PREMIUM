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
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 lg:px-10 lg:pt-20">
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

      <div className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal y={0} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <PhotoImage
              src="/images/sections/contact-showroom.jpg"
              alt="Partnerský showroom SilverCars"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full"
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
                <a
                  href="tel:+420777123456"
                  className="underline-reveal mt-3 block font-display text-xl text-graphite"
                >
                  +420 777 123 456
                </a>
                <a
                  href="mailto:info@aufin.cz"
                  className="underline-reveal mt-2 block font-display text-xl text-graphite"
                >
                  info@aufin.cz
                </a>
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

            <Reveal delay={0.15}>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/420777123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-reveal font-sans text-sm uppercase tracking-[0.08em] text-graphite"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-reveal font-sans text-sm uppercase tracking-[0.08em] text-graphite"
                >
                  Instagram
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="relative aspect-[16/6] w-full overflow-hidden border border-stone-200 grayscale-[0.3] contrast-[1.05]">
            <iframe
              title="Mapa — Rustonka RII, Rohanské nábřeží 693/10, Praha 8"
              src="https://www.google.com/maps?q=Rohansk%C3%A9%20n%C3%A1b%C5%99e%C5%BE%C3%AD%20693%2F10%2C%20186%2000%20Praha%208&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <div className="mt-16 max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
