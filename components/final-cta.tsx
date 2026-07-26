import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="border-t border-border bg-muted/40 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8">
        <h2
          id="final-cta-title"
          className="max-w-4xl text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
        >
          No escales la fragmentación. Construye la infraestructura necesaria
          para crecer con claridad.
        </h2>
        <div className="space-y-3">
          <Button asChild size="lg" className="h-11 px-4 text-sm">
            <a href="#contacto">
              Solicitar Auditoría C.L.A.R.O.
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Diagnóstico de tu operación comercial, sin costo.
          </p>
        </div>
      </div>
    </section>
  );
}
