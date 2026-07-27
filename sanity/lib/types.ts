import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & {
  alt?: string;
};

export type PostCard = {
  _id: string;
  titulo: string;
  slug: string;
  fecha: string;
  extracto?: string;
  imagenDestacada?: SanityImage;
};

export type Post = PostCard & {
  contenido?: PortableTextBlock[];
};

export type PostSlug = {
  slug: string;
};

export type GlosarioTermino = {
  _id: string;
  termino: string;
  definicionCorta: string;
  definicionExtendida?: PortableTextBlock[];
};
