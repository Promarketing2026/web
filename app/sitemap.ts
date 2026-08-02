import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

// NEXT_PUBLIC_SITE_URL: agregar esta variable en .env.local y en Vercel
// cuando se decida el dominio final. Mientras tanto, usa el dominio
// gratuito de Vercel como valor por defecto — no hace falta tocar este
// archivo cuando el dominio cambie, solo actualizar la variable.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-orcin-sigma-57.vercel.app";

const staticRoutes = [
  "",
  "/blog",
  "/glosario",
  "/casos-de-exito",
  "/politica-de-privacidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { slug: string }[] = await client.fetch(POST_SLUGS_QUERY);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...postEntries];
}