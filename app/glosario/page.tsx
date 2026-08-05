import { PortableText } from "@portabletext/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";
import { GLOSARIO_TERMINOS_QUERY } from "@/sanity/lib/queries";
import type { GlosarioTermino } from "@/sanity/lib/types";

export const metadata = {
  title: "Glosario",
  description: "Términos clave sobre infraestructura comercial y medición.",
  alternates: {
    canonical: "/glosario",
  },
};

export default async function GlosarioPage() {
  const terminos = await client.fetch<GlosarioTermino[]>(
    GLOSARIO_TERMINOS_QUERY,
  );

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-normal text-muted-foreground uppercase">
            Glosario
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Terminos clave para entender infraestructura comercial.
          </h1>
        </div>

        {terminos.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="mt-12 rounded-lg border border-border bg-card px-6 text-card-foreground"
          >
            {terminos.map((termino) => (
              <AccordionItem key={termino._id} value={termino._id}>
                <AccordionTrigger>
                  <div className="grid flex-1 gap-3 text-left sm:grid-cols-[minmax(180px,0.36fr)_1fr] sm:gap-8">
                    <h2 className="text-xl leading-snug font-semibold text-foreground">
                      {termino.termino}
                    </h2>
                    <p className="text-base leading-7 text-muted-foreground">
                      {termino.definicionCorta}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="border-t border-border pt-6 sm:ml-[calc(36%+2rem)]">
                    {termino.definicionExtendida?.length ? (
                      <div className="space-y-5 text-base leading-7 text-foreground">
                        <PortableText value={termino.definicionExtendida} />
                      </div>
                    ) : (
                      <p className="text-base leading-7 text-muted-foreground">
                        Este termino todavia no tiene definicion extendida
                        publicada.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="mt-12 rounded-lg border border-border bg-card p-8 text-card-foreground">
            <p className="text-base leading-7 text-muted-foreground">
              Todavia no hay terminos publicados en Sanity.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
