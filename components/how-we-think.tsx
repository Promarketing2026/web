"use client";

import { ArrowRight, BookOpen, Compass, GitCommit, Lightbulb, RefreshCw, Sliders, Target } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const principles = [
  {
    title: "Comprender",
    desc: "Separar lo que sabemos con certeza de lo que estamos interpretando sobre la situación comercial.",
    icon: Compass,
  },
  {
    title: "Relacionar",
    desc: "Examinar las interdependencias entre marca, web, demanda y CRM que pueden cambiar la decisión.",
    icon: GitCommit,
  },
  {
    title: "Decidir",
    desc: "Definir con claridad qué función comercial necesita ser intervenida y con qué objetivo.",
    icon: Target,
  },
  {
    title: "Articular",
    desc: "Incorporar únicamente las capacidades y herramientas necesarias, sin excesos ni parches.",
    icon: Sliders,
  },
  {
    title: "Implementar",
    desc: "Llevar la decisión a condiciones reales de ejecución técnica, comercial y operativa.",
    icon: Lightbulb,
  },
  {
    title: "Aprender",
    desc: "Observar qué ocurre en la realidad y utilizar la evidencia recolectada para seguir ajustando.",
    icon: RefreshCw,
  },
];

export function HowWeThink() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section id="como-pensamos" className="relative px-6 py-24 sm:px-10 sm:py-32 bg-secondary/20 border-b border-border/60">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Encabezado */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
            Criterio Metodológico
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comprender antes de prescribir.
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            No aplicamos fórmulas prefabricadas. Guiamos cada intervención con un criterio riguroso orientado al aprendizaje y al resultado.
          </p>
        </div>

        {/* 6 Principios Nodos (Non-linear Grid) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx * 0.05}
                className="rounded-xl border border-border/80 bg-background p-6 space-y-3 transition-all duration-300 hover:border-accent-connection/40 hover:shadow-md"
              >
                <div className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-connection/10 text-accent-connection">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bloque 2: Infraestructura Comercial Conectada */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl border border-accent-connection/40 bg-gradient-to-br from-background via-secondary/40 to-accent-connection/10 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-connection">
              El Modelo Promarketing
            </span>
            <h3 className="text-2xl font-bold text-foreground">
              Infraestructura Comercial Conectada
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El modelo mediante el cual Promarketing articula las capacidades necesarias para cumplir una función comercial definida — sin obligar a integrar técnicamente todo ni a intervenir la organización completa.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-xs font-semibold text-background transition-transform hover:scale-105"
            >
              <BookOpen className="size-4" />
              <span>Conoce cómo piensa Promarketing</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
