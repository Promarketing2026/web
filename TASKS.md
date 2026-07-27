# TASKS — Promarketing Perú

> Regla: trabajar SOLO en la tarea marcada `[SIGUIENTE]`. No adelantar tareas
> futuras. Al terminar, mover el check a `[hecho]` y actualizar STATE.md.
> Una tarea = un componente o una configuración, nunca "la página completa".
>
> IMPORTANTE al escribir prompts para Codex: nunca referenciar "el párrafo de
> arriba" o "el copy que definimos" — Codex no tiene el historial del chat.
> Copiar siempre el texto exacto y completo en el prompt.
>
> NOTA SOBRE "[hecho]": significa que el componente existe y funciona a nivel
> básico, NO que esté perfecto. Los defectos conocidos de tareas ya hechas
> viven en la sección "PENDIENTES DE RETOQUE" más abajo — no se pierden,
> solo se pausan hasta que el usuario los priorice.

## DECISIÓN: estructura completa antes de animar
Se decidió NO animar sección por sección mientras se construye. Razón: el
copy y el orden de bloques todavía pueden cambiar (ya pasó una vez), y
GSAP ScrollTrigger coordina mejor timelines cuando el DOM completo ya existe.
Por eso: Fase A = todo estático. Fase B = animación, una sola pasada al final.

## FASE A — Estructura estática (completa)

- [hecho] A1. Inicializar el proyecto (Next.js 16, pnpm, shadcn/ui)
- [hecho] A2. Layout base (header/main/footer, Inter temporal, tokens neutros)
- [hecho] A3. Componente Hero — estático, sin animación
- [hecho] A4. Componente "El problema" — estático, sin animación
- [hecho] A5. Componente "Educación del concepto" (bloque 3) — estático,
      3 párrafos en elementos <p> separados
- [hecho] A6. Componente "La solución" (bloque 4, Auditoría C.L.A.R.O.) — estático
- [hecho] A7. Componente "Prueba social" / caso EMILIMA — estático
- [hecho] A8. Componente "Objeciones / FAQ" (4 preguntas) — estático
- [hecho] A9. Componente "CTA final" — estático
- [hecho] A10. Navbar (fijo arriba) — nombre "Promarketing Perú" en texto
      (sin logo por ahora), anchors a Inicio/Solución/Contacto, botón
      "Solicitar Auditoría C.L.A.R.O." también aquí, sin animación
- [hecho] A11. Footer — Contacto, Sobre nosotros, Legal/redes, sin animación

## FASE B — Animación

- [hecho] B1. Instalar Lenis (smooth scroll global) en el layout raíz
- [hecho] B2. Hero → micro-animación de entrada con Motion (fade/slide de
      H1, subtítulo, botón)
- [hecho] B2.5. Hero — diagrama SVG de 4 nodos en loop circular
      ("Infraestructura Comercial" en el centro), conectados por paths
      curvos. Efecto de luz con resplandor viajando en bucle infinito
      (GSAP, repeat: -1, ease: none). Incluye etiqueta "eyebrow" arriba
      del diagrama y párrafo debajo que cambia de texto sincronizado con
      el nodo activo (contenido lorem ipsum, pendiente de copy real).
      VER PENDIENTES DE RETOQUE.
- [hecho] B3. "El problema" → Motion simple, aparece con `whileInView`
- [hecho] B4. "La solución" → Motion, mismo patrón que B3
- [hecho] B4.5. Sistema de jerarquía visual: (1) alternar alineación entre
      secciones (columna dividida vs. bloque centrado), (2) separadores
      tipo "muesca" con clip-path entre secciones, (3) variante de sección
      oscura invirtiendo tokens neutros (--background/--foreground),
      aplicada a 2-3 secciones alternadas
- [hecho] B5a. "Educación del concepto" → SVG estático de 3 etapas
      (fragmentación → conexión → resultado, metáfora de tuberías)
- [hecho] B5b. "Educación del concepto" → GSAP + ScrollTrigger con pin,
      scrub controla la transición entre las 3 etapas del SVG
- [hecho] B5c. "Educación del concepto" → sincronizar textos existentes
      (título, párrafos, frase de cierre) con las 3 etapas del SVG en el
      mismo ScrollTrigger. VER PENDIENTES DE RETOQUE — no quedó bien.

## PENDIENTES DE RETOQUE (tareas ya "hechas" con defectos conocidos, pausadas)

- [ ] RETOQUE-1 (de B2.5): el párrafo debajo del diagrama del Hero salta o
      empuja el layout cuando cambia de texto entre nodos — falta un
      min-height correctamente aplicado o el contenedor no lo respeta.
      Revisar el CSS del contenedor de ese párrafo.
- [ ] RETOQUE-2 (de B5): la sincronización entre texto/labels/diagrama en
      "Educación del concepto" sigue sin sentirse correcta — las
      transiciones son muy rápidas, hay demasiado padding entre texto y
      diagrama, y los labels de etapa no siempre coinciden con el texto
      y el diagrama activos en ese momento. Requiere revisar de fondo el
      timeline de ScrollTrigger, no solo ajustar duraciones.

- [ ] RETOQUE-3: @sanity/image-url usa el import por defecto (deprecado).
      Cambiar a `import { createImageUrlBuilder } from '@sanity/image-url'`
      en el archivo donde se construyen las URLs de imágenes.

## PAUSADAS (no descartadas — retomar cuando el usuario lo indique)

- [ ] B6. "Prueba social", "Objeciones", "CTA final" → Motion, consistente
      con B3/B4
- [ ] B7. Verificar que Lenis no rompe ScrollTrigger (requiere sincronizar
      ambos — es un paso técnico conocido, no improvisar)
- [ ] B8. Footer — input de newsletter (solo UI): campo de email + botón
      "Suscribirme", validación básica de formato en el cliente. Sin
      conexión a backend todavía (destino del email aún no decidido) —
      eso será una tarea separada, B8-conectar.
- [ ] A12. Formulario de contacto (Server Action + HubSpot Forms API —
      requiere API key de HubSpot, pendiente que el usuario la genere)

## PRIORIDAD ACTUAL (decisión del usuario: avanzar con el blog)

- [hecho] A13. Setup de Sanity (`pnpm create sanity@latest`, schema
      mínimo: artículo de blog, término de glosario, caso de éxito)
- [hecho] A14a. Crear páginas frontend de blog: `/blog` y `/blog/[slug]`
      usando documentos `post` de Sanity, GROQ y PortableText.
- [hecho] A14b. Crear páginas frontend del glosario usando documentos
      `glosarioTermino` de Sanity, sin inventar contenido real.
- [hecho] A14c. Crear páginas frontend de casos de éxito usando documentos
      `casoDeExito` de Sanity, sin inventar contenido real.
- [hecho] A14. Crear páginas frontend para blog/glosario/casos usando
      contenido de Sanity, sin inventar contenido real.

---
## Backlog (no empezar aún)
- Páginas de servicio individuales — CONTENIDO YA DISPONIBLE: los 7 sistemas
  de la oferta (Diseño y Gestión de Marca, Infraestructura Web, Ecommerce y
  Conversión, SEO/GEO/AEO, Ads/Paid Media, Automatización Comercial, Tracking
  y Trazabilidad), implementados en orden lógico según evidencia de la
  Auditoría C.L.A.R.O. — pendiente de estructurar cuando se planifiquen
  estas páginas.
- Glosario (colección completa)
- SEO técnico: sitemap.xml, robots.txt, JSON-LD, llms.txt
- Animación tipo "paint stroke" SVG en secciones por definir (pendiente:
  usuario debe especificar en qué secciones exactamente)
