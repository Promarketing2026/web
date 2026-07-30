# STATE — Promarketing Perú (sitio web)

> Este archivo se actualiza al final de cada sesión de trabajo, en 2-5 líneas.
> Cualquier modelo (Claude Code, Codex, ChatGPT, Gemini, etc.) debe leer este
> archivo ANTES de escribir código. No se necesita historial de chat previo.

## Fase actual
A12c (anti-spam) y DEPLOY-1 (primer deploy a Vercel) completados. Sitio en producción: https://web-orcin-sigma-57.vercel.app/. Próximo paso: A12d (redirección post-envío a /gracias).

## Stack decidido (congelado, no cambiar sin discutirlo)
- Framework: Next.js 16 (App Router, Turbopack)
- Paquetes: pnpm
- Estilos: Tailwind CSS v4
- Componentes: shadcn/ui + Radix UI (NO usar daisyUI, son sistemas incompatibles)
- Animación de componentes: Motion (`motion/react` — NO usar el import viejo `framer-motion`)
- Animación de scroll: GSAP + ScrollTrigger + SplitText + Lenis
- CMS de contenido: Sanity.io (free tier)
- CRM de leads: HubSpot (free tier) — vía API desde Server Action del formulario
- Hosting: Vercel (free/Hobby)

## Decisiones de diseño
- Design system basado en referencias tipo Clerk/Vercel/Supabase, pero implementado
  100% con TOKENS (variables CSS/Tailwind), no valores hardcodeados — así se puede
  cambiar de referencia visual después sin reescribir componentes.
- Paleta de color: PENDIENTE A PROPÓSITO. El usuario la está definiendo como parte
  de su proceso de aprendizaje de marca. Mientras tanto usar variables placeholder
  neutras (ej. `--color-primary: #71717a` gris neutro) en vez de colores reales.
  No inventar ni sugerir una paleta final sin que el usuario la traiga.

## Narrativa de conversión del Home (orden de bloques, ya definido)
1. Hook (promesa clara, sin jerga)
2. El problema (lo que el mercado no explica bien)
3. Educación del concepto (bloque diferenciador, animación GSAP scroll)
4. La solución (el servicio, ya entendido por el lector)
5. Prueba social (caso de éxito con cifras)
6. Objeciones (FAQ corto)
7. CTA final

## Pendiente de traer del usuario
- BRAND.md (sistema de marca conceptual: tono de voz, valores, reglas — sin paleta todavía)
- Contenido real de servicios y casos de éxito

## Última actualización
2026-07-26 — Se agregó Motion a la sección "La solución" usando la variante compartida de `lib/animations.ts`.
Título, párrafos y dimensiones entran con fade/slide; la lista de dimensiones usa `staggerChildren`.
B4.5 agregó alternancia de secciones, separadores tipo muesca y variante `.section-dark` para secciones oscuras.
B5a agregó el SVG estático de 3 etapas: fragmentación, solución conectada y resultado medible.
B5b agregó `ScrollTrigger` con pin, scrub y crossfade entre las 3 etapas del SVG durante `+=200%`.
B5c sincronizó los tres textos existentes con las etapas del SVG reutilizando el mismo timeline y ScrollTrigger.
B6 Motion en Prueba social, Objeciones y CTA final pasa a ser la siguiente tarea.
2026-07-26 — A13 configuró Sanity Studio embebido en `/studio` con `next-sanity`.
Se agregaron schemas mínimos para `post`, `glosarioTermino` y `casoDeExito`, parametrizados por variables `NEXT_PUBLIC_SANITY_*`.
No se crearon páginas frontend del blog; quedan para una tarea posterior.
2026-07-26 — A14a creó `/blog` y `/blog/[slug]` conectados a Sanity con GROQ.
El listado muestra tarjetas responsive de `post`; el detalle renderiza título, fecha, imagen destacada y `contenido` con PortableText.
No se crearon todavía páginas de glosario ni casos de éxito.
2026-07-26 — A14b creó `/glosario` conectado a Sanity con GROQ.
La página lista `glosarioTermino` en orden alfabético y usa accordion shadcn/Radix para mostrar la definición extendida.
No se crearon páginas individuales por término.
2026-07-26 — A14c creó `/casos-de-exito` conectado a Sanity con GROQ.
La página lista `casoDeExito` en tarjetas y reutiliza la tarjeta de resultado extraída desde la sección Prueba social.
No se crearon páginas individuales por caso.
2026-07-26 — Navbar actualizado con dropdown estático "Recursos".
El dropdown usa shadcn/Radix y enlaza a `/blog`, `/glosario` y `/casos-de-exito` manteniendo Inicio, Solución y Contacto.
2026-07-26 — Footer reestructurado en columnas responsivas.
La primera columna agrupa marca, descripción y redes; la segunda navegación; la tercera conserva Contacto; copyright queda al ancho completo.
2026-07-26 — Página `/gracias` agregada para post-conversión.
Incluye componente cliente reutilizable con contador 5→0, redirección a `/`, soporte de `servicio` y captura visible de parámetros UTM presentes en la URL.
2026-07-30 — A12c completado: honeypot (campo "pagina_web") + rate limiting
por IP con Upstash Redis (`lib/rate-limit.ts`, ventana de 10 min, máx. 3
envíos), integrados en la Server Action de `lib/hubspot.ts`. Siguiente paso:
A12d (redirección post-envío a /gracias con UTMs vía sessionStorage).

2026-07-30 — DEPLOY-1 completado: proyecto `web` desplegado en Vercel
(https://web-orcin-sigma-57.vercel.app/). Variables HUBSPOT_SERVICE_KEY y
NEXT_PUBLIC_SANITY_* configuradas manualmente; hubo que desactivar
"Vercel Authentication" en Deployment Protection porque venía activada
por defecto y bloqueaba el acceso público al sitio. Verificado: Home,
formulario→HubSpot, y /blog, /glosario, /casos-de-exito con contenido
real de Sanity. Pendiente: conectar integración de Upstash Redis al
proyecto (las variables KV/UPSTASH no se cargaron, rate limiting
inactivo por ahora — el resto del anti-spam, honeypot, sí funciona).

2026-07-30 — A12d verificado end-to-end: formulario envía a HubSpot,
redirige a /gracias con servicio y UTMs, countdown regresa al home.
Corregido bug de sintaxis JSX (etiqueta <a> faltante) en
auditoria-form.tsx y thank-you-redirect.tsx. Corregido error de
consola "removeChild/NotFoundError" en la sección "Educación del
concepto": se migró education.tsx de useEffect + gsap.context manual
al hook useGSAP de @gsap/react, que sincroniza correctamente la
limpieza de ScrollTrigger/pin-spacer con el desmontaje de React
durante la navegación entre páginas.

## Dependencias de Fase B
Instaladas manualmente el 26-07-2026: motion, gsap, @gsap/react, lenis. pnpm build OK.