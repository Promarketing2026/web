import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import {
  POST_SLUGS_QUERY,
  GLOSARIO_SLUGS_QUERY,
  CASOS_DE_EXITO_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";

const staticRoutes = [
  "",
  "/servicios",
  "/blog",
  "/glosario",
  "/casos-de-exito",
  "/politica-de-privacidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { slug: string }[] = await client.fetch(POST_SLUGS_QUERY);
  const terminos: { slug: string }[] = await client.fetch(GLOSARIO_SLUGS_QUERY);
  const casos: { slug: string }[] = await client.fetch(CASOS_DE_EXITO_SLUGS_QUERY);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const terminosEntries: MetadataRoute.Sitemap = terminos.map((t) => ({
    url: `${SITE_URL}/glosario/${t.slug}`,
    lastModified: new Date(),
  }));

  const casosEntries: MetadataRoute.Sitemap = casos.map((c) => ({
    url: `${SITE_URL}/casos-de-exito/${c.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...postEntries,
    ...terminosEntries,
    ...casosEntries,
  ];
}