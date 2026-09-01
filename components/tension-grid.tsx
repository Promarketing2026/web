"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { MessageSquareOff, Layers, DollarSign, ArrowRight } from "lucide-react";

const tensionCards = [
  {
    category: "Identidad",
    icon: MessageSquareOff,
    title: "Lo que anuncias no es lo que tu equipo dice, ni lo que el cliente recibe.",
    body: "El anuncio promete una cosa, el vendedor explica otra, y el servicio entrega algo distinto. El cliente no se siente engañado — solo confundido. Y la confusión no cierra ventas.",
  },
  {
    category: "Tecnología",
    icon: Layers,
    title: "Pagas por herramientas que ni siquiera se hablan entre sí.",
    body: "CRM, WhatsApp, hojas de cálculo, un dashboard más. Cada una prometía ordenar algo, pero hoy nadie sabe cuál tiene el dato correcto — y sigues pagando las licencias de todas.",
  },
  {
    category: "Precio y posicionamiento",
    icon: DollarSign,
    title: "Terminas compitiendo solo por precio.",
    body: "Cuando tu marca no logra explicar por qué vale lo que cuesta, la única palanca que te queda es bajarlo. Y ahí, tarde o temprano, pierdes.",
  },
];

export function TensionGrid() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="tension"
      aria-labelledby="tension-title"
      className="relative px-6 py-24 sm:px-10 sm:py-32 border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Cabecera */}
        <div className="max-w-3xl space-y-4">
          <motion.span
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-semibold uppercase tracking-wider text-accent-connection"
          >
            Reconoce las señales
          </motion.span>
          <motion.h2
            id="tension-title"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            No son 3 problemas distintos. Es la misma fuga, en 3 lugares distintos.
          </motion.h2>
          <motion.p
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            Estas señales parecen aisladas. No lo son — las tres drenan la misma rentabilidad.
          </motion.p>
        </div>

        {/* Rejilla de 3 Tarjetas */}
        <div className="grid gap-6 md:grid-cols-3">
          {tensionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.category}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2 + idx * 0.1}
                className="flex flex-col justify-between rounded-xl border border-border/60 bg-secondary/30 p-6 sm:p-7 shadow-xs hover:border-accent-connection/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-connection">
                    <Icon className="size-4" />
                    <span>{card.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Cierre - Efecto Final */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="rounded-xl border border-accent-connection/30 bg-accent-connection/5 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <ArrowRight className="size-5 text-accent-connection shrink-0 mt-1 hidden sm:block" />
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              <strong>Ninguna de las tres es el problema real.</strong> Las tres son el mismo problema visto desde ángulos distintos: partes que no están conectadas. Y esa desconexión es exactamente lo que se te escapa en rentabilidad cada mes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
