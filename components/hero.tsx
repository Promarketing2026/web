"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HeroParticlesCanvas } from "@/components/hero-particles-canvas";
import { fadeUpVariant } from "@/lib/animations";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroItem = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28"
    >
      {/* Fondo reticular punteado con máscara elíptica y animación ultra-sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-subtle-grid bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_40%,transparent_88%)]"
      />

      {/* Sutil textura horizontal scanline estilo CRT / Cyber Tracking */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px)] [background-size:100%_4px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_40%,transparent_88%)]"
      />

      {/* Red de partículas y constelación interactiva a pantalla completa */}
      <HeroParticlesCanvas />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">


        {/* Titular Principal */}
        <motion.h1
          id="hero-title"
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:leading-[1.12] lg:text-7xl"
        >
          Tu rentabilidad no depende de sumar más piezas.{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Depende de que encajen.
          </span>
        </motion.h1>

        {/* Bajada Descriptiva */}
        <motion.p
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
        >
          La mayoría de negocios no pierde rentabilidad por un área rota, sino porque marketing, ventas, tecnología y equipo trabajan como piezas sueltas. Antes de recetarte nada, lo investigamos contigo.
        </motion.p>

        {/* Refuerzo */}
        <motion.p
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="mt-3 max-w-2xl text-sm font-medium text-foreground/80 italic sm:text-base"
        >
          Meterle más presupuesto a un sistema desconectado no acelera resultados. Amplifica el caos.
        </motion.p>

        {/* Bloque CTAs con micro-copy */}
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-8 flex flex-col items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="group relative h-12 border border-blue-400/30 bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0 active:scale-98 cursor-pointer"
          >
            <a href="#contacto">
              <span>Agenda tu diagnóstico</span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-1.5 size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Button>

          <span className="text-xs text-muted-foreground">
            Es una conversación real con nosotros, no un reporte automático.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
