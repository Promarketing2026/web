import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section
      id="contacto"
      aria-labelledby="final-cta-title"
      className="section-dark section-notch-top scroll-mt-16 px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
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
