import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 85],
    remotePatterns: [
      // Placeholder photography (Unsplash license). Replace with client
      // photography + MLS photo hosts once the feeds are approved.
      // Query strings allowed so we can request pre-sized originals (?w=).
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
    ],
  },
};

export default nextConfig;
