"use client";

import { motion, useReducedMotion } from "motion/react";
import { AuditoriaForm } from "@/components/forms/auditoria-form";
import { fadeUpVariant } from "@/lib/animations";

export function FinalCta() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion ?? false;
  const itemVariant = fadeUpVariant({ reducedMotion });

  return (
    <section
      id="contacto"
      aria-labelledby="final-cta-title"
      className="section-dark section-notch-top scroll-mt-16 px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {/* Kicker */}
        <motion.span
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-xs font-semibold uppercase tracking-wider text-accent-connection"
        >
          Antes de proponerte algo, conversemos
        </motion.span>

        {/* Headline */}
        <motion.h2
          id="final-cta-title"
          className="max-w-4xl text-3xl leading-tight font-bold text-foreground sm:text-4xl"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          No te vamos a proponer nada sin antes entender tu negocio de verdad.
        </motion.h2>

        {/* Cuerpo */}
        <motion.p
          className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          Cuéntanos qué necesitas resolver. Lo que nos compartas es el punto de partida de la conversación, no un diagnóstico cerrado — lo confirmamos juntos con datos reales antes de proponerte cualquier cosa.
        </motion.p>

        {/* Formulario */}
        <motion.div
          className="w-full max-w-md text-left"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <AuditoriaForm />
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          className="max-w-md text-xs text-muted-foreground pt-2"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          Sin presión, sin urgencia artificial. Si no somos compatibles, también te lo decimos.
        </motion.p>
      </div>
    </section>
  );
}
