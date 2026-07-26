"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Megaphone, TrendingUp, Zap } from "lucide-react";
import gsap from "gsap";

const nodes = [
  { label: "Marketing", Icon: Megaphone, x: 200, y: 48 },
  { label: "Ventas", Icon: TrendingUp, x: 330, y: 150 },
  { label: "Datos", Icon: Database, x: 200, y: 252 },
  { label: "Automatización", Icon: Zap, x: 70, y: 150 },
];

const loopPath =
  "M 200 48 C 282 48 330 88 330 150 C 330 212 282 252 200 252 C 118 252 70 212 70 150 C 70 88 118 48 200 48";

const connectorPaths = [
  "M 200 48 C 282 48 330 88 330 150",
  "M 330 150 C 330 212 282 252 200 252",
  "M 200 252 C 118 252 70 212 70 150",
  "M 70 150 C 70 88 118 48 200 48",
];

const nodeDescriptions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  "Duis aute irure dolor in reprehenderit in voluptate velit.",
];

export function HeroInfrastructureDiagram() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const lightPathRef = useRef<SVGPathElement>(null);
  const glowPointRef = useRef<SVGCircleElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const activeNodeIndexRef = useRef(0);

  useEffect(() => {
    const lightPath = lightPathRef.current;
    const glowPoint = glowPointRef.current;
    const description = descriptionRef.current;

    if (!lightPath || !glowPoint || !description) {
      return;
    }

    const pathLength = lightPath.getTotalLength();
    const segmentLength = pathLength / nodes.length;
    const lightLength = 88;
    const progress = { distance: 0 };

    function moveGlowPoint(distance: number) {
      const point = lightPath!.getPointAtLength(distance % pathLength);

      gsap.set(glowPoint, {
        attr: {
          cx: point.x,
          cy: point.y,
        },
      });
    }

    function setActiveNode(index: number) {
      if (index === activeNodeIndexRef.current) {
        return;
      }

      activeNodeIndexRef.current = index;

      gsap.to(description, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.out",
        onComplete: () => {
          setActiveNodeIndex(index);
          gsap.to(description, {
            opacity: 1,
            duration: 0.15,
            ease: "power1.in",
          });
        },
      });
    }

    function syncActiveNode(distance: number) {
      const normalizedDistance = distance % pathLength;
      const index = Math.floor(
        (normalizedDistance + segmentLength * 0.08) / segmentLength,
      ) % nodes.length;

      setActiveNode(index);
    }

    gsap.set(lightPath, {
      strokeDasharray: `${lightLength} ${pathLength - lightLength}`,
      strokeDashoffset: pathLength,
    });
    moveGlowPoint(0);

    const introPulse = gsap.timeline({ delay: 0.45 });

    introPulse
      .fromTo(
        glowPoint,
        { attr: { r: 4 }, opacity: 0 },
        { attr: { r: 14 }, opacity: 1, duration: 0.28, ease: "power2.out" },
      )
      .to(glowPoint, {
        attr: { r: 7 },
        opacity: 1,
        duration: 0.38,
        ease: "power2.inOut",
      });

    const loop = gsap.timeline({ delay: 1 });

    loop
      .to(lightPath, {
        strokeDashoffset: 0,
        duration: 4.2,
        ease: "none",
        repeat: -1,
      })
      .to(
        progress,
        {
          distance: pathLength,
          duration: 4.2,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            moveGlowPoint(progress.distance);
            syncActiveNode(progress.distance);
          },
          onRepeat: () => setActiveNode(0),
        },
        0,
      );

    return () => {
      introPulse.kill();
      loop.kill();
    };
  }, []);

  return (
    <div
      aria-label="Diagrama de Infraestructura Comercial"
      className="w-full max-w-lg space-y-4"
    >
      <p className="text-center text-xs font-semibold tracking-[0.24em] text-muted-foreground uppercase">
        ASÍ SE CONECTA TU OPERACIÓN
      </p>
      <svg
        role="img"
        viewBox="0 0 400 300"
        className="h-auto w-full overflow-visible"
      >
        <title>Infraestructura Comercial</title>
        {connectorPaths.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="var(--accent-foreground)"
            strokeOpacity="0.34"
            strokeLinecap="round"
            strokeWidth="4"
          />
        ))}
        <path
          ref={lightPathRef}
          d={loopPath}
          fill="none"
          stroke="var(--accent-foreground)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle
          ref={glowPointRef}
          cx="200"
          cy="48"
          r="7"
          fill="var(--color-accent-glow)"
          opacity="0"
          style={{
            filter:
              "drop-shadow(0 0 10px var(--color-accent-glow)) drop-shadow(0 0 22px var(--color-accent-glow)) drop-shadow(0 0 36px var(--color-accent-glow))",
          }}
        />

        <text
          x="200"
          y="142"
          fill="var(--foreground)"
          textAnchor="middle"
          className="text-xl font-semibold"
        >
          Infraestructura
        </text>
        <text
          x="200"
          y="162"
          fill="var(--foreground)"
          textAnchor="middle"
          className="text-xl font-semibold"
        >
          Comercial
        </text>

        {nodes.map(({ label, Icon, x, y }) => (
          <g key={label}>
            <circle
              cx={x}
              cy={y}
              r="36"
              fill="var(--background)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <foreignObject x={x - 16} y={y - 25} width="32" height="32">
              <Icon
                aria-hidden="true"
                className="size-8 text-foreground"
                strokeWidth={2}
              />
            </foreignObject>
            <text
              x={x}
              y={y + 22}
              fill="var(--muted-foreground)"
              textAnchor="middle"
              className="text-xs font-medium"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      <p
        ref={descriptionRef}
        className="mx-auto min-h-12 max-w-sm text-center text-sm leading-6 text-muted-foreground"
      >
        {nodeDescriptions[activeNodeIndex]}
      </p>
    </div>
  );
}
