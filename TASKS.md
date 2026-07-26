# TASKS — Promarketing Perú

> Regla: trabajar SOLO en la tarea marcada `[SIGUIENTE]`. No adelantar tareas
> futuras. Al terminar, mover el check a `[hecho]` y actualizar STATE.md.
> Una tarea = un componente o una configuración, nunca "la página completa".

## [hecho] 1. Inicializar el proyecto
- `pnpm create next-app@latest` (App Router, TypeScript, Tailwind, sí a todo lo estándar)
- Instalar shadcn/ui: `pnpm dlx shadcn@latest init`
- Confirmar que el proyecto corre en local (`pnpm dev`)

## [hecho] 2. Layout base
- Crear `app/layout.tsx` con estructura mínima (header vacío, footer vacío, main)
- Configurar fuente (definir cuál — pendiente de BRAND.md)
- Variables CSS placeholder en `globals.css` (colores neutros temporales)

## [SIGUIENTE] 3. Componente Hero (bloque 1 de la narrativa)
- Estructura estática primero (sin animación)
- Copy: placeholder hasta tener texto real
- Luego: micro-animación de entrada con Motion

## 4. Componente "El problema" (bloque 2)
- Layout de texto + posible ilustración simple
- Sin animación todavía

## 5. Componente "Educación del concepto" (bloque 3 — el diferenciador)
- Estructura de scroll-story (texto que se revela con el scroll)
- Integrar GSAP + ScrollTrigger + SplitText aquí
- Este es el bloque más complejo — dividir en sub-tareas cuando se llegue

## 6. Instalar Lenis (smooth scroll global)
- Configurar en el layout raíz
- Verificar que no rompe el comportamiento de ScrollTrigger (requiere sincronizar ambos)

## 7. Formulario de contacto
- Server Action de Next.js
- Conexión a HubSpot Forms API (requiere API key de HubSpot — pendiente que el usuario la genere)

## 8. Setup de Sanity
- `pnpm create sanity@latest`
- Definir schema mínimo: artículo de blog, término de glosario, caso de éxito

---
## Backlog (no empezar aún)
- Componentes "Solución", "Prueba social", "Objeciones/FAQ", "CTA final"
- Páginas de servicio individuales
- Glosario (colección completa)
- SEO técnico: sitemap.xml, robots.txt, JSON-LD, llms.txt
