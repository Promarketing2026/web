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

const activeTraces: ActiveTrace[] = [
  { id: "tl1", path: "M 410 245 L 350 185 L 270 185 L 210 125 L 140 125", endX: 140, endY: 125, isFilledVia: true, delay: 0.1, duration: 1.5 },
  { id: "tl2", path: "M 425 235 L 375 175 L 310 175 L 250 105 L 190 105", endX: 190, endY: 105, isFilledVia: false, delay: 0.7, duration: 1.4 },
  { id: "tl3", path: "M 440 225 L 400 165 L 345 105 L 285 55", endX: 285, endY: 55, isFilledVia: true, delay: 0.3, duration: 1.35 },
  { id: "tl4", path: "M 455 215 L 420 155 L 375 95 L 340 45", endX: 340, endY: 45, isFilledVia: false, delay: 0.95, duration: 1.4 },
  { id: "tl5", path: "M 470 210 L 445 145 L 415 85 L 395 35", endX: 395, endY: 35, isFilledVia: true, delay: 0.5, duration: 1.45 },
  { id: "tr1", path: "M 485 210 L 510 145 L 540 85 L 560 35", endX: 560, endY: 35, isFilledVia: false, delay: 1.1, duration: 1.35 },
  { id: "tr2", path: "M 500 215 L 535 155 L 580 95 L 615 45", endX: 615, endY: 45, isFilledVia: true, delay: 0.4, duration: 1.4 },
  { id: "tr3", path: "M 515 225 L 555 165 L 610 105 L 670 55", endX: 670, endY: 55, isFilledVia: false, delay: 0.85, duration: 1.45 },
  { id: "tr4", path: "M 530 235 L 580 175 L 645 175 L 705 105 L 765 105", endX: 765, endY: 105, isFilledVia: true, delay: 0.2, duration: 1.5 },
  { id: "tr5", path: "M 545 245 L 605 185 L 685 185 L 745 125 L 815 125", endX: 815, endY: 125, isFilledVia: false, delay: 0.95, duration: 1.55 },
  { id: "br1", path: "M 545 355 L 605 415 L 685 415 L 745 475 L 815 475", endX: 815, endY: 475, isFilledVia: true, delay: 0.15, duration: 1.55 },
  { id: "br2", path: "M 530 365 L 580 425 L 645 425 L 705 495 L 765 495", endX: 765, endY: 495, isFilledVia: false, delay: 0.75, duration: 1.5 },
  { id: "br3", path: "M 515 375 L 555 435 L 610 495 L 670 545", endX: 670, endY: 545, isFilledVia: true, delay: 1.25, duration: 1.45 },
  { id: "br4", path: "M 500 385 L 535 445 L 580 505 L 615 555", endX: 615, endY: 555, isFilledVia: false, delay: 0.55, duration: 1.4 },
  { id: "br5", path: "M 485 390 L 510 455 L 540 515 L 560 565", endX: 560, endY: 565, isFilledVia: true, delay: 1.05, duration: 1.35 },
  { id: "bl1", path: "M 470 390 L 445 455 L 415 515 L 395 565", endX: 395, endY: 565, isFilledVia: false, delay: 0.8, duration: 1.35 },
  { id: "bl2", path: "M 455 385 L 420 445 L 375 505 L 340 555", endX: 340, endY: 555, isFilledVia: true, delay: 0.25, duration: 1.4 },
  { id: "bl3", path: "M 440 375 L 400 435 L 345 495 L 285 545", endX: 285, endY: 545, isFilledVia: false, delay: 0.9, duration: 1.45 },
  { id: "bl4", path: "M 425 365 L 375 425 L 310 425 L 250 495 L 190 495", endX: 190, endY: 495, isFilledVia: true, delay: 0.45, duration: 1.5 },
  { id: "bl5", path: "M 410 355 L 350 415 L 270 415 L 210 475 L 140 475", endX: 140, endY: 475, isFilledVia: false, delay: 1.15, duration: 1.55 },
  { id: "latL", path: "M 390 300 L 290 300 L 220 260 L 120 260", endX: 120, endY: 260, isFilledVia: true, delay: 0.35, duration: 1.6 },
  { id: "latR", path: "M 565 300 L 665 300 L 735 340 L 835 340", endX: 835, endY: 340, isFilledVia: true, delay: 0.8, duration: 1.6 },
];

