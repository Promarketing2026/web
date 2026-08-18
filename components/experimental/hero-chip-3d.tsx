"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

interface ActiveTrace {
  id: string;
  path: string;
  endX: number;
  endY: number;
  isFilledVia: boolean;
  delay: number;
  duration: number;
}

// PISTAS DE CONEXIÓN HOLOGRÁFICAS CON RUTEO A 45°
const hudTraces: ActiveTrace[] = [
  // Conexión principal hacia el Radar Satélite Superior Derecho
  { id: "sat-main", path: "M 440 220 L 490 170 L 560 170 L 610 130", endX: 610, endY: 130, isFilledVia: true, delay: 0.1, duration: 1.2 },
  { id: "sat-sub", path: "M 450 250 L 510 250 L 550 210 L 600 210", endX: 600, endY: 210, isFilledVia: false, delay: 0.6, duration: 1.35 },

  // Cuadrante Superior Izquierdo
  { id: "tl1", path: "M 320 220 L 270 170 L 190 170 L 140 120", endX: 140, endY: 120, isFilledVia: true, delay: 0.2, duration: 1.45 },
  { id: "tl2", path: "M 340 195 L 300 135 L 240 135 L 190 85", endX: 190, endY: 85, isFilledVia: false, delay: 0.75, duration: 1.3 },
  { id: "tl3", path: "M 365 180 L 340 115 L 290 65", endX: 290, endY: 65, isFilledVia: true, delay: 0.35, duration: 1.35 },

  // Superior Central
  { id: "tc1", path: "M 390 170 L 390 100 L 420 70 L 420 30", endX: 420, endY: 30, isFilledVia: true, delay: 0.85, duration: 1.25 },

  // Lateral Izquierdo
  { id: "l-mid", path: "M 290 280 L 200 280 L 150 245 L 90 245", endX: 90, endY: 245, isFilledVia: true, delay: 0.15, duration: 1.4 },
  { id: "l-low", path: "M 300 320 L 220 370 L 140 370 L 90 410", endX: 90, endY: 410, isFilledVia: false, delay: 0.65, duration: 1.45 },

  // Inferior Izquierdo
  { id: "bl1", path: "M 330 360 L 290 420 L 220 470 L 150 470", endX: 150, endY: 470, isFilledVia: true, delay: 0.4, duration: 1.35 },
  { id: "bl2", path: "M 360 380 L 340 450 L 280 510 L 280 560", endX: 280, endY: 560, isFilledVia: true, delay: 0.9, duration: 1.3 },

  // Inferior Central
  { id: "bc1", path: "M 400 385 L 400 465 L 430 505 L 430 560", endX: 430, endY: 560, isFilledVia: true, delay: 0.3, duration: 1.35 },

  // Lateral / Inferior Derecho
  { id: "r-mid", path: "M 470 300 L 550 300 L 610 350 L 680 350", endX: 680, endY: 350, isFilledVia: true, delay: 0.25, duration: 1.45 },
  { id: "br1", path: "M 450 340 L 510 390 L 570 390 L 630 440", endX: 630, endY: 440, isFilledVia: false, delay: 0.8, duration: 1.35 },
  { id: "br2", path: "M 430 370 L 470 430 L 530 480 L 580 480", endX: 580, endY: 480, isFilledVia: true, delay: 0.5, duration: 1.4 },
];

