import { Droplet, Gauge, TrendingUp } from "lucide-react";

const systems = ["Marketing", "Ventas", "Datos"];

function SystemBox({
  label,
  x,
  y,
}: {
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="118"
        height="54"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <text
        x={x + 59}
        y={y + 33}
        fill="var(--foreground)"
        textAnchor="middle"
        className="text-xs font-semibold"
      >
        {label}
      </text>
    </g>
  );
}

export function EducationInfrastructureDiagram() {
  return (
    <figure
      aria-label="De la fragmentación a la infraestructura conectada"
      className="w-full"
    >
      <svg
        role="img"
        viewBox="0 0 960 360"
        className="h-auto w-full overflow-visible"
      >
        <title>De la fragmentación a la infraestructura conectada</title>

        <g aria-label="Etapa 1: El problema" data-education-stage="1">
          <text
            x="150"
            y="34"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-sm font-semibold"
          >
            El problema
          </text>
          {systems.map((system, index) => (
            <SystemBox
              key={system}
              label={system}
              x={44 + index * 74}
              y={82 + index * 70}
            />
          ))}
          <path
            d="M 162 116 L 206 146 L 162 176"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeDasharray="9 5 2 6"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M 236 186 L 280 216 L 236 246"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeDasharray="5 7 11 4"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <Droplet
            aria-hidden="true"
            x={190}
            y={168}
            width={18}
            height={18}
            color="var(--muted-foreground)"
            strokeWidth={1.8}
          />
          <Droplet
            aria-hidden="true"
            x={262}
            y={238}
            width={18}
            height={18}
            color="var(--muted-foreground)"
            strokeWidth={1.8}
          />
        </g>

        <g aria-label="Etapa 2: La solución" data-education-stage="2">
          <text
            x="480"
            y="34"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-sm font-semibold"
          >
            La solución
          </text>
          <path
            d="M 348 196 H 612"
            fill="none"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d="M 340 246 H 620"
            fill="none"
            stroke="var(--border)"
            strokeLinecap="round"
            strokeWidth="2"
          />
          {systems.map((system, index) => (
            <SystemBox key={system} label={system} x={334 + index * 106} y={132} />
          ))}
        </g>

        <g aria-label="Etapa 3: El resultado" data-education-stage="3">
          <text
            x="800"
            y="34"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-sm font-semibold"
          >
            El resultado
          </text>
          <path
            d="M 650 196 H 770"
            fill="none"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d="M 770 196 L 754 184 M 770 196 L 754 208"
            fill="none"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <rect
            x="802"
            y="120"
            width="112"
            height="92"
            rx="10"
            fill="var(--background)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <Gauge
            aria-hidden="true"
            x={826}
            y={142}
            width={34}
            height={34}
            color="var(--foreground)"
            strokeWidth={1.8}
          />
          <TrendingUp
            aria-hidden="true"
            x={866}
            y={142}
            width={34}
            height={34}
            color="var(--foreground)"
            strokeWidth={1.8}
          />
          <path
            d="M 822 194 H 894"
            fill="none"
            stroke="var(--border)"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </figure>
  );
}
