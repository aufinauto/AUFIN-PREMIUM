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
