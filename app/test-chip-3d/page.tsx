import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroChip3D } from "@/components/experimental/hero-chip-3d";

export const metadata: Metadata = {
  title: "Hero 3D Isotipo Preview | Promarketing",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestChip3DPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Botón flotante para regresar */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-md backdrop-blur-md transition-colors hover:border-accent-connection/50 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          <span>Volver al Inicio</span>
        </Link>
      </div>

      {/* SECCIÓN HERO COMPLETA (Simulación con la nueva estructura visual) */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:px-10 sm:pt-40 sm:pb-28">
        {/* Resplandor Ambiental de Fondo (Tokens del Design System) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 -z-10 size-[520px] rounded-full bg-accent-connection/10 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -left-32 -z-10 size-[420px] rounded-full bg-accent-decision/10 blur-[110px]"
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Columna Izquierda: Copy Estratégico Oficial */}
            <div className="max-w-2xl space-y-6">
              {/* Pill de Categoría de Marca */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent-connection/40 bg-secondary/80 px-4 py-1.5 text-xs font-semibold text-accent-connection shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-connection opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-connection" />
                </span>
                Firma de Sistemas Comerciales Integrados
              </div>

              {/* Titular Principal */}
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl sm:leading-[1.15]">
                Construimos las{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground to-accent-connection bg-clip-text text-transparent">
                  capacidades comerciales
                </span>{" "}
                que tu negocio necesita para funcionar mejor.
              </h1>

              {/* Bajada Promesa */}
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                Estrategia, marca, demanda, conversión, tecnología e información articuladas según lo que realmente necesitas resolver.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative h-12 px-6 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                >
                  <a href="#contacto">
                    <span>Cuéntanos qué necesitas</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium transition-all duration-300 hover:border-accent-connection/50 hover:bg-secondary/60"
                >
                  <a href="#como-ayudamos">
                    <span>Cómo ayudamos →</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Columna Derecha: Isotipo 3D orientado al texto con Stroke Line Animation */}
            <div className="w-full flex items-center justify-center">
              <HeroChip3D />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
