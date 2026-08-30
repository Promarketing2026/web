"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HeroParticlesCanvas } from "@/components/hero-particles-canvas";
import { HeroCoreVisual } from "@/components/hero-core-visual";
import { fadeUpVariant } from "@/lib/animations";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroItem = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("promarketingperu.com/setup");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback si no está disponible la API de portapapeles
    }
  };

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
        {/* Píldora HUD / Badge Cyber */}
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8 inline-flex items-center gap-2.5 rounded-md border border-blue-400/40 bg-blue-600/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-600/25 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-80" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan-200" />
          </span>
          Nuevo · Automatizaciones Comerciales con IA
        </motion.div>

        {/* Titular Principal */}
        <motion.h1
          id="hero-title"
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:leading-[1.08] lg:text-7xl"
        >
          Marketing conectado,{" "}
          <br className="hidden sm:inline" />
          resultados{" "}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            sin fricción.
          </span>
        </motion.h1>

        {/* Bajada Descriptiva */}
        <motion.p
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
        >
          Promarketing centraliza estrategia, demanda, conversión y tecnología en una sola arquitectura comercial —
          para que tu equipo mida con precisión y se enfoque en escalar.
        </motion.p>

        {/* Bloque CTAs con acentos Cyber Blue */}
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group relative h-12 border border-blue-400/30 bg-blue-600 px-7 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0 active:scale-98 cursor-pointer"
          >
            <a href="#contacto">
              <span>Empezar gratis</span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-1 size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 border-blue-500/30 px-6 text-base font-medium transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-950/20 cursor-pointer"
          >
            <a href="#como-ayudamos">
              <span>Ver cómo ayudamos</span>
            </a>
          </Button>
        </motion.div>

        {/* Snippet Interactivo de Conexión */}
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-8 inline-flex items-center gap-3 rounded-xl border border-blue-500/30 bg-card/75 px-4 py-2.5 text-xs font-mono text-muted-foreground backdrop-blur-md sm:text-sm"
        >
          <span className="font-semibold text-sky-400 select-none">›</span>
          <code className="text-foreground select-all">Conecta tu stack: promarketingperu.com/setup</code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copiado al portapapeles" : "Copiar enlace al portapapeles"}
            className="ml-1 flex size-7 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            {copied ? (
              <Check className="size-3.5 text-sky-400 transition-transform scale-110" />
            ) : (
              <Copy className="size-3.5 transition-transform hover:scale-105" />
            )}
          </button>
        </motion.div>

        {/* Núcleo Procedural Directo en Canvas (Cero Cajas, Cero Sombras Blur) */}
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="w-full"
        >
          <HeroCoreVisual />
        </motion.div>
      </div>
    </section>
  );
}
