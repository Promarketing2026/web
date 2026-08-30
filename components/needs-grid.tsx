"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  LineChart,
  MessageSquare,
  Target,
  Tv,
  UserCheck,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

interface NeedDiagnostic {
  id: string;
  category: string;
  symptom: string;
  rootCause: string;
  architecture: {
    step1: string;
    step2: string;
    step3: string;
  };
  impactMetric: string;
  impactLabel: string;
  href: string;
  ctaText: string;
  icon: typeof Tv;
  highlightNode: "step1" | "step2" | "step3";
}

const diagnostics: NeedDiagnostic[] = [
  {
    id: "conversion",
    category: "Conversión",
    symptom: "Tengo oportunidades, pero no convierto",
    rootCause: "Fricción entre el interés del prospecto y la claridad de la propuesta o tiempos de respuesta lentos.",
    architecture: {
      step1: "Tráfico Calificado",
      step2: "Embudo de Alta Fricción Cero",
      step3: "Cierre en CRM Automatizado",
    },
    impactMetric: "+45%",
    impactLabel: "Incremento en tasa de conversión comercial",
    href: "/servicios/seo-geo-aeo",
    ctaText: "Ver Solución de Conversión",
    icon: Zap,
    highlightNode: "step2",
  },
  {
    id: "web",
    category: "Infraestructura Web",
    symptom: "Necesito una web o mejorar la que tengo",
    rootCause: "Tu sitio actual no comunica valor con claridad o no está diseñado como un motor de captación.",
    architecture: {
      step1: "Arquitectura Next.js 16",
      step2: "Diseño de Marca & UX",
      step3: "Integración Directa a CRM",
    },
    impactMetric: "< 1.2s",
    impactLabel: "Tiempo de carga y 100% optimizado para conversión",
    href: "/servicios/infraestructura-web",
    ctaText: "Ver Arquitectura Web",
    icon: Tv,
    highlightNode: "step1",
  },
  {
    id: "demanda",
    category: "Demanda B2B",
    symptom: "Necesito generar más oportunidades",
    rootCause: "Falta de un sistema predecible de atracción que filtre prospectos con verdadera intención de compra.",
    architecture: {
      step1: "Pauta Segmentada B2B",
      step2: "Captación con Filtro C.L.A.R.O.",
      step3: "Entrega Inmediata a Ventas",
    },
    impactMetric: "3.2x",
    impactLabel: "Mayor volumen de prospectos calificados",
    href: "/servicios/ads-paid-media",
    ctaText: "Ver Sistema de Demanda",
    icon: Target,
    highlightNode: "step1",
  },
  {
    id: "gestion",
    category: "Gestión Comercial",
    symptom: "Necesito ordenar ventas y seguimiento",
    rootCause: "Pérdida de prospectos por falta de trazabilidad, procesos desorganizados y seguimiento manual.",
    architecture: {
      step1: "Centralización en CRM",
      step2: "Pipelines por Etapas Claras",
      step3: "Alertas y SLAs de Cierre",
    },
    impactMetric: "100%",
    impactLabel: "Trazabilidad de cada oportunidad en tiempo real",
    href: "/servicios/ecommerce",
    ctaText: "Ver Solución de Gestión",
    icon: UserCheck,
    highlightNode: "step2",
  },
  {
    id: "automatizacion",
    category: "Automatización & IA",
    symptom: "Quiero automatizar procesos comerciales",
    rootCause: "El equipo pierde horas en tareas repetitivas en vez de enfocarse en negociar y cerrar clientes.",
    architecture: {
      step1: "Disparadores en Tiempo Real",
      step2: "Agentes IA & WhatsApp API",
      step3: "Sincronización de Base de Datos",
    },
    impactMetric: "-70%",
    impactLabel: "Reducción de tiempo operativo en tareas manuales",
    href: "/servicios/automatizacion-comercial",
    ctaText: "Ver Automatización Comercial",
    icon: MessageSquare,
    highlightNode: "step2",
  },
  {
    id: "tracking",
    category: "Atribución & Métricas",
    symptom: "No entiendo bien qué está funcionando",
    rootCause: "Datos dispersos en diferentes plataformas sin un modelo unificado de atribución de ingresos.",
    architecture: {
      step1: "Eventos Server-Side (CAPI)",
      step2: "Panel Unificado de Control",
      step3: "Decisiones con ROI Claro",
    },
    impactMetric: "0 Duda",
    impactLabel: "Claridad total de qué canal genera rentabilidad",
    href: "/servicios/tracking-trazabilidad",
    ctaText: "Ver Sistema de Atribución",
    icon: LineChart,
    highlightNode: "step3",
  },
];

