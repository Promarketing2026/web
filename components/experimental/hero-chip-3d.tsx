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
  { id: "tl1", path: "M 400 240 L 330 170 L 250 170 L 190 110 L 130 110", endX: 130, endY: 110, isFilledVia: true, delay: 0.1, duration: 1.5 },
  { id: "tl2", path: "M 425 225 L 380 150 L 300 80 L 240 80", endX: 240, endY: 80, isFilledVia: false, delay: 0.75, duration: 1.4 },
  { id: "tl3", path: "M 450 215 L 430 130 L 370 80 L 370 30", endX: 370, endY: 30, isFilledVia: true, delay: 0.3, duration: 1.35 },
  { id: "tr1", path: "M 465 215 L 490 130 L 530 80 L 530 30", endX: 530, endY: 30, isFilledVia: false, delay: 1.05, duration: 1.35 },
  { id: "tr2", path: "M 490 225 L 530 150 L 610 80 L 670 80", endX: 670, endY: 80, isFilledVia: true, delay: 0.45, duration: 1.45 },
  { id: "tr3", path: "M 515 240 L 580 170 L 660 170 L 720 110 L 780 110", endX: 780, endY: 110, isFilledVia: false, delay: 0.9, duration: 1.55 },
  { id: "r1", path: "M 535 270 L 610 220 L 700 220 L 760 160 L 830 160", endX: 830, endY: 160, isFilledVia: true, delay: 0.15, duration: 1.6 },
  { id: "r2", path: "M 545 300 L 650 300 L 720 255 L 850 255", endX: 850, endY: 255, isFilledVia: false, delay: 0.65, duration: 1.4 },
  { id: "r3", path: "M 535 330 L 615 390 L 715 390 L 775 440 L 850 440", endX: 850, endY: 440, isFilledVia: true, delay: 1.25, duration: 1.45 },
  { id: "b1", path: "M 510 360 L 565 430 L 640 500 L 700 500 L 730 535", endX: 730, endY: 535, isFilledVia: false, delay: 0.35, duration: 1.5 },
  { id: "b2", path: "M 460 380 L 460 470 L 500 510 L 500 565", endX: 500, endY: 565, isFilledVia: true, delay: 0.8, duration: 1.35 },
  { id: "b3", path: "M 410 360 L 355 430 L 280 500 L 220 500 L 190 535", endX: 190, endY: 535, isFilledVia: false, delay: 0.55, duration: 1.5 },
  { id: "l1", path: "M 385 330 L 305 390 L 205 390 L 145 440 L 70 440", endX: 70, endY: 440, isFilledVia: true, delay: 0.95, duration: 1.45 },
  { id: "l2", path: "M 375 300 L 270 300 L 200 255 L 70 255", endX: 70, endY: 255, isFilledVia: false, delay: 0.25, duration: 1.45 },
  { id: "l3", path: "M 385 270 L 310 220 L 220 220 L 160 160 L 90 160", endX: 90, endY: 160, isFilledVia: true, delay: 0.6, duration: 1.6 },
];

const secondaryTraces = [
  "M 260 140 L 190 70 L 100 70",
  "M 310 110 L 250 50 L 170 50",
  "M 590 110 L 650 50 L 730 50",
  "M 640 140 L 710 70 L 800 70",
  "M 640 460 L 710 530 L 800 530",
  "M 590 490 L 650 550 L 730 550",
  "M 310 490 L 250 550 L 170 550",
  "M 260 460 L 190 530 L 100 530",
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
        opacity: 0.48,
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
        repeatDelay: 0.5 + (index % 5) * 0.22,
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
      className={`relative flex h-[360px] sm:h-[440px] lg:h-[520px] w-full max-w-full select-none items-center justify-center overflow-hidden lg:overflow-visible ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={coreAmbientPulseRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-[300px] sm:size-[400px] lg:size-[480px] rounded-full blur-[100px] sm:blur-[140px] transition-all"
        style={{
          backgroundColor: glowColor,
          opacity: 0.24,
        }}
      />

      <div
        className="relative flex h-[460px] w-[660px] sm:w-[720px] max-w-full scale-[0.74] sm:scale-[0.88] lg:scale-100 items-center justify-center origin-center transition-transform duration-700 hover:scale-[1.03]"
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
              <radialGradient id="pcbDepthFade" cx="50%" cy="50%" r="58%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="70%" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </radialGradient>
              <mask id={maskId}>
                <rect width="900" height="600" fill="url(#pcbDepthFade)" />
              </mask>

              <pattern id="pcbMicroGridExp" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.85" fill="var(--accent-connection)" opacity="0.22" />
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--accent-connection)" strokeWidth="0.35" opacity="0.07" />
              </pattern>

              <filter id="pcbLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="900" height="600" fill="url(#pcbMicroGridExp)" mask={`url(#${maskId})`} />

            <g mask={`url(#${maskId})`} fill="none" stroke="#0A141E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {secondaryTraces.map((path, i) => (
                <path key={`sec-${i}`} d={path} />
              ))}
            </g>

            <g mask={`url(#${maskId})`} fill="none" stroke="currentColor" className="text-accent-connection/25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {activeTraces.map((trace) => (
                <path key={`guide-${trace.id}`} d={trace.path} />
              ))}
            </g>

            <g fill="none" stroke={glowColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#pcbLaserGlow)">
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

            <g filter="url(#pcbLaserGlow)">
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
                      <circle r="8" fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1" />
                      <circle r="6" fill={glowColor} opacity="0.35" />
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
          className="pointer-events-none absolute size-44 rounded-full bg-accent-connection/30 blur-xl transition-all"
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
                size={126}
                className="sm:w-[140px] sm:h-[140px]"
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
              size={126}
              className="sm:w-[140px] sm:h-[140px]"
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
              size={126}
              className="sm:w-[140px] sm:h-[140px]"
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
              size={126}
              className="sm:w-[140px] sm:h-[140px]"
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
              size={126}
              className="sm:w-[140px] sm:h-[140px]"
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
