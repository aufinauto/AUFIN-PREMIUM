import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/prodej-vozu",
        destination: "/vykup-vozidel",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      // Default is 1MB — too small for photo uploads (admin photo manager
      // allows multiple files per save).
      bodySizeLimit: "25mb",
    },
  },
  images: {
    // AVIF first (smallest), WebP fallback for older browsers.
    formats: ["image/avif", "image/webp"],
    // 85 is used for the car gallery / lightbox, 75 everywhere else.
    qualities: [75, 85],
    // Car photos get unique (timestamped) file names on upload, so optimized
    // versions can be cached for a long time. When replacing a static image
    // in public/images, give it a new file name.
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nzawtsqfitepajsjexta.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