export function HeroChip3D({
  className = "",
  glowColor = "var(--accent-connection)",
}: {
  className?: string;
  glowColor?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const maskId = useId();
  const hexPatternId = useId();

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const corePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const viaRefs = useRef<(SVGGElement | null)[]>([]);
  const shockwaveRefs = useRef<(SVGCircleElement | null)[]>([]);

  const outerHudRingRef = useRef<SVGGElement>(null);
  const midHudRingRef = useRef<SVGGElement>(null);
  const innerHudRingRef = useRef<SVGGElement>(null);
  const satOuterRingRef = useRef<SVGGElement>(null);
  const satInnerRingRef = useRef<SVGGElement>(null);
  const coreGlowPulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const masterTl = gsap.timeline({ repeat: -1 });

    // 1. ROTACIÓN CONTINUA DE ANILLOS HOLOGRÁFICOS DEL ISOTIPO (Centro: 380, 280)
    if (outerHudRingRef.current) {
      gsap.to(outerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "380px 280px",
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    }

    if (midHudRingRef.current) {
      gsap.to(midHudRingRef.current, {
        rotation: -360,
        transformOrigin: "380px 280px",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }

    if (innerHudRingRef.current) {
      gsap.to(innerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "380px 280px",
        duration: 9,
        repeat: -1,
        ease: "none",
      });
    }

    // 2. ROTACIÓN DEL RADAR SATÉLITE SUPERIOR DERECHO (Centro: 630, 140)
    if (satOuterRingRef.current) {
      gsap.to(satOuterRingRef.current, {
        rotation: 360,
        transformOrigin: "630px 140px",
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }

    if (satInnerRingRef.current) {
      gsap.to(satInnerRingRef.current, {
        rotation: -360,
        transformOrigin: "630px 140px",
        duration: 11,
        repeat: -1,
        ease: "none",
      });
    }

    // 3. RESPIRACIÓN DEL NÚCLEO HOLOGRÁFICO
    if (coreGlowPulseRef.current) {
      gsap.to(coreGlowPulseRef.current, {
        scale: 1.15,
        opacity: 0.35,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // 4. ANIMACIÓN DE CONEXIONES LÁSER
    hudTraces.forEach((trace, index) => {
      const glowPathEl = pathRefs.current[index];
      const corePathEl = corePathRefs.current[index];
      const viaEl = viaRefs.current[index];
      const shockwaveEl = shockwaveRefs.current[index];
      if (!glowPathEl || !corePathEl || !viaEl) return;

      const pathLength = glowPathEl.getTotalLength();
      const laserLength = 110;
      const coreLaserLength = 70;

      gsap.set(glowPathEl, {
        strokeDasharray: `${laserLength} ${pathLength + 40}`,
        strokeDashoffset: laserLength,
        opacity: 0,
      });

      gsap.set(corePathEl, {
        strokeDasharray: `${coreLaserLength} ${pathLength + 40}`,
        strokeDashoffset: coreLaserLength,
        opacity: 0,
      });

      gsap.set(viaEl, {
        opacity: trace.isFilledVia ? 0.55 : 0.3,
        scale: 1,
        transformOrigin: "center",
      });

      if (shockwaveEl) {
        gsap.set(shockwaveEl, { scale: 0.3, opacity: 0, transformOrigin: "center" });
      }

      const lineTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4 + (index % 4) * 0.25,
        delay: trace.delay,
      });

      lineTl
        .fromTo(
          glowPathEl,
          { strokeDashoffset: laserLength, opacity: 0.6 },
          {
            strokeDashoffset: -pathLength,
            opacity: 1,
            duration: trace.duration,
            ease: "power1.inOut",
          },
          0
        )
        .fromTo(
          corePathEl,
          { strokeDashoffset: coreLaserLength, opacity: 0.95 },
          {
            strokeDashoffset: -pathLength,
            opacity: 1,
            duration: trace.duration,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          viaEl,
          {
            opacity: 1,
            scale: trace.isFilledVia ? 1.75 : 1.4,
            duration: 0.2,
            ease: "back.out(2.5)",
          },
          `-=${trace.duration * 0.18}`
        );

      if (shockwaveEl && trace.isFilledVia) {
        lineTl.fromTo(
          shockwaveEl,
          { scale: 0.5, opacity: 0.95 },
          {
            scale: 2.8,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          `-=${trace.duration * 0.16}`
        );
      }

      lineTl
        .to(
          viaEl,
          {
            opacity: trace.isFilledVia ? 0.55 : 0.3,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .set([glowPathEl, corePathEl], { opacity: 0 });

      masterTl.add(lineTl, 0);
    });

    return () => {
      masterTl.kill();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-label="Prototipo Holográfico HUD de Metodología Promarketing"
      className={`relative flex h-[480px] sm:h-[560px] lg:h-[620px] w-full max-w-full select-none items-center justify-center overflow-visible ${className}`}
    >
      {/* 1. Resplandor Ambiental Global Esmeralda que se funde en la página */}
      <div
        ref={coreGlowPulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-[360px] sm:size-[460px] lg:size-[560px] rounded-full blur-[120px] sm:blur-[160px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.22,
        }}
      />

      {/* 2. Escenario SVG Holográfico Abierto */}
      <div className="relative flex h-full w-full max-w-[860px] items-center justify-center">
        <svg
          viewBox="0 0 800 580"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Trama Hexagonal (Honeycomb Grid) */}
            <pattern id={hexPatternId} width="28" height="48.497" patternUnits="userSpaceOnUse">
              <path
                d="M 28 0 L 14 8.083 L 0 0 L 0 16.166 L 14 24.249 L 28 16.166 Z M 0 24.249 L 14 32.332 L 28 24.249 L 28 40.415 L 14 48.498 L 0 40.415 Z"
                fill="none"
                stroke="var(--accent-connection)"
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>

            {/* Máscara de viñeteado radial suave hacia la transparencia total */}
            <radialGradient id="hudVignette" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={maskId}>
              <rect width="800" height="580" fill="url(#hudVignette)" />
            </mask>

            {/* Filtro Neón Nítido */}
            <filter id="hudNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* FONDO: Trama Hexagonal que se difumina naturalmente en el fondo negro */}
          <rect width="800" height="580" fill={`url(#${hexPatternId})`} mask={`url(#${maskId})`} />

          {/* =========================================================
              1. PISTAS PCB & GUÍAS DE CONEXIÓN
              ========================================================= */}
          <g mask={`url(#${maskId})`} fill="none" stroke="currentColor" className="text-accent-connection/25" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {hudTraces.map((trace) => (
              <path key={`guide-${trace.id}`} d={trace.path} />
            ))}
          </g>

          {/* Corona Láser de Plasma */}
          <g fill="none" stroke={glowColor} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#hudNeonGlow)">
            {hudTraces.map((trace, i) => (
              <path
                key={`laser-glow-${trace.id}`}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={trace.path}
                style={{
                  filter: "drop-shadow(0 0 6px var(--accent-connection)) drop-shadow(0 0 16px #00F0FF)",
                }}
              />
            ))}
          </g>

          {/* Núcleo Blanco Incandescente */}
          <g fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {hudTraces.map((trace, i) => (
              <path
                key={`laser-core-${trace.id}`}
                ref={(el) => {
                  corePathRefs.current[i] = el;
                }}
                d={trace.path}
                style={{
                  filter: "drop-shadow(0 0 4px #FFFFFF)",
                }}
              />
            ))}
          </g>

          {/* Nodos Terminales & Shockwaves */}
          <g filter="url(#hudNeonGlow)">
            {hudTraces.map((trace, i) => (
              <g
                key={`via-${trace.id}`}
                ref={(el) => {
                  viaRefs.current[i] = el;
                }}
                transform={`translate(${trace.endX}, ${trace.endY})`}
              >
                {trace.isFilledVia && (
                  <circle
                    ref={(el) => {
                      shockwaveRefs.current[i] = el;
                    }}
                    r="7"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                )}

                {trace.isFilledVia ? (
                  <>
                    <circle r="8" fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1" />
                    <circle r="5.5" fill={glowColor} opacity="0.4" />
                    <circle r="3.8" fill={glowColor} />
                    <circle r="1.8" fill="#FFFFFF" />
                  </>
                ) : (
                  <>
                    <circle r="5.5" fill="none" stroke={glowColor} strokeWidth="1.6" />
                    <circle r="1.8" fill="var(--background)" />
                  </>
                )}
              </g>
            ))}
          </g>

          {/* =========================================================
              2. RADAR SATÉLITE SUPERIOR DERECHO (Centro: 630, 140)
              ========================================================= */}
          <g transform="translate(630, 140)" filter="url(#hudNeonGlow)">
            {/* Halo difuso */}
            <circle r="55" fill="var(--accent-connection)" opacity="0.08" />

            {/* Anillo exterior satélite (giratorio horario) */}
            <g ref={satOuterRingRef}>
              <circle r="48" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="18 8 36 6 8 8" opacity="0.8" />
              <circle r="42" fill="none" stroke="#00F0FF" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.6" />
            </g>

            {/* Anillo interior satélite (giratorio antihorario) */}
            <g ref={satInnerRingRef}>
              <circle r="30" fill="none" stroke="var(--accent-connection)" strokeWidth="2" strokeDasharray="40 15 15 10" opacity="0.9" />
              <circle r="20" fill="none" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.7" />
              <circle r="10" fill="none" stroke="#FFFFFF" strokeWidth="1.4" />
              <circle r="4" fill="#FFFFFF" />
            </g>

            {/* Marcadores cardinales */}
            <line x1="-54" y1="0" x2="-44" y2="0" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="44" y1="0" x2="54" y2="0" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="0" y1="-54" x2="0" y2="-44" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="0" y1="44" x2="0" y2="54" stroke="var(--accent-connection)" strokeWidth="1.5" />

            {/* Micro-telemetría */}
            <text x="56" y="-12" fill="var(--accent-connection)" fontSize="7" fontFamily="monospace" opacity="0.8">SYS_RADAR.01</text>
            <text x="56" y="-2" fill="#00F0FF" fontSize="6" fontFamily="monospace" opacity="0.65">SYNC: 99.8%</text>
          </g>

          {/* =========================================================
              3. NÚCLEO HOLOGRÁFICO CENTRAL CON EL ISOTIPO (Centro: 380, 280)
              ========================================================= */}
          <g transform="translate(380, 280)">
            {/* Halo de luz central */}
            <circle r="95" fill="var(--accent-connection)" opacity="0.14" filter="url(#hudNeonGlow)" />

            {/* Anillo HUD Exterior (Giratorio Horario) */}
            <g ref={outerHudRingRef}>
              <circle r="78" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="30 12 70 8 15 15" opacity="0.8" />
              <circle r="70" fill="none" stroke="#00F0FF" strokeWidth="0.9" strokeDasharray="6 6" opacity="0.6" />
            </g>

            {/* Anillo HUD Medio (Giratorio Antihorario) */}
            <g ref={midHudRingRef}>
              <circle r="60" fill="none" stroke="var(--accent-connection)" strokeWidth="2.2" strokeDasharray="60 20 30 15" opacity="0.9" />
              <circle r="48" fill="none" stroke="#00F0FF" strokeWidth="1.4" strokeDasharray="12 4 4 4" opacity="0.8" />
              {/* Arcos de mira */}
              <path d="M -48 0 A 48 48 0 0 1 0 -48" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.95" />
              <path d="M 48 0 A 48 48 0 0 1 0 48" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.95" />
            </g>

            {/* Anillo HUD Interior (Giratorio Horario Rápido) */}
            <g ref={innerHudRingRef}>
              <circle r="36" fill="none" stroke="var(--accent-connection)" strokeWidth="1.8" strokeDasharray="25 10 10 10" opacity="0.95" />
              <circle r="26" fill="none" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
            </g>

            {/* Marcadores de punto de mira central */}
            <circle r="15" fill="none" stroke="#00F0FF" strokeWidth="1.4" opacity="0.9" />
            <rect x="-6" y="-6" width="12" height="12" fill="#FFFFFF" opacity="1" filter="url(#hudNeonGlow)" />

            {/* =========================================================
                LOS 4 CORCHETES DEL ISOTIPO DE PROMARKETING (ENMARCANDO EL HUD)
                Dimensiones: Caja de 170x170px centrada
                ========================================================= */}
            <g filter="url(#hudNeonGlow)">
              {/* Corchete Superior Izquierdo */}
              <path
                d="M -85 -40 L -85 -85 L -40 -85 L -40 -64 L -64 -64 L -64 -40 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 24px #00F0FF)" }}
              />

              {/* Corchete Superior Derecho */}
              <path
                d="M 40 -85 L 85 -85 L 85 -40 L 64 -40 L 64 -64 L 40 -64 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 24px #00F0FF)" }}
              />

              {/* Corchete Inferior Derecho */}
              <path
                d="M 85 40 L 85 85 L 40 85 L 40 64 L 64 64 L 64 40 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 24px #00F0FF)" }}
              />

              {/* Corchete Inferior Izquierdo */}
              <path
                d="M -40 85 L -85 85 L -85 40 L -64 40 L -64 64 L -40 64 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 24px #00F0FF)" }}
              />
            </g>
          </g>

          {/* =========================================================
              4. BALIZAS Y MICRO-NODOS DE DATOS PERIFÉRICOS
              ========================================================= */}
          {/* Nodo Izquierdo (90, 245) */}
          <g transform="translate(90, 245)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="8 4" opacity="0.85" />
            <circle r="7" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="3.5" fill="#FFFFFF" />
            <text x="-35" y="-18" fill="var(--accent-connection)" fontSize="6.5" fontFamily="monospace" opacity="0.8">NODE_01</text>
          </g>

          {/* Nodo Inferior Izquierdo (150, 470) */}
          <g transform="translate(150, 470)" filter="url(#hudNeonGlow)">
            <circle r="12" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" opacity="0.8" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="3" fill="#FFFFFF" />
            <path d="M -15 15 L 0 5 L 15 15 M 0 5 L 0 -5" fill="none" stroke="#00F0FF" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Nodo Inferior Central (430, 560) */}
          <g transform="translate(430, 560)" filter="url(#hudNeonGlow)">
            <circle r="15" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="12 4" opacity="0.85" />
            <circle r="7" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="3.5" fill="#FFFFFF" />
          </g>

          {/* Nodo Lateral Derecho (680, 350) */}
          <g transform="translate(680, 350)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.85" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="3" fill="#FFFFFF" />
            <text x="20" y="3" fill="#00F0FF" fontSize="6.5" fontFamily="monospace" opacity="0.75">DATA_BUS</text>
          </g>

          {/* Micro-partículas flotantes (Constelaciones de datos) */}
          <g fill="var(--accent-connection)" opacity="0.45" filter="url(#hudNeonGlow)">
            <circle cx="120" cy="160" r="1.5" />
            <circle cx="160" cy="200" r="1" />
            <circle cx="240" cy="100" r="1.8" />
            <circle cx="310" cy="60" r="1.2" />
            <circle cx="480" cy="70" r="1.5" />
            <circle cx="550" cy="90" r="1" />
            <circle cx="700" cy="240" r="1.6" />
            <circle cx="730" cy="280" r="1.2" />
            <circle cx="650" cy="460" r="1.5" />
            <circle cx="550" cy="500" r="1.2" />
            <circle cx="250" cy="440" r="1.6" />
            <circle cx="130" cy="330" r="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
