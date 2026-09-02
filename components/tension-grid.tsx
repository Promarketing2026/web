"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { Split, Unplug, TrendingDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tensionCards = [
  {
    number: "01",
    category: "Identidad",
    icon: Split,
    title: "Lo que anuncias no es lo que tu equipo dice, ni lo que el cliente recibe.",
    body: "El anuncio promete una cosa, el vendedor explica otra, y el servicio entrega algo distinto. El cliente no se siente engañado — solo confundido. Y la confusión no cierra ventas.",
  },
  {
    number: "02",
    category: "Tecnología",
    icon: Unplug,
    title: "Pagas por herramientas que ni siquiera se hablan entre sí.",
    body: "CRM, WhatsApp, hojas de cálculo, un dashboard más. Cada una prometía ordenar algo, pero hoy nadie sabe cuál tiene el dato correcto — y sigues pagando las licencias de todas.",
  },
  {
    number: "03",
    category: "Precio y posicionamiento",
    icon: TrendingDown,
    title: "Terminas compitiendo solo por precio.",
    body: "Cuando tu marca no logra explicar por qué vale lo que cuesta, la única palanca que te queda es bajarlo. Y ahí, tarde o temprano, pierdes.",
  },
];

function SphereWireframe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Círculo perimetral */}
      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
      {/* Elipses longitudinales */}
      <ellipse cx="80" cy="80" rx="72" ry="38" stroke="currentColor" strokeWidth="1.1" opacity="0.5" transform="rotate(-28 80 80)" />
      <ellipse cx="80" cy="80" rx="72" ry="18" stroke="currentColor" strokeWidth="0.9" opacity="0.4" transform="rotate(-28 80 80)" />
      <ellipse cx="80" cy="80" rx="38" ry="72" stroke="currentColor" strokeWidth="1.1" opacity="0.5" transform="rotate(22 80 80)" />
      <ellipse cx="80" cy="80" rx="18" ry="72" stroke="currentColor" strokeWidth="0.9" opacity="0.4" transform="rotate(22 80 80)" />
      {/* Ejes centrales */}
      <line x1="8" y1="80" x2="152" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.4" transform="rotate(-28 80 80)" />
      <line x1="80" y1="8" x2="80" y2="152" stroke="currentColor" strokeWidth="1" opacity="0.4" transform="rotate(22 80 80)" />
    </svg>
  );
}

