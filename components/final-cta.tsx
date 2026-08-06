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
        <motion.h2
          id="final-cta-title"
          className="max-w-4xl text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          No escales la fragmentación. Construye la infraestructura necesaria
          para crecer con claridad.
        </motion.h2>

        <motion.p
          className="text-sm text-muted-foreground"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          Diagnóstico de tu operación comercial, sin costo.
        </motion.p>

        <motion.div
          className="w-full max-w-md text-left"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <AuditoriaForm />
        </motion.div>
      </div>
    </section>
  );
}
