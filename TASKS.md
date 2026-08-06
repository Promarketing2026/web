TASKS — Promarketing Perú

Regla: trabajar SOLO en la tarea marcada [SIGUIENTE]. No adelantar tareas futuras. Al terminar, mover el check a [hecho] y actualizar STATE.md. Una tarea = un componente o una configuración, nunca "la página completa".

IMPORTANTE al escribir prompts para Codex: nunca referenciar "el párrafo de arriba" o "el copy que definimos" — Codex no tiene el historial del chat. Copiar siempre el texto exacto y completo en el prompt.

NOTA SOBRE "[hecho]": significa que el componente existe y funciona a nivel básico, NO que esté perfecto. Los defectos conocidos de tareas ya hechas viven en la sección "PENDIENTES DE RETOQUE" más abajo — no se pierden, solo se pausan hasta que el usuario los priorice.

DECISIÓN: estructura completa antes de animar

Se decidió NO animar sección por sección mientras se construye. Razón: el copy y el orden de bloques todavía pueden cambiar (ya pasó una vez), y GSAP ScrollTrigger coordina mejor timelines cuando el DOM completo ya existe. Por eso: Fase A = todo estático. Fase B = animación, una sola pasada al final.

FASE A — Estructura estática (completa)
[hecho] A1. Inicializar el proyecto (Next.js 16, pnpm, shadcn/ui)
[hecho] A2. Layout base (header/main/footer, Inter temporal, tokens neutros)
[hecho] A3. Componente Hero — estático, sin animación
[hecho] A4. Componente "El problema" — estático, sin animación
[hecho] A5. Componente "Educación del concepto" (bloque 3) — estático, 3 párrafos en elementos <p> separados
[hecho] A6. Componente "La solución" (bloque 4, Auditoría C.L.A.R.O.) — estático
[hecho] A7. Componente "Prueba social" / caso EMILIMA — estático
[hecho] A8. Componente "Objeciones / FAQ" (4 preguntas) — estático
[hecho] A9. Componente "CTA final" — estático
[hecho] A10. Navbar (fijo arriba) — nombre "Promarketing Perú" en texto (sin logo por ahora), anchors a Inicio/Solución/Contacto, botón "Solicitar Auditoría C.L.A.R.O." también aquí, sin animación
[hecho] A11. Footer — Contacto, Sobre nosotros, Legal/redes, sin animación
FASE B — Animación
[hecho] B1. Instalar Lenis (smooth scroll global) en el layout raíz
[hecho] B2. Hero → micro-animación de entrada con Motion (fade/slide de H1, subtítulo, botón)
[hecho] B2.5. Hero — diagrama SVG de 4 nodos en loop circular ("Infraestructura Comercial" en el centro), conectados por paths curvos. Efecto de luz con resplandor viajando en bucle infinito (GSAP, repeat: -1, ease: none). Incluye etiqueta "eyebrow" arriba del diagrama y párrafo debajo que cambia de texto sincronizado con el nodo activo (contenido lorem ipsum, pendiente de copy real). VER PENDIENTES DE RETOQUE.
[hecho] B3. "El problema" → Motion simple, aparece con whileInView
[hecho] B4. "La solución" → Motion, mismo patrón que B3
[hecho] B4.5. Sistema de jerarquía visual: (1) alternar alineación entre secciones (columna dividida vs. bloque centrado), (2) separadores tipo "muesca" con clip-path entre secciones, (3) variante de sección oscura invirtiendo tokens neutros (--background/--foreground), aplicada a 2-3 secciones alternadas
[hecho] B5a. "Educación del concepto" → SVG estático de 3 etapas (fragmentación → conexión → resultado, metáfora de tuberías)
[hecho] B5b. "Educación del concepto" → GSAP + ScrollTrigger con pin, scrub controla la transición entre las 3 etapas del SVG
[hecho] B5c. "Educación del concepto" → sincronizar textos existentes (título, párrafos, frase de cierre) con las 3 etapas del SVG en el mismo ScrollTrigger. VER PENDIENTES DE RETOQUE — no quedó bien.
PENDIENTES DE RETOQUE (tareas ya "hechas" con defectos conocidos, pausadas)
 [hecho] RETOQUE-1 (de B2.5): estabilizado el contenedor del párrafo debajo del diagrama del Hero con `min-h-10` y transiciones fluidas de opacidad en `components/hero-infrastructure-diagram.tsx`, eliminando cualquier salto de layout. [código]
 [SIGUIENTE] RETOQUE-2 (de B5): la sincronización entre texto/labels/diagrama en "Educación del concepto" sigue sin sentirse correcta — las transiciones son muy rápidas, hay demasiado padding entre texto y diagrama, y los labels de etapa no siempre coinciden con el texto y el diagrama activos en ese momento. Requiere revisar de fondo el timeline de ScrollTrigger, no solo ajustar duraciones.
 [hecho] RETOQUE-3: @sanity/image-url utiliza `createImageUrlBuilder` en `sanity/lib/image.ts`, eliminando cualquier import por defecto deprecado. [código]
 RETOQUE-4: la captura de UTMs está implementada en el lugar incorrecto (/gracias, donde ya no existen en la URL). Debe moverse a la página de aterrizaje real (donde vive el formulario) usando sessionStorage, y viajar como campos ocultos del formulario hacia HubSpot en A12. El código actual en thank-you-redirect.tsx sirve como referencia técnica pero no es la implementación final.
