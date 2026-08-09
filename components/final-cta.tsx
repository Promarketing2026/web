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
          className="max-w-4xl text-3xl leading-tight font-bold text-foreground sm:text-4xl"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          No necesitas saber exactamente qué solución necesitas para empezar.
        </motion.h2>

        <motion.p
          className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          Si tienes una necesidad concreta, cuéntanos cuál es. Si todavía no sabes cómo definirla, cuéntanos qué está ocurriendo.
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

        <motion.p
          className="max-w-md text-xs text-muted-foreground pt-2"
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          🛡️ No necesitas preparar un diagnóstico formal ni conocer nuestra metodología previamente. Queremos entender primero qué necesitas resolver.
        </motion.p>
      </div>
    </section>
  );
}
