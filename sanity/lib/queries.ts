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
    "slug": slug.current,
    definicionCorta,
    definicionExtendida
  }
`;

export const GLOSARIO_TERMINO_QUERY = groq`
  *[_type == "glosarioTermino" && slug.current == $slug][0] {
    _id,
    termino,
    "slug": slug.current,
    definicionCorta,
    definicionExtendida
  }
`;

export const GLOSARIO_SLUGS_QUERY = groq`
  *[_type == "glosarioTermino" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const CASOS_DE_EXITO_QUERY = groq`
  *[_type == "casoDeExito" && defined(cliente)] | order(cliente asc) {
    _id,
    cliente,
    "slug": slug.current,
    situacion,
    intervencion,
    resultado,
    cifraDestacada
  }
`;

export const CASO_DE_EXITO_QUERY = groq`
  *[_type == "casoDeExito" && slug.current == $slug][0] {
    _id,
    cliente,
    "slug": slug.current,
    situacion,
    intervencion,
    resultado,
    cifraDestacada
  }
`;

export const CASOS_DE_EXITO_SLUGS_QUERY = groq`
  *[_type == "casoDeExito" && defined(slug.current)] {
    "slug": slug.current
  }
`;
