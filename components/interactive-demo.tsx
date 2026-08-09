"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const demoTabs = [
  {
    id: "web",
    label: "Necesito una web",
    expressed: "Necesito rediseñar o crear una página web.",
    questions: [
      "¿Qué debe comprender exactamente el visitante antes de decidir?",
      "¿Qué acción comercial concreta debería realizar en el sitio?",
      "¿Qué papel cumple la web en la captación y en la conversión?",
      "¿Qué ocurre en el CRM inmediatamente después de que alguien contacta?",
      "¿Qué métricas de comportamiento necesitamos poder observar?",
    ],
    conclusion: "La necesidad sigue siendo una web. Lo que cambia es nuestra comprensión de qué web necesita realmente el negocio.",
  },
  {
    id: "leads",
    label: "Más oportunidades",
    expressed: "Necesito generar más leads o clientes potenciales.",
    questions: [
      "¿La propuesta de valor está siendo clara para la audiencia correcta?",
      "¿El segmento al que llegamos tiene verdadera intención de compra?",
      "¿Hay fricción entre el clic en el anuncio y la landing page?",
      "¿El equipo comercial atiende los leads dentro de las primeras horas?",
      "¿Tenemos datos claros sobre el costo por oportunidad real?",
    ],
    conclusion: "No asumimos automáticamente que más inversión publicitaria sea la solución.",
  },
  {
    id: "auto",
    label: "Automatizar",
    expressed: "Quiero automatizar procesos de venta y seguimiento.",
    questions: [
      "¿Qué proceso manual específico está generando el cuello de botella?",
      "¿Para qué se busca automatizar: velocidad, costo o precisión?",
      "¿Qué datos e integración requiere la automatización para no fallar?",
      "¿Quién en el equipo es responsable de dar seguimiento a la alerta?",
      "¿Qué ocurriría si automatizamos un proceso con errores de origen?",
    ],
    conclusion: "Primero definimos qué necesita funcionar. Después decidimos qué conviene automatizar.",
  },
];

export function InteractiveDemo() {
  const [activeTabId, setActiveTabId] = useState<string>("web");
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  const activeTab = demoTabs.find((t) => t.id === activeTabId) || demoTabs[0];

  return (
    <section id="demostracion" className="relative px-6 py-24 sm:px-10 sm:py-32 bg-background border-b border-border/60">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Encabezado */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
            Criterio de Intervención
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que cambia cuando entendemos mejor una necesidad
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            No cambiamos tu objetivo. Cambiamos la profundidad con la que analizamos lo que requiere tu negocio para lograrlo.
          </p>
        </div>

        {/* Tabs de Selección */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {demoTabs.map((tab) => {
            const isSelected = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-accent-connection/20 text-accent-connection border border-accent-connection/40 shadow-xs"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Estructura de 3 Columnas: Expresada -> Preguntas -> Conclusión */}
        <motion.div
          key={activeTab.id}
          variants={itemVariant}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-12"
        >
          {/* Columna 1: Necesidad Expresada (3 Cols) */}
          <div className="md:col-span-4 rounded-2xl border border-border/80 bg-secondary/30 p-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <HelpCircle className="size-4 text-accent-decision" />
              <span>Punto de Partida</span>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground">Necesidad expresada:</h3>
              <p className="mt-1 text-lg font-bold text-foreground">
                &ldquo;{activeTab.expressed}&rdquo;
              </p>
            </div>
          </div>

          {/* Columna 2: Preguntas y Contexto (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl border border-accent-connection/30 bg-background p-6 space-y-4 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-connection">
              <Sparkles className="size-4" />
              <span>Preguntas clave que exploramos</span>
            </div>
            <ul className="space-y-2.5">
              {activeTab.questions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                  <ArrowRight className="size-3.5 text-accent-connection shrink-0 mt-1" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Función Comprendida / Conclusión (3 Cols) */}
          <div className="md:col-span-3 rounded-2xl border border-accent-connection bg-accent-connection/10 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-connection">
                <CheckCircle2 className="size-4" />
                <span>Resultado</span>
              </div>
              <h4 className="text-sm font-bold text-foreground leading-snug">
                Comprensión Promarketing
              </h4>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                {activeTab.conclusion}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
