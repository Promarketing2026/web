"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HeroChip3D } from "@/components/hero-chip-3d";
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

            {/* Titular Principal V1 */}
            <motion.h1
              id="hero-title"
              className="text-4xl font-bold leading-tight text-foreground sm:text-5xl sm:leading-[1.15]"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Construimos las{" "}
              <span className="bg-gradient-to-r from-foreground via-foreground to-accent-connection bg-clip-text text-transparent">
                capacidades comerciales
              </span>{" "}
              que tu negocio necesita para funcionar mejor.
            </motion.h1>

            {/* Bajada Promesa V1 */}
            <motion.p
              className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
              variants={heroItem}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Estrategia, marca, demanda, conversión, tecnología e información articuladas según lo que realmente necesitas resolver.
            </motion.p>

            {/* Bloque CTA Primario + Secundario */}
            <motion.div
              className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center"
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
                  <span>Cuéntanos qué necesitas</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base font-medium transition-all duration-300 hover:border-accent-connection/50 hover:bg-secondary/60"
              >
                <a href="#como-ayudamos">
                  <span>Cómo ayudamos →</span>
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Isotipo 3D Flotante con Pistas Neón Activas */}
          <motion.div
            className="w-full justify-self-center lg:justify-self-end flex items-center justify-center"
            variants={heroItem}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <HeroChip3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
