import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  compress: true,
  poweredByHeader: false,
  eslint: {
    // Prevent ESLint warnings/errors from blocking production deployment builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep strict type checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
