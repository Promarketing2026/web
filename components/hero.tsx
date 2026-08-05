"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HeroInfrastructureDiagram } from "@/components/hero-infrastructure-diagram";
import { fadeUpVariant } from "@/lib/animations";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroItem = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
          <div className="max-w-4xl space-y-6">
            <motion.h1
              id="hero-title"
              className="text-4xl leading-tight font-semibold text-foreground sm:text-5xl"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Diseñamos Infraestructura Comercial Conectada para organizaciones
              que necesitan crecer con claridad.
            </motion.h1>
            <motion.p
              className="max-w-3xl text-lg leading-8 text-muted-foreground"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.12}
            >
              Integramos marketing, ventas, datos y automatización en un
              ecosistema coherente y trazable — para que recuperes el control de
              tu operación.
            </motion.p>
          </div>

          <motion.div
            className="justify-self-center lg:justify-self-end"
            variants={heroItem}
            initial="hidden"
            animate="visible"
            custom={0.48}
          >
            <HeroInfrastructureDiagram />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="visible"
            custom={0.24}
          >
            <Button asChild size="lg" className="h-11 px-4 text-sm">
              <a href="#contacto">
                Solicitar Auditoría C.L.A.R.O.
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground"
            variants={heroItem}
            initial="hidden"
            animate="visible"
            custom={0.36}
          >
            Diagnóstico de tu operación comercial, sin costo.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
