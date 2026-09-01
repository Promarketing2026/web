"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function CategoryPositioning() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="como-pensamos"
      aria-labelledby="category-title"
      className="relative px-6 py-24 sm:px-10 sm:py-32 border-t border-border/60 bg-secondary/15"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Encabezado y Posicionamiento */}
        <div className="space-y-4">
          <motion.span
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-semibold uppercase tracking-wider text-accent-connection"
          >
            Quiénes somos, en una frase honesta
          </motion.span>
          <motion.h2
            id="category-title"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight"
          >
            No somos una consultora que entrega reportes. Tampoco una agencia que ejecuta tareas sueltas.
          </motion.h2>
          <motion.p
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2"
          >
            Somos una firma de sistemas comerciales integrados — combinamos el pensamiento estratégico con la implementación real. Llevamos más de 10 años diseñando esa conexión para negocios de distintos rubros.
          </motion.p>
        </div>

        {/* Sub-bloque: Estrategia vs. Ejecución */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          className="rounded-xl border border-border/70 bg-card p-6 sm:p-8 space-y-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
            <CheckCircle2 className="size-4 text-accent-connection" />
            <span>Ejecución vs. Estrategia Real</span>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Publicidad bien pautada, un buen guion de ventas, contenido cuidado — cada pieza puede ser excelente por separado y tu negocio seguir sin crecer. <strong>Eso es ejecución.</strong> Estrategia real es que esas piezas se hablen entre sí.
          </p>
        </motion.div>

        {/* Cierre: Esencia de marca */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="flex items-center gap-3 pt-2 text-foreground font-semibold text-base sm:text-lg"
        >
          <Sparkles className="size-5 text-accent-decision shrink-0" />
          <span>Convertimos la complejidad de tu negocio en claridad para decidir.</span>
        </motion.div>
      </div>
    </section>
  );
}
