import type { NextConfig } from "next";

// Valida secretos y credenciales de infraestructura antes de iniciar dev/build.
import "./lib/env/server";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