PAUSADAS (no descartadas — retomar cuando el usuario lo indique)
 [hecho] B6. "Prueba social", "Objeciones", "CTA final" → Motion (`motion/react`), consistente con B3/B4/B4.5 y respetando `useReducedMotion`. [código]
 B7. Verificar que Lenis no rompe ScrollTrigger (requiere sincronizar ambos — es un paso técnico conocido, no improvisar)
 [hecho]B8. Footer — input de newsletter (solo UI): campo de email + botón "Suscribirme", validación básica de formato en el cliente. Sin conexión a backend todavía (destino del email aún no decidido) — eso será una tarea separada, B8-conectar.
 A12. Formulario de contacto — VER FASE C (A12a-A12d), ahora desglosado porque el Service Key de HubSpot ya está disponible. Este ítem queda como referencia; el trabajo real vive en la Fase C.
PRIORIDAD ACTUAL (decisión del usuario: avanzar con el blog)
[hecho] A13. Setup de Sanity (pnpm create sanity@latest, schema mínimo: artículo de blog, término de glosario, caso de éxito)
[hecho] A14a. Crear páginas frontend de blog: /blog y /blog/[slug] usando documentos post de Sanity, GROQ y PortableText.
[hecho] A14b. Crear páginas frontend del glosario usando documentos glosarioTermino de Sanity, sin inventar contenido real.
[hecho] A14c. Crear páginas frontend de casos de éxito usando documentos casoDeExito de Sanity, sin inventar contenido real.
[hecho] A14. Crear páginas frontend para blog/glosario/casos usando contenido de Sanity, sin inventar contenido real.
[hecho] NAV-1. Agregar dropdown "Recursos" al Navbar con links a Blog, Glosario y Casos de Éxito.
[hecho] FOOTER-1. Reestructurar Footer en columnas: marca/redes, navegación, contacto y copyright full-width.
[hecho] CONV-1. Crear página /gracias con contador, redirección a /, soporte de query servicio y captura local de UTM para A12.
FASE C — PRE-LANZAMIENTO

Contexto: el Service Key de HubSpot y el link de Meetings ya existen (.env.local → HUBSPOT_SERVICE_KEY, scopes crm.objects.contacts.read y crm.objects.contacts.write). El orden de abajo asume que el formulario de Auditoría C.L.A.R.O. es la pieza crítica del pre-lanzamiento — todo lo demás existe para que ese formulario y el sitio sean seguros, legales y medibles antes de recibir tráfico real. La autonomía del agente y las acciones que requieren autorización se rigen por AGENTS.md.

