# Guía de Configuración Detallada de Plataformas y Servicios Externos

Este documento centraliza todas las instrucciones técnicas paso a paso y los requisitos necesarios para completar la configuración de los servicios externos y herramientas de infraestructura pendientes de activación para el sitio web de **Promarketing Perú**.

---

## 1. Dominio Oficial y Servidor (`promarketingperu.com`)

### Requisitos y Estado Actual
- **Dominio objetivo**: `promarketingperu.com`
- **Proveedor de hosting**: Vercel (Proyecto `web`, desplegado en producción)
- **Estado**: Desplegado temporalmente en el alias automático de Vercel (`https://web-orcin-sigma-57.vercel.app/`).

### Pasos de Configuración
1. **Vinculación en Vercel Dashboard**:
   - Ir a [Vercel Dashboard](https://vercel.com/) → Proyecto `web` → **Settings** → **Domains**.
   - Agregar el dominio `promarketingperu.com` y su variante `www.promarketingperu.com`.
   - Copiar los registros DNS indicados por Vercel (Registros `A` apuntando a `76.76.21.21` o `CNAME` apuntando a `cname.vercel-dns.com`).
   - Configurar estos registros en el proveedor donde se compró el dominio (GoDaddy, Namecheap, Nic.pe, etc.).
2. **Actualización de Variable de Entorno**:
   - En Vercel Settings → **Environment Variables**, actualizar o agregar:
     ```env
     NEXT_PUBLIC_SITE_URL=https://promarketingperu.com
     ```
   - Aplicar para los entornos de **Production**.
3. **Re-despliegue**:
   - Ejecutar un nuevo despliegue en la rama principal (`main`) para que `sitemap.xml`, `robots.txt`, Open Graph y JSON-LD tomen la URL de dominio oficial automáticamente.

---

## 2. Autenticación de Email de Notificaciones (Resend)

### Requisitos y Estado Actual
- **Servicio**: Resend (`resend` SDK configurado en `lib/email.ts`).
- **Remitente planificado**: `notificaciones@promarketingperu.com`
- **Destinatario de alertas**: `promarketing2027@gmail.com`
- **Estado**: Código listo con fallback a remitente predeterminado (`onboarding@resend.dev`) mientras no se agreguen las llaves y DNS.

### Pasos de Configuración
1. **Obtención de API Key**:
   - Iniciar sesión en [resend.com](https://resend.com).
   - Crear una nueva API Key en **API Keys** → Name: `Promarketing Website Notifier` → Permission: `Full Access`.
   - Agregar la credencial en `.env.local` y en Vercel Environment Variables:
     ```env
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
     ```
2. **Autenticación de Dominio DNS (SPF/DKIM)**:
   - En el panel de Resend, ir a **Domains** → **Add Domain** → Ingresar `promarketingperu.com`.
   - Resend entregará 3 registros DNS para agregar en el panel de control de tu dominio:
     - `TXT` (SPF / DKIM verification)
     - `MX` or `CNAME` (según las instrucciones exactas de Resend)
   - Hacer clic en **Verify Domain** en Resend. Una vez verificado (estado `Verified`), los correos enviados a `promarketing2027@gmail.com` llegarán desde `notificaciones@promarketingperu.com` sin caer en carpeta de spam.

---

## 3. Google Tag Manager, GA4 y Meta Pixel (`ANALYTICS-2`)

### Requisitos y Estado Actual
- **Contenedor GTM**: `GTM-THQJQQ2D` montado en el layout raíz de Next.js.
- **Configuración local/preview**: Consent Mode v2 predeterminado en `denied` hasta que el usuario responda al banner de cookies (`components/cookie-consent-banner.tsx`).
- **Estado**: Borrador verificado con Tag Assistant (GA4 base, GA4 `generate_lead`, Meta Pixel `937463375421449`, Meta `Lead`).
- **Bloqueo actual**: Pausado hasta aprobación jurídica de la Política de Privacidad (`LEGAL-2`).

### Pasos de Configuración para Publicación
1. **Aprobación Jurídica (`LEGAL-2`)**:
   - Confirmar la redacción final de la Política de Privacidad en `/politica-de-privacidad` alineada al D.S. N° 016-2024-JUS (Perú).
2. **Publicar el Contenedor de GTM**:
   - Ingresar a [Google Tag Manager](https://tagmanager.google.com/) → Contenedor `GTM-THQJQQ2D`.
   - Hacer clic en el botón azul **Enviar / Submit** en la esquina superior derecha.
   - Asignar nombre a la versión (ej. `v1.0 - GA4 + Meta Lead Event`) y publicar.
3. **Smoke Test de Producción**:
   - Abrir la web en producción (`https://promarketingperu.com`).
   - Aceptar cookies de analítica y marketing.
   - Enviar un formulario de prueba en el CTA final y verificar en GA4 Realtime y Meta Events Manager que los eventos `generate_lead` y `Lead` se reciban con el parámetro del servicio de interés.

---

## 4. Microsoft Clarity (`ANALYTICS-3`)

### Requisitos y Estado Actual
- **Componente**: `components/microsoft-clarity.tsx` cargado dinámicamente si existe la variable pública.
- **Project ID**: `u2hkjsheaa`
- **Estado**: Configurado en `.env.local`. Falta registrar la variable en Vercel.

### Pasos de Configuración
1. **Configurar Variable en Vercel**:
   - Ir a Vercel Dashboard → Proyecto `web` → **Settings** → **Environment Variables**.
   - Agregar:
     - **Key**: `NEXT_PUBLIC_CLARITY_PROJECT_ID`
     - **Value**: `u2hkjsheaa`
     - **Environments**: Select `Production` & `Preview`.
2. **Verificación**:
   - Al desplegar la web, comprobar en el panel de Microsoft Clarity que el proyecto empiece a recibir sesiones de grabación y mapas de calor (heatmaps).

---

## 5. Anti-Spam Avanzado: reCAPTCHA v3 / hCaptcha (`SEC-1`)

### Requisitos y Estado Actual
- **Objetivo**: Inyectar validación invisible de bots antes de procesar envíos en la Server Action de `lib/hubspot.ts`.
- **Estado**: Tarea en backlog `SEC-1`, pendiente de obtención de llaves API.

### Pasos de Configuración
1. **Creación de Cuenta en reCAPTCHA v3**:
   - Ingresar a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
   - Registrar nuevo sitio:
     - **Etiqueta**: `Promarketing Website`
     - **Tipo de reCAPTCHA**: v3 (basado en puntuación sin desensamblar experiencia de usuario).
     - **Dominios**: `promarketingperu.com`, `web-orcin-sigma-57.vercel.app`, `localhost`.
2. **Registro de Variables**:
   - Copiar la **Clave del sitio** (Site Key) y la **Clave secreta** (Secret Key).
   - Inyectar en variables de entorno:
     ```env
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```
3. **Implementación**:
   - Notificar al agente para activar la verificación del token en `lib/hubspot.ts`.

---

## 6. Sincronización de CRM HubSpot y Newsletter

### Requisitos y Estado Actual
- **Autenticación**: `HUBSPOT_SERVICE_KEY` (Claves de servicio) conectada a la API v3 de contactos.
- **Acciones**:
  - `submitAuditoriaForm`: Crea o actualiza contactos solicitando Auditoría C.L.A.R.O.
  - `submitNewsletterForm`: Crea o actualiza suscripciones al newsletter en el footer.
- **Estado**: Funcional y verificado en producción (`https://web-orcin-sigma-57.vercel.app/`).

### Pasos de Configuración en el Dashboard de HubSpot
1. **Crear Lista de Suscriptores de Newsletter**:
   - En HubSpot → **Contactos** → **Listas** → **Crear lista**.
   - Tipo: Lista estática o basada en filtros (ej. `Suscrito a Newsletter = True`).
2. **Creación de Propiedades Personalizadas** *(Opcional)*:
   - Verificar en HubSpot → **Configuración** → **Propiedades** → **Propiedades de Contacto** que los campos `servicio_de_interes` y `empresa` tengan coincidencia de tipo texto si se desea visualizarlos directamente en las tarjetas del CRM.
