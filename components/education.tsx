"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, CheckCircle, Database, Layers, Target, Users } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

const systems = [
  {
    id: "marca",
    name: "Sistema de Marca",
    promise: "Construir significado, diferenciación y coherencia.",
    capabilities: ["Estrategia de marca", "Posicionamiento", "Identidad gráfica y verbal", "Expresión en canales", "Arquitectura de valor"],
    href: "/servicios/diseno-de-marca",
    icon: Layers,
    color: "accent-connection",
  },
  {
    id: "demanda",
    name: "Sistema de Demanda",
    promise: "Crear mejores condiciones para que el mercado adecuado conozca y considere la propuesta.",
    capabilities: ["Adquisición pagada (Paid Media)", "Estrategia SEO & AEO", "Marketing de contenidos", "Estrategia Go-To-Market", "Canales de captación"],
    href: "/servicios/ads-paid-media",
    icon: Target,
    color: "accent-connection",
  },
  {
    id: "conversion",
    name: "Sistema de Conversión",
    promise: "Ayudar a transformar interés en oportunidades y decisiones comerciales.",
    capabilities: ["Experiencia digital y Web", "Arquitectura de información & UX", "Optimización de tasa de conversión", "Mecanismos de contacto y captación"],
    href: "/servicios/infraestructura-web",
    icon: Users,
    color: "accent-connection",
  },
  {
    id: "gestion",
    name: "Sistema de Gestión Comercial",
    promise: "Coordinar cómo se atienden, gestionan y desarrollan oportunidades.",
    capabilities: ["Implementación CRM", "Automatización de seguimiento", "Definición de procesos de ventas", "Coordinación comercial", "Gestión de pipeline"],
    href: "/servicios/ecommerce",
    icon: Database,
    color: "accent-decision",
  },
  {
    id: "informacion",
    name: "Sistema de Información y Decisión",
    promise: "Entender mejor qué está ocurriendo para poder decidir con mayor fundamento.",
    capabilities: ["Tracking y trazabilidad end-to-end", "Analítica web y comercial", "Reporting unificado", "Atribución de resultados", "Tableros de decisión"],
    href: "/servicios/tracking-trazabilidad",
    icon: BarChart3,
    color: "accent-decision",
  },
];

export function Education() {
  const [activeSystemId, setActiveSystemId] = useState<string>("marca");
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  const activeSystem = systems.find((s) => s.id === activeSystemId) || systems[0];

  return (
    <section id="como-ayudamos" className="relative px-6 py-24 sm:px-10 sm:py-32 bg-secondary/20 border-b border-border/60">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Intro */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
            Arquitectura de Solución
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Organizamos capacidades alrededor de la función comercial que necesita mejorar.
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            No vendemos tácticas aisladas. Articulamos sistemas especializados según la necesidad real de tu negocio.
          </p>
        </div>

        {/* 5 Sistemas Nodos Interactive Container */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Navegación por Sistemas (5 cols) */}
          <div className="space-y-2 lg:col-span-5">
            {systems.map((sys) => {
              const isSelected = activeSystemId === sys.id;
              const Icon = sys.icon;
              return (
                <button
                  key={sys.id}
                  onClick={() => setActiveSystemId(sys.id)}
                  className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-accent-connection bg-accent-connection/10 text-foreground font-semibold shadow-xs"
                      : "border-border/60 bg-background/80 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-accent-connection/20 text-accent-connection" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold">{sys.name}</span>
                </button>
              );
            })}
          </div>

          {/* Ficha Detalle del Sistema Seleccionado (7 cols) */}
          <motion.div
            key={activeSystem.id}
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-accent-connection/40 bg-background p-6 sm:p-8 space-y-6 lg:col-span-7 shadow-xl"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
                Macro-Sistema Comercial
              </span>
              <h3 className="mt-1 text-2xl font-bold text-foreground">
                {activeSystem.name}
              </h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {activeSystem.promise}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Capacidades que pueden intervenir:
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {activeSystem.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle className="size-4 text-accent-connection shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Link
                href={activeSystem.href}
                className="inline-flex items-center gap-2 text-sm font-bold text-accent-connection hover:underline"
              >
                <span>Conocer {activeSystem.name}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cierre conceptual */}
        <div className="rounded-xl border border-border/80 bg-background/60 p-6 text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground">
            💡 <strong className="text-foreground">No necesitas activar los cinco sistemas.</strong> Una necesidad específica puede requerir una solución específica o la articulación gradual de varios módulos.
          </p>
        </div>
      </div>
    </section>
  );
}

