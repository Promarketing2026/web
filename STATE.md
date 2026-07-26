# STATE — Promarketing Perú (sitio web)

> Este archivo se actualiza al final de cada sesión de trabajo, en 2-5 líneas.
> Cualquier modelo (Claude Code, Codex, ChatGPT, Gemini, etc.) debe leer este
> archivo ANTES de escribir código. No se necesita historial de chat previo.

## Fase actual
Sección "Objeciones/FAQ" (A8) completada. Próximo paso: CTA final (A9).

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
2026-07-26 — Se creó la sección FAQ estática con cuatro preguntas y respuestas sobre la intervención de Promarketing.
Cada pregunta y respuesta se renderiza en elementos de DOM separados, preparados para animación futura y marcado FAQPage.
No se añadió JSON-LD todavía; queda reservado para la tarea de SEO técnico. A9 CTA final es la siguiente tarea.
