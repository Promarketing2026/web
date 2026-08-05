# Cabeceras HTTP y Content Security Policy

Última verificación: 2026-08-04.

## Estado

| Control | Estado | Evidencia |
|---|---|---|
| Cabeceras HTTP defensivas | PASS | Respuestas locales de `/` y `/studio` verificadas. |
| CSP del sitio público | PASS — Report-Only | Cabecera emitida sin bloquear recursos. |
| CSP específica de Sanity Studio | PASS — Report-Only | Política separada con API, WebSocket, workers y recursos de Sanity. |
| CSP aplicada en modo estricto | PENDIENTE | Requiere observación en Preview con analítica instalada. |

La CSP permanece en `Content-Security-Policy-Report-Only`. Este modo informa
violaciones en la consola del navegador, pero todavía no bloquea recursos. Es
la etapa correcta mientras Google Tag Manager y Microsoft Clarity siguen
pendientes de instalación.

## Decisión técnica

Se conserva la generación estática y el caché CDN. Una CSP basada en nonces
haría que las páginas fueran dinámicas en cada solicitud. La alternativa de
integridad SRI de Next.js no se usa porque es experimental y no funciona con
Turbopack.

Por ahora, el sitio público usa la variante estática recomendada por Next.js,
que necesita `'unsafe-inline'` para los scripts generados. En desarrollo se
agrega `'unsafe-eval'`; producción no lo permite. Sanity Studio tiene una
política separada porque su aplicación cliente sí necesita capacidades más
amplias.

## Orígenes permitidos y motivo

- Sanity: imágenes y consultas de contenido; Studio añade WebSockets y recursos
  propios de Sanity.
- HubSpot: el CRM se consume solo desde el servidor y no necesita `connect-src`.
  `meetings.hubspot.com` queda limitado a `frame-src` para el programador.
- Google Tag Manager, Google Analytics y Microsoft Clarity: orígenes exactos
  previstos por las tareas de analítica, sin comodines globales.
- `blob:` se limita a imágenes, medios y workers donde Sanity puede necesitarlo.

## Cabeceras activas

- `Content-Security-Policy-Report-Only`
- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` con cámara, micrófono, ubicación, pagos, USB y Topics
  desactivados
- `X-Permitted-Cross-Domain-Policies: none`
- `X-XSS-Protection: 0`, que desactiva el filtro heredado y deja la protección a
  la CSP y al navegador moderno
- Cabecera identificadora `X-Powered-By` desactivada

## Criterio para activar bloqueo

Cambiar a `Content-Security-Policy` solo después de comprobar en un Preview:

1. Home, blog, glosario, casos, formulario y `/gracias` sin violaciones
   necesarias.
2. Sanity Studio: autenticación, carga de documentos, edición y publicación.
3. GTM, GA4 y Clarity instalados y funcionando con los orígenes actuales.
4. Sin nuevos orígenes añadidos sin una función documentada.

Riesgo residual **MEDIUM**: mientras la política sea Report-Only, una violación
se detecta pero no se bloquea. Es temporal y debe reevaluarse al completar las
tareas de analítica y la verificación de Preview.
