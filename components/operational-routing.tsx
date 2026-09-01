"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";
import { ArrowUpRight, Magnet, GitMerge, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const doors = [
  {
    number: "01",
    title: "Atrae y Convierte",
    icon: Magnet,
    problem: "Para cuando el problema es: no te llegan suficientes prospectos calificados, o te llegan pero no cierras.",
    covers: "identidad de marca, anuncios, SEO/GEO/AEO, tu web, y si vendes en línea, tu proceso de checkout.",
    href: "/servicios",
    accent: "text-sky-400",
  },
  {
    number: "02",
    title: "Organiza y Escala",
    icon: GitMerge,
    problem: "Para cuando el problema es: tu equipo no da abasto, todo se coordina por WhatsApp y hojas sueltas, y se te caen oportunidades en el camino.",
    covers: "CRM, automatización de seguimiento, flujos de venta.",
    href: "/servicios/automatizacion-comercial",
    accent: "text-accent-connection",
  },
  {
    number: "03",
    title: "Mide y Controla",
    icon: BarChart2,
    problem: "Para cuando el problema es: no sabes con certeza qué canal te está dando resultado, ni cuánto te cuesta cada cliente real.",
    covers: "trazabilidad, atribución, tableros de control y rentabilidad.",
    href: "/servicios/tracking-y-trazabilidad",
    accent: "text-accent-decision",
  },
];

export function OperationalRouting() {
  const shouldReduceMotion = useReducedMotion();
  const itemVariant = fadeUpVariant({ reducedMotion: shouldReduceMotion ?? false });

  return (
    <section
      id="como-ayudamos"
      aria-labelledby="routing-title"
      className="relative px-6 py-24 sm:px-10 sm:py-32 border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Encabezado */}
        <div className="max-w-3xl space-y-4">
          <motion.span
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-semibold uppercase tracking-wider text-accent-connection"
          >
            Elige por dónde se te está escapando el dinero hoy
          </motion.span>
          <motion.h2
            id="routing-title"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            No necesitas resolver todo a la vez. Empieza por donde más te cuesta.
          </motion.h2>
        </div>

        {/* Las 3 Puertas */}
        <div className="grid gap-6 md:grid-cols-3">
          {doors.map((door, idx) => {
            const Icon = door.icon;
            return (
              <motion.div
                key={door.number}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2 + idx * 0.1}
                className="flex flex-col justify-between rounded-xl border border-border/70 bg-card p-6 sm:p-7 shadow-xs hover:border-accent-connection/50 transition-all hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      Puerta {door.number}
                    </span>
                    <Icon className={`size-5 ${door.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {door.title}
                  </h3>
                  <div className="space-y-2.5 text-sm">
                    <p className="text-foreground/90 font-medium leading-snug">
                      {door.problem}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      <strong>Cubre:</strong> {door.covers}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full justify-between hover:border-accent-connection hover:bg-accent-connection/10 cursor-pointer"
                  >
                    <Link href={door.href}>
                      <span>Explorar esta área</span>
                      <ArrowUpRight className="size-4 ml-1 opacity-70" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Micro-copy de Cierre */}
        <motion.p
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          ¿No estás seguro de cuál es tu prioridad? Lo resolvemos juntos en la conversación — no tienes que autodiagnosticarte antes de escribirnos.
        </motion.p>
      </div>
    </section>
  );
}
