import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";
import HomeLogoLink from "@/components/ui/HomeLogoLink";

const columns = [
  {
    title: "Navigace",
    links: [
      { href: "/vozy", label: "Vozy" },
      { href: "/financovani", label: "Financování" },
      { href: "/prodej-vozu", label: "Prodej vozu" },
      { href: "/o-nas", label: "O nás" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { href: "tel:+420777123456", label: "+420 777 123 456" },
      { href: "mailto:info@aufin.cz", label: "info@aufin.cz" },
      {
        href: "https://wa.me/420777123456",
        label: "WhatsApp",
        external: true,
      },
      {
        href: "https://instagram.com",
        label: "Instagram",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <HomeLogoLink className="flex items-center gap-2.5 font-display text-2xl italic transition-opacity duration-300 hover:opacity-70">
              <LogoMark className="h-9 w-9" variant="light" />
              Aufin
            </HomeLogoLink>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Pečlivě vybrané prémiové, sportovní a zajímavé automobily. Prodej,
              výkup a bankovní financování na jednom místě.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="underline-reveal font-sans text-[14px] text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 font-sans text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Aufin. Všechna práva vyhrazena. —
            Dejvetech s.r.o., IČO 22491872, DIČ CZ22491872, Humpolecká 1886/26,
            Krč, 140 00 Praha, spisová značka C 417382/MSPH Městský soud v Praze
          </p>
        </div>
      </div>
    </footer>
  );
}