export function NeedsGrid() {
  const [selectedId, setSelectedId] = useState<string>("conversion");
  const shouldReduceMotion = useReducedMotion();
  const sectionVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  const active = diagnostics.find((d) => d.id === selectedId) || diagnostics[0];
  const ActiveIcon = active.icon;

  return (
    <section id="necesidades" className="relative px-4 py-24 sm:px-8 sm:py-32 overflow-hidden bg-background">
      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -z-10 size-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-[100px]"
      />

      <div className="mx-auto max-w-6xl space-y-10">
        {/* Encabezado */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="max-w-2xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
            <Cpu className="size-3.5" />
            Terminal de Diagnóstico Comercial
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            ¿Qué necesitas resolver hoy?
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Selecciona el desafío actual de tu negocio para visualizar el diagnóstico y la arquitectura conectada que lo resuelve.
          </p>
        </motion.div>

        {/* Consola Interactiva de Dos Columnas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Columna Izquierda: Selector de Síntomas (5 cols) */}
          <div className="flex flex-col gap-2.5 lg:col-span-5">
            {diagnostics.map((item) => {
              const isSelected = item.id === selectedId;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                  aria-label={`Diagnóstico: ${item.category} - ${item.symptom}`}
                  className={`group relative flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-sky-400/80 bg-blue-600/15 shadow-lg shadow-cyan-500/10"
                      : "border-border/60 bg-card/40 hover:border-blue-500/40 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                        isSelected
                          ? "border-sky-400 bg-sky-500/20 text-sky-300 shadow-xs"
                          : "border-border/60 bg-secondary/50 text-muted-foreground group-hover:border-sky-400/40 group-hover:text-foreground"
                      }`}
                    >
                      <ItemIcon className="size-5" />
                    </span>
                    <div>
                      <span
                        className={`block text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                          isSelected ? "text-sky-400" : "text-muted-foreground"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-sky-300">
                        {item.symptom}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-transform ${
                      isSelected
                        ? "bg-sky-400 text-slate-950 scale-105"
                        : "text-muted-foreground/40 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                    }`}
                  >
                    <ArrowRight className="size-3.5" />
                  </span>

                  {/* Indicador de Activo */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeNeedIndicator"
                      className="absolute inset-y-0 -left-1 w-1.5 rounded-full bg-gradient-to-b from-sky-400 to-blue-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Opción de Evaluación Libre: "No estoy seguro" */}
            <div className="mt-2 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase">
                    ¿No estás seguro de cuál es tu prioridad?
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Evaluamos tu infraestructura comercial completa sin costo.
                  </p>
                </div>
                <a
                  href="#contacto"
                  className="shrink-0 rounded-xl border border-sky-400/40 bg-sky-500/20 px-3.5 py-1.5 text-xs font-bold text-sky-300 transition-colors hover:bg-sky-500/30 cursor-pointer"
                >
                  Auditar Stack →
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Visor de Arquitectura en Tiempo Real (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-card/90 to-[#030712]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Trama de cuadrícula técnica en fondo con animación sutil */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 animate-subtle-grid bg-[radial-gradient(rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_90%)]"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 space-y-6"
                >
                  {/* Cabecera del Diagnóstico */}
                  <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-5">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
                        Diagnóstico · {active.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        {active.symptom}
                      </h3>
                    </div>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/30 bg-blue-600/20 text-sky-300 shadow-md">
                      <ActiveIcon className="size-6" />
                    </span>
                  </div>

                  {/* Causa Raíz */}
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-4">
                    <span className="block text-[11px] font-mono font-bold tracking-wider text-sky-300 uppercase">
                      Causa Raíz de la Fricción
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {active.rootCause}
                    </p>
                  </div>

                  {/* Diagrama de Arquitectura Conectada (Flujo en 3 Pasos) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">
                        Arquitectura que lo Resuelve (Flujo Conectado)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Sincronizado
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Paso 1 */}
                      <div
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          active.highlightNode === "step1"
                            ? "border-sky-400 bg-sky-500/15 shadow-md shadow-cyan-500/15"
                            : "border-border/60 bg-card/60"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-sky-400">PASO 01</span>
                        <p className="mt-1 text-xs font-bold text-foreground leading-tight">
                          {active.architecture.step1}
                        </p>
                      </div>

                      {/* Paso 2 */}
                      <div
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          active.highlightNode === "step2"
                            ? "border-sky-400 bg-sky-500/15 shadow-md shadow-cyan-500/15"
                            : "border-border/60 bg-card/60"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-cyan-300">PASO 02</span>
                        <p className="mt-1 text-xs font-bold text-foreground leading-tight">
                          {active.architecture.step2}
                        </p>
                      </div>

                      {/* Paso 3 */}
                      <div
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          active.highlightNode === "step3"
                            ? "border-sky-400 bg-sky-500/15 shadow-md shadow-cyan-500/15"
                            : "border-border/60 bg-card/60"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-blue-400">PASO 03</span>
                        <p className="mt-1 text-xs font-bold text-foreground leading-tight">
                          {active.architecture.step3}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bloque de Impacto y CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-blue-500/30 bg-card/80 p-5">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent sm:text-4xl">
                        {active.impactMetric}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground leading-tight max-w-[200px]">
                        {active.impactLabel}
                      </span>
                    </div>

                    <Link
                      href={active.href}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/35 cursor-pointer"
                    >
                      <span>{active.ctaText}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
