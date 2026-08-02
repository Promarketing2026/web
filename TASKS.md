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
 RETOQUE-1 (de B2.5): el párrafo debajo del diagrama del Hero salta o empuja el layout cuando cambia de texto entre nodos — falta un min-height correctamente aplicado o el contenedor no lo respeta. Revisar el CSS del contenedor de ese párrafo.
 RETOQUE-2 (de B5): la sincronización entre texto/labels/diagrama en "Educación del concepto" sigue sin sentirse correcta — las transiciones son muy rápidas, hay demasiado padding entre texto y diagrama, y los labels de etapa no siempre coinciden con el texto y el diagrama activos en ese momento. Requiere revisar de fondo el timeline de ScrollTrigger, no solo ajustar duraciones.
 RETOQUE-3: @sanity/image-url usa el import por defecto (deprecado). Cambiar a import { createImageUrlBuilder } from '@sanity/image-url' en el archivo donde se construyen las URLs de imágenes.
 RETOQUE-4: la captura de UTMs está implementada en el lugar incorrecto (/gracias, donde ya no existen en la URL). Debe moverse a la página de aterrizaje real (donde vive el formulario) usando sessionStorage, y viajar como campos ocultos del formulario hacia HubSpot en A12. El código actual en thank-you-redirect.tsx sirve como referencia técnica pero no es la implementación final.
PAUSADAS (no descartadas — retomar cuando el usuario lo indique)
 B6. "Prueba social", "Objeciones", "CTA final" → Motion, consistente con B3/B4
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

Contexto: el Service Key de HubSpot y el link de Meetings ya existen (.env.local → HUBSPOT_SERVICE_KEY, scopes crm.objects.contacts.read y crm.objects.contacts.write). El orden de abajo asume que el formulario de Auditoría C.L.A.R.O. es la pieza crítica del pre-lanzamiento — todo lo demás existe para que ese formulario y el sitio sean seguros, legales y medibles antes de recibir tráfico real. Cada bloque indica si es tarea de código (para un modelo de IA) o tarea manual del usuario, según la REGLA DE COSTO de AGENTS.md. Get it get it

C0. Legal (bloquea A12 — el checkbox de consentimiento necesita un link real)
 [hecho] LEGAL-1. Página /politica-de-privacidad — plantilla base alineada a la Ley N° 29733 (Ley de Protección de Datos Personales, Perú): identidad del responsable del tratamiento, finalidad de los datos recogidos en el formulario, derechos ARCO, plazo de conservación, sin inventar datos de la empresa que el usuario no haya confirmado (razón social, RUC, email de contacto de datos). Contenido placeholder marcado explícitamente como "pendiente de revisión por un abogado" — mismo criterio que la paleta de marca: no se inventa el contenido final, solo la estructura. [código]
