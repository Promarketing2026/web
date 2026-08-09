"use client";

import { useState } from "react";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const relationships = [
  {
    id: "marca-demanda",
    pair: "Marca ↔ Demanda",
    left: "Marca",
    right: "Demanda",
    example: "Una campaña publicitaria puede necesitar mejores anuncios, pero su conversión depende de cómo el mercado percibe la propuesta.",
    context: "Una marca clara reduce el costo de adquisición y facilita la consideración.",
  },
  {
    id: "web-proceso",
    pair: "Web ↔ Proceso Comercial",
    left: "Web / Experiencia",
    right: "Proceso Comercial",
    example: "Una web puede necesitar un nuevo diseño, pero de nada sirve si las oportunidades generadas no se atienden a tiempo.",
    context: "La experiencia digital debe conectarse directamente con la velocidad de respuesta comercial.",
  },
  {
    id: "captacion-conversion",
    pair: "Captación ↔ Conversión",
    left: "Captación",
    right: "Conversión",
    example: "Aumentar la inversión en ads trae más volumen, pero si hay fricción en la oferta, solo aumentarás el presupuesto sin mejorar el resultado.",
    context: "Optimizar la conversión antes de escalar la captación cuida el retorno de inversión.",
  },
  {
    id: "marketing-ventas",
    pair: "Marketing ↔ Ventas",
    left: "Marketing",
    right: "Ventas",
    example: "Marketing puede generar cientos de contactos, pero si ventas no comparte el mismo criterio de calificación, el esfuerzo se diluye.",
    context: "La alineación de criterios entre ambos equipos es la clave de la efectividad.",
  },
  {
    id: "tecnologia-adopcion",
    pair: "Tecnología ↔ Adopción",
    left: "Tecnología / CRM",
    right: "Adopción de Equipo",
    example: "Un CRM potente puede estar configurado, pero si el equipo sigue llevando el control en hojas sueltas, no habrá trazabilidad.",
    context: "La adopción del proceso es tan importante como la herramienta elegida.",
  },
  {
    id: "actividad-informacion",
    pair: "Actividad ↔ Información",
    left: "Actividad Comercial",
    right: "Información / Analítica",
    example: "Tener dashboards llenos de métricas no sirve si no responden a preguntas estratégicas sobre qué corregir.",
    context: "Medir lo relevante permite tomar decisiones basadas en evidencia real.",
  },
];

export function Tension() {
  const [selectedId, setSelectedId] = useState<string>("web-proceso");
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  const activeRel = relationships.find((r) => r.id === selectedId) || relationships[1];

  return (
    <section id="tension" className="relative px-6 py-24 sm:px-10 sm:py-32 border-y border-border/60 bg-background">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Intro */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
            Interdependencia Comercial
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Una necesidad puede ser concreta. Su contexto también importa.
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Resolver una parte puede aportar valor. Entender qué la condiciona permite decidir mejor antes de ejecutar.
          </p>
        </div>

        {/* Matriz Interactiva de Relaciones */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Selector de Parejas (6 Cols) */}
          <div className="space-y-2 lg:col-span-6">
            {relationships.map((rel) => {
              const isSelected = selectedId === rel.id;
              return (
                <button
                  key={rel.id}
                  onClick={() => setSelectedId(rel.id)}
                  className={`w-full text-left flex items-center justify-between rounded-lg border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-accent-connection bg-accent-connection/10 text-foreground font-semibold shadow-xs"
                      : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">{rel.pair}</span>
                  <ArrowLeftRight className={`size-4 transition-transform ${isSelected ? "text-accent-connection scale-110" : "opacity-40"}`} />
                </button>
              );
            })}
          </div>

          {/* Tarjeta de Detalle Dinámica (6 Cols) */}
          <motion.div
            key={activeRel.id}
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-accent-connection/40 bg-secondary/50 p-6 sm:p-8 space-y-6 lg:col-span-6 shadow-md"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-connection/40 bg-accent-connection/10 px-3 py-1 text-xs font-bold text-accent-connection">
              <span>{activeRel.left}</span>
              <ArrowLeftRight className="size-3" />
              <span>{activeRel.right}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground leading-snug">
                &ldquo;{activeRel.example}&rdquo;
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeRel.context}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-start gap-2.5 text-xs text-foreground font-medium">
              <CheckCircle2 className="size-4 text-accent-connection shrink-0 mt-0.5" />
              <span>
                Promarketing evalúa esta relación para asegurar que la solución elegida cumpla su función real en el negocio.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
