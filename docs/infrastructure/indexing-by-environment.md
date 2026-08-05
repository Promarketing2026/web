# Indexación por entorno

Última verificación local: 2026-08-04.

## Política

Solo un deployment con `VERCEL_ENV=production` puede declararse indexable. Un
valor ausente, desconocido, `preview` o `development` se trata como no
productivo. Esta decisión evita que un cambio de configuración publique por
accidente un entorno de prueba.

| Control | Producción | Preview / Development / local |
|---|---|---|
| `robots.txt` | Permite `/`, bloquea `/studio` y publica el sitemap | Bloquea `/` y omite el sitemap |
| Meta robots global | `index, follow` | `noindex, nofollow` |
| `X-Robots-Tag` | No se añade | `noindex, nofollow, noarchive` |
| Vercel Standard Protection | El dominio público permanece accesible | Exige autenticación y añade su propio `noindex` |

`robots.txt` controla el rastreo, pero no garantiza por sí solo que una URL no
aparezca en resultados. Por eso Preview utiliza también meta robots, cabecera
HTTP y protección de acceso.

La página `/gracias` conserva su propio `noindex, nofollow` incluso en
producción. No se bloquea en `robots.txt`, porque el crawler debe poder leer esa
directiva. Sanity Studio sí se bloquea en el archivo de robots de producción.

## Evidencia local

Se generaron y sirvieron dos builds separados:

- `VERCEL_ENV=preview`: `robots.txt` devolvió `Disallow: /`; Home incluyó meta
  `noindex, nofollow` y cabecera `X-Robots-Tag: noindex, nofollow, noarchive`.
- `VERCEL_ENV=production`: `robots.txt` devolvió `Allow: /`, `Disallow:
  /studio` y el sitemap de producción; Home incluyó meta `index, follow` y no
  emitió `X-Robots-Tag`.

## Consideración operativa

`VERCEL_ENV` es una variable de sistema disponible durante build y runtime en
Vercel. Si el sitio migra a otro proveedor, debe definirse una señal de
producción equivalente antes del despliegue; de lo contrario, el sistema
seguirá correctamente en modo noindex por seguridad.
