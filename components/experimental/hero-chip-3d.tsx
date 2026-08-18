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
  // Conexión principal al Satélite Superior Derecho
  { id: "sat-main", path: "M 480 230 L 530 200 L 610 200 L 660 170", endX: 660, endY: 170, isFilledVia: true, delay: 0.1, duration: 1.2 },
  { id: "sat-sub", path: "M 480 260 L 540 260 L 590 220 L 650 220", endX: 650, endY: 220, isFilledVia: false, delay: 0.6, duration: 1.4 },

  // Cuadrante Superior Izquierdo
  { id: "tl1", path: "M 340 230 L 290 190 L 220 190 L 170 140", endX: 170, endY: 140, isFilledVia: true, delay: 0.2, duration: 1.5 },
  { id: "tl2", path: "M 360 210 L 320 150 L 260 150 L 210 100", endX: 210, endY: 100, isFilledVia: false, delay: 0.75, duration: 1.35 },
  { id: "tl3", path: "M 380 200 L 360 130 L 320 90 L 320 50", endX: 320, endY: 50, isFilledVia: true, delay: 0.35, duration: 1.4 },

  // Superior Central
  { id: "tc1", path: "M 410 190 L 410 120 L 440 90 L 440 50", endX: 440, endY: 50, isFilledVia: true, delay: 0.85, duration: 1.3 },

  // Lateral Izquierdo (Baliza Media)
  { id: "l-mid", path: "M 330 290 L 240 290 L 190 260 L 130 260", endX: 130, endY: 260, isFilledVia: true, delay: 0.15, duration: 1.45 },
  { id: "l-low", path: "M 340 330 L 260 380 L 180 380 L 130 420", endX: 130, endY: 420, isFilledVia: false, delay: 0.65, duration: 1.5 },

  // Inferior Izquierdo
  { id: "bl1", path: "M 370 370 L 330 430 L 260 480 L 200 480", endX: 200, endY: 480, isFilledVia: true, delay: 0.4, duration: 1.4 },
  { id: "bl2", path: "M 390 380 L 370 450 L 320 500 L 320 550", endX: 320, endY: 550, isFilledVia: true, delay: 0.9, duration: 1.35 },

  // Inferior Central
  { id: "bc1", path: "M 420 380 L 420 460 L 450 500 L 450 550", endX: 450, endY: 550, isFilledVia: true, delay: 0.3, duration: 1.4 },

  // Lateral / Inferior Derecho
  { id: "r-mid", path: "M 480 300 L 560 300 L 630 350 L 710 350", endX: 710, endY: 350, isFilledVia: true, delay: 0.25, duration: 1.5 },
  { id: "br1", path: "M 470 340 L 530 390 L 600 390 L 660 440", endX: 660, endY: 440, isFilledVia: false, delay: 0.8, duration: 1.4 },
  { id: "br2", path: "M 460 370 L 500 430 L 570 480 L 620 480", endX: 620, endY: 480, isFilledVia: true, delay: 0.5, duration: 1.45 },
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

    // 1. ROTACIÓN CONTINUA DE ANILLOS HOLOGRÁFICOS DEL ISOTIPO
    if (outerHudRingRef.current) {
      gsap.to(outerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "410px 290px",
        duration: 22,
        repeat: -1,
        ease: "none",
      });
    }

    if (midHudRingRef.current) {
      gsap.to(midHudRingRef.current, {
        rotation: -360,
        transformOrigin: "410px 290px",
        duration: 14,
        repeat: -1,
        ease: "none",
      });
    }

    if (innerHudRingRef.current) {
      gsap.to(innerHudRingRef.current, {
        rotation: 360,
        transformOrigin: "410px 290px",
        duration: 9,
        repeat: -1,
        ease: "none",
      });
    }

    // 2. ROTACIÓN DEL RADAR SATÉLITE SUPERIOR DERECHO
    if (satOuterRingRef.current) {
      gsap.to(satOuterRingRef.current, {
        rotation: 360,
        transformOrigin: "670px 160px",
        duration: 16,
        repeat: -1,
        ease: "none",
      });
    }

    if (satInnerRingRef.current) {
      gsap.to(satInnerRingRef.current, {
        rotation: -360,
        transformOrigin: "670px 160px",
        duration: 10,
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

    // 4. ANIMACIÓN DE FLUJO LÁSER Y TELEMETRÍA DE DATOS
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
        opacity: trace.isFilledVia ? 0.5 : 0.3,
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
            scale: trace.isFilledVia ? 1.7 : 1.4,
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
            duration: 0.5,
            ease: "power2.out",
          },
          `-=${trace.duration * 0.16}`
        );
      }

      lineTl
        .to(
          viaEl,
          {
            opacity: trace.isFilledVia ? 0.5 : 0.3,
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
      className={`relative flex h-[480px] sm:h-[560px] lg:h-[620px] w-full max-w-full select-none items-center justify-center overflow-hidden ${className}`}
    >
      {/* 1. Resplandor Ambiental Global Esmeralda */}
      <div
        ref={coreGlowPulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-[380px] sm:size-[480px] lg:size-[560px] rounded-full blur-[120px] sm:blur-[160px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.26,
        }}
      />

      {/* 2. Escenario SVG Holográfico Completo */}
      <div className="relative flex h-full w-full max-w-[860px] items-center justify-center">
        <svg
          viewBox="0 0 860 600"
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
                opacity="0.08"
              />
            </pattern>

            {/* Máscara de viñeteado radial */}
            <radialGradient id="hudVignette" cx="50%" cy="50%" r="58%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={maskId}>
              <rect width="860" height="600" fill="url(#hudVignette)" />
            </mask>

            {/* Filtro Neón Holográfico */}
            <filter id="hudNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* FONDO: Trama Hexagonal translúcida */}
          <rect width="860" height="600" fill={`url(#${hexPatternId})`} mask={`url(#${maskId})`} />

          {/* =========================================================
              1. PISTAS PCB & GUÍAS DE TELEMETRÍA
              ========================================================= */}
          {/* Pistas base grabadas */}
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
              2. SUBSISTEMA RADAR SATÉLITE SUPERIOR DERECHO (670, 160)
              ========================================================= */}
          <g transform="translate(670, 160)" filter="url(#hudNeonGlow)">
            {/* Halo de luz satélite */}
            <circle r="60" fill="var(--accent-connection)" opacity="0.08" />

            {/* Anillo exterior satélite (giratorio horario) */}
            <g ref={satOuterRingRef}>
              <circle r="52" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="18 8 36 6 8 8" opacity="0.7" />
              <circle r="46" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
            </g>

            {/* Anillo interior satélite (giratorio antihorario) */}
            <g ref={satInnerRingRef}>
              <circle r="34" fill="none" stroke="var(--accent-connection)" strokeWidth="1.8" strokeDasharray="40 15 15 10" opacity="0.85" />
              <circle r="22" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <circle r="12" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <circle r="5" fill="#FFFFFF" />
            </g>

            {/* Marcadores cardinales */}
            <line x1="-58" y1="0" x2="-48" y2="0" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="48" y1="0" x2="58" y2="0" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="0" y1="-58" x2="0" y2="-48" stroke="var(--accent-connection)" strokeWidth="1.5" />
            <line x1="0" y1="48" x2="0" y2="58" stroke="var(--accent-connection)" strokeWidth="1.5" />

            {/* Micro-telemetría satelital */}
            <text x="62" y="-15" fill="var(--accent-connection)" fontSize="7" fontFamily="monospace" opacity="0.75">SYS_RADAR.01</text>
            <text x="62" y="-5" fill="#00F0FF" fontSize="6" fontFamily="monospace" opacity="0.6">SYNC: 99.8%</text>
          </g>

          {/* =========================================================
              3. NÚCLEO HOLOGRÁFICO CENTRAL CON EL ISOTIPO (Centro: 410, 290)
              ========================================================= */}
          <g transform="translate(410, 290)">
            {/* Halo de luz central */}
            <circle r="95" fill="var(--accent-connection)" opacity="0.12" filter="url(#hudNeonGlow)" />

            {/* --- ANILLOS HOLOGRÁFICOS GIRATORIOS TIPO REACTOR --- */}
            {/* Anillo HUD Exterior (Giratorio Horario) */}
            <g ref={outerHudRingRef}>
              <circle r="86" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="30 12 70 8 15 15" opacity="0.75" />
              <circle r="78" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.5" />
            </g>

            {/* Anillo HUD Medio (Giratorio Antihorario) */}
            <g ref={midHudRingRef}>
              <circle r="68" fill="none" stroke="var(--accent-connection)" strokeWidth="2" strokeDasharray="60 20 30 15" opacity="0.85" />
              <circle r="56" fill="none" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="12 4 4 4" opacity="0.7" />
              {/* Arcos de mira */}
              <path d="M -56 0 A 56 56 0 0 1 0 -56" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.9" />
              <path d="M 56 0 A 56 56 0 0 1 0 56" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.9" />
            </g>

            {/* Anillo HUD Interior (Giratorio Horario Rápido) */}
            <g ref={innerHudRingRef}>
              <circle r="42" fill="none" stroke="var(--accent-connection)" strokeWidth="1.6" strokeDasharray="25 10 10 10" opacity="0.9" />
              <circle r="30" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.75" />
            </g>

            {/* Marcadores de punto de mira central */}
            <circle r="18" fill="none" stroke="#00F0FF" strokeWidth="1.2" opacity="0.85" />
            <rect x="-6" y="-6" width="12" height="12" fill="#FFFFFF" opacity="0.95" filter="url(#hudNeonGlow)" />

            {/* =========================================================
                LOS 4 CORCHETES DEL ISOTIPO DE PROMARKETING (ENMARCANDO EL HUD)
                Dimensiones: Caja de 190x190px centrada
                ========================================================= */}
            <g filter="url(#hudNeonGlow)">
              {/* Corchete Superior Izquierdo */}
              <path
                d="M -95 -45 L -95 -95 L -45 -95 L -45 -72 L -72 -72 L -72 -45 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 12px var(--accent-connection)) drop-shadow(0 0 25px #00F0FF)" }}
              />

              {/* Corchete Superior Derecho */}
              <path
                d="M 45 -95 L 95 -95 L 95 -45 L 72 -45 L 72 -72 L 45 -72 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 12px var(--accent-connection)) drop-shadow(0 0 25px #00F0FF)" }}
              />

              {/* Corchete Inferior Derecho */}
              <path
                d="M 95 45 L 95 95 L 45 95 L 45 72 L 72 72 L 72 45 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 12px var(--accent-connection)) drop-shadow(0 0 25px #00F0FF)" }}
              />

              {/* Corchete Inferior Izquierdo */}
              <path
                d="M -45 95 L -95 95 L -95 45 L -72 45 L -72 72 L -45 72 Z"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 12px var(--accent-connection)) drop-shadow(0 0 25px #00F0FF)" }}
              />
            </g>
          </g>

          {/* =========================================================
              4. BALIZAS Y MICRO-NODOS DE DATOS PERIFÉRICOS
              ========================================================= */}
          {/* Nodo Izquierdo (130, 260) */}
          <g transform="translate(130, 260)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="8 4" opacity="0.8" />
            <circle r="7" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="3.5" fill="#FFFFFF" />
            <text x="-35" y="-18" fill="var(--accent-connection)" fontSize="6.5" fontFamily="monospace" opacity="0.7">NODE_01</text>
          </g>

          {/* Nodo Inferior Izquierdo (200, 480) */}
          <g transform="translate(200, 480)" filter="url(#hudNeonGlow)">
            <circle r="12" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" opacity="0.75" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="3" fill="#FFFFFF" />
            {/* Icono de árbol de datos */}
            <path d="M -15 15 L 0 5 L 15 15 M 0 5 L 0 -5" fill="none" stroke="#00F0FF" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Nodo Inferior Central (450, 550) */}
          <g transform="translate(450, 550)" filter="url(#hudNeonGlow)">
            <circle r="15" fill="none" stroke="var(--accent-connection)" strokeWidth="1.4" strokeDasharray="12 4" opacity="0.85" />
            <circle r="7" fill="var(--accent-connection)" opacity="0.4" />
            <circle r="3.5" fill="#FFFFFF" />
          </g>

          {/* Nodo Lateral Derecho (710, 350) */}
          <g transform="translate(710, 350)" filter="url(#hudNeonGlow)">
            <circle r="14" fill="none" stroke="var(--accent-connection)" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.8" />
            <circle r="6" fill="var(--accent-connection)" opacity="0.35" />
            <circle r="3" fill="#FFFFFF" />
            <text x="20" y="3" fill="#00F0FF" fontSize="6.5" fontFamily="monospace" opacity="0.65">DATA_BUS</text>
          </g>

          {/* Micro-partículas flotantes (Constelaciones de datos) */}
          <g fill="var(--accent-connection)" opacity="0.4" filter="url(#hudNeonGlow)">
            <circle cx="160" cy="180" r="1.5" />
            <circle cx="180" cy="220" r="1" />
            <circle cx="280" cy="120" r="1.8" />
            <circle cx="340" cy="80" r="1.2" />
            <circle cx="500" cy="90" r="1.5" />
            <circle cx="580" cy="110" r="1" />
            <circle cx="730" cy="260" r="1.6" />
            <circle cx="760" cy="300" r="1.2" />
            <circle cx="680" cy="480" r="1.5" />
            <circle cx="580" cy="520" r="1.2" />
            <circle cx="280" cy="460" r="1.6" />
            <circle cx="150" cy="350" r="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
