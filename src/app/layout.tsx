import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { getAllCars } from "@/lib/cars-data";
import { SITE_URL, NAP } from "@/lib/site";

// Car inventory changes at runtime via /admin — never prerender pages that
// depend on it at build time (also avoids build-container network/clock
// issues talking to Supabase during `next build`).
export const dynamic = "force-dynamic";

const description =
  "ICON je pražská značka specializovaná na prémiové a sportovní automobily — prodej vybraných vozů a výkup vozidel po celé ČR. Financování, protiúčet i kompletní administrativa na jednom místě.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ICONcars — Prémiové a sportovní vozy, výkup vozidel",
    template: "%s | ICONcars",
  },
  description,
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "ICONcars",
    title: "ICONcars — Prémiové a sportovní vozy, výkup vozidel",
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoDealer",
      "@id": `${SITE_URL}/#organization`,
      name: NAP.name,
      legalName: NAP.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description,
      email: NAP.email,
      telephone: NAP.phone,
      sameAs: ["https://www.instagram.com/iconcars.cz/"],
      address: {
        "@type": "PostalAddress",
        streetAddress: NAP.showroom.streetAddress,
        addressLocality: NAP.showroom.addressLocality,
        postalCode: NAP.showroom.postalCode,
        addressCountry: NAP.showroom.addressCountry,
      },
      areaServed: [
        { "@type": "City", name: "Praha" },
        { "@type": "Country", name: "Česká republika" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "17:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: NAP.phone,
        email: NAP.email,
        areaServed: "CZ",
        availableLanguage: "Czech",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: NAP.name,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/vozy?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cars = await getAllCars();

  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-graphite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header cars={cars} />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCTA cars={cars} />
        <ScrollToTop />
      </body>
    </html>
  );
}
