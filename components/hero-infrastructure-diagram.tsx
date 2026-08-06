"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Megaphone, TrendingUp, Zap } from "lucide-react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

import { BrandIsotipo } from "@/components/brand-logo";

const nodes = [
  { id: "marketing", label: "Marketing", Icon: Megaphone, x: 85, y: 65 },
  { id: "ventas", label: "Ventas", Icon: TrendingUp, x: 375, y: 65 },
  { id: "datos", label: "Datos", Icon: Database, x: 375, y: 195 },
  { id: "automatizacion", label: "Automatización", Icon: Zap, x: 85, y: 195 },
];

const loopPath =
  "M 105 65 H 355 Q 375 65 375 85 V 175 Q 375 195 355 195 H 105 Q 85 195 85 175 V 85 Q 85 65 105 65 Z";

const connectorPaths = [
  "M 85 65 H 375",
  "M 375 65 V 195",
  "M 375 195 H 85",
  "M 85 195 V 65",
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
  const trailPointRef = useRef<SVGCircleElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const activeNodeIndexRef = useRef(0);

  useEffect(() => {
    const lightPath = lightPathRef.current;
    const glowPoint = glowPointRef.current;
    const trailPoint = trailPointRef.current;
    const description = descriptionRef.current;

    if (!lightPath || !glowPoint || !description) {
      return;
    }

    if (shouldReduceMotion) {
      gsap.set(lightPath, { clearProps: "strokeDasharray,strokeDashoffset" });
      gsap.set(glowPoint, { opacity: 0 });
      if (trailPoint) gsap.set(trailPoint, { opacity: 0 });
      gsap.set(description, { opacity: 1 });
      activeNodeIndexRef.current = 0;
      return;
    }

    const pathLength = lightPath.getTotalLength();
    const lightLength = 130;
    const progress = { distance: 0 };

    function moveGlowPoint(distance: number) {
      const point = lightPath!.getPointAtLength(distance % pathLength);
      const trailDist = (distance - 24 + pathLength) % pathLength;
      const trailP = lightPath!.getPointAtLength(trailDist);

      gsap.set(glowPoint, {
        attr: { cx: point.x, cy: point.y },
      });

      if (trailPoint) {
        gsap.set(trailPoint, {
          attr: { cx: trailP.x, cy: trailP.y },
        });
      }
    }

    function setActiveNode(index: number) {
      if (index === activeNodeIndexRef.current) {
        return;
      }

      activeNodeIndexRef.current = index;

      gsap.to(description, {
        opacity: 0,
        y: -3,
        duration: 0.22,
        ease: "power2.out",
        onComplete: () => {
          setActiveNodeIndex(index);
          gsap.fromTo(
            description,
            { opacity: 0, y: 3 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power2.inOut" }
          );
        },
      });
    }

    function syncActiveNode(distance: number) {
      const norm = distance % pathLength;
      const frac = norm / pathLength;

      if (frac >= 0 && frac < 0.28) {
        setActiveNode(0);
      } else if (frac >= 0.28 && frac < 0.52) {
        setActiveNode(1);
      } else if (frac >= 0.52 && frac < 0.78) {
        setActiveNode(2);
      } else {
        setActiveNode(3);
      }
    }

    gsap.set(lightPath, {
      strokeDasharray: `${lightLength} ${pathLength - lightLength}`,
      strokeDashoffset: pathLength,
    });
    moveGlowPoint(0);

    const introPulse = gsap.timeline({ delay: 0.4 });

    introPulse
      .fromTo(
        glowPoint,
        { attr: { r: 4 }, opacity: 0 },
        { attr: { r: 12 }, opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      .to(glowPoint, {
        attr: { r: 7 },
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

    if (trailPoint) {
      gsap.fromTo(
        trailPoint,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.5, delay: 0.6 }
      );
    }

    const loop = gsap.timeline({ delay: 1.0 });

    loop
      .to(lightPath, {
        strokeDashoffset: 0,
        duration: 8.0,
        ease: "none",
        repeat: -1,
      })
      .to(
        progress,
        {
          distance: pathLength,
          duration: 8.0,
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
  const activeNodeObj = nodes[currentDisplayIndex];
  const ActiveIcon = activeNodeObj.Icon;

  return (
    <div
      aria-label="Diagrama Interactivo de la Infraestructura Comercial Conectada"
      className="group relative w-full max-w-xl space-y-6 rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 via-card/50 to-card/90 p-6 shadow-[0_0_50px_rgba(60,245,181,0.06)] backdrop-blur-md transition-all duration-500 hover:border-accent-connection/40 hover:shadow-[0_0_60px_rgba(60,245,181,0.12)]"
    >
      {/* Cabecera del Diagrama */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-connection uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-connection opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-connection" />
          </span>
          Circuito de Infraestructura Comercial
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Pasa el cursor por cada capacidad
        </span>
      </div>

      <svg
        role="img"
        viewBox="0 0 460 260"
        className="h-auto w-full overflow-visible select-none"
      >
        <title>Infraestructura Comercial Conectada Promarketing</title>

        <defs>
          {/* Patrón de Rejilla de Fondo Técnico */}
          <pattern
            id="circuit-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(243, 242, 238, 0.03)"
              strokeWidth="1"
            />
          </pattern>

          {/* Gradiente de Resplandor Neón */}
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3CF5B5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E38035" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Fondo con Rejilla de Blueprint Técnico */}
        <rect width="460" height="260" fill="url(#circuit-grid)" rx="12" />

        {/* Rayos Radiales desde el Núcleo Central a cada uno de los 4 Nodos */}
        {nodes.map((node, idx) => (
          <line
            key={`ray-${node.id}`}
            x1="230"
            y1="130"
            x2={node.x}
            y2={node.y}
            stroke="#3CF5B5"
            strokeOpacity={currentDisplayIndex === idx ? "0.35" : "0.08"}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="transition-all duration-500"
          />
        ))}

        {/* Rutas de Conexión del Circuito Rectangular */}
        {connectorPaths.map((path, idx) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="#3CF5B5"
            strokeOpacity={currentDisplayIndex === idx ? "0.6" : "0.18"}
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
          stroke="url(#beamGrad)"
          strokeLinecap="round"
          strokeWidth="3.5"
          style={{
            filter: "drop-shadow(0 0 10px rgba(60, 245, 181, 0.85))",
          }}
        />

        {/* Estela del Rayo */}
        <circle
          ref={trailPointRef}
          cx="85"
          cy="65"
          r="4.5"
          fill="#3CF5B5"
          opacity="0"
          style={{ filter: "drop-shadow(0 0 6px #3CF5B5)" }}
        />

        {/* Punto de Luz Brillante Deslizante Sincronizado */}
        <circle
          ref={glowPointRef}
          cx="85"
          cy="65"
          r="7"
          fill="#3CF5B5"
          opacity="0"
          style={{
            filter:
              "drop-shadow(0 0 12px #3CF5B5) drop-shadow(0 0 24px rgba(60, 245, 181, 0.7))",
          }}
        />

        {/* Núcleo Central Rectangular con Isotipo Promarketing */}
        <g transform="translate(230, 130)">
          {/* Aura pulsante del núcleo central */}
          <rect
            x="-82"
            y="-32"
            width="164"
            height="64"
            rx="16"
            fill="none"
            stroke="#3CF5B5"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          <rect
            x="-78"
            y="-28"
            width="156"
            height="56"
            rx="14"
            fill="var(--card)"
            stroke="#3CF5B5"
            strokeOpacity="0.45"
            strokeWidth="2"
            className="shadow-2xl"
          />
          <foreignObject x="-64" y="-14" width="28" height="28">
            <BrandIsotipo size={28} className="text-accent-connection" />
          </foreignObject>
          <text
            x="12"
            y="-2"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-[11px] font-semibold tracking-tight"
          >
            Infraestructura
          </text>
          <text
            x="12"
            y="12"
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
          const isTopNode = y < 100;

          return (
            <g
              key={id}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Etiqueta de Capacidad (Sin sobreposición) */}
              <text
                x={x}
                y={isTopNode ? y - 36 : y + 46}
                fill={isActive ? "#3CF5B5" : "var(--muted-foreground)"}
                textAnchor="middle"
                className={`text-[12px] transition-colors duration-300 ${
                  isActive ? "font-bold text-accent-connection" : "font-medium"
                }`}
              >
                {label}
              </text>

              {/* Anillo de Onda Expandible Activa */}
              {isActive && (
                <circle
                  cx={x}
                  cy={y}
                  r="38"
                  fill="none"
                  stroke="#3CF5B5"
                  strokeOpacity="0.5"
                  className="animate-ping"
                />
              )}

              {/* Halo giratorio activo alrededor del nodo */}
              <circle
                cx={x}
                cy={y}
                r="34"
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
                r="26"
                fill={isActive ? "#171B19" : "var(--background)"}
                stroke={isActive ? "#3CF5B5" : "var(--border)"}
                strokeWidth={isActive ? "2.5" : "1.5"}
                className="transition-all duration-300 shadow-md"
                style={{
                  filter: isActive ? "drop-shadow(0 0 14px rgba(60, 245, 181, 0.5))" : "none",
                }}
              />

              {/* Ícono de Capacidad Centrado en el Nodo */}
              <foreignObject x={x - 12} y={y - 12} width="24" height="24">
                <Icon
                  aria-hidden="true"
                  className={`size-6 transition-colors duration-300 ${
                    isActive ? "text-accent-connection" : "text-foreground"
                  }`}
                  strokeWidth={2}
                />
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Caja de Descripción Estética de Alto Impacto con Badge del Nodo Activo */}
      <div className="relative overflow-hidden rounded-xl border border-accent-connection/30 bg-background/90 p-4 text-center shadow-[0_0_20px_rgba(60,245,181,0.08)] backdrop-blur-md transition-all duration-300">
        <div className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold text-accent-connection">
          <ActiveIcon className="size-4 text-accent-connection" />
          <span>{activeNodeObj.label}</span>
        </div>
        <p
          ref={descriptionRef}
          className="mx-auto min-h-11 max-w-md text-xs sm:text-sm leading-relaxed text-foreground/95 font-medium transition-opacity"
        >
          {nodeDescriptions[currentDisplayIndex]}
        </p>
      </div>
    </div>
  );
}
