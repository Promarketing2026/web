import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { GLOSARIO_SLUGS_QUERY, GLOSARIO_TERMINO_QUERY } from "@/sanity/lib/queries";
import type { GlosarioTermino } from "@/sanity/lib/types";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { AuditoriaForm } from "@/components/forms/auditoria-form";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const terminos: { slug: string }[] = await client.fetch(GLOSARIO_SLUGS_QUERY);
  return terminos.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await client.fetch<GlosarioTermino>(GLOSARIO_TERMINO_QUERY, { slug });

  if (!item) {
    return {
      title: "Término no encontrado",
    };
  }

  return {
    title: `${item.termino} | Glosario`,
    description: item.definicionCorta,
    openGraph: {
      title: `${item.termino} — Glosario de Infraestructura Comercial | ${SITE_NAME}`,
      description: item.definicionCorta,
      url: `${SITE_URL}/glosario/${item.slug}`,
    },
  };
}

export default async function GlosarioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await client.fetch<GlosarioTermino>(GLOSARIO_TERMINO_QUERY, { slug });

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: item.termino,
    description: item.definicionCorta,
    inDefinedTermSet: `${SITE_URL}/glosario`,
    url: `${SITE_URL}/glosario/${item.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 py-16 sm:px-10 sm:py-24 max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Migas de pan">
          <Link
            href="/glosario"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Glosario Técnico
          </Link>
        </nav>

        {/* Encabezado del Término */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glosario Técnico</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {item.termino}
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 font-medium p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
            {item.definicionCorta}
          </p>
        </header>

        {/* Definición Extendida con PortableText */}
        {item.definicionExtendida && item.definicionExtendida.length > 0 ? (
          <section className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-connection" />
              Explicación Detallada
            </h2>
            <div className="text-base text-foreground/80 space-y-4">
              <PortableText value={item.definicionExtendida} />
            </div>
          </section>
        ) : null}

        {/* Bloque CTA Auditoría */}
        <section aria-labelledby="audit-heading" className="p-8 sm:p-10 rounded-3xl border border-border bg-card/90 shadow-2xl space-y-8 mt-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-connection block">
              Diagnóstico de Capacidad
            </span>
            <h2 id="audit-heading" className="text-2xl font-bold text-foreground">
              Aplica este concepto en tu empresa
            </h2>
            <p className="text-sm text-muted-foreground">
              Analizamos si tu organización cuenta con la infraestructura para
              implementar {item.termino.toLowerCase()} con total atribución.
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
