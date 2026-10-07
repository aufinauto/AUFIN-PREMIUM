import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import FinanceSection from "@/components/home/FinanceSection";
import SellCarSection from "@/components/home/SellCarSection";
import TrustPillars from "@/components/home/TrustPillars";
import ScrollCar from "@/components/home/ScrollCar";
import ContactSection from "@/components/home/ContactSection";

const title = "Prémiové vozy Praha | Prodej a výkup aut | ICONcars";
const description =
  "Prodej prověřených prémiových a sportovních vozů v Praze. BMW, Mercedes-Benz, Audi, Porsche a další. Výkup aut po celé ČR, financování i protiúčet.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title, description },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <ScrollCar />
      <SellCarSection />
      <TrustPillars />
      <FinanceSection />
      <ContactSection />
    </>
  );
}
