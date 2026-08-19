import type { MetadataRoute } from "next";
import { getAllCars } from "@/lib/cars-data";

const baseUrl = "https://www.aufin.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getAllCars();

  const staticRoutes = [
    "",
    "/vozy",
    "/financovani",
    "/prodej-vozu",
    "/o-nas",
    "/kontakt",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const carRoutes = cars.map((car) => ({
    url: `${baseUrl}/vozy/${car.slug}`,
    lastModified: new Date(car.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...carRoutes];
}
