import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ICONcars — Ikonická auta",
    short_name: "ICONcars",
    description: "Prémiové a sportovní automobily. Prodej, výkup a bankovní financování na jednom místě.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFAF7",
    theme_color: "#17181A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
