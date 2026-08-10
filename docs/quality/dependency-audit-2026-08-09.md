# Auditoría de dependencias — 2026-08-09

## Alcance y criterio

Se revisó el árbol instalado con `pnpm audit`, `pnpm audit --prod`,
`pnpm outdated` y `pnpm why`. La clasificación considera severidad del aviso,
ruta de importación y posibilidad de que datos no confiables alcancen el código
afectado. No se usó `pnpm audit --fix`.

## Resultado

| Momento | Low | Moderate | High | Critical |
| --- | ---: | ---: | ---: | ---: |
| Antes del saneamiento | 1 | 13 | 12 | 0 |
| Tras actualizar dependencias directas | 0 | 8 | 10 | 0 |
| Estado final, árbol completo | 0 | 1 | 0 | 0 |
| Estado final, dependencias de producción | 0 | 1 | 0 | 0 |

Las versiones directas se actualizaron dentro de sus ramas compatibles. Next.js
se mantuvo en `16.3.0`, la versión estable más reciente disponible para el
proyecto al ejecutar la auditoría. `pnpm outdated` solo reporta saltos mayores
pendientes en `@types/node`, ESLint, Motion y TypeScript; no forman parte de este
saneamiento porque requieren una migración y validación independientes.

Se fijaron parches transitivos compatibles en `pnpm-workspace.yaml` para
`brace-expansion`, `js-yaml`, `nanoid`, `smol-toml` y `undici`. Esto elimina los
avisos explotables conocidos sin forzar cambios mayores en sus consumidores.

## Riesgo residual

Queda un aviso moderado en `uuid@10.0.0`:

- Ruta: `sanity / next-sanity -> @sanity/cli -> typeid-js -> uuid`.
- Aviso: falta de comprobación de límites cuando las funciones UUID v3, v5 o v6
  reciben un búfer proporcionado por el llamador.
- Exposición observada: no existe importación directa de `uuid` en la aplicación.
  La ruta detectada pertenece a la telemetría/CLI de Sanity; la versión de
  `typeid-js` instalada genera UUID v7 mediante `uuidv7` y no llama a las
  funciones v3, v5 o v6 afectadas.
- Explotabilidad en el sitio público: no se identificó una ruta desde entradas
  HTTP de usuarios hacia la API vulnerable.
- Decisión: no forzar `uuid@11.1.1` sobre un consumidor que declara la rama 10.
  El cambio sería mayor y podría romper el CLI. Se acepta temporalmente el riesgo
  residual y se seguirá la actualización del árbol oficial de Sanity.

## Controles aplicados

- Actualizaciones directas controladas de React, Sanity, next-sanity, Upstash,
  shadcn, styled-components, Lenis, Lucide y tipos de React.
- Overrides acotados por rango; no hay un override global de paquetes mayores.
- El lockfile conserva las políticas de cadena de suministro de pnpm.
- La aceptación final depende de lint, TypeScript, build y la suite Playwright
  cross-browser; sus resultados se registran en `STATE.md`.

## Dictamen

El árbol queda saneado para el alcance actual: cero avisos altos o críticos y un
único aviso moderado, transitivo, sin ruta de explotación identificada en la
aplicación pública. No equivale a riesgo cero ni autoriza desplegar; el residual
debe revalidarse cuando Sanity actualice su dependencia o antes de una migración
de plataforma.
