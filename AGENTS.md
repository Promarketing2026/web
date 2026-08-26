# Instrucciones para cualquier agente de código (Claude Code, Antigravity, u otro compatible con AGENTS.md)

Antes de escribir una sola línea de código:

1. Lee `STATE.md` completo — ahí está el stack, las decisiones de diseño y qué
   fase del proyecto es.
2. Lee `TASKS.md` y trabaja SOLO en la tarea marcada `[SIGUIENTE]`. No hagas
   tareas del backlog ni adelantes pasos futuros sin que se te pida.
3. No preguntes por contexto que ya está en estos dos archivos. Si algo no
   está cubierto, pregunta específicamente eso, no pidas "el contexto completo".

## Reglas fijas del proyecto (no negociables sin aprobación explícita)
- No usar daisyUI (ya se decidió shadcn/ui + Radix, son sistemas incompatibles).
- No usar el paquete `framer-motion` — usar `motion/react`.
- No usar colores hardcodeados. Todo color va en variables CSS/Tailwind config,
  incluso los placeholders neutros temporales.
- No inventar ni sugerir una paleta de marca final — está pendiente a propósito.
- pnpm como gestor de paquetes, no npm ni yarn.
- REGLA DE AUTONOMÍA: el agente puede ejecutar comandos conocidos,
  verificaciones técnicas o visuales y ediciones simples en STATE.md/TASKS.md
  cuando el alcance sea inequívoco, disponga de evidencia suficiente y esté
  convencido de que el resultado es correcto. Debe conservar la trazabilidad
  de lo comprobado y no presentar una verificación parcial como aprobación.
  Debe solicitar autorización antes de acciones destructivas, publicar,
  hacer push, modificar servicios externos, usar credenciales o resolver una
  decisión ambigua. Un commit local puede realizarse al cerrar una tarea si
  su alcance y su Definition of Done están comprobados.
- Presupuesto de herramientas y modelos: **$0 siempre, sin excepciones.**

## Al terminar una tarea
1. Verifica que el proyecto sigue corriendo (`pnpm dev` sin errores).
2. Actualiza `STATE.md`: mueve la fecha, agrega 2-3 líneas de qué se hizo.
3. Marca la tarea como `[hecho]` en `TASKS.md` y marca la siguiente como `[SIGUIENTE]`.
4. Haz commit con mensaje corto y descriptivo.

No hace falta explicar el proyecto de nuevo en cada sesión — estos archivos
son la única fuente de verdad.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
