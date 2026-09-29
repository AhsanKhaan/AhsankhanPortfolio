import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a local preview build run alongside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // The whole stylesheet is ~14KB, so inlining it removes two render-blocking requests
    // from the critical path for less than a single extra round trip of bytes.
    inlineCss: true,
  },
};

export default nextConfig;
