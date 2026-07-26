import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8">
        <div className="max-w-4xl space-y-6">
          <h1
            id="hero-title"
            className="text-4xl leading-tight font-semibold text-foreground sm:text-5xl"
          >
            Diseñamos Infraestructura Comercial Conectada para organizaciones
            que necesitan crecer con claridad.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            Integramos marketing, ventas, datos y automatización en un
            ecosistema coherente y trazable — para que recuperes el control de
            tu operación.
          </p>
        </div>

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
