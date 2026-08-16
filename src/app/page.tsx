import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import FinanceSection from "@/components/home/FinanceSection";
import SellCarSection from "@/components/home/SellCarSection";
import TrustPillars from "@/components/home/TrustPillars";
import ScrollCar from "@/components/home/ScrollCar";
import ContactSection from "@/components/home/ContactSection";

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
