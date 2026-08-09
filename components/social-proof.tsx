"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

export function SocialProof() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="evidencia"
      aria-labelledby="social-proof-title"
      className="border-b border-border bg-background px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-connection">
            Evidencia Factual
          </span>
          <h2
            id="social-proof-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Las ideas importan. Lo construido tiene que poder sostenerlas.
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Casos donde la intervención de infraestructura comercial transformó el desempeño del negocio.
          </p>
        </div>

        {/* Caso Destacado Estructurado */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl border border-accent-connection/40 bg-secondary/30 p-8 sm:p-10 space-y-8 shadow-md"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-connection">
              Caso de Éxito — Sector Inmobiliario / Público
            </span>
            <h3 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              EMILIMA: Cuando la inversión en publicidad no era el verdadero problema.
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-muted-foreground">01. Situación</span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                Inversión continua en publicidad digital omnicanal para subasta de lotes, pero con ventas mínimas por subasta (solo 6 de 45).
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-muted-foreground">02. Comprensión</span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                Marketing y ventas operaban incomunicados; la captación atraía curiosos en lugar de compradores cualificados por falta de diagnóstico.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-muted-foreground">03. Decisión</span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                Intervenir la relación entre la segmentación de la demanda, la cualificación previa y el proceso de atención comercial.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-muted-foreground">04. Intervención</span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                Rediseño de la oferta en landing pages, filtros de cualificación e integración de alerta inmediata al equipo de ventas.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-accent-connection">05. Evidencia</span>
              <p className="text-sm font-bold text-accent-connection leading-relaxed">
                100% de los lotes vendidos en 3 subastas consecutivas con el mismo presupuesto.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-muted-foreground">06. Aprendizaje</span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                La efectividad no depende de invertir más en anuncios, sino de asegurar la coherencia en todo el recorrido de conversión.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 flex items-center justify-between">
            <Link
              href="/casos-de-exito"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent-connection hover:underline"
            >
              <span>Ver todos los casos de éxito</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
