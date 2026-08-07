export type ServiceItem = {
  slug: string;
  formValue: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "Palette" | "Globe" | "ShoppingCart" | "Search" | "Target" | "Zap" | "Activity";
  problemStatement: string;
  deliverables: string[];
  integrationDetails: string;
  seoMetadata: {
    title: string;
    description: string;
  };
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "diseno-y-gestion-de-marca",
    formValue: "diseno-marca",
    title: "Diseño y Gestión de Marca",
    subtitle: "Identidad estratégica y sistemas visuales que construyen autoridad",
    description:
      "Construimos el sistema visual, narrativo e institucional de tu empresa para proyectar solidez, diferenciarte en el mercado y sostener la coherencia en todos los puntos de contacto.",
    iconName: "Palette",
    problemStatement:
      "Muchas marcas operan con identidades visuales obsoletas o inconsistentes, perdiendo credibilidad frente a competidores y dificultando la percepción de valor de sus servicios.",
    deliverables: [
      "Manual de Identidad Visual y Guía de Estilo",
      "Arquitectura de Marca y Tono de Voz Institucional",
      "Kit de Assets Digitales (SVG, tipografía, paletas de color)",
      "Plantillas para Presentaciones y Canales Digitales",
    ],
    integrationDetails:
      "El sistema de marca se traduce en tokens CSS y componentes reutilizables integrados directamente en el código de tu sitio web y CRM.",
    seoMetadata: {
      title: "Diseño y Gestión de Marca | Promarketing Perú",
      description:
        "Construimos sistemas de marca coherentes y estratégicos para aumentar la percepción de valor y autoridad de tu empresa.",
    },
  },
  {
    slug: "infraestructura-web",
    formValue: "infraestructura-web",
    title: "Infraestructura Web",
    subtitle: "Plataformas web de alto rendimiento, velocidad y conversión",
    description:
      "Desarrollamos sitios web y aplicaciones web modernas orientadas al rendimiento, accesibilidad y conversión sin depender de plantillas lentas o monolitos inflexibles.",
    iconName: "Globe",
    problemStatement:
      "Sitios web lentos, difíciles de actualizar o con mala experiencia móvil frustran a los visitantes y desperdician la inversión publicitaria.",
    deliverables: [
      "Arquitectura Web en Next.js / React de Alta Velocidad",
      "Optimización de Core Web Vitals y Accesibilidad 100/100",
      "CMS Headless Embebido para Gestión Independiente de Contenido",
      "Despliegue Global con Servidores Serverless de Baja Latencia",
    ],
    integrationDetails:
      "Conexión nativa con HubSpot CRM, Google Tag Manager, analítica de comportamiento y sistemas de captura de prospectos.",
    seoMetadata: {
      title: "Infraestructura Web de Alto Rendimiento | Promarketing Perú",
      description:
        "Desarrollo web moderno con Next.js, optimizado para velocidad, accesibilidad y captura de leads comerciales.",
    },
  },
  {
    slug: "ecommerce-y-conversion",
    formValue: "ecommerce-conversion",
    title: "Ecommerce y Conversión",
    subtitle: "Ecosistemas de venta digital optimizados para la transacción",
    description:
      "Diseñamos la experiencia de compra, checkout y post-venta para maximizar la tasa de conversión y eliminar la fricción en el recorrido del comprador.",
    iconName: "ShoppingCart",
    problemStatement:
      "Embudos de venta confusos y pasarelas con alta tasa de abandono de carrito reducen drásticamente la rentabilidad por cliente.",
    deliverables: [
      "Optimización del Embudo de Compra (CRO)",
      "Integración de Pasarelas de Pago Directas y Seguras",
      "Diseño UX/UI de Catálogo y Checkout de Alta Conversión",
      "Tracking de Abandono de Carrito y Recaptura",
    ],
    integrationDetails:
      "Sincronización de inventario, analítica de comercio electrónico mejorado y automatización de correos transaccionales.",
    seoMetadata: {
      title: "Ecommerce y Optimización de Conversión | Promarketing Perú",
      description:
        "Maximizamos tus ventas digitales mediante auditoría de conversión UX/UI, optimización de checkout y embudos de compra.",
    },
  },
  {
    slug: "seo-geo-aeo",
    formValue: "seo-geo-aeo",
    title: "SEO / GEO / AEO",
    subtitle: "Posicionamiento orgánico en buscadores y motores de inteligencia artificial",
    description:
      "Optimizamos tu presencia digital para motores de búsqueda tradicionales (SEO), búsquedas geolocalizadas (GEO) y motores de respuesta basados en IA (AEO / LLMs).",
    iconName: "Search",
    problemStatement:
      "Estar ausente en las búsquedas orgánicas o no aparecer en las respuestas sintetizadas por IA deja a tu empresa fuera de las decisiones de compra.",
    deliverables: [
      "Arquitectura Técnica de Información y Contenido Estructurado",
      "Optimización AEO para Motores de Respuesta IA (llms.txt / Schema.org)",
      "Estrategia de SEO Local y Posicionamiento en Mapas (GEO)",
      "Monitoreo de Palabras Clave e Intención de Búsqueda",
    ],
    integrationDetails:
      "Indexación automática vía sitemap dinámico en Next.js y marcado de datos estructurados JSON-LD de tipo Organization y WebSite.",
    seoMetadata: {
      title: "SEO, GEO y AEO (Optimización para IA) | Promarketing Perú",
      description:
        "Posiciona tu empresa en Google, mapas locales y respuestas de Inteligencia Artificial mediante contenido estructurado.",
    },
  },
  {
    slug: "ads-paid-media",
    formValue: "ads-paid-media",
    title: "Ads / Paid Media",
    subtitle: "Adquisición eficiente de prospectos calificados",
    description:
      "Estrategias de inversión en medios pagados (Google Ads, Meta Ads, LinkedIn Ads) orientadas a la captura de demanda real con atribución directa sobre el retorno de inversión.",
    iconName: "Target",
    problemStatement:
      "Campañas publicitarias que generan clics pero no prospectos calificados, aumentando el costo por adquisición sin retornos medibles.",
    deliverables: [
      "Estructura de Campañas en Google Search, Display y Meta Ads",
      "Redacción y Copywriting de Anuncios de Alta Conversión",
      "Segmentación de Públicos de Alto Valor B2B / B2C",
      "Auditoría de Retorno sobre la Inversión Publicitaria (ROAS)",
    ],
    integrationDetails:
      "Atribución directa mediante Server Actions que transmiten UTMs y conversiones desde el formulario hacia el CRM y las plataformas publicitarias.",
    seoMetadata: {
      title: "Ads y Paid Media de Alta Conversión | Promarketing Perú",
      description:
        "Gestión estratégica de campañas en Google Ads y Meta Ads para capturar demanda calificada con atribución clara.",
    },
  },
  {
    slug: "automatizacion-comercial",
    formValue: "automatizacion-comercial",
    title: "Automatización Comercial",
    subtitle: "Flujos de nutrición, CRM y respuesta automática",
    description:
      "Orquestamos la integración de HubSpot CRM, automatización de correo, alertas internas y flujos de ventas para reducir tiempos de respuesta y nunca perder una oportunidad.",
    iconName: "Zap",
    problemStatement:
      "Prospectos que tardan horas en ser contactados pierden interés rápidamente, debilitando el esfuerzo del equipo comercial.",
    deliverables: [
      "Implementación y Personalización de HubSpot CRM",
      "Notificaciones Instantáneas por Email a Equipos de Ventas",
      "Flujos Automáticos de Secuencia de Correo y Seguimiento",
      "Integración de Formularios Inteligentes con Anti-Spam y Rate Limiting",
    ],
    integrationDetails:
      "Conexión de APIs server-side mediante SDKs oficiales para sincronización instantánea entre la web y HubSpot.",
    seoMetadata: {
      title: "Automatización Comercial y CRM | Promarketing Perú",
      description:
        "Conectamos tus formularios con HubSpot CRM y notificaciones por email para agilizar la gestión de ventas.",
    },
  },
  {
    slug: "tracking-y-trazabilidad",
    formValue: "tracking-trazabilidad",
    title: "Tracking y Trazabilidad",
    subtitle: "Medición unificada de punta a punta sin pérdida de datos",
    description:
      "Implementamos Google Tag Manager, Consent Mode v2, Meta Conversions API y servidores de atribución para rastrear el origen y ROI exacto de cada venta.",
    iconName: "Activity",
    problemStatement:
      "Incapacidad para saber de qué canal publicitario proviene cada cliente real, lo que impide optimizar el presupuesto comercial con certeza.",
    deliverables: [
      "Implementación de Google Tag Manager con Consent Mode v2",
      "Captura y Persistencia de UTMs en Navegación y Formularios",
      "Integración de GA4 y Meta Pixel con Conversiones Personalizadas",
      "Banner de Preferencias de Cookies Revocables y Cumplimiento Legal",
    ],
    integrationDetails:
      "DataLayer estandarizado que emite eventos de conversión únicos para garantizar que cada venta sea atribuida correctamente sin duplicados.",
    seoMetadata: {
      title: "Tracking y Trazabilidad Comercial | Promarketing Perú",
      description:
        "Construimos trazabilidad completa desde la primera visita hasta la venta final con Google Tag Manager y Consent Mode v2.",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
