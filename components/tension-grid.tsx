"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { Split, Unplug, TrendingDown, ArrowRight } from "lucide-react";

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

export function TensionGrid() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  // Estado para desktop: hover sobre columna (null | 0 | 1 | 2)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Estado para mobile: índice de la card activa (0 por defecto)
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

        if (visible && visible.intersectionRatio > 0.4) {
          const idx = cardRefs.current.indexOf(visible.target as HTMLElement);
          if (idx !== -1) {
            setActiveMobileIndex(idx);
          }
        }
      },
      {
        rootMargin: "-15% 0px -20% 0px",
        threshold: [0.4, 0.65, 0.85],
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

        {/* Cards Expansibles con Animación Fluida Ease In/Out */}
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
                className={`tension-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-7 backdrop-blur-md cursor-pointer select-none transition-all duration-500 ease-in-out ${
                  isDesktopHovered
                    ? "border-accent-connection/50 bg-card shadow-xl shadow-accent-connection/5 md:-translate-y-1"
                    : "border-border/70 bg-card/60 hover:border-border/90"
                } ${
                  isMobileActive
                    ? "border-accent-connection/40 shadow-lg"
                    : ""
                }`}
              >
                {/* Resplandor ambiental de fondo */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-connection/10 via-transparent to-transparent transition-opacity duration-500 ease-in-out ${
                    isDesktopHovered || isMobileActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Encabezado Superior: Ícono Conceptual + Categoría (Izquierda) vs Índice Numérico (Derecha) */}
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ease-in-out ${
                        isDesktopHovered || isMobileActive
                          ? "border-accent-connection/50 bg-accent-connection/20 text-accent-connection scale-105"
                          : "border-border/60 bg-secondary/80 text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-4.5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {card.category}
                    </span>
                  </div>

                  <span
                    className={`inline-grid place-items-center size-7.5 shrink-0 rounded-full border text-[11px] font-mono font-bold transition-all duration-500 ease-in-out ${
                      isDesktopHovered || isMobileActive
                        ? "border-accent-connection/60 bg-accent-connection/15 text-accent-connection -rotate-8 scale-110 shadow-xs"
                        : "border-border/60 text-muted-foreground/70"
                    }`}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Cuerpo de la Card: Micro-línea + Titular + Texto Explicativo con grid row transition */}
                <div className="relative z-10 mt-auto pt-6 flex flex-col justify-end gap-3.5">
                  {/* Micro-línea reactiva con transición suave */}
                  <div
                    className={`h-[1.5px] w-full bg-accent-connection/60 origin-left transition-transform duration-500 ease-in-out ${
                      isDesktopHovered || isMobileActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-25 opacity-30 md:opacity-40"
                    }`}
                  />

                  {/* Titular */}
                  <h3 className="text-xl sm:text-2xl md:text-[22px] lg:text-[26px] font-bold text-foreground leading-snug tracking-tight">
                    {card.title}
                  </h3>

                  {/* Texto explicativo animado con CSS Grid rows (animación natural in/out sin saltos) */}
                  <div className={`tension-card-reveal ${isMobileActive ? "is-active" : ""}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1.5 pb-1">
                        {card.body}
                      </p>
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
