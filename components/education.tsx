"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { Layers, Network, LineChart } from "lucide-react";

import { EducationInfrastructureDiagram } from "@/components/education-infrastructure-diagram";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    id: 1,
    badge: "Etapa 1: El Problema",
    title: "Fragmentación Operativa",
    icon: Layers,
    description:
      "Muchas organizaciones invierten en múltiples canales digitales, pero operan a ciegas con sistemas aislados y datos incomunicados.",
  },
  {
    id: 2,
    badge: "Etapa 2: La Solución",
    title: "Infraestructura Conectada",
    icon: Network,
    description:
      "Se construye trazabilidad unificada para conectar marketing, ventas y analítica, rastreando el recorrido exacto de cada oportunidad comercial.",
  },
  {
    id: 3,
    badge: "Etapa 3: El Resultado",
    title: "Atribución y Crecimiento",
    icon: LineChart,
    description:
      "Sin capacidad de atribución, no puedes saber qué acciones generan ingresos reales. Con datos claros, cada decisión de inversión es óptima.",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const stages = gsap.utils.toArray<SVGGElement>("[data-education-stage]");
      const cardItems = gsap.utils.toArray<HTMLElement>("[data-education-card]");

      gsap.set(stages, { opacity: 0 });
      gsap.set(cardItems, {
        opacity: 0.4,
        scale: 0.98,
        borderColor: "var(--border)",
      });

      if (shouldReduceMotion) {
        gsap.set(stages, { opacity: 1 });
        gsap.set(cardItems, {
          opacity: 1,
          scale: 1,
          borderColor: "var(--border)",
        });
        return;
      }

      // Estado inicial (Etapa 1 activa)
      gsap.set(stages[0], { opacity: 1 });
      gsap.set(cardItems[0], {
        opacity: 1,
        scale: 1,
        borderColor: "var(--accent-connection)",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.8,
          pin: true,
        },
      });

      timeline
        // Mantener Etapa 1 visible un momento
        .to({}, { duration: 1 })
        // Transición Etapa 1 -> 2
        .to(stages[0], { opacity: 0, duration: 0.5, ease: "power2.inOut" })
        .to(stages[1], { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "<")
        .to(
          cardItems[0],
          { opacity: 0.4, scale: 0.98, borderColor: "var(--border)", duration: 0.5 },
          "<",
        )
        .to(
          cardItems[1],
          { opacity: 1, scale: 1, borderColor: "var(--accent-connection)", duration: 0.5 },
          "<",
        )
        // Mantener Etapa 2 visible
        .to({}, { duration: 1 })
        // Transición Etapa 2 -> 3
        .to(stages[1], { opacity: 0, duration: 0.5, ease: "power2.inOut" })
        .to(stages[2], { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "<")
        .to(
          cardItems[1],
          { opacity: 0.4, scale: 0.98, borderColor: "var(--border)", duration: 0.5 },
          "<",
        )
        .to(
          cardItems[2],
          { opacity: 1, scale: 1, borderColor: "var(--accent-decision)", duration: 0.5 },
          "<",
        )
        // Mantener Etapa 3 visible
        .to({}, { duration: 1 });
    },
    {
      dependencies: [shouldReduceMotion],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="education-title"
      className="px-6 py-20 sm:px-10 sm:py-28 bg-background relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-connection mb-3 block">
            Metodología y Diagnóstico
          </span>
          <h2
            id="education-title"
            className="text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl"
          >
            Invertir sin saber qué funciona no es una estrategia.
          </h2>
        </div>

        {/* Layout en Rejilla 2 Columnas (Texto/Tarjetas + Diagrama SVG) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Izquierda: Tarjetas de Etapa */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  data-education-card
                  data-education-item
                  className="p-6 rounded-2xl border bg-card/60 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-muted text-foreground">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Columna Derecha: Canvas Pinned con Diagrama SVG */}
          <div className="lg:col-span-7 flex items-center justify-center p-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md shadow-xl min-h-[380px]">
            <EducationInfrastructureDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

