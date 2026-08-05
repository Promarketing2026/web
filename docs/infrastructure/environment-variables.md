# Variables de entorno

Este documento registra qué variables necesita el proyecto. No contiene valores
reales ni secretos. Los archivos `.env` y `.env*.local` permanecen excluidos de
Git.

## Matriz

| Variable | Local | Preview | Producción | Secreta | Regla |
|---|---:|---:|---:|---:|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sí | Sí | Sí | No | ID válido del proyecto Sanity. |
| `NEXT_PUBLIC_SANITY_DATASET` | Sí | Sí | Sí | No | Dataset que corresponde al entorno. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | No | No | No | Usa `2026-07-26` si se omite. |
| `NEXT_PUBLIC_SITE_URL` | Recomendado | Opcional | Recomendado | No | Prevalece sobre la URL automática de Vercel. |
| `HUBSPOT_SERVICE_KEY` | Sí | Sí | Sí | Sí | Token privado; nunca usar `NEXT_PUBLIC_`. |
| `KV_REST_API_URL` | Sí | Sí | Sí | Sí | Debe existir junto con `KV_REST_API_TOKEN`. |
| `KV_REST_API_TOKEN` | Sí | Sí | Sí | Sí | Debe existir junto con `KV_REST_API_URL`. |

También se aceptan `UPSTASH_REDIS_REST_URL` y
`UPSTASH_REDIS_REST_TOKEN` como alternativa compatible. No se deben mezclar
pares incompletos.

## Comportamiento

- Las variables `NEXT_PUBLIC_*` quedan fijadas cuando se ejecuta el build.
- En Vercel, cada variable debe asignarse expresamente a Development, Preview y
  Production según corresponda.
- Si `NEXT_PUBLIC_SITE_URL` no existe, Preview utiliza `VERCEL_URL` y producción
  utiliza `VERCEL_PROJECT_PRODUCTION_URL`. Fuera de Vercel se usa
  `http://localhost:3000`.
- El rate limiting incorpora el entorno de Vercel en la clave Redis para evitar
  colisiones entre Preview y producción.
- Una variable privada ausente o un par Redis incompleto detienen el build o la
  carga del módulo con un mensaje que identifica el nombre, nunca el valor.

## Criterio operativo

Local y Preview deberían usar cuentas, datasets o recursos de prueba cuando el
proveedor lo permita. Si comparten HubSpot, Sanity o Redis con producción, esa
decisión debe registrarse como riesgo residual antes de liberar.

## Auditoría de Vercel — 2026-08-04

Estado: **PASS**, con un riesgo residual temporal aceptado.

La revisión se realizó sobre los nombres y alcances configurados; no se leyeron
ni registraron valores secretos.

| Grupo | Alcance observado en Vercel | Resultado |
|---|---|---|
| Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) | Preview y Production | PASS. Comparten contenido publicado; no son secretos. Local usa `.env.local`. |
| HubSpot (`HUBSPOT_SERVICE_KEY`) | Preview y Production | PASS con riesgo residual. Local usa `.env.local`. |
| Redis/KV (`REDIS_URL`, `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) | Development, Preview y Production | PASS. Las claves lógicas de rate limiting incluyen el entorno. |
| URL/API opcionales (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_API_VERSION`) | Sin valor explícito | PASS. Se aplican los fallbacks documentados. |

### Preview y protección

- Vercel Authentication quedó activada con **Standard Protection**.
- La rama temporal `infra/preview-audit` generó automáticamente el deployment
  `DPrRcinNeg4bwURX9AUXGCgGyqyp`; el estado de integración fue `success`
  (`Deployment has completed`).
- Una solicitud anónima al dominio del Preview respondió `302` hacia el inicio
  de sesión de Vercel e incluyó `X-Robots-Tag: noindex`.
- La URL generada de cada deployment de producción también queda protegida. El
  dominio público asignado a producción, `web-orcin-sigma-57.vercel.app`, se
  mantuvo accesible anónimamente con `200 OK`.
- La rama de auditoría fue eliminada de Git local y del remoto al terminar.

### Riesgo residual

**MEDIUM — aceptado temporalmente:** Preview y Production usan la misma cuenta
de HubSpot. Una prueba desde Preview puede crear o actualizar contactos reales.
Hasta separar destinos, las pruebas deben usar correos identificables como test
y no datos personales reales.
