import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAvailableCars, getCarBySlug } from "@/lib/cars-data";
import {
  bodyTypeLabels,
  displayName,
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
import CarCard from "@/components/cars/CarCard";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return {};

  const name = `${displayName(car)} ${car.year}`;
  const title = `${name} | Prodej Praha`;
  const specs = [
    name,
    formatMileage(car.mileage),
    `${kwToHp(car.powerKw)} k`,
    fuelLabels[car.fuel].toLowerCase(),
    car.color?.toLowerCase(),
  ]
    .filter(Boolean)
    .join(", ");
  const description =
    car.status === "sold"
      ? `${specs}. Vůz byl prodán – prohlédněte si aktuální nabídku prémiových a sportovních vozů ICONcars v Praze.`
      : `${specs}. Cena ${formatPrice(car.price)}. ${
          car.vatDeductible ? "Možnost odpočtu DPH, financování a protiúčtu" : "Možnost financování a protiúčtu"
        }. Prohlídka v Praze.`;

  return {
    title,
    description,
    alternates: { canonical: `/vozy/${car.slug}` },
    openGraph: { title: `${title} | ICONcars`, description },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  const name = displayName(car);
  const isSold = car.status === "sold";

  // A sold car keeps its URL (and any ranking it earned) — instead of a 404
  // it points visitors to similar cars, same brand first.
  const similarCars = isSold
    ? (await getAvailableCars())
        .filter((c) => c.id !== car.id)
        .sort((a, b) => Number(b.brand === car.brand) - Number(a.brand === car.brand))
        .slice(0, 3)
    : [];

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
          : isSold
            ? "https://schema.org/SoldOut"
            : "https://schema.org/LimitedAvailability",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vozy", item: `${SITE_URL}/vozy` },
      { "@type": "ListItem", position: 2, name },
    ],
  };

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-[1440px] px-6 pt-8 lg:px-10">
        <Breadcrumbs
          items={[
            { label: "Vozy", href: "/vozy" },
            { label: name },
          ]}
        />
      </div>

      {isSold && (
        <div className="mx-auto mt-5 max-w-[1440px] px-6 lg:px-10">
          <div className="flex flex-col gap-5 border border-stone-200 bg-stone-50 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="font-display text-2xl text-graphite">Tento vůz byl prodán</p>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-graphite-soft">
                Prohlédněte si aktuální nabídku, nebo nám napište, jaký vůz
                hledáte — rádi vám podobný najdeme.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/vozy"
                className="inline-flex items-center justify-center bg-graphite px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-accent"
              >
                Aktuální nabídka
              </Link>
              <a
                href="#zajem"
                className="inline-flex items-center justify-center border border-graphite px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-graphite transition-colors duration-300 hover:bg-graphite hover:text-white"
              >
                Poptat podobný vůz
              </a>
              <Link
                href="/vykup-vozidel"
                className="inline-flex items-center justify-center border border-graphite px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-graphite transition-colors duration-300 hover:bg-graphite hover:text-white"
              >
                Výkup vašeho vozu
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-5 max-w-[1440px] px-6 lg:px-10">
        <CarGallery photos={car.photos} title={name} />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <Reveal>
              <h1 className="font-display text-4xl font-normal text-graphite sm:text-5xl">
                {name} {car.year}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 font-sans text-[15px] text-graphite-soft">
                {car.year} · {formatMileage(car.mileage)} · {car.powerKw} kW ·{" "}
                {fuelLabels[car.fuel]}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="font-display text-3xl font-normal text-graphite sm:text-4xl">
                {formatPrice(car.price)}
              </p>
              {car.vatDeductible && car.priceWithoutVat && (
                <p className="mt-2 font-sans text-sm text-graphite-faint">
                  {formatPrice(car.priceWithoutVat)} bez DPH
                </p>
              )}
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
            <div id="zajem" className="scroll-mt-28">
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

        {similarCars.length > 0 && (
          <div className="mt-20">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.22em] text-accent">
              Aktuálně v nabídce
            </p>
            <h2 className="font-display text-3xl text-graphite">Podobné vozy</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similarCars.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
