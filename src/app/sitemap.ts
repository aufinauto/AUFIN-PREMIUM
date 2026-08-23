import type { MetadataRoute } from "next";
import { getAllCars } from "@/lib/cars-data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getAllCars();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/vykup-vozidel", priority: 0.9 },
    { path: "/vozy", priority: 0.9 },
    { path: "/financovani", priority: 0.7 },
    { path: "/o-nas", priority: 0.6 },
    { path: "/kontakt", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const carRoutes = cars.map((car) => ({
    url: `${SITE_URL}/vozy/${car.slug}`,
    lastModified: new Date(car.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...carRoutes];
}
