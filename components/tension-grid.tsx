"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { Split, Unplug, TrendingDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Gráfico 01: Identidad — Esfera de órbitas divergentes con stroke animado continuo */
function WireframeSphere({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="1.2" opacity="0.6" className="animate-stroke-sphere" />
      <ellipse cx="80" cy="80" rx="70" ry="36" stroke="currentColor" strokeWidth="1" opacity="0.45" transform="rotate(-28 80 80)" className="animate-stroke-sphere" />
      <ellipse cx="80" cy="80" rx="70" ry="16" stroke="currentColor" strokeWidth="0.8" opacity="0.35" transform="rotate(-28 80 80)" />
      <ellipse cx="80" cy="80" rx="36" ry="70" stroke="currentColor" strokeWidth="1" opacity="0.45" transform="rotate(22 80 80)" className="animate-stroke-sphere" />
      <ellipse cx="80" cy="80" rx="16" ry="70" stroke="currentColor" strokeWidth="0.8" opacity="0.35" transform="rotate(22 80 80)" />
      <line x1="10" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.4" transform="rotate(-28 80 80)" />
      <line x1="80" y1="10" x2="80" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" transform="rotate(22 80 80)" />
    </svg>
  );
}

/* Gráfico 02: Tecnología — Tesseract / hipercubo isométrico con stroke animado desfasado */
function WireframeMatrix({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <polygon points="80,18 138,52 138,118 80,152 22,118 22,52" stroke="currentColor" strokeWidth="1.2" opacity="0.6" className="animate-stroke-matrix" />
      <line x1="80" y1="18" x2="80" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="22" y1="52" x2="80" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="138" y1="52" x2="80" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <polygon points="80,48 110,65 110,98 80,115 50,98 50,65" stroke="currentColor" strokeWidth="1" opacity="0.75" className="animate-stroke-matrix" />
      <line x1="80" y1="48" x2="80" y2="82" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
      <line x1="50" y1="65" x2="80" y2="82" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
      <line x1="110" y1="65" x2="80" y2="82" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
      <line x1="80" y1="18" x2="80" y2="48" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="138" y1="52" x2="110" y2="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="138" y1="118" x2="110" y2="98" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="80" y1="152" x2="80" y2="115" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="22" y1="118" x2="50" y2="98" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="22" y1="52" x2="50" y2="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

/* Gráfico 03: Precio y Posicionamiento — Vórtice cónico con stroke animado desfasado */
function WireframeVortex({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="80" cy="30" rx="68" ry="18" stroke="currentColor" strokeWidth="1.2" opacity="0.6" className="animate-stroke-vortex" />
      <ellipse cx="80" cy="56" rx="54" ry="14" stroke="currentColor" strokeWidth="1.1" opacity="0.55" className="animate-stroke-vortex" />
      <ellipse cx="80" cy="82" rx="40" ry="11" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <ellipse cx="80" cy="106" rx="28" ry="8" stroke="currentColor" strokeWidth="0.9" opacity="0.45" className="animate-stroke-vortex" />
      <ellipse cx="80" cy="126" rx="16" ry="5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <ellipse cx="80" cy="142" rx="6" ry="2.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <line x1="12" y1="30" x2="74" y2="142" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <line x1="148" y1="30" x2="86" y2="142" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <line x1="45" y1="44" x2="77" y2="142" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3" />
      <line x1="115" y1="44" x2="83" y2="142" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3" />
      <line x1="80" y1="12" x2="80" y2="142" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
    </svg>
  );
}

const tensionCards = [
  {
    category: "Identidad",
    icon: Split,
    wireframe: WireframeSphere,
    themeClass: "tension-card-amber",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/15",
    accentLine: "bg-amber-400/60",
    wireframeColor: "text-amber-400/70",
    title: "Lo que anuncias no es lo que tu equipo dice, ni lo que el cliente recibe.",
    body: "El anuncio promete una cosa, el vendedor explica otra, y el servicio entrega algo distinto. El cliente no se siente engañado — solo confundido. Y la confusión no cierra ventas.",
  },
  {
    category: "Tecnología",
    icon: Unplug,
    wireframe: WireframeMatrix,
    themeClass: "tension-card-cyan",
    accentText: "text-sky-400",
    accentBorder: "border-sky-500/40",
    accentBg: "bg-sky-500/15",
    accentLine: "bg-sky-400/60",
    wireframeColor: "text-sky-400/70",
    title: "Pagas por herramientas que ni siquiera se hablan entre sí.",
    body: "CRM, WhatsApp, hojas de cálculo, un dashboard más. Cada una prometía ordenar algo, pero hoy nadie sabe cuál tiene el dato correcto — y sigues pagando las licencias de todas.",
  },
  {
    category: "Precio y posicionamiento",
    icon: TrendingDown,
    wireframe: WireframeVortex,
    themeClass: "tension-card-emerald",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/40",
    accentBg: "bg-emerald-500/15",
    accentLine: "bg-emerald-400/60",
    wireframeColor: "text-emerald-400/70",
    title: "Terminas compitiendo solo por precio.",
    body: "Cuando tu marca no logra explicar por qué vale lo que cuesta, la única palanca que te queda es bajarlo. Y ahí, tarde o temprano, pierdes.",
  },
];

export function TensionGrid() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  // Estado para desktop: Inicia en null (todas las tarjetas colapsadas en desktop al cargar)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Estado para mobile: La primera card (0) inicia desplegada por defecto en móvil
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Detección reactiva de viewport móvil para desacoplar comportamiento desktop vs mobile
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkViewport = () => {
      setIsMobileViewport(window.matchMedia("(max-width: 767px)").matches);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

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

    if (isMobileViewport) {
      setActiveMobileIndex((prev) => (prev === idx ? -1 : idx));
    } else {
      setHoveredIndex((prev) => (prev === idx ? null : idx));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(idx);
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

        {/* Grid de 3 Auras Atmosféricas (Ámbar, Cyan, Esmeralda) con Efecto Rim-Light */}
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
            const Wireframe = card.wireframe;
            const isDesktopActive = !isMobileViewport && hoveredIndex === idx;
            const isMobileActive = isMobileViewport && activeMobileIndex === idx;
            const isExpanded = isDesktopActive || isMobileActive;

            return (
              <article
                key={card.category}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-card={idx}
                data-index={idx}
                tabIndex={0}
                aria-label={`Síntoma de ${card.category}: ${card.title}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onFocus={() => setHoveredIndex(idx)}
                onClick={() => handleCardClick(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`tension-card ${card.themeClass} group relative flex flex-col justify-start overflow-hidden rounded-3xl border p-5 sm:p-7 backdrop-blur-xl cursor-pointer select-none transition-all duration-500 ease-in-out min-w-0 ${
                  isDesktopActive ? "is-active md:-translate-y-1" : ""
                } ${isMobileActive ? "is-active" : ""}`}
              >
                {/* 1. Encabezado Superior: Ícono Conceptual con acento temático + Categoría vs Trigger */}
                <div className="relative z-10 flex items-center justify-between gap-2 border-b border-border/40 pb-4 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                    <span
                      className={`flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? `${card.accentBorder} ${card.accentBg} ${card.accentText} shadow-sm scale-105`
                          : "border-border/70 bg-secondary/80 text-foreground group-hover:border-border/90"
                      }`}
                    >
                      <Icon className="size-5 sm:size-5.5" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-foreground truncate min-w-0">
                      {card.category}
                    </span>
                  </div>

                  {/* Trigger de Interacción con acento cromático */}
                  <div className="inline-flex items-center gap-1.5 shrink-0">
                    <span
                      className={`hidden xl:inline text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                        isExpanded ? card.accentText : "text-muted-foreground/70 group-hover:text-foreground"
                      }`}
                    >
                      {isExpanded ? "Activo" : "Abrir"}
                    </span>
                    <span
                      className={`flex size-7.5 sm:size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? `${card.accentBorder} ${card.accentBg} ${card.accentText} rotate-180 shadow-xs`
                          : "border-border/70 bg-secondary/70 text-muted-foreground group-hover:border-border/90 group-hover:text-foreground group-hover:scale-105"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="size-4 transition-transform duration-300" />
                    </span>
                  </div>
                </div>

                {/* 2. Titular Principal */}
                <h3
                  className={`relative z-10 font-bold text-foreground leading-[1.2] tracking-tight pt-3.5 sm:pt-4 transition-all duration-300 ${
                    isExpanded
                      ? "text-xl sm:text-2xl lg:text-[26px]"
                      : "text-base sm:text-lg md:text-base lg:text-lg md:line-clamp-3"
                  }`}
                >
                  {card.title}
                </h3>

                {/* 3. Contenedor Desplegable con Efecto Temático */}
                <div className={`relative z-10 tension-card-expandable ${isExpanded ? "is-expanded" : ""}`}>
                  <div className="overflow-hidden">
                    {/* Micro-línea divisoria con color de acento de la tarjeta */}
                    <div className={`h-[1.5px] w-full ${card.accentLine} my-4 origin-left`} />

                    {/* Bajada Descriptiva */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4">
                      {card.body}
                    </p>

                    {/* Bloque Inferior: CTA + Texto Limpio y Gráfico Alámbrico con Color de Tema */}
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 pt-3 border-t border-border/40 min-w-0">
                      {/* Acciones e Información */}
                      <div className="flex flex-col items-start gap-3 max-w-sm min-w-0">
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

                        <p className="text-xs sm:text-[13px] text-muted-foreground/85 leading-relaxed">
                          <strong className="text-foreground font-semibold">Ninguna de las tres es el problema real.</strong> Las tres son el mismo problema visto desde ángulos distintos: partes que no están conectadas.
                        </p>
                      </div>

                      {/* Gráfico Alámbrico Conceptual con Stroke Asíncrono en Color de Tema */}
                      <div className={`hidden sm:flex size-20 md:size-24 lg:size-28 xl:size-32 shrink-0 items-center justify-center ${card.wireframeColor}`}>
                        <Wireframe className="size-full" />
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
            Pasa el cursor sobre cualquier tarjeta para desplegar el diagnóstico
          </span>
          <span className="md:hidden">
            Toca cualquier tarjeta para desplegar el diagnóstico
          </span>
        </div>
      </div>
    </section>
  );
}
