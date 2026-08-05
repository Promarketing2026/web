import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostCard } from "@/sanity/lib/types";

export const metadata = {
  title: "Blog",
  description: "Artículos de Promarketing Perú.",
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await client.fetch<PostCard[]>(POSTS_QUERY);

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-normal text-muted-foreground uppercase">
            Blog
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Ideas para construir infraestructura comercial medible.
          </h1>
        </div>

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = post.imagenDestacada
                ? urlForImage(post.imagenDestacada).width(900).height(560).url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-colors hover:bg-accent"
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.imagenDestacada?.alt || post.titulo}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time
                      dateTime={post.fecha}
                      className="text-sm text-muted-foreground"
                    >
                      {formatDate(post.fecha)}
                    </time>
                    <h2 className="mt-3 text-xl leading-snug font-semibold text-foreground">
                      {post.titulo}
                    </h2>
                    {post.extracto ? (
                      <p className="mt-4 line-clamp-4 text-base leading-7 text-muted-foreground">
                        {post.extracto}
                      </p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-lg border border-border bg-card p-8 text-card-foreground">
            <p className="text-base leading-7 text-muted-foreground">
              Todavia no hay articulos publicados en Sanity.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
