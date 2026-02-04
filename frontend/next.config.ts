import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    domains: ["flagsapi.com"], // Allow Next.js Image to load from this domain
  },
};

export default nextConfig;
