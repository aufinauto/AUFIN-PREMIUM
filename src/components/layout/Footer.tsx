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
      {
        href: "tel:+420777123456",
        label: "+420 777 123 456",
        icon: "phone"
      },
      {
        href: "mailto:info@aufin.cz",
        label: "info@aufin.cz",
        icon: "email"
      },
      {
        href: "https://wa.me/420777123456",
        label: "WhatsApp",
        external: true,
        icon: "whatsapp"
      },
      {
        href: "https://instagram.com",
        label: "Instagram",
        external: true,
        icon: "instagram"
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-14">
          <div className="col-span-2 lg:col-span-1">
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
                      className="underline-reveal flex items-center gap-2 font-sans text-[14px] text-white/75 transition-colors hover:text-white"
                    >
                      {"icon" in link && link.icon && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                          {link.icon === "phone" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
                          {link.icon === "email" && <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />}
                          {link.icon === "email" && <polyline points="22 6 12 13 2 6" />}
                          {link.icon === "whatsapp" && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
                          {link.icon === "instagram" && (
                            <>
                              <rect x="2" y="2" width="20" height="20" rx="5" />
                              <circle cx="12" cy="12" r="4" />
                              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                            </>
                          )}
                        </svg>
                      )}
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
