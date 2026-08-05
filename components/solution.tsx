"use client";

import { motion, useReducedMotion } from "motion/react";

import { fadeUpVariant } from "@/lib/animations";

const auditDimensions = [
  "Claridad",
  "Lógica",
  "Atribución",
  "Relación",
  "Optimización",
];

export function Solution() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion ?? false;
  const solutionItem = fadeUpVariant({ reducedMotion });
  const dimensionItem = fadeUpVariant({
    y: 16,
    duration: 0.45,
    reducedMotion,
  });

  return (
    <section
      id="solucion"
      aria-labelledby="solution-title"
      className="section-dark section-notch-both scroll-mt-16 px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <motion.h2
            id="solution-title"
            className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            Diagnosticamos antes de intervenir.
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.12}
          >
            La intervención de Promarketing nunca empieza ejecutando tácticas o
            campañas, sino diagnosticando la arquitectura comercial.
          </motion.p>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.24}
          >
            El método principal para esto es la Auditoría C.L.A.R.O., que evalúa
            cinco dimensiones.
          </motion.p>
        </div>

        <motion.ul
          aria-label="Dimensiones de la Auditoría C.L.A.R.O."
          className="w-full max-w-3xl border-t border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {auditDimensions.map((dimension) => (
            <motion.li
              key={dimension}
              className="border-b border-border py-4 text-lg font-medium text-foreground"
              variants={dimensionItem}
              custom={0}
            >
              {dimension}
            </motion.li>
          ))}
        </motion.ul>

        <div className="max-w-3xl space-y-8">
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            A través de esta auditoría, Promarketing mapea tu operación real
            para identificar las fricciones, las pérdidas de información y las
            desconexiones exactas entre tus herramientas, el equipo de marketing
            y el de ventas.
          </motion.p>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.12}
          >
            Una vez hecho el diagnóstico y conectada la infraestructura, el
            resultado tangible que recibes es un ecosistema digital integrado,
            medible y ordenado.
          </motion.p>
          <motion.p
            className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl"
            variants={solutionItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.24}
          >
            El mayor valor de esta entrega es la independencia operativa:
            obtienes un sistema que tu equipo comprende, puede auditar y logra
            sostener por sí mismo, sin depender permanentemente de Promarketing
            para que funcione.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
