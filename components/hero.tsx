"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
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
      className="relative overflow-hidden px-6 pt-36 pb-24 sm:px-10 sm:pt-44 sm:pb-32"
    >
      {/* Resplandor Ambiental de Alto Impacto Visual (Estructura Activa) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 -z-10 size-[500px] rounded-full bg-accent-connection/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 -z-10 size-[400px] rounded-full bg-accent-decision/10 blur-[100px]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]">
          <div className="max-w-4xl space-y-6">
            {/* Pill de Categoría de Marca */}
            <motion.div
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2.5 rounded-full border border-accent-connection/40 bg-secondary/80 px-4 py-1.5 text-xs font-semibold text-accent-connection shadow-xs backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-connection opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-connection" />
              </span>
              Firma de Sistemas Comerciales Integrados
            </motion.div>

            {/* Titular Principal */}
            <motion.h1
              id="hero-title"
              className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl sm:leading-[1.15]"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Diseñamos{" "}
              <span className="bg-gradient-to-r from-foreground via-foreground to-accent-connection bg-clip-text text-transparent">
                Infraestructura Comercial Conectada
              </span>{" "}
              para organizaciones que necesitan crecer con claridad.
            </motion.h1>

            {/* Bajada Promesa */}
            <motion.p
              className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Integramos marketing, ventas, datos y automatización en un
              ecosistema coherente y trazable — para que recuperes la comprensión y el control de
              tu operación comercial.
            </motion.p>

            {/* Bloque CTA + Garantía */}
            <motion.div
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <Button
                asChild
                size="lg"
                className="group relative h-12 px-6 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:scale-98"
              >
                <a href="#contacto">
                  <span>Solicitar Auditoría C.L.A.R.O.</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Button>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:pl-2">
                <ShieldCheck aria-hidden="true" className="size-4 text-accent-connection" />
                <span>Diagnóstico estratégico inicial sin costo</span>
              </div>
            </motion.div>
          </div>

          {/* Diagrama Interactivo de Alto Impacto Visual */}
          <motion.div
            className="w-full justify-self-center lg:justify-self-end"
            variants={heroItem}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <HeroInfrastructureDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
