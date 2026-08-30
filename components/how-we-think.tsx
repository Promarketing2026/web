"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

interface MethodPhase {
  id: string;
  number: string;
  name: string;
  tagline: string;
  iconType: "asterisk" | "core" | "star";
  description: string;
  deliverables: string[];
  stack: string[];
  principles: { title: string; desc: string }[];
}

const methodPhases: MethodPhase[] = [
  {
    id: "diagnostico",
    number: "FASE 01",
    name: "Diagnóstico",
    tagline: "Comprender y detectar fricciones antes de prescribir",
    iconType: "asterisk",
    description:
      "Separamos lo que sabemos con certeza de lo que estamos interpretando. Auditamos tus canales, métricas reales de conversión y tiempos de respuesta para identificar exactamente dónde se pierde dinero o velocidad.",
    deliverables: [
      "Mapa de Fricción Comercial y Puntos de Fuga",
      "Auditoría de Stack Tecnológico y Datos (C.L.A.R.O.)",
      "Plan de Intervención Priorizado por Impacto / Esfuerzo",
    ],
    stack: ["Google Analytics 4", "Hotjar / Clarity", "HubSpot CRM", "Meta CAPI"],
    principles: [
      { title: "Comprender", desc: "Verificar datos reales vs. suposiciones subjetivas del negocio." },
      { title: "Relacionar", desc: "Examinar interdependencias entre marca, web, pauta y ventas." },
    ],
  },
  {
    id: "arquitectura",
    number: "FASE 02",
    name: "Arquitectura",
    tagline: "Diseño y conexión del ecosistema comercial sin fricción",
    iconType: "core",
    description:
      "Construimos o rediseñamos tu infraestructura web y la conectamos directamente con tus sistemas de demanda y CRM. Nada de herramientas aisladas: cada visita y prospecto queda registrado, medido y atendido automáticamente.",
    deliverables: [
      "Plataforma Web Next.js 16 de Alta Conversión (< 1.2s)",
      "Sincronización Bidireccional Web ↔ CRM ↔ WhatsApp API",
      "Automatizaciones de Notificación y Asignación Inmediata",
    ],
    stack: ["Next.js 16", "Tailwind v4", "HubSpot / Salesforce", "WhatsApp Business API"],
    principles: [
      { title: "Decidir", desc: "Intervenir únicamente la función comercial que genera cuello de botella." },
      { title: "Articular", desc: "Integrar el stack necesario sin sobrecostos ni complejidad innecesaria." },
    ],
  },
  {
    id: "escalamiento",
    number: "FASE 03",
    name: "Escalamiento",
    tagline: "Demanda predecible y optimización continua basada en datos",
    iconType: "star",
    description:
      "Activamos campañas de adquisición B2B de precisión, automatizamos procesos comerciales con agentes de IA y optimizamos cada etapa del embudo con trazabilidad de atribución en tiempo real.",
    deliverables: [
      "Estrategia de Adquisición Pagada (Meta Ads / Google Ads / LinkedIn)",
      "Agentes de Automatización para Calificación 24/7",
      "Tableros de Decisión con ROI y Costo de Adquisición Claro",
    ],
    stack: ["Google Ads", "Meta Ads Manager", "Make / n8n", "OpenAI / Claude"],
    principles: [
      { title: "Implementar", desc: "Llevar la estrategia a condiciones reales de ejecución operativa." },
      { title: "Aprender", desc: "Utilizar la evidencia empírica para iterar y escalar rentablemente." },
    ],
  },
];

