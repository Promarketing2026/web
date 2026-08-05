# Cabeceras HTTP y Content Security Policy

Última verificación: 2026-08-04.

## Estado

| Control | Estado | Evidencia |
|---|---|---|
| Cabeceras HTTP defensivas | PASS | Respuestas locales de `/` y `/studio` verificadas. |
| CSP del sitio público | PASS — Report-Only | Cabecera local verificada y Home del Preview sin violaciones CSP. |
| CSP específica de Sanity Studio | PASS — Report-Only | Studio cargó en Preview sin violaciones CSP; política separada con API, WebSocket y workers. |
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

## Evidencia de Preview

- Commit verificado: `44ba333`.
- Vercel: `success` — `Deployment has completed`.
- El acceso anónimo respondió `302` hacia Vercel Authentication y añadió
  `X-Robots-Tag: noindex`.
- La sesión autorizada cargó Home y `/studio` sin mensajes de violación CSP.
- Sanity mostró que el origen efímero no estaba registrado en CORS. No se añadió
  porque la rama y su URL son temporales; esta limitación no fue causada por la
  CSP.

Riesgo residual **MEDIUM, aceptado temporalmente por despliegue por etapas**:
mientras la política sea Report-Only, una violación se detecta pero no se
bloquea. Debe reevaluarse al completar las tareas de analítica y antes de pasar
la cabecera a modo estricto.
