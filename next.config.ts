import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds for now
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
