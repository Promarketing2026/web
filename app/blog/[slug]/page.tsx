import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Post, PostSlug } from "@/sanity/lib/types";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const posts = await client.fetch<PostSlug[]>(POST_SLUGS_QUERY);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });

  if (!post) {
    return {};
  }

  return {
    title: `${post.titulo} | Promarketing Peru`,
    description: post.extracto,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  const imageUrl = post.imagenDestacada
    ? urlForImage(post.imagenDestacada).width(1400).height(780).url()
    : null;

  return (
    <article className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <time dateTime={post.fecha} className="text-sm text-muted-foreground">
          {formatDate(post.fecha)}
        </time>
        <h1 className="mt-4 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
          {post.titulo}
        </h1>
        {post.extracto ? (
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {post.extracto}
          </p>
        ) : null}
      </div>

      {imageUrl ? (
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={imageUrl}
              alt={post.imagenDestacada?.alt || post.titulo}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-12 max-w-3xl">
        {post.contenido ? (
          <div className="space-y-6 text-lg leading-8 text-foreground">
            <PortableText value={post.contenido} />
          </div>
        ) : (
          <p className="text-base leading-7 text-muted-foreground">
            Este articulo todavia no tiene contenido publicado.
          </p>
        )}
      </div>
    </article>
  );
}