C0. Legal (bloquea A12 — el checkbox de consentimiento necesita un link real)
 [hecho] LEGAL-1. Página /politica-de-privacidad — plantilla base alineada a la Ley N° 29733 (Ley de Protección de Datos Personales, Perú): identidad del responsable del tratamiento, finalidad de los datos recogidos en el formulario, derechos ARCO, plazo de conservación, sin inventar datos de la empresa que el usuario no haya confirmado (razón social, RUC, email de contacto de datos). Contenido placeholder marcado explícitamente como "pendiente de revisión por un abogado" — mismo criterio que la paleta de marca: no se inventa el contenido final, solo la estructura. [código]
 [PENDIENTE — BLOQUEADA] LEGAL-2. Revisión y aprobación jurídica de la Política de Privacidad, incluyendo datos del responsable, correo para derechos ARCO, inscripción del banco de datos, plazo de conservación, proveedores y tratamiento fuera del Perú. Requiere un profesional legal; no se considera aprobada por aceptación técnica del usuario o del agente. [externa]
C1. Formulario de Auditoría C.L.A.R.O. (reemplaza a A12, desglosado)
 [hecho] A12a. Server Action + integración HubSpot Forms API usando HUBSPOT_SERVICE_KEY: captura nombre, email, empresa, servicio de interés; envío del contacto a HubSpot. Sin anti-spam ni validación todavía — esta tarea es solo la conexión base. 
 2026-07-30 — A12a completado: Server Action conectada a HubSpot CRM API (crm/v3/objects/contacts), integrada en FinalCta. Requirió regenerar el token en "Claves de servicio" (interfaz nueva de HubSpot reemplazó Private Apps). Falta A12b: validación con zod + checkbox de consentimiento.[código]
 [hecho] A12b. Validación server-side con zod (no confiar solo en la validación del cliente) + checkbox de consentimiento explícito enlazado a /politica-de-privacidad (requiere LEGAL-1 hecho). [código]
 [hecho] A12c. Anti-spam: honeypot (campo oculto) + rate limiting por IP. El rate limiting necesita una decisión de infraestructura (ej. Vercel KV o Upstash Redis, ambos con free tier) porque en serverless no se puede usar un contador en memoria — el usuario decide cuál antes de que se escriba el código. [código, con una decisión previa del usuario]
 [hecho] A12d. Redirección post-envío: a /gracias (aplicando ya RETOQUE-4: UTMs capturados en la página del formulario vía sessionStorage, viajando como campos ocultos hacia HubSpot) y luego botón/link al Programador de Reuniones (https://meetings.hubspot.com/promarketing-2026). [código]
 [hecho] FORM-SCOPE-1. Alcance confirmado: Auditoría C.L.A.R.O. creará/actualizará el contacto en HubSpot y enviará una notificación interna; newsletter se conectará a una lista de suscriptores en HubSpot sin generar una alerta interna por cada alta. [decisión]
 [hecho] FORM-NOTIFY-1. Enviar una notificación server-side a `promarketing2027@gmail.com` después de que Auditoría C.L.A.R.O. se procese correctamente en HubSpot. Implementado con el paquete oficial de Resend (`lib/email.ts`), plantilla HTML limpia y soporte para la variable `RESEND_API_KEY`. [código + configuración]
 [hecho] B8-conectar. Conectar el newsletter a la API de contactos de HubSpot (`submitNewsletterForm` en `lib/hubspot.ts`), con validación Zod server-side, rate limiting por IP (`lib/rate-limit.ts`) y honeypot anti-bot. [código]
C2. Seguridad adicional
 SEC-1. reCAPTCHA v3 o hCaptcha en el formulario — requiere que el usuario genere las keys (site key + secret key) primero, igual que pasó con HubSpot. [código, bloqueado por una key del usuario]
C3. Despliegue
 [hecho] DEPLOY-1. Primer deploy a Vercel: conectar el repo, configurar variables de entorno (HUBSPOT_SERVICE_KEY, keys de Sanity, keys de reCAPTCHA cuando existan). Esto es un flujo conocido del dashboard de Vercel — tarea MANUAL del usuario según REGLA DE COSTO, no de un modelo de IA. [manual]
 [hecho] INFRA-2. Auditar en Vercel, sin exponer valores, la presencia y alcance de variables en Development/Preview/Production; comprobar Preview Deployments y su protección. Cualquier cambio externo requiere autorización. [auditoría + configuración]
 [hecho] INFRA-3. Implementar y verificar cabeceras HTTP de seguridad y una CSP compatible con Next.js, Sanity, HubSpot y analítica; iniciar en Report-Only cuando corresponda. [código + verificación]
 [hecho] INFRA-4. Adaptar robots/noindex por entorno y comprobar que Preview no sea indexable; robots no sustituye la protección de acceso. [código + configuración]
C4. Testing
 [hecho]QA-1. Redactar QA-CHECKLIST.md: lista de verificación manual (formularios se envían y llegan a HubSpot, links del navbar/footer, responsive en mobile/tablet/desktop, /gracias redirige bien, consentimiento bloquea el envío si no está marcado). Redactar el checklist es una tarea de contenido que puede hacer un modelo de IA; ejecutar el checklist es manual del usuario. [código/contenido]
 QA-2. (opcional, evaluar más adelante) Test E2E automatizado con Playwright del flujo formulario → HubSpot. Pausado hasta después del lanzamiento salvo que el usuario decida priorizarlo antes. [código]
C5. Medición y analítica
 [hecho] ANALYTICS-1. Instalar el snippet de Google Tag Manager en el layout raíz (contenedor único, sin tags individuales de Meta Pixel / GA4 / Google Ads todavía). [código]
 [hecho] CONSENT-1. Implementar preferencias de cookies y Consent Mode v2 antes de publicar etiquetas: estado predeterminado denegado para analítica/publicidad, aceptar/rechazar/configurar, persistencia local y opción revocable desde el footer. [código]
 [PENDIENTE — BLOQUEADA] ANALYTICS-2. Completar y verificar dentro de GTM los tags de Meta Pixel y GA4, junto con los activadores de conversión confirmada. Estado prepublicación aprobado: Tag Assistant verificó rechazo total, solo analítica, solo marketing y aceptar todo; cada etiqueta base respetó su consentimiento. Un envío controlado llegó a HubSpot, redirigió a `/gracias` y activó una sola vez GA4 `generate_lead` y Meta `Lead`. En el píxel correcto `937463375421449` se desactivó y verificó la coincidencia avanzada automática. La Política de Privacidad quedó técnicamente actualizada al D.S. N° 016-2024-JUS y al uso previsto de GA4/Meta, pero conserva el aviso de versión preliminar. Bloqueo: LEGAL-2; después, publicación del contenedor y smoke test en producción. Google Ads se separó como ANALYTICS-2B y no bloquea esta tarea. [código + configuración]
 ANALYTICS-2B. Configurar la cuenta de Google Ads y, cuando esté lista, crear y verificar la acción de conversión, añadir su etiqueta en GTM y probarla con consentimiento de marketing. POSPUESTA por decisión del usuario; no bloquea ANALYTICS-2. [configuración]
 [hecho] ANALYTICS-3. Instalar el snippet de Microsoft Clarity (`components/microsoft-clarity.tsx`), condicionado a la variable `NEXT_PUBLIC_CLARITY_PROJECT_ID` y validado por la CSP existente. [código]
C6. Vacíos técnicos (orden sugerido: SEO/metadatos primero, por impacto

en la primera impresión al compartir el link; accesibilidad y límites de plan al final porque no bloquean el lanzamiento)

 [hecho] SEO-1. sitemap.xml + robots.txt, incluyendo bloquear /studio (panel de Sanity) de la indexación. [código]
 [hecho] SEO-2. JSON-LD (schema Organization/WebSite como mínimo) en el layout raíz o el Home. [código]
 [hecho]SEO-3. llms.txt básico. [código]
 [hecho] META-1. Favicon + metadatos Open Graph (título, descripción, imagen de preview) usando la Metadata API de Next — requiere que el usuario provea el asset del favicon/imagen OG si no existe uno todavía. [código, puede necesitar un asset del usuario]
 [hecho] INFRA-1. Centralizar y validar las variables de entorno obligatorias, documentando su aplicación en local, Preview y producción sin incluir secretos. [código + documentación]
 [hecho] ERROR-1. Página 404 personalizada. Responde con HTTP 404, incluye navegación accesible al inicio y al blog, y conserva `noindex`. [código]
 [hecho — RESULTADO FAIL/BLOCKED] ACCESS-1. Auditoría Lighthouse Accessibility ejecutada en Home escritorio/móvil, Blog, artículo, Glosario, Casos y Privacidad. Puntajes entre 96 y 100, pero se detectaron fallos de contraste, encabezados, landmarks y reduced motion; teclado/foco quedó BLOCKED por la comunicación de la extensión de Chrome. Evidencia: `docs/quality/accessibility-audit-2026-08-05.md`. [auditoría]
 [hecho] ACCESS-2a. Corregido en `components/education.tsx` el contraste de los textos inactivos mediante tokens a opacidad completa. Con reduced motion se omiten pin/scrub y se muestra un estado estático. Lighthouse Accessibility del Home: 100 local y producción, sin fallos de contraste. [código]
 [hecho] ACCESS-2b. Corregidos en la Política de Privacidad el contraste del aviso preliminar y el landmark `main` anidado. Lighthouse Accessibility: 100 local y producción; HTML verificado con un solo `<main>`. [código]
 [hecho] ACCESS-2c. Corregida la jerarquía semántica del Glosario: `AccordionTrigger` permite seleccionar el nivel de encabezado, los términos siguen `h1 → h2` y no existen encabezados dentro de botones. Lighthouse Accessibility: 100 local y producción, con `heading-order` aprobado. [código]
 [hecho] ACCESS-2d. Implementada una política global de movimiento reducido: Motion muestra estados finales sin desplazamiento, Lenis no inicia, GSAP deja diagramas estáticos y CSS reduce animaciones/transiciones. Chrome y Lighthouse verificaron modo normal y reducido localmente y en producción; Accessibility 100. [código + configuración]
 [PENDIENTE — BLOQUEADA] ACCESS-VERIFY. Repetir Lighthouse y verificar navegación por teclado/foco visible después de corregir los hallazgos. BLOCKED hasta restablecer la comunicación de la extensión de Chrome. [auditoría]
 [hecho — RESULTADO FAIL/HIGH] LIMITS-1. Límites oficiales de Sanity Free, HubSpot Free Tools y Vercel Hobby documentados en `docs/infrastructure/free-tier-limits.md`, con umbrales y consecuencias. El consumo privado actual no fue leído. Hallazgo: Vercel Hobby prohíbe uso comercial y no es elegible para este sitio. [investigación]
 [PENDIENTE — DIFERIDA HASTA CIERRE FUNCIONAL] HOSTING-1. Migrar desde Vercel Hobby a un hosting que permita uso comercial con costo de plataforma USD 0. Vercel Pro queda descartado por el requisito económico. No iniciar la migración hasta cerrar y verificar frontend, backend e integraciones, ni cambiar producción sin aprobación explícita. [infraestructura + decisión]
Backlog (no empezar aún)
Páginas de servicio individuales — CONTENIDO YA DISPONIBLE: los 7 sistemas de la oferta (Diseño y Gestión de Marca, Infraestructura Web, Ecommerce y Conversión, SEO/GEO/AEO, Ads/Paid Media, Automatización Comercial, Tracking y Trazabilidad), implementados en orden lógico según evidencia de la Auditoría C.L.A.R.O. — pendiente de estructurar cuando se planifiquen estas páginas.
Glosario (colección completa)
Animación tipo "paint stroke" SVG en secciones por definir (pendiente: usuario debe especificar en qué secciones exactamente)
