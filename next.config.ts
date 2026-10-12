import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // AVIF first (smallest), WebP fallback. next/image negotiates via the
    // request Accept header.
    formats: ["image/avif", "image/webp"],
  },
};

export default withBotId(nextConfig);