const secondaryTraces = [
  "M 330 160 L 250 80 L 160 80",
  "M 380 130 L 320 60 L 220 60",
  "M 575 130 L 635 60 L 735 60",
  "M 625 160 L 705 80 L 795 80",
  "M 625 440 L 705 520 L 795 520",
  "M 575 470 L 635 540 L 735 540",
  "M 380 470 L 320 540 L 220 540",
  "M 330 440 L 250 520 L 160 520",
  "M 260 300 L 170 300 L 90 350",
  "M 695 300 L 785 300 L 865 250",
];

const extrusionSlices = [
  { z: -18, x: -7, opacity: 0.4, color: "#010508", filter: "drop-shadow(-8px 8px 18px rgba(0,0,0,0.98))" },
  { z: -14, x: -5.5, opacity: 0.55, color: "#020B12", filter: "drop-shadow(-6px 6px 14px rgba(0,0,0,0.92))" },
  { z: -11, x: -4.2, opacity: 0.72, color: "#04131F", filter: "drop-shadow(-4px 4px 10px rgba(0,0,0,0.85))" },
  { z: -8, x: -3, opacity: 0.86, color: "#061A28", filter: "drop-shadow(-3px 3px 7px rgba(0,0,0,0.8))" },
  { z: -5, x: -1.9, opacity: 0.93, color: "#092437", filter: "drop-shadow(-2px 2px 5px rgba(0,0,0,0.75))" },
  { z: -3, x: -1.1, opacity: 0.96, color: "#0D3048", filter: "drop-shadow(0 0 12px rgba(0,240,255,0.3))" },
  { z: -1.5, x: -0.5, opacity: 0.98, color: "#009BB5", filter: "drop-shadow(0 0 20px var(--accent-connection))" },
  { z: -0.5, x: -0.1, opacity: 1, color: "var(--accent-connection)", filter: "drop-shadow(0 0 30px #00F0FF)" },
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
  const corePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const viaRefs = useRef<(SVGGElement | null)[]>([]);
  const shockwaveRefs = useRef<(SVGCircleElement | null)[]>([]);
  const logoElevatedRef = useRef<HTMLDivElement>(null);
  const coreAmbientPulseRef = useRef<HTMLDivElement>(null);
  const groundBounceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const masterTl = gsap.timeline({ repeat: -1 });

    if (logoElevatedRef.current) {
      gsap.to(logoElevatedRef.current, {
        z: 32,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (coreAmbientPulseRef.current) {
      gsap.to(coreAmbientPulseRef.current, {
        scale: 1.15,
        opacity: 0.32,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (groundBounceRef.current) {
      gsap.to(groundBounceRef.current, {
        scale: 1.25,
        opacity: 0.52,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    activeTraces.forEach((trace, index) => {
      const glowPathEl = pathRefs.current[index];
      const corePathEl = corePathRefs.current[index];
      const viaEl = viaRefs.current[index];
      const shockwaveEl = shockwaveRefs.current[index];
      if (!glowPathEl || !corePathEl || !viaEl) return;

      const pathLength = glowPathEl.getTotalLength();
      const laserLength = 120;
      const coreLaserLength = 80;

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
        opacity: trace.isFilledVia ? 0.45 : 0.28,
        scale: 1,
        transformOrigin: "center",
      });

      if (shockwaveEl) {
        gsap.set(shockwaveEl, { scale: 0.3, opacity: 0, transformOrigin: "center" });
      }

      const lineTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.45 + (index % 5) * 0.2,
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
            scale: trace.isFilledVia ? 1.8 : 1.45,
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
            scale: 3.0,
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
            opacity: trace.isFilledVia ? 0.45 : 0.28,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
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
      aria-label="Isotipo 3D y Ecosistema de Metodología Promarketing"
      className={`relative flex h-[380px] sm:h-[460px] lg:h-[540px] w-full max-w-full select-none items-center justify-center overflow-hidden lg:overflow-visible ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={coreAmbientPulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-[340px] sm:size-[440px] lg:size-[520px] rounded-full blur-[110px] sm:blur-[150px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.24,
        }}
      />

      <div
        className="relative flex h-[480px] w-[680px] sm:w-[760px] max-w-full scale-[0.74] sm:scale-[0.88] lg:scale-100 items-center justify-center origin-center transition-transform duration-700 hover:scale-[1.03]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(42deg) rotateY(-28deg) rotateZ(12deg)",
        }}
      >
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
              <radialGradient id="groundIlluminationFade" cx="50%" cy="50%" r="56%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.28" />
                <stop offset="25%" stopColor="var(--accent-connection)" stopOpacity="0.16" />
                <stop offset="55%" stopColor="#08222C" stopOpacity="0.08" />
                <stop offset="85%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="pcbDepthFadeHero" cx="50%" cy="50%" r="58%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="70%" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </radialGradient>
              <mask id={maskId}>
                <rect width="900" height="600" fill="url(#pcbDepthFadeHero)" />
              </mask>

              <pattern id="pcbMicroGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.9" fill="var(--accent-connection)" opacity="0.25" />
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--accent-connection)" strokeWidth="0.35" opacity="0.08" />
              </pattern>

              <filter id="pcbLaserGlowHero" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="900" height="600" fill="url(#groundIlluminationFade)" />
            <rect width="900" height="600" fill="url(#pcbMicroGrid)" mask={`url(#${maskId})`} />

            <g mask={`url(#${maskId})`} fill="none" stroke="#0B1A24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {secondaryTraces.map((path, i) => (
                <path key={`sec-${i}`} d={path} />
              ))}
            </g>

            <g mask={`url(#${maskId})`} fill="none" stroke="currentColor" className="text-accent-connection/25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {activeTraces.map((trace) => (
                <path key={`guide-${trace.id}`} d={trace.path} />
              ))}
            </g>

            <g fill="none" stroke={glowColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#pcbLaserGlowHero)">
              {activeTraces.map((trace, i) => (
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

            <g fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {activeTraces.map((trace, i) => (
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

            <g filter="url(#pcbLaserGlowHero)">
              {activeTraces.map((trace, i) => (
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
                      r="6.5"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="1.5"
                      opacity="0"
                    />
                  )}

                  {trace.isFilledVia ? (
                    <>
                      <circle r="8.5" fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1.2" />
                      <circle r="6.2" fill={glowColor} opacity="0.35" />
                      <circle r="4.2" fill={glowColor} />
                      <circle r="2" fill="#FFFFFF" />
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
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-48 rounded-full bg-black/95 blur-2xl transition-all"
          style={{ transform: "translateZ(2px)" }}
        />

        <div
          ref={groundBounceRef}
          aria-hidden="true"
          className="pointer-events-none absolute size-48 rounded-full bg-accent-connection/35 blur-xl transition-all"
          style={{ transform: "translateZ(6px)" }}
        />

        <div
          ref={logoElevatedRef}
          className="relative flex items-center justify-center select-none"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(26px)",
          }}
        >
          {extrusionSlices.map((slice, i) => (
            <div
              key={`slice-${i}`}
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translateZ(${slice.z}px) translateX(${slice.x}px)`,
                opacity: slice.opacity,
                filter: slice.filter,
              }}
            >
              <BrandIsotipo
                size={124}
                className="sm:w-[138px] sm:h-[138px]"
                style={{ color: slice.color }}
              />
            </div>
          ))}

          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: "translateZ(-0.5px)",
              filter: "drop-shadow(0 0 14px #00F0FF) drop-shadow(0 0 28px var(--accent-connection))",
            }}
          >
            <BrandIsotipo
              size={124}
              className="sm:w-[138px] sm:h-[138px]"
              style={{ color: "var(--accent-connection)" }}
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-90"
            style={{
              transform: "translateZ(0.5px) translateX(-0.6px) translateY(-0.6px)",
              filter: "brightness(1.65) drop-shadow(-1.5px -1.5px 2px rgba(224,255,255,0.9))",
            }}
          >
            <BrandIsotipo
              size={124}
              className="sm:w-[138px] sm:h-[138px]"
              style={{ color: "#E0FFFF" }}
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-85"
            style={{
              transform: "translateZ(0.8px)",
              filter: "brightness(0.9) contrast(1.25)",
            }}
          >
            <BrandIsotipo
              size={124}
              className="sm:w-[138px] sm:h-[138px]"
              style={{ color: "#0F2636" }}
            />
          </div>

          <div
            className="relative flex items-center justify-center"
            style={{
              transform: "translateZ(1.2px)",
              filter:
                "drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 22px var(--accent-connection)) drop-shadow(0 0 48px #00F0FF)",
            }}
          >
            <BrandIsotipo
              size={124}
              className="sm:w-[138px] sm:h-[138px]"
              style={{
                color: "#FFFFFF",
                filter: "brightness(1.45)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
