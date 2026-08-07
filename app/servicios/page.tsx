import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  Globe,
  ShoppingCart,
  Search,
  Target,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react";

import { SERVICES } from "@/lib/services";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sistemas y Capacidades Comerciales",
  description:
    "Conoce las 7 capacidades comerciales integradas de Promarketing Perú: desde marca e infraestructura web hasta automatización y tracking unificado.",
  openGraph: {
    title: `Sistemas y Capacidades Comerciales | ${SITE_NAME}`,
    description:
      "Explora nuestra oferta de sistemas integrados para potenciar la marca, venta y trazabilidad comercial de tu empresa.",
    url: `${SITE_URL}/servicios`,
  },
};

const iconMap = {
  Palette,
  Globe,
  ShoppingCart,
  Search,
  Target,
  Zap,
  Activity,
};

export default function ServiciosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.description,
      url: `${SITE_URL}/servicios/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="px-6 py-20 sm:px-10 sm:py-28 max-w-6xl mx-auto space-y-16">
        {/* Header de la Sección */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-connection block">
            Infraestructura Comercial Conectada
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Nuestros 7 Sistemas de Oferta
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            No vendemos tácticas aisladas. Articulamos las capacidades necesarias
            para que tu empresa construya marca, genere demanda, convierta
            oportunidades y mida sus resultados con total independencia.
          </p>
        </div>

        {/* Catálogo de Tarjetas en Rejilla Responsiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName];
            return (
              <div key={service.slug} className="h-full">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="group flex flex-col justify-between h-full p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-accent-connection/60 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-accent-connection group-hover:text-background transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-accent-connection transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="text-sm font-medium text-foreground/80">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-accent-connection">
                    <span>Explorar Capacidad</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
