import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizePackageImports: [
    '@prisma/client'
  ],
};

export default nextConfig;
