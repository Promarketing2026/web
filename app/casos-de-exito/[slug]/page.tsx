import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, TrendingUp } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { CASOS_DE_EXITO_SLUGS_QUERY, CASO_DE_EXITO_QUERY } from "@/sanity/lib/queries";
import type { CasoDeExito } from "@/sanity/lib/types";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { AuditoriaForm } from "@/components/forms/auditoria-form";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const casos: { slug: string }[] = await client.fetch(CASOS_DE_EXITO_SLUGS_QUERY);
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caso = await client.fetch<CasoDeExito>(CASO_DE_EXITO_QUERY, { slug });

  if (!caso) {
    return {
      title: "Caso de éxito no encontrado",
    };
  }

  return {
    title: `Caso de Éxito: ${caso.cliente} | Promarketing Perú`,
    description: caso.resultado,
    openGraph: {
      title: `Caso de Éxito ${caso.cliente} | ${SITE_NAME}`,
      description: caso.resultado,
      url: `${SITE_URL}/casos-de-exito/${caso.slug}`,
    },
  };
}

export default async function CasoDeExitoDetailPage({ params }: Props) {
  const { slug } = await params;
  const caso = await client.fetch<CasoDeExito>(CASO_DE_EXITO_QUERY, { slug });

  if (!caso) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Caso de Éxito: ${caso.cliente}`,
    description: caso.resultado,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/casos-de-exito/${caso.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 py-16 sm:px-10 sm:py-24 max-w-4xl mx-auto space-y-14">
        {/* Breadcrumb */}
        <nav aria-label="Migas de pan">
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Casos de Éxito
          </Link>
        </nav>

        {/* Encabezado del Caso */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-connection/40 bg-accent-connection/10 text-accent-connection text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Caso de Éxito Real</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {caso.cliente}
          </h1>

          {caso.cifraDestacada ? (
            <div className="inline-flex items-center gap-3 p-4 rounded-xl border border-accent-connection/40 bg-card">
              <TrendingUp className="w-6 h-6 text-accent-connection" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {caso.cifraDestacada}
              </span>
            </div>
          ) : null}
        </header>

        {/* Desglose de Tres Columnas / Secciones: Situación -> Intervención -> Resultado */}
        <div className="grid grid-cols-1 gap-8">
          {/* Situación Inicial */}
          <section aria-labelledby="situacion-title" className="p-8 rounded-2xl border border-border bg-card/60 space-y-3">
            <h2 id="situacion-title" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              01. Situación Inicial
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              {caso.situacion}
            </p>
          </section>

          {/* Intervención */}
          {caso.intervencion ? (
            <section aria-labelledby="intervencion-title" className="p-8 rounded-2xl border border-accent-connection/40 bg-accent-connection/5 space-y-3">
              <h2 id="intervencion-title" className="text-xs font-semibold uppercase tracking-widest text-accent-connection">
                02. Intervención e Infraestructura Conectada
              </h2>
              <p className="text-base leading-relaxed text-foreground">
                {caso.intervencion}
              </p>
            </section>
          ) : null}

          {/* Resultado Tangible */}
          <section aria-labelledby="resultado-title" className="p-8 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="w-5 h-5 text-accent-connection" />
              <h2 id="resultado-title" className="text-xs font-semibold uppercase tracking-widest text-foreground">
                03. Resultado Medible
              </h2>
            </div>
            <p className="text-base leading-relaxed text-foreground/90 font-medium">
              {caso.resultado}
            </p>
          </section>
        </div>

        {/* Bloque CTA Auditoría */}
        <section id="auditoria" aria-labelledby="audit-heading" className="p-8 sm:p-10 rounded-3xl border border-border bg-card/90 shadow-2xl space-y-8 mt-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-connection block">
              Resultados Predecibles
            </span>
            <h2 id="audit-heading" className="text-2xl font-bold text-foreground">
              Obtén estos resultados en tu empresa
            </h2>
            <p className="text-sm text-muted-foreground">
              Solicita la Auditoría C.L.A.R.O. para identificar y corregir las
              desconexiones en tu arquitectura comercial.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <AuditoriaForm />
          </div>
        </section>
      </article>
    </>
  );
}
