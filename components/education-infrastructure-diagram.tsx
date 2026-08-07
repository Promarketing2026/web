import { Droplet, Gauge, TrendingUp, Zap, Activity } from "lucide-react";

const systems = ["Marketing", "Ventas", "Datos"];

function SystemBox({
  label,
  x,
  y,
  active = false,
}: {
  label: string;
  x: number;
  y: number;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="128"
        height="56"
        rx="10"
        fill="var(--background)"
        stroke={active ? "var(--accent-connection)" : "var(--border)"}
        strokeWidth={active ? "2" : "1.5"}
        className="transition-colors duration-300"
      />
      <text
        x={x + 64}
        y={y + 34}
        fill="var(--foreground)"
        textAnchor="middle"
        className="text-xs font-semibold tracking-wide"
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
      className="w-full flex items-center justify-center"
    >
      <svg
        role="img"
        viewBox="0 0 640 340"
        className="h-auto w-full max-w-2xl overflow-visible select-none"
      >
        <title>De la fragmentación a la infraestructura conectada</title>

        {/* FONDOS TÉCNICOS DE REJILLA Y DECORACIÓN */}
        <defs>
          <pattern
            id="education-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect
          width="640"
          height="340"
          rx="16"
          fill="url(#education-grid)"
          className="opacity-60"
        />

        {/* ETAPA 1: FRAGMENTACIÓN (EL PROBLEMA) */}
        <g
          aria-label="Etapa 1: Fragmentación y pérdida de datos"
          data-education-stage="1"
          className="transition-opacity duration-300"
        >
          {/* Badge de Etapa */}
          <rect
            x="240"
            y="20"
            width="160"
            height="28"
            rx="14"
            fill="var(--muted)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="320"
            y="38"
            fill="var(--muted-foreground)"
            textAnchor="middle"
            className="text-xs font-medium uppercase tracking-wider"
          >
            1. Fragmentación
          </text>

          {/* Cajas desconectadas */}
          <SystemBox label="Marketing" x={80} y={90} />
          <SystemBox label="Ventas" x={256} y={170} />
          <SystemBox label="Datos" x={432} y={250} />

          {/* Rutas rotas con fuga */}
          <path
            d="M 208 118 L 256 145"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="M 384 198 L 432 225"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Íconos de Fuga */}
          <g transform="translate(224, 138)">
            <circle cx="0" cy="0" r="14" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
            <Droplet
              aria-hidden="true"
              x={-7}
              y={-7}
              width={14}
              height={14}
              className="text-destructive"
              strokeWidth={2}
            />
          </g>
          <g transform="translate(402, 218)">
            <circle cx="0" cy="0" r="14" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
            <Droplet
              aria-hidden="true"
              x={-7}
              y={-7}
              width={14}
              height={14}
              className="text-destructive"
              strokeWidth={2}
            />
          </g>
        </g>

        {/* ETAPA 2: CONEXIÓN (LA SOLUCIÓN) */}
        <g
          aria-label="Etapa 2: Infraestructura conectada"
          data-education-stage="2"
          className="transition-opacity duration-300"
        >
          {/* Badge de Etapa */}
          <rect
            x="240"
            y="20"
            width="160"
            height="28"
            rx="14"
            fill="var(--background)"
            stroke="var(--accent-connection)"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="38"
            fill="var(--accent-connection)"
            textAnchor="middle"
            className="text-xs font-semibold uppercase tracking-wider"
          >
            2. Conexión
          </text>

          {/* Cajas Alineadas */}
          {systems.map((system, index) => (
            <SystemBox
              key={system}
              label={system}
              x={80 + index * 180}
              y={90}
              active
            />
          ))}

          {/* Bus de Datos Central */}
          <path
            d="M 144 146 V 210 H 496 V 146"
            fill="none"
            stroke="var(--accent-connection)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 320 146 V 210"
            fill="none"
            stroke="var(--accent-connection)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Nodo Integrador Central */}
          <g transform="translate(320, 210)">
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="var(--background)"
              stroke="var(--accent-connection)"
              strokeWidth="2"
            />
            <Zap
              aria-hidden="true"
              x={-10}
              y={-10}
              width={20}
              height={20}
              fill="var(--accent-connection)"
              className="text-accent-connection"
            />
          </g>

          <text
            x="320"
            y="262"
            fill="var(--foreground)"
            textAnchor="middle"
            className="text-xs font-medium"
          >
            Trazabilidad Unificada
          </text>
        </g>

        {/* ETAPA 3: ATRIBUCIÓN Y RESULTADO (EL RESULTADO) */}
        <g
          aria-label="Etapa 3: Atribución y Crecimiento"
          data-education-stage="3"
          className="transition-opacity duration-300"
        >
          {/* Badge de Etapa */}
          <rect
            x="230"
            y="20"
            width="180"
            height="28"
            rx="14"
            fill="var(--background)"
            stroke="var(--accent-decision)"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="38"
            fill="var(--accent-decision)"
            textAnchor="middle"
            className="text-xs font-semibold uppercase tracking-wider"
          >
            3. Atribución Total
          </text>

          {/* Tuberías de datos convergiendo al Panel */}
          <path
            d="M 80 120 H 220 C 250 120 250 170 280 170 H 360"
            fill="none"
            stroke="var(--accent-connection)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Dashboard Central de Atribución */}
          <rect
            x="180"
            y="90"
            width="280"
            height="180"
            rx="16"
            fill="var(--background)"
            stroke="var(--accent-decision)"
            strokeWidth="2"
            className="shadow-2xl"
          />

          {/* Encabezado del Dashboard */}
          <rect x="200" y="110" width="240" height="32" rx="6" fill="var(--muted)" />
          <Activity x={212} y={118} width={16} height={16} className="text-foreground" />
          <text
            x="238"
            y="131"
            fill="var(--foreground)"
            className="text-xs font-semibold"
          >
            Panel de Atribución C.L.A.R.O.
          </text>

          {/* Métricas e Indicadores */}
          <g transform="translate(200, 156)">
            <rect width="112" height="94" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
            <Gauge x={12} y={14} width={22} height={22} className="text-accent-connection" />
            <text x={12} y={54} fill="var(--muted-foreground)" className="text-[10px]">
              Trazabilidad
            </text>
            <text x={12} y={74} fill="var(--foreground)" className="text-base font-bold">
              100%
            </text>
          </g>

          <g transform="translate(328, 156)">
            <rect width="112" height="94" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
            <TrendingUp x={12} y={14} width={22} height={22} className="text-accent-decision" />
            <text x={12} y={54} fill="var(--muted-foreground)" className="text-[10px]">
              Retorno ROI
            </text>
            <text x={12} y={74} fill="var(--foreground)" className="text-base font-bold">
              Medible
            </text>
          </g>
        </g>
      </svg>
    </figure>
  );
}
