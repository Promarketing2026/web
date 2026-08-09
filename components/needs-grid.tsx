"use client";

import { ArrowRight, HelpCircle, Layers, LineChart, MessageSquare, Target, Tv, UserCheck, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const needs = [
  {
    id: "web",
    title: "Web y experiencia digital",
    need: "Necesito una web o mejorar la que tengo",
    desc: "Crear, rediseñar o mejorar una experiencia digital que cumpla una función real para el negocio.",
    cta: "Explorar Web →",
    href: "/servicios/infraestructura-web",
    icon: Tv,
    featured: true,
  },
  {
    id: "marca",
    title: "Marca",
    need: "Quiero fortalecer mi marca",
    desc: "Ordenar su significado, diferenciación, posicionamiento o expresión.",
    cta: "Explorar Marca →",
    href: "/servicios/diseno-de-marca",
    icon: Layers,
    featured: true,
  },
  {
    id: "demanda",
    title: "Demanda",
    need: "Necesito generar más oportunidades",
    desc: "Mejorar cómo el mercado descubre, comprende y considera la propuesta.",
    cta: "Explorar Demanda →",
    href: "/servicios/ads-paid-media",
    icon: Target,
    featured: true,
  },
  {
    id: "conversion",
    title: "Conversión",
    need: "Tengo oportunidades, pero no convierto",
    desc: "Comprender dónde puede estar apareciendo fricción entre interés y decisión.",
    cta: "Explorar Conversión →",
    href: "/servicios/seo-geo-aeo",
    icon: Zap,
    featured: false,
  },
  {
    id: "gestion-comercial",
    title: "Gestión Comercial",
    need: "Necesito ordenar ventas y seguimiento",
    desc: "Procesos, CRM, responsabilidades, coordinación y gestión de oportunidades.",
    cta: "Explorar Gestión Comercial →",
    href: "/servicios/ecommerce",
    icon: UserCheck,
    featured: true,
  },
  {
    id: "automatizacion",
    title: "Automatización",
    need: "Quiero automatizar procesos",
    desc: "Reducir trabajo manual o mejorar coordinación cuando hacerlo realmente aporte valor.",
    cta: "Explorar Automatización →",
    href: "/servicios/automatizacion-comercial",
    icon: MessageSquare,
    featured: false,
  },
  {
    id: "informacion",
    title: "Información",
    need: "No entiendo bien qué está funcionando",
    desc: "Mejorar información, medición y capacidad de decisión.",
    cta: "Explorar Información →",
    href: "/servicios/tracking-trazabilidad",
    icon: LineChart,
    featured: false,
  },
];

export function NeedsGrid() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section id="necesidades" className="relative px-6 py-24 sm:px-10 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Encabezado de la Sección */}
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ¿Qué necesitas resolver?
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Puedes llegar con una necesidad concreta. No necesitas saber qué sistema necesitas para empezar.
          </p>
        </div>

        {/* Bento Grid Modular */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx * 0.05}
                className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-connection/50 hover:shadow-lg hover:shadow-accent-connection/5"
              >
                <div className="space-y-4">
                  <div className="inline-flex size-10 items-center justify-center rounded-lg border border-accent-connection/30 bg-accent-connection/10 text-accent-connection group-hover:scale-105 transition-transform">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
                      {item.title}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-accent-connection transition-colors">
                      {item.need}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:text-accent-connection"
                  >
                    <span>{item.cta}</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}

          {/* Tarjeta Indeterminado: "No estoy seguro de qué necesito" */}
          <motion.div
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.4}
            className="group relative flex flex-col justify-between rounded-xl border border-accent-decision/40 bg-accent-decision/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-decision hover:shadow-lg hover:shadow-accent-decision/10 sm:col-span-2 lg:col-span-2"
          >
            <div className="space-y-4">
              <div className="inline-flex size-10 items-center justify-center rounded-lg border border-accent-decision/40 bg-accent-decision/20 text-accent-decision">
                <HelpCircle className="size-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-decision">
                  Asesoría Inicial
                </span>
                <h3 className="mt-1 text-xl font-bold text-foreground">
                  No estoy seguro de qué necesito
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Cuéntanos qué está ocurriendo en tu negocio. Podemos empezar por entenderlo juntos sin necesidad de que traigas un diagnóstico previo.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-accent-decision/20">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent-decision transition-transform group-hover:translate-x-1"
              >
                <span>Cuéntanos tu situación</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
