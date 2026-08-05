// Datos centralizados del sitio y la empresa. Reutilizado por
// app/sitemap.ts, app/robots.ts y el JSON-LD (SEO-2).
//
// NEXT_PUBLIC_SITE_URL: agregar esta variable en .env.local y en Vercel
// cuando se decida el dominio final. Mientras tanto, usa el dominio
// gratuito de Vercel como valor por defecto.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-orcin-sigma-57.vercel.app";

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
