import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { getAllCars } from "@/lib/cars-data";

const siteUrl = "https://www.aufin.cz";

// Car inventory changes at runtime via /admin — never prerender pages that
// depend on it at build time (also avoids build-container network/clock
// issues talking to Supabase during `next build`).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aufin — Prémiové a sportovní automobily",
    template: "%s | Aufin",
  },
  description:
    "Pečlivě vybrané prémiové, sportovní a zajímavé automobily. Prodej, výkup a bankovní financování na jednom místě.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Aufin",
    title: "Aufin — Prémiové a sportovní automobily",
    description:
      "Pečlivě vybrané prémiové, sportovní a zajímavé automobily. Prodej, výkup a bankovní financování na jednom místě.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cars = await getAllCars();

  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-graphite">
        <Header cars={cars} />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCTA cars={cars} />
        <ScrollToTop />
      </body>
    </html>
  );
}
