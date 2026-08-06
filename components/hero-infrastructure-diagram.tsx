"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Megaphone, TrendingUp, Zap } from "lucide-react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

import { BrandIsotipo } from "@/components/brand-logo";

const nodes = [
  { id: "marketing", label: "Marketing", Icon: Megaphone, x: 200, y: 48 },
  { id: "ventas", label: "Ventas", Icon: TrendingUp, x: 330, y: 150 },
  { id: "datos", label: "Datos", Icon: Database, x: 200, y: 252 },
  { id: "automatizacion", label: "Automatización", Icon: Zap, x: 70, y: 150 },
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
  "Atracción de demanda calificada y posicionamiento estratégico en el mercado.",
  "Conversión de oportunidades y estructuración de procesos comerciales fluidos.",
  "Trazabilidad de la información e inteligencia comercial para decidir con fundamento.",
  "Coordinación de sistemas y eliminación de fricción en la operación cotidiana.",
];

export function HeroInfrastructureDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    if (shouldReduceMotion) {
      gsap.set(lightPath, { clearProps: "strokeDasharray,strokeDashoffset" });
      gsap.set(glowPoint, { opacity: 0 });
      gsap.set(description, { opacity: 1 });
      activeNodeIndexRef.current = 0;
      return;
    }

    const pathLength = lightPath.getTotalLength();
    const segmentLength = pathLength / nodes.length;
    const lightLength = 96;
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
        y: -4,
        duration: 0.18,
        ease: "power1.out",
        onComplete: () => {
          setActiveNodeIndex(index);
          gsap.fromTo(
            description,
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.22, ease: "power1.inOut" }
          );
        },
      });
    }

    function syncActiveNode(distance: number) {
      const normalizedDistance = distance % pathLength;
      const index =
        Math.floor((normalizedDistance + segmentLength * 0.08) / segmentLength) %
        nodes.length;

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
        { attr: { r: 14 }, opacity: 1, duration: 0.28, ease: "power2.out" }
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
        duration: 4.8,
        ease: "none",
        repeat: -1,
      })
      .to(
        progress,
        {
          distance: pathLength,
          duration: 4.8,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            moveGlowPoint(progress.distance);
            syncActiveNode(progress.distance);
          },
          onRepeat: () => setActiveNode(0),
        },
        0
      );

    return () => {
      introPulse.kill();
      loop.kill();
    };
  }, [shouldReduceMotion]);

  const currentDisplayIndex = hoveredIndex !== null ? hoveredIndex : activeNodeIndex;

  return (
    <div
      aria-label="Diagrama Interactivo de la Infraestructura Comercial Conectada"
      className="group relative w-full max-w-lg space-y-5 rounded-2xl border border-border/80 bg-card/60 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-accent-connection/40"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-connection uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-connection opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-connection" />
          </span>
          Sistema Interactivo
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Pasa el cursor por cada capacidad
        </span>
      </div>

      <svg
        role="img"
        viewBox="0 0 400 300"
        className="h-auto w-full overflow-visible select-none"
      >
        <title>Infraestructura Comercial Conectada Promarketing</title>
        
        {/* Rutas de Conexión Base en Verde Menta `#3CF5B5` */}
        {connectorPaths.map((path, idx) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#3CF5B5"
            strokeOpacity={currentDisplayIndex === idx ? "0.6" : "0.2"}
            strokeLinecap="round"
            strokeWidth="3"
            className="transition-all duration-300"
          />
        ))}

        {/* Trazo Láser Animado Continuo */}
        <path
          ref={lightPathRef}
          d={loopPath}
          fill="none"
          stroke="#3CF5B5"
          strokeLinecap="round"
          strokeWidth="3.5"
          style={{
            filter: "drop-shadow(0 0 8px rgba(60, 245, 181, 0.7))",
          }}
        />

        {/* Punto de Luz Brillante Deslizante */}
        <circle
          ref={glowPointRef}
          cx="200"
          cy="48"
          r="7"
          fill="#3CF5B5"
          opacity="0"
          style={{
            filter:
              "drop-shadow(0 0 10px #3CF5B5) drop-shadow(0 0 20px #3CF5B5) drop-shadow(0 0 30px #3CF5B5)",
          }}
        />

        {/* Núcleo Central con Isotipo Promarketing */}
        <g transform="translate(200, 140)">
          <circle
            cx="0"
            cy="0"
            r="44"
            fill="var(--card)"
            stroke="#3CF5B5"
            strokeOpacity="0.4"
            strokeWidth="2"
            className="shadow-lg"
          />
          <foreignObject x="-16" y="-28" width="32" height="32">
            <BrandIsotipo size={32} className="text-accent-connection" />
          </foreignObject>
          <text
            x="0"
            y="14"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-[11px] font-semibold tracking-tight"
          >
            Infraestructura
          </text>
          <text
            x="0"
            y="26"
            fill="#3CF5B5"
            textAnchor="middle"
            className="text-[10px] font-semibold uppercase tracking-wider"
          >
            Conectada
          </text>
        </g>

        {/* Nodos Interactivos (Marketing, Ventas, Datos, Automatización) */}
        {nodes.map(({ id, label, Icon, x, y }, idx) => {
          const isActive = currentDisplayIndex === idx;

          return (
            <g
              key={id}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Halo activo alrededor del nodo */}
              <circle
                cx={x}
                cy={y}
                r="40"
                fill="none"
                stroke={isActive ? "#3CF5B5" : "transparent"}
                strokeWidth="2"
                strokeDasharray="4 4"
                className={`transition-all duration-300 ${
                  isActive ? "opacity-100 animate-spin-slow" : "opacity-0"
                }`}
              />

              {/* Fondo del Nodo */}
              <circle
                cx={x}
                cy={y}
                r="32"
                fill={isActive ? "#171B19" : "var(--background)"}
                stroke={isActive ? "#3CF5B5" : "var(--border)"}
                strokeWidth={isActive ? "2.5" : "1.5"}
                className="transition-all duration-300 shadow-md"
                style={{
                  filter: isActive ? "drop-shadow(0 0 12px rgba(60, 245, 181, 0.4))" : "none",
                }}
              />

              {/* Ícono de Capacidad */}
              <foreignObject x={x - 14} y={y - 20} width="28" height="28">
                <Icon
                  aria-hidden="true"
                  className={`size-7 transition-colors duration-300 ${
                    isActive ? "text-accent-connection" : "text-foreground"
                  }`}
                  strokeWidth={2}
                />
              </foreignObject>

              {/* Etiqueta de Capacidad */}
              <text
                x={x}
                y={y + 20}
                fill={isActive ? "#3CF5B5" : "var(--muted-foreground)"}
                textAnchor="middle"
                className={`text-[11px] font-medium transition-colors duration-300 ${
                  isActive ? "font-semibold text-accent-connection" : ""
                }`}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Caja de Descripción con Alta Trazabilidad de Contenido */}
      <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 text-center shadow-inner">
        <p
          ref={descriptionRef}
          className="mx-auto min-h-12 max-w-md text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium transition-opacity"
        >
          {nodeDescriptions[currentDisplayIndex]}
        </p>
      </div>
    </div>
  );
}
