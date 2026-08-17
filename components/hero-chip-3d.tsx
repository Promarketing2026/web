"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { BrandIsotipo } from "@/components/brand-logo";

interface ActiveTrace {
  id: string;
  path: string;
  endX: number;
  endY: number;
  isFilledVia: boolean;
  delay: number;
  duration: number;
}

// 1. PISTAS ACTIVAS PCB: Ruteo a 45° ordenado desde el perímetro del Isotipo
const activeTraces: ActiveTrace[] = [
  // Cuadrante Superior Izquierdo
  { id: "tl1", path: "M 400 240 L 330 170 L 250 170 L 190 110 L 130 110", endX: 130, endY: 110, isFilledVia: true, delay: 0.1, duration: 1.6 },
  { id: "tl2", path: "M 425 225 L 380 150 L 300 80 L 240 80", endX: 240, endY: 80, isFilledVia: false, delay: 0.8, duration: 1.5 },
  { id: "tl3", path: "M 450 215 L 430 130 L 370 80 L 370 30", endX: 370, endY: 30, isFilledVia: true, delay: 0.35, duration: 1.4 },

  // Cuadrante Superior Derecho
  { id: "tr1", path: "M 465 215 L 490 130 L 530 80 L 530 30", endX: 530, endY: 30, isFilledVia: false, delay: 1.1, duration: 1.4 },
  { id: "tr2", path: "M 490 225 L 530 150 L 610 80 L 670 80", endX: 670, endY: 80, isFilledVia: true, delay: 0.5, duration: 1.5 },
  { id: "tr3", path: "M 515 240 L 580 170 L 660 170 L 720 110 L 780 110", endX: 780, endY: 110, isFilledVia: false, delay: 0.95, duration: 1.6 },

  // Cuadrante Lateral / Inferior Derecho
  { id: "r1", path: "M 535 270 L 610 220 L 700 220 L 760 160 L 830 160", endX: 830, endY: 160, isFilledVia: true, delay: 0.2, duration: 1.7 },
  { id: "r2", path: "M 545 300 L 650 300 L 720 255 L 850 255", endX: 850, endY: 255, isFilledVia: false, delay: 0.7, duration: 1.5 },
  { id: "r3", path: "M 535 330 L 615 390 L 715 390 L 775 440 L 850 440", endX: 850, endY: 440, isFilledVia: true, delay: 1.3, duration: 1.5 },
  { id: "b1", path: "M 510 360 L 565 430 L 640 500 L 700 500 L 730 535", endX: 730, endY: 535, isFilledVia: false, delay: 0.4, duration: 1.6 },

  // Cuadrante Inferior / Lateral Izquierdo
  { id: "b2", path: "M 460 380 L 460 470 L 500 510 L 500 565", endX: 500, endY: 565, isFilledVia: true, delay: 0.85, duration: 1.4 },
  { id: "b3", path: "M 410 360 L 355 430 L 280 500 L 220 500 L 190 535", endX: 190, endY: 535, isFilledVia: false, delay: 0.6, duration: 1.6 },
  { id: "l1", path: "M 385 330 L 305 390 L 205 390 L 145 440 L 70 440", endX: 70, endY: 440, isFilledVia: true, delay: 1.0, duration: 1.5 },
  { id: "l2", path: "M 375 300 L 270 300 L 200 255 L 70 255", endX: 70, endY: 255, isFilledVia: false, delay: 0.3, duration: 1.5 },
  { id: "l3", path: "M 385 270 L 310 220 L 220 220 L 160 160 L 90 160", endX: 90, endY: 160, isFilledVia: true, delay: 0.65, duration: 1.7 },
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
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const viaRefs = useRef<(SVGGElement | null)[]>([]);
  const logoElevatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const masterTl = gsap.timeline({ repeat: -1 });

    if (logoElevatedRef.current) {
      gsap.to(logoElevatedRef.current, {
        z: 28,
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // ANIMACIÓN DE PISTAS
    activeTraces.forEach((trace, index) => {
      const pathEl = pathRefs.current[index];
      const viaEl = viaRefs.current[index];
      if (!pathEl || !viaEl) return;

      const pathLength = pathEl.getTotalLength();
      const laserLength = 95;

      gsap.set(pathEl, {
        strokeDasharray: `${laserLength} ${pathLength + 40}`,
        strokeDashoffset: laserLength,
        opacity: 0,
      });

      gsap.set(viaEl, {
        opacity: trace.isFilledVia ? 0.4 : 0.3,
        scale: 1,
        transformOrigin: "center",
      });

      const lineTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.6 + (index % 4) * 0.3,
        delay: trace.delay,
      });

      lineTl
        .fromTo(
          pathEl,
          { strokeDashoffset: laserLength, opacity: 0.4 },
          {
            strokeDashoffset: -pathLength,
            opacity: 1,
            duration: trace.duration,
            ease: "power1.inOut",
          }
        )
        .to(
          viaEl,
          {
            opacity: 1,
            scale: trace.isFilledVia ? 1.6 : 1.35,
            duration: 0.25,
            ease: "back.out(2)",
          },
          `-=${trace.duration * 0.22}`
        )
        .to(viaEl, {
          opacity: trace.isFilledVia ? 0.45 : 0.3,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .set(pathEl, { opacity: 0 });

      masterTl.add(lineTl, 0);
    });

    return () => {
      masterTl.kill();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-label="Isotipo 3D y Ecosistema de Metodología Promarketing"
      className={`relative flex h-[380px] sm:h-[460px] lg:h-[520px] w-full select-none items-center justify-center overflow-visible ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Resplandor Ambiental Global */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-[340px] sm:size-[440px] rounded-full blur-[120px] sm:blur-[150px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.22,
        }}
      />

      {/* Escenario 3D Isométrico */}
      <div
        className="relative flex h-[480px] w-[700px] items-center justify-center transition-transform duration-700 hover:scale-[1.03]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(60deg) rotateY(-4deg) rotateZ(-34deg)",
        }}
      >
        {/* SUELO DEL CIRCUITO PCB */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            viewBox="0 0 900 600"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="pcbDepthFadeHero" cx="50%" cy="50%" r="58%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="70%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </radialGradient>
              <mask id={maskId}>
                <rect width="900" height="600" fill="url(#pcbDepthFadeHero)" />
              </mask>

              <filter id="pcbLaserGlowHero" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Pistas base */}
            <g mask={`url(#${maskId})`} fill="none" stroke="currentColor" className="text-accent-connection/20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {activeTraces.map((trace) => (
                <path key={`guide-${trace.id}`} d={trace.path} />
              ))}
            </g>

            {/* Haces láser de datos */}
            <g fill="none" stroke={glowColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#pcbLaserGlowHero)">
              {activeTraces.map((trace, i) => (
                <path
                  key={`laser-${trace.id}`}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={trace.path}
                  style={{
                    filter: "drop-shadow(0 0 6px var(--accent-connection)) drop-shadow(0 0 14px #00E5FF)",
                  }}
                />
              ))}
            </g>

            {/* Vías terminales */}
            <g filter="url(#pcbLaserGlowHero)">
              {activeTraces.map((trace, i) => (
                <g
                  key={`via-${trace.id}`}
                  ref={(el) => {
                    viaRefs.current[i] = el;
                  }}
                  transform={`translate(${trace.endX}, ${trace.endY})`}
                >
                  {trace.isFilledVia ? (
                    <>
                      <circle r="6.5" fill={glowColor} opacity="0.35" />
                      <circle r="4.2" fill={glowColor} />
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
          </svg>
        </div>

        {/* Sombra de oclusión en el suelo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-44 rounded-full bg-black/95 blur-2xl transition-all"
          style={{ transform: "translateZ(2px)" }}
        />

        {/* Resplandor bajo el Isotipo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-40 rounded-full bg-accent-connection/30 blur-xl"
          style={{ transform: "translateZ(6px)" }}
        />

        {/* Isotipo 3D Flotante Puro */}
        <div
          ref={logoElevatedRef}
          className="relative flex items-center justify-center select-none"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          {/* Nivel de Extrusión Inferior */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-85"
            style={{
              transform: "translateZ(-6px)",
              filter: "brightness(0.35) drop-shadow(0 4px 10px rgba(0,0,0,0.9))",
            }}
          >
            <BrandIsotipo
              size={120}
              className="sm:w-[136px] sm:h-[136px]"
              style={{ color: "#061822" }}
            />
          </div>

          {/* Canto Neón */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-95"
            style={{
              transform: "translateZ(-2px)",
              filter: "drop-shadow(0 0 16px var(--accent-connection)) drop-shadow(0 0 32px #00E5FF)",
            }}
          >
            <BrandIsotipo
              size={120}
              className="sm:w-[136px] sm:h-[136px]"
              style={{ color: "var(--accent-connection)" }}
            />
          </div>

          {/* Cara Frontal: Blanco Puro Incandescente */}
          <div
            className="relative flex items-center justify-center"
            style={{
              transform: "translateZ(0px)",
              filter:
                "drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 18px var(--accent-connection)) drop-shadow(0 0 45px #00E5FF)",
            }}
          >
            <BrandIsotipo
              size={120}
              className="sm:w-[136px] sm:h-[136px]"
              style={{
                color: "#FFFFFF",
                filter: "brightness(1.4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
