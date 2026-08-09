"use client";

import { ArrowRight, BookOpen, FileText, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const articles = [
  {
    type: "CONCEPTO",
    title: "Infraestructura Comercial Conectada: Más allá de los silos digitales",
    desc: "Cómo la desarticulación entre marketing, ventas y datos destruye el retorno de inversión comercial.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    type: "ANÁLISIS",
    title: "Por qué aumentar el presupuesto publicitario rara vez soluciona un problema de ventas",
    desc: "Un examen de las 5 fricciones de conversión que ocurren antes y después del clic.",
    href: "/blog",
    icon: FileText,
  },
  {
    type: "GUÍA PRÁCTICA",
    title: "Cómo evaluar si tu CRM está sirviendo al proceso o si el proceso sirve al CRM",
    desc: "Criterios para detectar si tu equipo está perdiendo velocidad en la gestión de oportunidades.",
    href: "/blog",
    icon: Lightbulb,
  },
];

export function KnowledgeSection() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section id="conocimiento" className="relative px-6 py-24 sm:px-10 sm:py-32 bg-secondary/30 border-b border-border/60">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
              Centro de Conocimiento
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ideas para comprender mejor cómo funciona tu sistema comercial.
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent-connection hover:underline shrink-0"
          >
            <span>Explorar conocimiento</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* 3 Tarjetas Editoriales */}
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((art, idx) => {
            const Icon = art.icon;
            return (
              <motion.div
                key={art.title}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx * 0.05}
                className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-connection/40 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent-connection/30 bg-accent-connection/10 px-3 py-1 text-[10px] font-bold text-accent-connection">
                    <Icon className="size-3" />
                    <span>{art.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-accent-connection transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40">
                  <Link
                    href={art.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-accent-connection"
                  >
                    <span>Leer artículo →</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
