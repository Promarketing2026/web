import { groq } from "next-sanity";

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(fecha desc) {
    _id,
    titulo,
    "slug": slug.current,
    fecha,
    extracto,
    imagenDestacada
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    titulo,
    "slug": slug.current,
    fecha,
    extracto,
    imagenDestacada,
    contenido
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const GLOSARIO_TERMINOS_QUERY = groq`
  *[_type == "glosarioTermino" && defined(termino)] | order(termino asc) {
    _id,
    termino,
    definicionCorta,
    definicionExtendida
  }
`;
