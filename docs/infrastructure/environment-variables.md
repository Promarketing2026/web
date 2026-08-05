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
