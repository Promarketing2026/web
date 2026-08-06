# STATE — Promarketing Perú (sitio web)

> Este archivo se actualiza al final de cada sesión de trabajo, en 2-5 líneas.
> Cualquier modelo (Claude Code, Codex, ChatGPT, Gemini, etc.) debe leer este
> archivo ANTES de escribir código. No se necesita historial de chat previo.

## Fase actual
Sitio en producción: https://web-orcin-sigma-57.vercel.app/. El formulario de
Auditoría C.L.A.R.O. está conectado a HubSpot de punta a punta: validación
con zod, checkbox de consentimiento legal, anti-spam (honeypot + rate
limiting con Upstash Redis), y redirección a /gracias con UTMs capturados
vía sessionStorage — todo verificado en producción. QA-1 se ejecutó y varios
bugs encontrados durante esa verificación ya fueron corregidos (respuesta
409 de HubSpot en contactos duplicados, anchors rotos de navbar/footer fuera
del Home, limpieza de ScrollTrigger al desmontar componentes). SEO-1
(sitemap.xml, robots.txt), SEO-2 (JSON-LD Organization/WebSite), SEO-3
(llms.txt), META-1 (favicon oficial + Open Graph/Twitter) e INFRA-1 a INFRA-4
completados. ANALYTICS-1 también quedó completado: Google Tag Manager está
integrado mediante un único contenedor, limitado a producción. CONSENT-1
añadió preferencias revocables y Consent Mode v2 antes de publicar etiquetas.
ANALYTICS-2 queda pendiente y bloqueado hasta obtener revisión jurídica de la
Política de Privacidad. ERROR-1 y la ejecución de ACCESS-1 ya están completados,
Los hallazgos automatizables de accesibilidad están corregidos; ACCESS-VERIFY
continúa bloqueado por el plugin del navegador. LIMITS-1 detectó un riesgo HIGH:
Vercel Hobby no admite sitios comerciales. La migración queda diferida hasta
cerrar frontend, backend e integraciones, y deberá mantener costo de plataforma
USD 0. FORM-SCOPE-1 quedó resuelta: Auditoría notificará internamente y el
newsletter irá a una lista de HubSpot sin alerta por cada alta. Próximo paso:
aprobar el proveedor gratuito de FORM-NOTIFY-1 antes de implementarlo.

## Stack decidido (congelado, no cambiar sin discutirlo)
- Framework: Next.js 16 (App Router, Turbopack)
- Paquetes: pnpm
- Estilos: Tailwind CSS v4
- Componentes: shadcn/ui + Radix UI (NO usar daisyUI, son sistemas incompatibles)
- Animación de componentes: Motion (`motion/react` — NO usar el import viejo `framer-motion`)
- Animación de scroll: GSAP + ScrollTrigger + SplitText + Lenis
- CMS de contenido: Sanity.io (free tier)
- CRM de leads: HubSpot (free tier) — vía Server Action con HUBSPOT_SERVICE_KEY
- Hosting: Vercel (free/Hobby) — desplegado en producción
- Anti-spam/rate limiting: Upstash Redis (free tier, vía integración de Vercel)

## Decisiones de diseño
- Design system basado en referencias tipo Clerk/Vercel/Supabase, pero implementado
  100% con TOKENS (variables CSS/Tailwind), no valores hardcodeados — así se puede
  cambiar de referencia visual después sin reescribir componentes.
- Paleta de color: aprobada en DOC 08. Debe implementarse mediante tokens
  semánticos y mantenerse sincronizada entre código y Figma; Figma todavía
  requiere la actualización correspondiente.

## Narrativa de conversión del Home (orden de bloques, ya definido)
1. Hook (promesa clara, sin jerga)
2. El problema (lo que el mercado no explica bien)

## Narrativa de conversión del Home (orden de bloques, ya definido)
1. Hook (promesa clara, sin jerga)
2. El problema (lo que el mercado no explica bien)
3. Educación del concepto (bloque diferenciador, animación GSAP scroll)
4. La solución (el servicio, ya entendido por el lector)
5. Prueba social (caso de éxito con cifras)
6. Objeciones (FAQ corto)
7. CTA final

