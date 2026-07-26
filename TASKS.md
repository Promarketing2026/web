# TASKS — Promarketing Perú

> Regla: trabajar SOLO en la tarea marcada `[SIGUIENTE]`. No adelantar tareas
> futuras. Al terminar, mover el check a `[hecho]` y actualizar STATE.md.
> Una tarea = un componente o una configuración, nunca "la página completa".
>
> IMPORTANTE al escribir prompts para Codex: nunca referenciar "el párrafo de
> arriba" o "el copy que definimos" — Codex no tiene el historial del chat.
> Copiar siempre el texto exacto y completo en el prompt.

## DECISIÓN: estructura completa antes de animar
Se decidió NO animar sección por sección mientras se construye. Razón: el
copy y el orden de bloques todavía pueden cambiar (ya pasó una vez), y
GSAP ScrollTrigger coordina mejor timelines cuando el DOM completo ya existe.
Por eso: Fase A = todo estático. Fase B = animación, una sola pasada al final.

## FASE A — Estructura estática (donde estamos ahora)

- [hecho] A1. Inicializar el proyecto (Next.js 16, pnpm, shadcn/ui)
- [hecho] A2. Layout base (header/main/footer, Inter temporal, tokens neutros)
- [hecho] A3. Componente Hero — estático, sin animación
- [hecho] A4. Componente "El problema" — estático, sin animación
- [hecho] A5. Componente "Educación del concepto" (bloque 3) — estático,
      3 párrafos en elementos <p> separados, listos para GSAP en Fase B
- [hecho] A6. Componente "La solución" (bloque 4, Auditoría C.L.A.R.O.) — estático
- [hecho] A7. Componente "Prueba social" / caso EMILIMA — estático
- [hecho] A8. Componente "Objeciones / FAQ" (4 preguntas) — estático
- [hecho] A9. Componente "CTA final" — estático
- [hecho] A10. Navbar (fijo arriba, fuera de la narrativa de scroll) —
      nombre "Promarketing Perú" en texto (sin logo por ahora), anchors a
      Inicio/Solución/Contacto, botón "Solicitar Auditoría C.L.A.R.O."
      también aquí, sin animación
- [hecho] A11. Footer — Contacto, Sobre nosotros, Legal/redes (ver sitemap
      original), sin animación
- (A12 y A13 se movieron después de Fase B — no afectan la narrativa
  animable, así que no bloquean el avance a las animaciones. Ver abajo.)

## FASE B — Animación (no empezar hasta terminar TODA la Fase A)

- [hecho] B1. Instalar Lenis (smooth scroll global) en el layout raíz
- [SIGUIENTE] B2. Hero → micro-animación de entrada con Motion (fade/slide de
      H1, subtítulo, botón)
- [ ] B3. "El problema" → Motion simple, aparece con `whileInView`
- [ ] B4. "La solución" → Motion, mismo patrón que B3
- [ ] B5. "Educación del concepto" → GSAP + ScrollTrigger + SplitText
      (el bloque más complejo — dividir en sub-tareas cuando se llegue)
- [ ] B6. "Prueba social", "Objeciones", "CTA final" → Motion, consistente
      con B3/B4
- [ ] B7. Verificar que Lenis no rompe ScrollTrigger (requiere sincronizar
      ambos — es un paso técnico conocido, no improvisar)

## DESPUÉS DE FASE B (retomar cuando se tenga la API key de HubSpot)

- [ ] A12. Formulario de contacto (Server Action + HubSpot Forms API —
      requiere API key de HubSpot, pendiente que el usuario la genere)
- [ ] A13. Setup de Sanity (`pnpm create sanity@latest`, schema mínimo:
      artículo de blog, término de glosario, caso de éxito)

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
