import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Palette,
  Globe,
  ShoppingCart,
  Search,
  Target,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowLeft,
} from "lucide-react";

import { SERVICES, getServiceBySlug } from "@/lib/services";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { AuditoriaForm } from "@/components/forms/auditoria-form";

type Props = {
  params: Promise<{ slug: string }>;
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

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado",
    };
  }

  return {
    title: service.seoMetadata.title,
    description: service.seoMetadata.description,
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: service.description,
      url: `${SITE_URL}/servicios/${service.slug}`,
    },
  };
}

export default async function ServicioDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: service.subtitle,
    url: `${SITE_URL}/servicios/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 py-16 sm:px-10 sm:py-24 max-w-5xl mx-auto space-y-16">
        {/* Navegación y Breadcrumb */}
        <nav aria-label="Migas de pan">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a todos los servicios
          </Link>
        </nav>

        {/* Hero de Servicio */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-accent-connection/40 bg-accent-connection/10 text-accent-connection text-xs font-semibold uppercase tracking-wider">
            <Icon className="w-4 h-4" />
            <span>Capacidad Comercial</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {service.title}
          </h1>

          <p className="text-xl font-medium text-foreground/90">
            {service.subtitle}
          </p>

          <p className="text-lg leading-8 text-muted-foreground max-w-3xl">
            {service.description}
          </p>
        </header>

        {/* Diagnóstico del Problema */}
        <section aria-labelledby="problem-heading" className="p-8 rounded-2xl border border-destructive/30 bg-destructive/5 space-y-4">
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <h2 id="problem-heading" className="text-lg font-semibold">
              El Freno Comercial que Aborda esta Capacidad
            </h2>
          </div>
          <p className="text-base leading-relaxed text-foreground/80">
            {service.problemStatement}
          </p>
        </section>

        {/* Entregables y Componentes */}
        <section aria-labelledby="deliverables-heading" className="space-y-8">
          <h2 id="deliverables-heading" className="text-2xl font-bold text-foreground">
            Entregables Tangibles del Sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm flex items-start gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-accent-connection shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Arquitectura e Integración */}
        <section aria-labelledby="integration-heading" className="p-8 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex items-center gap-3 text-accent-connection">
            <Layers className="w-5 h-5" />
            <h2 id="integration-heading" className="text-lg font-semibold text-foreground">
              Integración con la Infraestructura Comercial
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {service.integrationDetails}
          </p>
        </section>

        {/* Formulario de Conversión pre-seleccionado */}
        <section id="auditoria" aria-labelledby="audit-heading" className="p-8 sm:p-10 rounded-3xl border border-border bg-card/90 shadow-2xl space-y-8">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-connection block">
              Diagnóstico Inicial
            </span>
            <h2 id="audit-heading" className="text-3xl font-bold text-foreground">
              Audita esta capacidad en tu empresa
            </h2>
            <p className="text-sm text-muted-foreground">
              Solicita la Auditoría C.L.A.R.O. para identificar brechas en tu
              sistema de {service.title.toLowerCase()} y conectar tu operación.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <AuditoriaForm />
          </div>
        </section>
      </article>
    </>
  );
}
