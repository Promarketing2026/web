"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const faqItems = [
  {
    question: "¿En qué se diferencian de una agencia de marketing tradicional?",
    answer:
      "Promarketing no es una agencia que ejecuta tácticas aisladas ni campañas desconectadas. Somos una firma de transformación comercial. Nuestra intervención siempre parte de un diagnóstico estructural profundo para construir una infraestructura que conecte marketing, ventas y datos.",
  },
  {
    question:
      "Ya tenemos CRM, pauta y herramientas digitales. ¿Para qué los necesitamos?",
    answer:
      "El problema más común no es la falta de herramientas, sino la fragmentación operativa. Si las plataformas y equipos operan desconectados, las decisiones se toman con información parcial. Nuestra labor es integrar lo que ya tienes para que funcione como un ecosistema ordenado y trazable.",
  },
  {
    question:
      "Necesitamos escalar resultados muy rápido, ¿pueden acelerar nuestra operación ya?",
    answer:
      "La velocidad sin estructura solo reproduce el problema actual a mayor escala. Promarketing prioriza la estabilidad operativa y el orden de los sistemas antes de acelerar la adquisición. La infraestructura sólida debe preceder al crecimiento.",
  },
  {
    question:
      "Cuando terminen de implementar el sistema, ¿dependeremos de ustedes para operarlo?",
    answer:
      "No. El resultado mínimo de nuestra intervención es tu independencia operativa. Te entregamos un ecosistema que tu equipo comprende, puede auditar y logra sostener por sí mismo. La continuidad posterior (optimización continua) es una decisión opcional, no una condición para que el sistema funcione.",
  },
];

export function Faq() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion ?? false;
  const itemVariant = fadeUpVariant({ reducedMotion, y: 16 });

  return (
    <section aria-label="Preguntas frecuentes" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.dl
          className="border-t border-border"
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
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              className="border-b border-border py-8"
              variants={itemVariant}
              custom={index * 0.05}
            >
              <dt
                data-faq-question
                className="max-w-3xl text-xl leading-tight font-semibold text-foreground"
              >
                {item.question}
              </dt>
              <dd
                data-faq-answer
                className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground"
              >
                {item.answer}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