## Pendiente de configuración de herramientas y datos del usuario

### 1. Dominio Oficial (`promarketingperu.com`)
- [ ] Vincular el dominio `promarketingperu.com` en el dashboard de Vercel.
- [ ] Configurar `NEXT_PUBLIC_SITE_URL=https://promarketingperu.com` en Vercel.
- [ ] Agregar los 3 registros DNS (`TXT`/`CNAME`) indicados en Resend para autenticar `notificaciones@promarketingperu.com`.

### 2. Notificaciones por Email (Resend)
- [ ] Generar la API Key en [resend.com](https://resend.com).
- [ ] Agregar `RESEND_API_KEY=re_xxxx...` en `.env.local` y en Vercel.

### 3. Microsoft Clarity
- [x] Configurado en código local (`NEXT_PUBLIC_CLARITY_PROJECT_ID=u2hkjsheaa` en `.env.local`).
- [ ] Agregar `NEXT_PUBLIC_CLARITY_PROJECT_ID=u2hkjsheaa` en Vercel (Production/Preview).

### 4. Google Tag Manager & Analítica
- [x] Script y Consent Mode v2 configurados en código (`NEXT_PUBLIC_GTM_ID=GTM-THQJQQ2D`).
- [ ] Publicar el borrador del contenedor en el panel de Google Tag Manager (pausado hasta revisión legal `LEGAL-2`).
- [ ] Configurar cuenta de Google Ads y etiquetas de conversión cuando se decida implementar (`ANALYTICS-2B`).

### 5. Seguridad y Formularios
- [ ] Generar llaves para reCAPTCHA v3 / hCaptcha (`site key` + `secret key`) para la tarea `SEC-1`.

### 6. Contenido y Legal
- [ ] BRAND.md (tono de voz, valores, guía conceptual).
- [ ] Contenido real en Sanity Studio para Blog, Glosario y Casos de Éxito.
- [ ] Revisión y aprobación jurídica de la Política de Privacidad (`LEGAL-2`).
- [ ] Actualización del Design System en Figma para reflejar los tokens aprobados.
B5a agregó el SVG estático de 3 etapas: fragmentación, solución conectada y resultado medible.
B5b agregó `ScrollTrigger` con pin, scrub y crossfade entre las 3 etapas del SVG durante `+=200%`.
B5c sincronizó los tres textos existentes con las etapas del SVG reutilizando el mismo timeline y ScrollTrigger.
B6 Motion en Prueba social, Objeciones y CTA final pasa a ser la siguiente tarea.

2026-07-26 — A13 configuró Sanity Studio embebido en `/studio` con `next-sanity`.
Se agregaron schemas mínimos para `post`, `glosarioTermino` y `casoDeExito`, parametrizados por variables `NEXT_PUBLIC_SANITY_*`.
No se crearon páginas frontend del blog; quedan para una tarea posterior.

2026-07-26 — A14a creó `/blog` y `/blog/[slug]` conectados a Sanity con GROQ.
El listado muestra tarjetas responsive de `post`; el detalle renderiza título, fecha, imagen destacada y `contenido` con PortableText.
No se crearon todavía páginas de glosario ni casos de éxito.

2026-07-26 — A14b creó `/glosario` conectado a Sanity con GROQ.
La página lista `glosarioTermino` en orden alfabético y usa accordion shadcn/Radix para mostrar la definición extendida.
No se crearon páginas individuales por término.

2026-07-26 — A14c creó `/casos-de-exito` conectado a Sanity con GROQ.
La página lista `casoDeExito` en tarjetas y reutiliza la tarjeta de resultado extraída desde la sección Prueba social.
No se crearon páginas individuales por caso.

2026-07-26 — Navbar actualizado con dropdown estático "Recursos".
El dropdown usa shadcn/Radix y enlaza a `/blog`, `/glosario` y `/casos-de-exito` manteniendo Inicio, Solución y Contacto.

2026-07-26 — Footer reestructurado en columnas responsivas.
La primera columna agrupa marca, descripción y redes; la segunda navegación; la tercera conserva Contacto; copyright queda al ancho completo.

2026-07-26 — Página `/gracias` agregada para post-conversión.
Incluye componente cliente reutilizable con contador 5→0, redirección a `/`, soporte de `servicio` y captura visible de parámetros UTM presentes en la URL.

2026-07-30 — A12a completado: Server Action conectada a HubSpot CRM API
(crm/v3/objects/contacts), integrada en FinalCta. Requirió regenerar el
token en "Claves de servicio" (interfaz nueva de HubSpot reemplazó Private
Apps).

2026-07-30 — A12b completado: validación server-side con zod + checkbox de
consentimiento explícito enlazado a /politica-de-privacidad (LEGAL-1).

2026-07-30 — A12c completado: honeypot (campo "pagina_web") + rate limiting
por IP con Upstash Redis (`lib/rate-limit.ts`, ventana de 10 min, máx. 3
envíos), integrados en la Server Action de `lib/hubspot.ts`.

2026-07-30 — DEPLOY-1 completado: proyecto `web` desplegado en Vercel
(https://web-orcin-sigma-57.vercel.app/). Variables HUBSPOT_SERVICE_KEY y
NEXT_PUBLIC_SANITY_* configuradas manualmente; hubo que desactivar
"Vercel Authentication" en Deployment Protection porque venía activada
por defecto y bloqueaba el acceso público al sitio. Verificado: Home,
formulario→HubSpot, y /blog, /glosario, /casos-de-exito con contenido
real de Sanity. Pendiente en ese momento: conectar integración de Upstash
Redis al proyecto (resuelto después, ver entrada del 2026-07-31).

2026-07-30 — A12d verificado end-to-end: formulario envía a HubSpot,
redirige a /gracias con servicio y UTMs, countdown regresa al home.
Corregido bug de sintaxis JSX (etiqueta <a> faltante) en
auditoria-form.tsx y thank-you-redirect.tsx. Corregido error de
consola "removeChild/NotFoundError" en la sección "Educación del
concepto": se migró education.tsx de useEffect + gsap.context manual
al hook useGSAP de @gsap/react, que sincroniza correctamente la
limpieza de ScrollTrigger/pin-spacer con el desmontaje de React
durante la navegación entre páginas.

2026-07-31 — Corregido bug en lib/hubspot.ts (hallazgo de QA-1): cuando
un contacto ya existía en HubSpot (mismo email, respuesta 409), el
código no actualizaba sus propiedades — Empresa y Servicio de interés
se perdían en envíos repetidos. Ahora se hace un PATCH al contacto
existente vía idProperty=email. Verificado en HubSpot: ambos campos se
actualizan correctamente. También corregido en auditoria-form.tsx:
noValidate desactivaba la validación nativa del navegador, impidiendo
ver los mensajes de error personalizados de zod (A12b) — se quitó
noValidate={false} y los atributos required redundantes.

2026-07-31 — Corregido rate limiting (hallazgo de QA-1): faltaba
conectar Upstash Redis. Se creó la base de datos "promarketing-rate-limit"
(plan Free) desde el Marketplace de Vercel, conectada al proyecto `web`
en los 3 entornos. Variables KV_REST_API_URL y KV_REST_API_TOKEN
agregadas a Vercel (automático) y a .env.local (manual). Verificado:
al 4to envío en menos de 10 min, el formulario bloquea correctamente
con el mensaje de rate limit.

2026-07-31 — Corregido navbar (hallazgo de QA-1): los anchors (Inicio,
Solución, Contacto) y el logo usaban hrefs relativos (#inicio), que
solo funcionaban estando ya en el Home. Cambiados a rutas absolutas
(/#inicio, /#solucion, /#contacto) en components/navbar.tsx para que
funcionen correctamente desde /blog, /glosario y /casos-de-exito.
Verificado en un artículo del blog.

2026-07-31 — Footer corregido (hallazgo de QA-1) y B8 completado:
reemplazados los íconos genéricos de RR.SS. por logos reales
(FaInstagram, FaLinkedinIn, FaFacebookF de react-icons, dependencia
nueva agregada con aprobación explícita del usuario). Copyright
centrado con text-center. Se creó newsletter-form.tsx (B8): campo de
email + botón "Suscribirme", validación de formato en el cliente, sin
backend todavía (queda como B8-conectar). También se corrigieron los
anchors "Inicio"/"Solución" del footer (mismo bug que el navbar,
/#seccion en vez de #seccion). Verificado visualmente por el usuario.

2026-08-02 — SEO-1 completado: creados app/sitemap.ts y app/robots.ts
usando las convenciones nativas de Next.js 16. El sitemap incluye las
páginas estáticas (Home, /blog, /glosario, /casos-de-exito,
/politica-de-privacidad) y cada artículo de blog dinámico, consultado
desde Sanity con POST_SLUGS_QUERY. robots.ts bloquea /studio de la
indexación y referencia el sitemap. URL base controlada por
NEXT_PUBLIC_SITE_URL (con fallback al dominio de Vercel) — pendiente
de actualizar esa variable cuando se compre un dominio propio.
Verificado en /sitemap.xml y /robots.txt.

2026-08-02 — SEO-2 completado: creado lib/site-config.ts centralizando
SITE_URL, SITE_NAME ("Promarketing Perú"), LEGAL_NAME ("Promarketing
Consulting S.A.C.") y SOCIAL_LINKS (Instagram, LinkedIn, Facebook,
YouTube, TikTok, X). Creado components/organization-jsonld.tsx con
JSON-LD de tipo Organization + WebSite, montado en app/layout.tsx.
sitemap.ts y robots.ts refactorizados para usar el mismo SITE_URL
centralizado. Verificado en el código fuente de la página: el script
application/ld+json se renderiza correctamente con todos los datos.

2026-08-03 — Corregida contradicción interna: la sección "Fase actual"
(al inicio del archivo) estaba desactualizada respecto al resto del
propio archivo — mencionaba A12d como pendiente cuando ya estaba hecho
y verificado, y no reflejaba QA-1, SEO-1 ni SEO-2. Actualizada para
coincidir con el estado real confirmado por las entradas de abajo y por
TASKS.md (SEO-3 es la tarea [SIGUIENTE]).
SEO-3 completado (llms.txt estático en public/). Próximo paso: META-1
(favicon + Open Graph).

2026-08-04 — META-1 completado y verificado: favicon oficial, metadata global
y por página, canonicals e imágenes Open Graph/Twitter. ESLint, TypeScript,
build y comprobación visual aprobados. `docs/marca/` quedó excluida de Git.
La paleta de DOC 08 fue confirmada como aprobada para producción y sus tokens
de imagen social quedaron centralizados. Próximo paso: INFRA-1.

2026-08-04 — INFRA-1 completado: variables públicas y privadas centralizadas
y validadas con Zod al iniciar dev/build; pares Redis incompletos y credenciales
obligatorias detienen el proceso sin revelar valores. La URL se resuelve por
entorno y las claves de rate limiting separan local/Preview/producción. Matriz
y operación documentadas en `docs/infrastructure/environment-variables.md`.
Lint, TypeScript, build y pruebas negativas de configuración aprobados.
Próximo paso: INFRA-2.

2026-08-04 — INFRA-2 completado: alcances de variables auditados en Vercel sin
leer valores y Standard Protection activada. Un Preview temporal terminó con
estado correcto, exigió autenticación y devolvió `X-Robots-Tag: noindex`; el
dominio público de producción mantuvo respuesta `200 OK`. La rama temporal se
eliminó local y remotamente. Riesgo residual MEDIUM aceptado temporalmente:
Preview y producción comparten HubSpot. Próximo paso: INFRA-3.

2026-08-04 — INFRA-3 completado: cabeceras HTTP defensivas y CSP diferenciada
para el sitio público y Sanity Studio, inicialmente en Report-Only. Lint,
TypeScript, build, respuestas locales y Preview aprobados; Home y Studio no
registraron violaciones CSP. El Studio del dominio temporal pidió un origen
CORS de Sanity, esperado para URLs efímeras y no atribuible a la CSP. Riesgo
residual MEDIUM aceptado por etapas hasta activar el bloqueo. Próximo paso:
INFRA-4. Se registró FORM-NOTIFY-1 para notificar envíos a
`promarketing2027@gmail.com`, con alcance y proveedor todavía por confirmar.

2026-08-04 — INFRA-4 completado: solo `VERCEL_ENV=production` permite
indexación. Preview, Development, local y entornos desconocidos bloquean el
rastreo mediante `robots.txt`, meta robots y `X-Robots-Tag`; producción permite
el sitio, mantiene `/studio` bloqueado y publica el sitemap. Lint, TypeScript,
builds separados de Preview/Production y Preview real aprobados. La capa
anónima de Vercel devolvió autenticación + `noindex` y la página autorizada
incluyó meta `noindex, nofollow`. Próximo paso: ANALYTICS-1.

2026-08-04 — ANALYTICS-1 completado: se verificaron las cuentas de
Promarketing en Google Tag Manager y GA4 y se instaló un único contenedor GTM
en el layout raíz. `NEXT_PUBLIC_GTM_ID` está validada y configurada únicamente
en Vercel Production; local y Preview no cargan el contenedor. Lint,
TypeScript, builds por entorno, prueba negativa del ID y HTML generado
aprobados. Próximo paso: ANALYTICS-2.

2026-08-04 — CONSENT-1 completado: preferencias necesarias, analítica y
marketing con aceptar, rechazar, configurar y revocar desde el footer. Consent
Mode v2 establece analítica/publicidad como denegadas antes de cargar GTM y
actualiza `dataLayer` después de cada elección; la preferencia se conserva sin
datos personales. Política de Privacidad actualizada. Lint, TypeScript, build,
orden de scripts y flujos manuales aprobados. ANALYTICS-2 conserva GA4 como
borrador sin publicar; Meta y Google Ads siguen pendientes.

2026-08-04 — ANALYTICS-2 en curso: el formulario emite `lead_submit_success`
una sola vez y únicamente después de que HubSpot confirma el envío; el evento
incluye servicio y UTM, nunca nombre, correo ni empresa. CSP ampliada para los
endpoints de GA4, Google Ads y Meta. En GTM quedaron en borrador GA4 base,
`generate_lead`, Meta Pixel `937463375421449` y Meta `Lead`, todos con controles
de consentimiento y activadores separados. Meta confirma que el píxel principal
ya está compartido con la cuenta publicitaria `1079263640454668`. Lint,
TypeScript y build aprobados. Commit `78ce654` desplegado como Ready en Vercel;
la URL oficial devuelve la CSP nueva. Tag Assistant confirmó que, con los cuatro
permisos opcionales denegados, ninguna de las cuatro etiquetas del borrador se
activa. Google Ads pasa a ANALYTICS-2B y queda pospuesto hasta que su cuenta esté
configurada; no bloquea el cierre actual de GA4 y Meta. Siguen pendientes los
otros tres estados de consentimiento, un envío exitoso controlado y la
publicación del contenedor. Riesgos a revisar:
el alias `web-promarketing1.vercel.app` aún sirve una versión anterior y Meta
tiene activadas las coincidencias avanzadas automáticas.

2026-08-05 — ANALYTICS-2, prepublicación aprobada: Tag Assistant verificó los
cuatro estados de consentimiento. Con todo denegado no se activó ninguna
etiqueta; solo analítica activó únicamente GA4; solo marketing activó únicamente
Meta; aceptar todo activó ambas etiquetas base una vez. El envío controlado
`2026promarketing+qa-analytics@gmail.com` fue confirmado por HubSpot como el
contacto `239982014990`, redirigió a `/gracias` y activó una vez GA4
`generate_lead` y una vez Meta `Lead`, sin duplicados. El contenedor sigue sin
publicarse: falta aprobación explícita y el smoke test posterior en producción.

2026-08-05 — ANALYTICS-2, control previo a publicación: se confirmó que el
activo correcto es el píxel de Meta `937463375421449`, asociado a Promarketing
Perú 2026, y se desactivó la coincidencia avanzada automática; la interfaz dejó
el control general y todos sus parámetros en “No”. La Política de Privacidad se
actualizó al Reglamento vigente (D.S. N° 016-2024-JUS), corrigió los datos
visibles y declaró el uso previsto de Google Tag Manager, GA4 y Meta, además de
distinguir Google Ads y Clarity como no activos. Lint, TypeScript y build
aprobados; el build requirió `NODE_OPTIONS=--use-system-ca` por la cadena de
certificados local de Windows al consultar Sanity. El aviso de versión
preliminar permanece: la revisión/aprobación jurídica bloquea la publicación de
GTM y el smoke test final en producción.

2026-08-05 — Por decisión del usuario, la revisión jurídica se registra como
pendiente y ANALYTICS-2 queda bloqueado, sin publicar el contenedor de GTM. No
se adelantan Google Ads ni Clarity porque también dependen del marco de
consentimiento. La siguiente tarea independiente y ejecutable es ERROR-1.

2026-08-05 — ERROR-1 completado: se añadió una página 404 personalizada y
responsive con enlaces accesibles al inicio y al blog, usando los componentes
y tokens existentes. Lint, TypeScript y build aprobados. Una ruta inexistente
respondió HTTP 404, mostró el contenido personalizado y conservó `noindex`.
Próximo paso: ACCESS-1.

2026-08-05 — ACCESS-1 ejecutada y documentada en
`docs/quality/accessibility-audit-2026-08-05.md`. Lighthouse Accessibility:
Home 97 en escritorio y móvil, Blog 100, artículo 100, Glosario 98, Casos 100 y
Privacidad 96. La referencia ≥95 pasa, pero el resultado general es FAIL por
contraste en Educación y el aviso legal, jerarquía de encabezados del Glosario,
`main` anidado en Privacidad y ausencia de una política integral de reduced
motion. Teclado/foco queda BLOCKED: Chrome y la extensión están habilitados,
pero falta el registro del native host y el plugin debe reinstalarse desde su
interfaz. Próximo paso: ACCESS-2a.

2026-08-05 — ACCESS-2a completado: Educación ya no reduce textos a opacidad
`0.28`; diferencia la etapa activa mediante `--foreground` y
`--muted-foreground`, manteniendo contraste válido. Si el sistema solicita
movimiento reducido, no se crea ScrollTrigger ni pin/scrub y se presentan todos
los textos con la etapa final estática. Lint, TypeScript y build PASS.
Lighthouse Accessibility del Home obtuvo 100 y `color-contrast` PASS localmente
y en producción. Próximo paso: ACCESS-2b.

2026-08-05 — ACCESS-2b completado: el aviso preliminar de Privacidad usa
`text-foreground` sobre `bg-muted`, y el `<main>` interior se sustituyó por una
`section` etiquetada desde el `h1`. Lint, TypeScript y build PASS. Lighthouse
Accessibility de Privacidad obtuvo 100 y contraste PASS localmente y en
producción; el HTML productivo contiene un solo `<main>`. Próximo paso:
ACCESS-2c.

2026-08-05 — ACCESS-2c completado: `AccordionTrigger` admite un nivel de
encabezado explícito y el Glosario usa la secuencia `h1 → h2`, sin encabezados
dentro de botones. Lint, TypeScript y build PASS. Lighthouse Accessibility del
Glosario obtuvo 100 y `heading-order` PASS localmente y en producción. Próximo
paso: ACCESS-2d.

2026-08-05 — ACCESS-2d completado: política global de movimiento reducido para
Motion, Lenis, GSAP y transiciones CSS. Con la preferencia activa, las entradas
quedan visibles sin desplazamiento, Lenis no inicia y los diagramas muestran un
estado estático. Lint, TypeScript y build PASS. Chrome y Lighthouse verificaron
modo normal y reducido localmente y en producción; Accessibility 100 en ambos.
ACCESS-VERIFY sigue bloqueado por el plugin. Próximo paso ejecutable: LIMITS-1.

2026-08-05 — LIMITS-1 completado con fuentes oficiales en
`docs/infrastructure/free-tier-limits.md`. Se definieron umbrales internos de
70 %/85 %, pero el consumo privado actual no fue leído y la capacidad no se
considera verificada. Resultado FAIL/HIGH en Vercel: Hobby está
restringido a uso personal no comercial y Promarketing promociona servicios.
Próximo paso: HOSTING-1 requiere elegir Vercel Pro o migración; no se autoriza
ningún gasto implícitamente.

2026-08-05 — Se corrigió el orden de cierre: HOSTING-1 queda diferida hasta
terminar frontend, backend e integraciones, con costo de plataforma USD 0 como
requisito obligatorio y Vercel Pro descartado. FORM-SCOPE-1 pasa a ser la tarea
siguiente para definir el flujo de Auditoría C.L.A.R.O. y newsletter antes de
implementar notificaciones o conexiones adicionales.

2026-08-05 — FORM-SCOPE-1 completada por confirmación del usuario. Auditoría
C.L.A.R.O. mantendrá HubSpot y sumará una notificación interna a
`promarketing2027@gmail.com`; newsletter se conectará a una lista de HubSpot
sin enviar una alerta interna por cada suscripción. FORM-NOTIFY-1 queda como
siguiente y requiere aprobar un proveedor gratuito y obtener su credencial.

2026-08-05 — Actualización de dependencias: `next` y `eslint-config-next` actualizados a la versión `16.3.0` mediante `pnpm`. `pnpm build` ejecutado con éxito produciendo la compilación estática completa sin advertencias ni errores.

2026-08-05 — FORM-NOTIFY-1 completado: instalado el SDK oficial de Resend (`resend`). Creado `lib/email.ts` con plantilla HTML responsiva enviando notificaciones a `promarketing2027@gmail.com` al confirmarse un envío en HubSpot (`lib/hubspot.ts`). Validado en `lib/env/server.ts` con la variable opcional `RESEND_API_KEY`.

2026-08-05 — B8-conectar completado: formulario de suscripción al Newsletter en el footer (`components/newsletter-form.tsx`) conectado a la Server Action `submitNewsletterForm` en `lib/hubspot.ts`. Incluye validación Zod, rate-limiting por IP y honeypot anti-spam. `pnpm build` ejecutado con éxito.

2026-08-05 — ANALYTICS-3 completado: creado `components/microsoft-clarity.tsx` para cargar el script oficial de Microsoft Clarity condicionado a la variable pública opcional `NEXT_PUBLIC_CLARITY_PROJECT_ID`. La CSP existente en `next.config.ts` ya permite `https://*.clarity.ms`. `pnpm build` verificado con éxito.

2026-08-05 — B6 completado: integradas animaciones de entrada con Motion (`motion/react`) en las secciones restantes del Home: Prueba social (`components/social-proof.tsx`), Objeciones (`components/faq.tsx`) y CTA final (`components/final-cta.tsx`). Todas las secciones utilizan la variante compartida `fadeUpVariant` de `lib/animations.ts`, respetan la preferencia de movimiento reducido `useReducedMotion` y se activan mediante `whileInView` con `viewport={{ once: true }}`. `pnpm build` verificado con éxito.

2026-08-05 — Sincronización del Sistema Visual (`DOC 08`): actualizada la fuente institucional a `Instrument Sans` (`next/font/google`), integrados los tokens cromáticos oficiales (`accent.connection` `#3CF5B5` y `accent.decision` `#E38035`) y creado el componente `BrandIsotipo` (`components/brand-logo.tsx`) utilizando la geometría SVG maestra en Navbar y Footer con micro-interacciones. `pnpm build` verificado con éxito.

## Dependencias de Fase B
Instaladas manualmente el 26-07-2026: motion, gsap, @gsap/react, lenis. pnpm build OK.
