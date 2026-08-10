# Auditoría de integraciones — 2026-08-09

## Alcance

Auditoría de solo lectura sobre código local, variables por nombre y alcance,
respuestas públicas, APIs de lectura y dashboards autenticados. No se revelaron
secretos, no se enviaron formularios, no se crearon contactos, no se modificó
configuración externa y no se publicó código.

Los estados distinguen:

- **Implementado**: existe código para la integración.
- **Configurado**: la plataforma tiene los datos necesarios.
- **Verificado**: existe evidencia funcional actual.
- **Aprobado**: existe autorización formal para operar o publicar.

## Dictamen ejecutivo

Resultado: **FAIL / HIGH**. El sitio público y varias integraciones base
responden, pero el conjunto no está funcionalmente cerrado:

1. Resend está implementado pero no configurado; las notificaciones internas no
   pueden enviarse.
2. El newsletter solo crea un contacto en HubSpot. No lo incorpora a una lista
   ni registra una suscripción de marketing, en contra del alcance documentado.
3. El Studio de Sanity en producción no está registrado y su origen no está en
   CORS; la edición desde `/studio` queda bloqueada.
4. Clarity está implementado y configurado localmente, pero no está activo en
   producción.
5. Los seis commits de saneamiento existen solo en local; producción continúa
   en el commit `c1e56e1`.

## Matriz de estado

| Integración | Implementado | Configurado | Verificado ahora | Estado |
| --- | --- | --- | --- | --- |
| Vercel | Sí | Parcial | Sitio `200`, deployment Ready | FAIL: Hobby comercial, CSP Report-Only y producción desactualizada |
| HubSpot auditoría | Sí | Sí | Token de lectura y propiedades `200` | PASS técnico; no se repitió una escritura real |
| HubSpot newsletter | Parcial | Sí | Código inspeccionado | FAIL: contacto no equivale a lista/suscripción |
| Resend | Sí | No | Dashboard sin dominios ni API keys | FAIL: notificación inoperativa |
| Upstash Redis | Sí | Sí | `PING 200`, recurso Available | PASS técnico; uso privado no disponible en Vercel |
| Sanity contenido | Sí | Sí | CDN `200`, build y uso leídos | PASS para contenido público |
| Sanity Studio | Sí | No | `/studio` solicita registro/CORS | FAIL: edición en producción bloqueada |
| GTM / GA4 / Meta | Sí | Sí | Contenedor y eventos publicados | PASS técnico; aprobación jurídica pendiente |
| Microsoft Clarity | Sí | Solo local | Producción no carga el script | PENDIENTE, no activo en producción |

## Evidencia por plataforma

### Vercel

- Equipo y proyecto en plan **Hobby**. El hallazgo previo de inelegibilidad para
  uso comercial sigue abierto; no se autorizó gasto ni migración.
- Último deployment de producción: Ready, commit `c1e56e1`.
- `HEAD` local: `4ae761d`, seis commits por delante de `origin/main`. Ninguno de
  los cambios de saneamiento fue publicado.
- Variables observadas:
  - `NEXT_PUBLIC_GTM_ID`: Production.
  - Sanity y `HUBSPOT_SERVICE_KEY`: Production y Preview.
  - Redis/KV: todos los entornos.
  - No aparecen `RESEND_API_KEY`, `NEXT_PUBLIC_CLARITY_PROJECT_ID` ni
    `NEXT_PUBLIC_SITE_URL`.
- Standard Protection exige inicio de sesión en deployments protegidos. El
  dominio público de producción sigue accesible.
- Solo está asociado `web-orcin-sigma-57.vercel.app`; no hay dominio propio.
- Las respuestas publican CSP en modo `Content-Security-Policy-Report-Only`, no
  en modo de bloqueo.

### HubSpot

- La credencial local corresponde al portal esperado y permite lectura.
- Contactos actuales observados: 0.
- `email`, `firstname`, `lastname`, `company` y `servicio_de_interes` existen.
  `servicio_de_interes` es texto libre, compatible con los valores normalizados.
- Auditoría C.L.A.R.O. usa POST y 409→PATCH correctamente en código y tiene
  pruebas simuladas. No se creó un contacto real durante esta auditoría.
- El newsletter ejecuta únicamente POST a contactos. No usa Lists API ni
  Marketing Subscriptions API; por tanto, el texto “suscrito al newsletter” y
  el alcance de lista de suscriptores no están respaldados por la implementación.

### Resend

- El SDK y la plantilla están implementados, y el envío ocurre solo después de
  éxito en HubSpot.
- `RESEND_API_KEY` está ausente en local y en Vercel.
- La cuenta no tiene API keys ni dominios registrados.
- El remitente por defecto usa `notificaciones@promarketingperu.com`, pero ese
  dominio no está verificado. Resultado: la notificación interna está inactiva.

### Upstash Redis

- El recurso `promarketing-rate-limit` está Available en plan Free.
- Las variables KV están en todos los entornos y el par local responde
  `PING 200`.
- Vercel no ofrece métricas de uso para este recurso; consultar el panel privado
  de Upstash requeriría abrir una sesión SSO adicional y no fue necesario para
  verificar conectividad.
- El código falla abierto si Redis no responde. Es una decisión de disponibilidad
  que deja el formulario sin rate limiting durante una caída.

### Sanity

- Proyecto y dataset `production` responden por CDN; el build genera 22 páginas.
- Uso actual: 438 solicitudes CDN, 15 API, 448.2 KB de ancho de banda, 1 dataset
  y 3 documentos. No hay presión de cuota.
- El plan efectivo es **Growth Trial**, activo, con 17 días restantes; después
  baja automáticamente a Free y no implica un cobro automático observado.
- CORS solo contiene `http://localhost:3000` y `http://localhost:3333`.
- No hay Studio desplegado/registrado. El `/studio` de producción muestra
  “Connect this Studio to your project” y no permite operar hasta registrar el
  Studio o añadir el origen CORS.

### GTM, GA4, Meta y Clarity

- Producción carga GTM después del estado de consentimiento predeterminado.
- El contenedor publicado contiene GA4, Meta Pixel, `generate_lead` y `Lead`.
- La revisión jurídica de la Política de Privacidad sigue pendiente; la
  verificación técnica no equivale a aprobación legal.
- Clarity existe en código y en `.env.local`, pero su variable falta en Vercel y
  el HTML de producción no carga `clarity.ms/tag/`. El dashboard solo registra
  sesiones de `localhost`.

## Orden de remediación propuesto

1. Definir y corregir el contrato del newsletter en HubSpot: lista estática o
   estado de suscripción de marketing, con base legal y tratamiento de bajas.
2. Configurar Resend: dominio/DNS, API key, variable en Vercel y prueba controlada.
3. Registrar el Studio de Sanity o añadir CORS para el dominio de administración
   que se decida conservar.
4. Decidir si Clarity se activa después de la revisión jurídica; si se aprueba,
   añadir la variable y verificar Consent Mode.
5. Mantener CSP en Report-Only hasta revisar reportes; luego pasar a enforcement.
6. Publicar los commits saneados solo después de aprobar las remediaciones y el
   destino de hosting compatible con uso comercial y costo USD 0.

Cada punto que modifica un servicio externo requiere autorización específica.
