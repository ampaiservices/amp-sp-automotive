import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

// Canonical host is the apex (https://spmotorworks.com); www redirects to it
// via a domain-level 308 configured in the Vercel dashboard, not here.
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      // Hero frame sequences are not content-hashed — `immutable` means a
      // changed frame must ship under a new filename.
      {
        source: "/hero-clips/frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);
