import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://www.aufin.cz";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${bodoniModa.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-graphite">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
