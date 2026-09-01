"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { ShieldCheck, KeyRound, BookOpenCheck, LayoutDashboard } from "lucide-react";

const autonomyPillars = [
  {
    icon: KeyRound,
    label: "Planos y Accesos",
    desc: "Control total de credenciales y arquitectura.",
  },
  {
    icon: BookOpenCheck,
    label: "Equipo Capacitado",
    desc: "Transferencia operativa real para gobernar el sistema.",
  },
  {
    icon: LayoutDashboard,
    label: "Tableros Propios",
    desc: "Visibilidad directa de tu rentabilidad y métricas.",
  },
];

export function AutonomyCommitment() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="autonomia"
      aria-labelledby="autonomy-title"
      className="relative px-6 py-24 sm:px-10 sm:py-32 border-t border-border/60 bg-secondary/15"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Encabezado */}
        <div className="space-y-4">
          <motion.span
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-semibold uppercase tracking-wider text-accent-connection"
          >
            Lo que no vamos a hacer
          </motion.span>
          <motion.h2
            id="autonomy-title"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight"
          >
            No construimos algo que solo nosotros sepamos operar.
          </motion.h2>
          <motion.p
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2"
          >
            Cuando terminamos, te dejamos los planos, los accesos y a tu equipo capacitado para gobernar el sistema — incluyendo los tableros para que veas tú mismo tu propia rentabilidad, no solo nosotros. Seguimos trabajando contigo si el valor sigue siendo real, nunca porque diseñamos algo que dependa de nosotros para funcionar.
          </motion.p>
        </div>

        {/* Pilares visuales de autonomía */}
        <div className="grid gap-4 sm:grid-cols-3">
          {autonomyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.label}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3 + idx * 0.1}
                className="rounded-xl border border-border/60 bg-card p-5 space-y-2.5 shadow-2xs"
              >
                <div className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-connection/10 text-accent-connection">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{pillar.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Micro-copy de Alcance Delimitado */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.6}
          className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/30 p-4 text-xs sm:text-sm text-muted-foreground"
        >
          <ShieldCheck className="size-5 text-accent-connection shrink-0 mt-0.5" />
          <span>
            Esto no es una póliza contra cualquier desafío futuro — es la garantía de que lo que construimos hoy, lo puedes gobernar tú mismo.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
