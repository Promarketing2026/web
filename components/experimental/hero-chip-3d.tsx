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

// PISTAS DE CONEXIÓN HOLOGRÁFICAS: SE EXTIENDEN HACIA LA IZQUIERDA PARA CONECTAR EL TEXTO DEL HERO
const hudTraces: ActiveTrace[] = [
  // --- HACES DE CONEXIÓN QUE INVADEN LA COLUMNA DE TEXTO (IZQUIERDA) ---
  // Pista Larga 1: Hacia el titular principal
  { id: "text-head-1", path: "M 460 270 L 360 210 L 220 210 L 140 140 L 40 140", endX: 40, endY: 140, isFilledVia: true, delay: 0.1, duration: 1.6 },
  // Pista Larga 2: Hacia la bajada de promesa
  { id: "text-head-2", path: "M 480 290 L 390 290 L 290 350 L 180 350 L 80 410 L 20 410", endX: 20, endY: 410, isFilledVia: true, delay: 0.45, duration: 1.8 },
  // Pista Larga 3: Hacia la categoría / pill superior
  { id: "text-pill", path: "M 520 220 L 460 140 L 320 140 L 240 60 L 120 60", endX: 120, endY: 60, isFilledVia: false, delay: 0.8, duration: 1.5 },
  // Pista Larga 4: Hacia los botones de acción (inferior izquierda)
  { id: "text-cta", path: "M 540 370 L 470 440 L 340 440 L 260 520 L 100 520", endX: 100, endY: 520, isFilledVia: true, delay: 0.3, duration: 1.7 },

  // --- CONEXIONES AL RADAR SATÉLITE SUPERIOR DERECHO ---
  { id: "sat-main", path: "M 620 230 L 680 170 L 760 170 L 820 120", endX: 820, endY: 120, isFilledVia: true, delay: 0.2, duration: 1.25 },
  { id: "sat-sub", path: "M 640 260 L 710 260 L 760 210 L 830 210", endX: 830, endY: 210, isFilledVia: false, delay: 0.7, duration: 1.35 },

  // --- CUADRANTES LOCALES DEL ISOTIPO ---
  { id: "tl-local", path: "M 500 240 L 440 180 L 370 180 L 320 130", endX: 320, endY: 130, isFilledVia: true, delay: 0.35, duration: 1.3 },
  { id: "tc-local", path: "M 560 200 L 560 120 L 590 80", endX: 590, endY: 80, isFilledVia: true, delay: 0.9, duration: 1.2 },
  { id: "br-local", path: "M 630 350 L 700 410 L 780 410 L 840 460", endX: 840, endY: 460, isFilledVia: true, delay: 0.5, duration: 1.4 },
  { id: "bc-local", path: "M 570 390 L 570 470 L 610 520 L 610 570", endX: 610, endY: 570, isFilledVia: false, delay: 0.6, duration: 1.35 },
  { id: "r-mid", path: "M 660 300 L 750 300 L 820 350 L 900 350", endX: 900, endY: 350, isFilledVia: true, delay: 0.15, duration: 1.5 },
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

    // 1. ROTACIÓN CONTINUA DE ANILLOS HOLOGRÁFICOS DEL ISOTIPO (Centro: 560, 300)
    if (outerHudRingRef.current) {
      gsap.to(outerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "560px 300px",
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    }

    if (midHudRingRef.current) {
      gsap.to(midHudRingRef.current, {
        rotation: -360,
        transformOrigin: "560px 300px",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }

    if (innerHudRingRef.current) {
      gsap.to(innerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "560px 300px",
        duration: 9,
        repeat: -1,
        ease: "none",
      });
    }

    // 2. ROTACIÓN DEL RADAR SATÉLITE SUPERIOR DERECHO (Centro: 830, 140)
    if (satOuterRingRef.current) {
      gsap.to(satOuterRingRef.current, {
        rotation: 360,
        transformOrigin: "830px 140px",
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }

    if (satInnerRingRef.current) {
      gsap.to(satInnerRingRef.current, {
        rotation: -360,
        transformOrigin: "830px 140px",
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

    // 4. ANIMACIÓN DE FLUJO LÁSER ENTRE HERO Y EL ISOTIPO
    hudTraces.forEach((trace, index) => {
      const glowPathEl = pathRefs.current[index];
      const corePathEl = corePathRefs.current[index];
      const viaEl = viaRefs.current[index];
      const shockwaveEl = shockwaveRefs.current[index];
      if (!glowPathEl || !corePathEl || !viaEl) return;

      const pathLength = glowPathEl.getTotalLength();
      const laserLength = 120;
      const coreLaserLength = 75;

      gsap.set(glowPathEl, {
        strokeDasharray: `${laserLength} ${pathLength + 50}`,
        strokeDashoffset: laserLength,
        opacity: 0,
      });

      gsap.set(corePathEl, {
        strokeDasharray: `${coreLaserLength} ${pathLength + 50}`,
        strokeDashoffset: coreLaserLength,
        opacity: 0,
      });

      gsap.set(viaEl, {
        opacity: trace.isFilledVia ? 0.6 : 0.3,
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
            opacity: trace.isFilledVia ? 0.6 : 0.3,
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
      className={`relative flex h-[480px] sm:h-[560px] lg:h-[640px] w-full max-w-full select-none items-center justify-center overflow-visible ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* 1. Resplandor Ambiental Global Esmeralda */}
      <div
        ref={coreGlowPulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-[380px] sm:size-[500px] lg:size-[620px] rounded-full blur-[130px] sm:blur-[170px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.24,
        }}
      />

      {/* 2. Escenario 3D Inclinado en el Eje X (Profundidad Isométrica HUD) */}
      <div
        className="relative flex h-full w-full max-w-[1020px] items-center justify-center origin-center transition-transform duration-700 hover:scale-[1.02]"
        style={{
          transformStyle: "preserve-3d",
          // Inclinación en el eje X para dar perspectiva volumétrica y conectar visualmente con el texto
          transform: "rotateX(36deg) rotateY(-18deg) rotateZ(6deg)",
        }}
      >
        <svg
          viewBox="0 0 1020 620"
          className="h-full w-full overflow-visible pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Trama Hexagonal (Honeycomb Grid) */}
            <pattern id={hexPatternId} width="32" height="55.425" patternUnits="userSpaceOnUse">
              <path
                d="M 32 0 L 16 9.237 L 0 0 L 0 18.475 L 16 27.712 L 32 18.475 Z M 0 27.712 L 16 36.95 L 32 27.712 L 32 46.187 L 16 55.425 L 0 46.187 Z"
                fill="none"
                stroke="var(--accent-connection)"
                strokeWidth="0.45"
                opacity="0.1"
              />
            </pattern>

            {/* Máscara de viñeteado radial suave hacia los márgenes exteriores */}
            <radialGradient id="hudVignette" cx="55%" cy="50%" r="58%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="70%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={maskId}>
              <rect width="1020" height="620" fill="url(#hudVignette)" />
            </mask>

            {/* Filtro Neón Holográfico Nítido */}
            <filter id="hudNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* FONDO: Trama Hexagonal integrada */}
          <rect width="1020" height="620" fill={`url(#${hexPatternId})`} mask={`url(#${maskId})`} />

          {/* =========================================================
              1. PISTAS PCB & GUÍAS DE CONEXIÓN QUE SE EXTIENDEN AL TEXTO
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
                    r="7.5"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                )}

                {trace.isFilledVia ? (
                  <>
                    <circle r="8.5" fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1" />
                    <circle r="6" fill={glowColor} opacity="0.4" />
                    <circle r="4" fill={glowColor} />
                    <circle r="1.8" fill="#FFFFFF" />
                  </>
                ) : (
                  <>
                    <circle r="5.8" fill="none" stroke={glowColor} strokeWidth="1.6" />
                    <circle r="1.8" fill="var(--background)" />
                  </>
                )}
              </g>
            ))}
          </g>

          {/* =========================================================
              2. RADAR SATÉLITE SUPERIOR DERECHO (Centro: 830, 140)
              ========================================================= */}
          <g transform="translate(830, 140)" filter="url(#hudNeonGlow)">
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
              3. NÚCLEO HOLOGRÁFICO CENTRAL CON EL ISOTIPO (Centro: 560, 300)
              ========================================================= */}
          <g transform="translate(560, 300)">
            <circle r="105" fill="var(--accent-connection)" opacity="0.14" filter="url(#hudNeonGlow)" />

            {/* Anillo HUD Exterior (Giratorio Horario) */}
            <g ref={outerHudRingRef}>
              <circle r="86" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="30 12 70 8 15 15" opacity="0.8" />
              <circle r="78" fill="none" stroke="#00F0FF" strokeWidth="0.9" strokeDasharray="6 6" opacity="0.6" />
            </g>

            {/* Anillo HUD Medio (Giratorio Antihorario) */}
            <g ref={midHudRingRef}>
              <circle r="68" fill="none" stroke="var(--accent-connection)" strokeWidth="2.2" strokeDasharray="60 20 30 15" opacity="0.9" />
              <circle r="54" fill="none" stroke="#00F0FF" strokeWidth="1.4" strokeDasharray="12 4 4 4" opacity="0.8" />
              <path d="M -54 0 A 54 54 0 0 1 0 -54" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.95" />
              <path d="M 54 0 A 54 54 0 0 1 0 54" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.95" />
            </g>

            {/* Anillo HUD Interior (Giratorio Horario Rápido) */}
            <g ref={innerHudRingRef}>
              <circle r="40" fill="none" stroke="var(--accent-connection)" strokeWidth="1.8" strokeDasharray="25 10 10 10" opacity="0.95" />
              <circle r="28" fill="none" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
            </g>

            {/* Marcadores de punto de mira central */}
            <circle r="16" fill="none" stroke="#00F0FF" strokeWidth="1.4" opacity="0.9" />
            <rect x="-6.5" y="-6.5" width="13" height="13" fill="#FFFFFF" opacity="1" filter="url(#hudNeonGlow)" />

            {/* =========================================================
                LOS 4 CORCHETES DEL ISOTIPO DE PROMARKETING (ENMARCANDO EL HUD)
                Dimensiones: Caja de 186x186px centrada
                ========================================================= */}
            <g filter="url(#hudNeonGlow)">
              <path
                d="M -93 -44 L -93 -93 L -44 -93 L -44 -70 L -70 -70 L -70 -44 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 26px #00F0FF)" }}
              />

              <path
                d="M 44 -93 L 93 -93 L 93 -44 L 70 -44 L 70 -70 L 44 -70 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 26px #00F0FF)" }}
              />

              <path
                d="M 93 44 L 93 93 L 44 93 L 44 70 L 70 70 L 70 44 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 26px #00F0FF)" }}
              />

              <path
                d="M -44 93 L -93 93 L -93 44 L -70 44 L -70 70 L -44 70 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 10px var(--accent-connection)) drop-shadow(0 0 26px #00F0FF)" }}
              />
            </g>
          </g>

          {/* =========================================================
              4. BALIZAS Y MICRO-NODOS DE DATOS CONECTANDO LA COLUMNA IZQUIERDA
              ========================================================= */}
          {/* Nodo Izquierdo Superior (40, 140) */}
          <g transform="translate(40, 140)" filter="url(#hudNeonGlow)">
            <circle r="12" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="8 4" opacity="0.85" />
            <circle r="5.5" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="2.8" fill="#FFFFFF" />
            <text x="-4" y="-16" fill="var(--accent-connection)" fontSize="6.5" fontFamily="monospace" opacity="0.8">CAPACIDADES</text>
          </g>

          {/* Nodo Izquierdo Medio (20, 410) */}
          <g transform="translate(20, 410)" filter="url(#hudNeonGlow)">
            <circle r="10" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" opacity="0.8" />
            <circle r="5" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="2.5" fill="#FFFFFF" />
            <path d="M -12 12 L 0 4 L 12 12 M 0 4 L 0 -4" fill="none" stroke="#00F0FF" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Nodo Inferior Izquierdo (100, 520) */}
          <g transform="translate(100, 520)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="12 4" opacity="0.85" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="3" fill="#FFFFFF" />
            <text x="18" y="3" fill="#00F0FF" fontSize="6.5" fontFamily="monospace" opacity="0.75">ACTION_NODE</text>
          </g>

          {/* Nodo Lateral Derecho (900, 350) */}
          <g transform="translate(900, 350)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.85" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="3" fill="#FFFFFF" />
            <text x="18" y="3" fill="#00F0FF" fontSize="6.5" fontFamily="monospace" opacity="0.75">DATA_BUS</text>
          </g>

          {/* Micro-partículas flotantes (Constelaciones de datos interconectadas) */}
          <g fill="var(--accent-connection)" opacity="0.45" filter="url(#hudNeonGlow)">
            <circle cx="80" cy="180" r="1.5" />
            <circle cx="160" cy="240" r="1" />
            <circle cx="280" cy="110" r="1.8" />
            <circle cx="360" cy="70" r="1.2" />
            <circle cx="680" cy="80" r="1.5" />
            <circle cx="760" cy="100" r="1" />
            <circle cx="890" cy="240" r="1.6" />
            <circle cx="940" cy="290" r="1.2" />
            <circle cx="860" cy="480" r="1.5" />
            <circle cx="750" cy="520" r="1.2" />
            <circle cx="340" cy="460" r="1.6" />
            <circle cx="190" cy="380" r="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
