"use client";

import { motion, useReducedMotion } from "motion/react";

import { fadeUpVariant } from "@/lib/animations";

export function Problem() {
  const shouldReduceMotion = useReducedMotion();
  const problemItem = fadeUpVariant({
    y: 18,
    duration: 0.5,
    reducedMotion: shouldReduceMotion ?? false,
  });

  return (
    <section
      aria-labelledby="problem-title"
      className="border-y border-border bg-muted/40 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="max-w-3xl space-y-6">
          <motion.h2
            id="problem-title"
            className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
            variants={problemItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            No ejecutamos actividad táctica aislada.
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={problemItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.12}
          >
            El problema más común que enfrentan no es la falta de publicidad o
            de herramientas, sino la fragmentación operativa y la desconexión
            estructural. En la práctica, esto significa que las organizaciones
            implementan software, campañas, CRMs y diversos canales digitales,
            pero sin una arquitectura que los conecte. Como consecuencia directa
            de esta fragmentación, marketing y ventas trabajan como silos
            separados, los datos se dispersan, se pierde la trazabilidad de qué
            acciones generan ventas reales y las decisiones se terminan tomando
            con información incompleta.
          </motion.p>
        </div>

        <p className="max-w-3xl text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
          La infraestructura existe, pero la integración no.
        </p>
      </div>
    </section>
  );
}
