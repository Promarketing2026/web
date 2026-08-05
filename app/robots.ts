import type { MetadataRoute } from "next";

import { isProductionDeployment } from "@/lib/env/deployment";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
