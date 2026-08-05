import { publicEnv } from "@/lib/env/public";
import { isProductionDeployment } from "@/lib/env/deployment";

// NEXT_PUBLIC_SITE_URL prevalece cuando existe. En Vercel se usa la URL
// automática del despliegue; fuera de Vercel, localhost es solo un valor local.
function resolveSiteUrl(): string {
  if (publicEnv.NEXT_PUBLIC_SITE_URL) {
    return publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const vercelHost =
    isProductionDeployment
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
      : process.env.VERCEL_URL;

  return vercelHost ? `https://${vercelHost}` : "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

// Nombre de marca (el que se muestra en el sitio: navbar, footer, etc.)
export const SITE_NAME = "Promarketing Perú";

export const SITE_TITLE =
  "Promarketing Perú | Infraestructura Comercial Conectada";

export const SITE_DESCRIPTION =
  "Integramos marketing, ventas, datos y automatización en un ecosistema coherente y trazable para organizaciones que necesitan crecer con claridad.";

// Razón social real de la empresa — distinta del nombre de marca.
export const LEGAL_NAME = "Promarketing Consulting S.A.C.";

// Redes sociales confirmadas. Solo se listan las que tienen URL real
// confirmada por el usuario — no se inventan cuentas ni se asumen links.
export const SOCIAL_LINKS = [
  "https://www.instagram.com/promarketingperu",
  "https://pe.linkedin.com/company/promarketingpe",
  "https://www.facebook.com/ProMarketingConsulting/",
  "https://www.youtube.com/@promarketingperu",
  "https://www.tiktok.com/@promarketingperu",
  "https://x.com/promarketing",
];
