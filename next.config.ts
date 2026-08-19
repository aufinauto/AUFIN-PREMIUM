import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB — too small for photo uploads (admin photo manager
      // allows multiple files per save).
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