export function HowWeThink() {
  const [activePhaseId, setActivePhaseId] = useState<string>("arquitectura");
  const shouldReduceMotion = useReducedMotion();
  const sectionVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  const activePhase = methodPhases.find((p) => p.id === activePhaseId) || methodPhases[1];

  return (
    <section
      id="como-pensamos"
      className="relative px-4 py-24 sm:px-8 sm:py-32 overflow-hidden bg-[#030712] border-t border-border/40"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,rgba(0,229,255,0.06)_45%,transparent_75%)] blur-[100px]"
      />

      <div className="mx-auto max-w-5xl space-y-12">
        {/* Encabezado */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
            <Cpu className="size-3.5" />
            Criterio Metodológico
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            El Método Promarketing
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Comprender antes de prescribir. Selecciona cada fase para explorar la lógica, entregables y tecnología con la que operamos.
          </p>
        </motion.div>

        {/* 1. Selector Táctil de Botones de Cristal con Halo Neón (Inspirado en la Consola de IA) */}
        <div className="relative flex flex-col items-center justify-center pt-4">
          <div className="grid grid-cols-3 gap-3.5 sm:gap-6 w-full max-w-2xl">
            {methodPhases.map((phase) => {
              const isActive = phase.id === activePhaseId;

              return (
                <div key={phase.id} className="flex flex-col items-center">
                  <span
                    className={`mb-2 text-xs font-semibold transition-colors ${
                      isActive ? "text-foreground font-bold" : "text-muted-foreground/80"
                    }`}
                  >
                    {phase.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActivePhaseId(phase.id)}
                    aria-pressed={isActive}
                    aria-label={`Fase Metodológica: ${phase.name} (${phase.number})`}
                    className={`group relative flex aspect-square w-full items-center justify-center rounded-[24px] sm:rounded-[28px] border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-sky-400 bg-[#090E1A]/90 shadow-[0_0_35px_rgba(0,229,255,0.45)] ring-2 ring-sky-400/60 scale-105"
                        : "border-white/15 bg-white/[0.04] hover:border-sky-400/40 hover:bg-white/[0.08] backdrop-blur-xl"
                    }`}
                  >
                    {/* Resplandor especular superior */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />

                    {/* Iconos Gráficos Estilizados en Neón */}
                    {phase.iconType === "asterisk" && (
                      <div
                        className={`transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" : "text-muted-foreground/60"
                        }`}
                      >
                        {/* Asterisco Neón (Fase 1) */}
                        <svg className="size-8 sm:size-11" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                          <line x1="24" y1="6" x2="24" y2="42" />
                          <line x1="6" y1="24" x2="42" y2="24" />
                          <line x1="11.3" y1="11.3" x2="36.7" y2="36.7" />
                          <line x1="11.3" y1="36.7" x2="36.7" y2="11.3" />
                        </svg>
                      </div>
                    )}

                    {phase.iconType === "core" && (
                      <div
                        className={`transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.9)]" : "text-muted-foreground/60"
                        }`}
                      >
                        {/* Vórtice / Motor Comercial Conectado (Fase 2) */}
                        <svg className="size-8 sm:size-11" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="24" cy="24" r="7" />
                          <path d="M 24 10 C 29 10, 38 12, 38 24 C 38 32, 29 38, 24 38" />
                          <path d="M 10 24 C 10 29, 12 38, 24 38" />
                          <path d="M 24 10 C 19 10, 10 12, 10 24" />
                          <circle cx="24" cy="24" r="16" strokeDasharray="4 4" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}

                    {phase.iconType === "star" && (
                      <div
                        className={`transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" : "text-muted-foreground/60"
                        }`}
                      >
                        {/* Estrella Diamante Neón (Fase 3) */}
                        <svg className="size-8 sm:size-11" viewBox="0 0 48 48" fill="currentColor">
                          <path d="M 24 4 Q 24 24, 4 24 Q 24 24, 24 44 Q 24 24, 44 24 Q 24 24, 24 4 Z" />
                        </svg>
                      </div>
                    )}

                    {/* Indicador de Activo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeMethodHalo"
                        className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] border-2 border-sky-400"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dedo Táctil Indicador en la Base */}
          <div className="relative mt-3 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400">
              <span className="size-1.5 rounded-full bg-cyan-300 animate-ping" />
              Toca o haz clic para cambiar de fase
            </span>
          </div>
        </div>

        {/* 2. Consola de Despliegue de la Fase Seleccionada */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#090E1A]/95 to-[#030712]/98 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Trama de cuadrícula de fondo con animación sutil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-subtle-grid bg-[radial-gradient(rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_90%)]"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="relative z-10 space-y-8"
            >
              {/* Cabecera de la Fase */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-sky-400/40 bg-sky-500/15 px-2.5 py-0.5 text-[11px] font-mono font-bold text-sky-300">
                      {activePhase.number}
                    </span>
                    <span className="text-xs font-mono font-semibold tracking-wider text-muted-foreground uppercase">
                      Metodología de Ejecución
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {activePhase.name} · <span className="text-sky-400">{activePhase.tagline}</span>
                  </h3>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">
                {activePhase.description}
              </p>

              {/* Entregables y Principios */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Entregables Concretos */}
                <div className="rounded-2xl border border-blue-500/25 bg-blue-950/20 p-5 space-y-3">
                  <span className="block text-xs font-mono font-bold tracking-wider text-sky-400 uppercase">
                    Entregables Tangibles
                  </span>
                  <ul className="space-y-2.5">
                    {activePhase.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                        <CheckCircle2 className="size-4 shrink-0 text-cyan-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Tecnológico Conectado */}
                <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-3">
                  <span className="block text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">
                    Stack & Integraciones Clave
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activePhase.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-[#030712] px-3 py-1.5 text-xs font-mono font-medium text-sky-300"
                      >
                        <Zap className="size-3 text-cyan-300" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Principios de Rigor */}
                  <div className="mt-4 pt-3 border-t border-border/40 space-y-2">
                    <span className="block text-[11px] font-mono font-semibold text-muted-foreground uppercase">
                      Criterio de Rigor
                    </span>
                    {activePhase.principles.map((pr) => (
                      <div key={pr.title} className="text-xs text-muted-foreground">
                        <strong className="text-foreground">{pr.title}:</strong> {pr.desc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Acción Directo */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-muted-foreground text-center sm:text-left">
                  Diseñado para generar tracción real sin obligar a rehacer tu empresa desde cero.
                </span>
                <Link
                  href="/servicios"
                  className="group inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 cursor-pointer"
                >
                  <span>Explorar Capacidades Conectadas</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