C1. Formulario de Auditoría C.L.A.R.O. (reemplaza a A12, desglosado)
 [hecho] A12a. Server Action + integración HubSpot Forms API usando HUBSPOT_SERVICE_KEY: captura nombre, email, empresa, servicio de interés; envío del contacto a HubSpot. Sin anti-spam ni validación todavía — esta tarea es solo la conexión base. 
 2026-07-30 — A12a completado: Server Action conectada a HubSpot CRM API (crm/v3/objects/contacts), integrada en FinalCta. Requirió regenerar el token en "Claves de servicio" (interfaz nueva de HubSpot reemplazó Private Apps). Falta A12b: validación con zod + checkbox de consentimiento.[código]
 [hecho] A12b. Validación server-side con zod (no confiar solo en la validación del cliente) + checkbox de consentimiento explícito enlazado a /politica-de-privacidad (requiere LEGAL-1 hecho). [código]
 [hecho] A12c. Anti-spam: honeypot (campo oculto) + rate limiting por IP. El rate limiting necesita una decisión de infraestructura (ej. Vercel KV o Upstash Redis, ambos con free tier) porque en serverless no se puede usar un contador en memoria — el usuario decide cuál antes de que se escriba el código. [código, con una decisión previa del usuario]
 [hecho] A12d. Redirección post-envío: a /gracias (aplicando ya RETOQUE-4: UTMs capturados en la página del formulario vía sessionStorage, viajando como campos ocultos hacia HubSpot) y luego botón/link al Programador de Reuniones (https://meetings.hubspot.com/promarketing-2026). [código]
C2. Seguridad adicional
 SEC-1. reCAPTCHA v3 o hCaptcha en el formulario — requiere que el usuario genere las keys (site key + secret key) primero, igual que pasó con HubSpot. [código, bloqueado por una key del usuario]
C3. Despliegue
 [hecho] DEPLOY-1. Primer deploy a Vercel: conectar el repo, configurar variables de entorno (HUBSPOT_SERVICE_KEY, keys de Sanity, keys de reCAPTCHA cuando existan). Esto es un flujo conocido del dashboard de Vercel — tarea MANUAL del usuario según REGLA DE COSTO, no de un modelo de IA. [manual]
 DEPLOY-2. Confirmar que las Preview Deployments automáticas por rama funcionan (branch ≠ main → preview URL) antes de mandar nada a producción. También manual/configuración en el dashboard. [manual]
C4. Testing
 [hecho]QA-1. Redactar QA-CHECKLIST.md: lista de verificación manual (formularios se envían y llegan a HubSpot, links del navbar/footer, responsive en mobile/tablet/desktop, /gracias redirige bien, consentimiento bloquea el envío si no está marcado). Redactar el checklist es una tarea de contenido que puede hacer un modelo de IA; ejecutar el checklist es manual del usuario. [código/contenido]
 QA-2. (opcional, evaluar más adelante) Test E2E automatizado con Playwright del flujo formulario → HubSpot. Pausado hasta después del lanzamiento salvo que el usuario decida priorizarlo antes. [código]
C5. Medición y analítica
 ANALYTICS-1. Instalar el snippet de Google Tag Manager en el layout raíz (contenedor único, sin tags individuales de Meta Pixel / GA4 / Google Ads todavía). [código]
 ANALYTICS-2. Configurar dentro de GTM los tags de Meta Pixel, Google Ads Conversion Tracking y GA4, y los triggers (ej. envío exitoso del formulario, vista de /gracias). Esto se hace en la interfaz de GTM, no en el código del sitio — tarea MANUAL del usuario. [manual]
 ANALYTICS-3. Instalar el snippet de Microsoft Clarity. [código]
C6. Vacíos técnicos (orden sugerido: SEO/metadatos primero, por impacto

en la primera impresión al compartir el link; accesibilidad y límites de plan al final porque no bloquean el lanzamiento)

 [hecho] SEO-1. sitemap.xml + robots.txt, incluyendo bloquear /studio (panel de Sanity) de la indexación. [código]
 [hecho] SEO-2. JSON-LD (schema Organization/WebSite como mínimo) en el layout raíz o el Home. [código]
 [SIGUIENTE]SEO-3. llms.txt básico. [código]
 META-1. Favicon + metadatos Open Graph (título, descripción, imagen de preview) usando la Metadata API de Next — requiere que el usuario provea el asset del favicon/imagen OG si no existe uno todavía. [código, puede necesitar un asset del usuario]
 ERROR-1. Página 404 personalizada. [código]
 ACCESS-1. Correr Lighthouse y/o axe DevTools sobre el sitio desplegado y anotar hallazgos. Es una verificación con herramienta conocida — tarea MANUAL del usuario según REGLA DE COSTO; un modelo de IA puede ayudar después a corregir problemas puntuales que se encuentren. [manual, con posible seguimiento en código]
 LIMITS-1. Documentar en STATE.md los límites del free tier de Sanity, HubSpot y Vercel (requests/mes, contactos, builds, etc.) para monitorear a medida que crece el tráfico. Tarea de investigación/ redacción, no de código — puede hacerla un modelo de IA con acceso a la documentación oficial de cada servicio. [investigación]
Backlog (no empezar aún)
Páginas de servicio individuales — CONTENIDO YA DISPONIBLE: los 7 sistemas de la oferta (Diseño y Gestión de Marca, Infraestructura Web, Ecommerce y Conversión, SEO/GEO/AEO, Ads/Paid Media, Automatización Comercial, Tracking y Trazabilidad), implementados en orden lógico según evidencia de la Auditoría C.L.A.R.O. — pendiente de estructurar cuando se planifiquen estas páginas.
Glosario (colección completa)
Animación tipo "paint stroke" SVG en secciones por definir (pendiente: usuario debe especificar en qué secciones exactamente)