export function TensionGrid() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  // Estado para desktop: hover sobre columna (null | 0 | 1 | 2)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Estado para mobile: índice de la card activa (0 por defecto, o -1 si todas colapsadas)
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isManualTouch = useRef<boolean>(false);
  const touchTimer = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver suave para móvil con rootMargin central
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualTouch.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.intersectionRatio > 0.45) {
          const idx = cardRefs.current.indexOf(visible.target as HTMLElement);
          if (idx !== -1) {
            setActiveMobileIndex(idx);
          }
        }
      },
      {
        rootMargin: "-15% 0px -20% 0px",
        threshold: [0.45, 0.7],
      },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (touchTimer.current) clearTimeout(touchTimer.current);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    isManualTouch.current = true;
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => {
      isManualTouch.current = false;
    }, 1200);

    setActiveMobileIndex((prev) => (prev === idx ? -1 : idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(idx);
      setHoveredIndex(idx);
    }
  };

  return (
    <section
      id="tension"
      aria-labelledby="tension-title"
      className="relative px-6 py-24 sm:px-10 sm:py-32 border-t border-border/60 bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-6xl space-y-12">
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
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
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

        {/* Grid de 2 Estados: Sin desplegar sólo título; desplegado revela contenido completo */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          onMouseLeave={() => setHoveredIndex(null)}
          data-hovered={hoveredIndex !== null ? hoveredIndex : undefined}
          className="tension-cards-grid"
        >
          {tensionCards.map((card, idx) => {
            const Icon = card.icon;
            const isDesktopHovered = hoveredIndex === idx;
            const isMobileActive = activeMobileIndex === idx;

            return (
              <article
                key={card.category}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-card={idx}
                data-index={idx}
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(idx)}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`tension-card group relative flex flex-col justify-start overflow-hidden rounded-2xl border p-6 sm:p-7 backdrop-blur-md cursor-pointer select-none transition-all duration-500 ease-in-out ${
                  isDesktopHovered
                    ? "border-accent-connection/50 bg-card shadow-2xl shadow-accent-connection/10 md:-translate-y-1"
                    : "border-border/70 bg-card/60 hover:border-border/90"
                } ${
                  isMobileActive ? "is-active border-accent-connection/40 shadow-lg" : ""
                }`}
              >
                {/* Resplandor ambiental de fondo */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-connection/10 via-transparent to-transparent transition-opacity duration-500 ease-in-out ${
                    isDesktopHovered || isMobileActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* 1. Encabezado Superior (Siempre Visible) */}
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-border/40 pb-4">
                  <div className="inline-flex items-center gap-3">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ease-in-out ${
                        isDesktopHovered || isMobileActive
                          ? "border-accent-connection/60 bg-accent-connection/20 text-accent-connection shadow-sm shadow-accent-connection/25 scale-105"
                          : "border-border/70 bg-secondary/80 text-foreground"
                      }`}
                    >
                      <Icon className="size-5.5" />
                    </span>
                    <span className="text-sm font-bold tracking-widest uppercase text-foreground">
                      {card.category}
                    </span>
                  </div>

                  <span
                    className={`inline-grid place-items-center h-7.5 w-11 shrink-0 rounded-full border text-xs font-mono font-bold transition-all duration-500 ease-in-out ${
                      isDesktopHovered || isMobileActive
                        ? "border-accent-connection/60 bg-accent-connection/15 text-accent-connection -rotate-6 scale-110 shadow-xs"
                        : "border-border/60 text-muted-foreground/80"
                    }`}
                  >
                    {card.number}
                  </span>
                </div>

                {/* 2. Titular Principal (Siempre Visible en estado colapsado y desplegado) */}
                <h3 className="relative z-10 text-xl sm:text-2xl lg:text-[26px] font-bold text-foreground leading-[1.2] tracking-tight pt-4">
                  {card.title}
                </h3>

                {/* 3. Contenedor Desplegable (Oculto en estado colapsado, revelado con hover/touch) */}
                <div className={`relative z-10 tension-card-expandable ${isMobileActive ? "is-expanded" : ""}`}>
                  <div className="overflow-hidden">
                    {/* Micro-línea divisoria */}
                    <div className="h-[1.5px] w-full bg-accent-connection/60 my-4 origin-left" />

                    {/* Bajada Descriptiva */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4">
                      {card.body}
                    </p>

                    {/* Bloque Inferior: CTA + Pill de Diagnóstico (Izquierda) y Gráfico Alámbrico Calibrado (Derecha) */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-border/40">
                      {/* Acciones e Información */}
                      <div className="flex flex-col items-start gap-3 max-w-sm">
                        <Button
                          asChild
                          size="default"
                          className="group/btn relative h-11 px-6 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                        >
                          <a href="#">
                            <span>Agenda tu diagnóstico</span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="ml-1.5 size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </a>
                        </Button>

                        <div className="rounded-xl border border-border/70 bg-secondary/50 p-2.5 sm:p-3 text-[11px] sm:text-xs text-muted-foreground leading-relaxed shadow-xs">
                          <span className="text-accent-connection font-bold mr-1.5">→</span>
                          <strong>Ninguna de las tres es el problema real.</strong> Las tres son el mismo problema visto desde ángulos distintos: partes que no están conectadas.
                        </div>
                      </div>

                      {/* Gráfico Alámbrico de Soporte (Esfera calibrada para rellenar armónicamente el espacio) */}
                      <div className="hidden sm:flex size-24 md:size-28 lg:size-32 shrink-0 items-center justify-center text-accent-connection/45">
                        <SphereWireframe className="size-full animate-pulse-subtle" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* Micro-guía de interacción sutil */}
        <div className="text-center text-xs text-muted-foreground/60">
          <span className="hidden md:inline">
            Pasa el cursor sobre cada síntoma para enfocar el diagnóstico
          </span>
          <span className="md:hidden">
            Toca una tarjeta o desliza para desplegar el diagnóstico
          </span>
        </div>
      </div>
    </section>
  );
}
