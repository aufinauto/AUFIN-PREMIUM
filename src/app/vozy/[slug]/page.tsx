import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cars, displayName, getCarBySlug } from "@/lib/cars-data";
import {
  bodyTypeLabels,
  formatMileage,
  formatPrice,
  fuelLabels,
  kwToHp,
  transmissionLabels,
} from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CarGallery from "@/components/cars/CarGallery";
import CarSpecs from "@/components/cars/CarSpecs";
import CarEquipment from "@/components/cars/CarEquipment";
import PricePanel from "@/components/cars/PricePanel";
import TradeInBlock from "@/components/cars/TradeInBlock";
import InterestForm from "@/components/cars/InterestForm";
import FinanceCalculator from "@/components/finance/FinanceCalculator";
import Reveal from "@/components/ui/Reveal";
import Index from "@/components/ui/Index";

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};

  const title = `${displayName(car)} ${car.year}`;
  const description = `${displayName(car)}, ${car.year}, ${formatMileage(
    car.mileage
  )}, ${kwToHp(car.powerKw)} k, ${fuelLabels[car.fuel]}. Cena ${formatPrice(car.price)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/vozy/${car.slug}` },
    openGraph: { title: `${title} | Aufin`, description },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const name = displayName(car);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" },
    fuelType: fuelLabels[car.fuel],
    vehicleTransmission: transmissionLabels[car.transmission],
    bodyType: bodyTypeLabels[car.bodyType],
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "CZK",
      availability:
        car.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1440px] px-6 pt-8 lg:px-10">
        <Breadcrumbs
          items={[
            { label: "Vozy", href: "/vozy" },
            { label: name },
          ]}
        />
      </div>

      <div className="mx-auto mt-5 max-w-[1440px] px-6 lg:px-10">
        <CarGallery photos={car.photos} title={name} />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <Reveal>
              <h1 className="font-display text-4xl font-normal text-graphite sm:text-5xl">
                {name}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 font-sans text-[15px] text-graphite-soft">
                {car.year} · {formatMileage(car.mileage)} · {car.powerKw} kW ·{" "}
                {fuelLabels[car.fuel]}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <Index n={1} />
              <h2 className="mt-4 font-display text-2xl text-graphite">Specifikace</h2>
              <div className="mt-5">
                <CarSpecs car={car} />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <Index n={2} />
              <h2 className="mt-4 font-display text-2xl text-graphite">O vozu</h2>
              <div className="mt-5 space-y-4">
                {car.description.map((p, i) => (
                  <p key={i} className="text-[15.5px] leading-relaxed text-graphite-soft">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <Index n={3} />
              <h2 className="mt-4 font-display text-2xl text-graphite">Výbava</h2>
              <div className="mt-6">
                <CarEquipment equipment={car.equipment} />
              </div>
            </Reveal>
          </div>

          <div className="hidden flex-col gap-6 lg:flex lg:sticky lg:top-28">
            <PricePanel car={car} />
            <TradeInBlock />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div>
              <p className="mb-2 font-sans text-xs uppercase tracking-[0.22em] text-accent">
                Zájem o vůz
              </p>
              <h2 className="mb-6 font-display text-2xl text-graphite">Mám zájem</h2>
              <InterestForm carLabel={name} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <p className="mb-2 font-sans text-xs uppercase tracking-[0.22em] text-accent">
                Financování
              </p>
              <h2 className="mb-6 font-display text-2xl text-graphite">
                Financování tohoto vozu
              </h2>
              <FinanceCalculator
                initialPrice={car.price}
                ctaHref={`/financovani?vuz=${car.slug}`}
                className="pb-10 sm:pb-14"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
