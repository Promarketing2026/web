"use client";

import { motion, useReducedMotion } from "motion/react";
import { CaseResultCard } from "@/components/case-result-card";
import { fadeUpVariant } from "@/lib/animations";

export function SocialProof() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion ?? false;
  const itemVariant = fadeUpVariant({ reducedMotion });

  return (
    <section
      aria-labelledby="social-proof-title"
      className="border-y border-border bg-muted/40 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="max-w-3xl space-y-6">
          <motion.h2
            id="social-proof-title"
            className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            El caso EMILIMA: cuando la publicidad no era el problema.
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            EMILIMA, una institución del Estado, invertía en publicidad
            omnicanal para su subasta pública de lotes — pero apenas vendía. El
            equipo de ventas y el de marketing operaban desconectados, y la
            publicidad no apuntaba al público objetivo correcto porque no se
            había diagnosticado el problema real del mercado.
          </motion.p>
          <motion.p
            className="text-lg leading-8 text-muted-foreground"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            Investigamos, identificamos el error de raíz y reconectamos la
            comunicación entre ambos equipos y todo el sistema.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <CaseResultCard
            label="100%"
            result="de los lotes vendidos, en las 3 subastas"
            context="Antes: solo 6 de 45 lotes vendidos por subasta"
            className="max-w-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
