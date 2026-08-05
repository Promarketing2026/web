import { CaseResultCard } from "@/components/case-result-card";
import { client } from "@/sanity/lib/client";
import { CASOS_DE_EXITO_QUERY } from "@/sanity/lib/queries";
import type { CasoDeExito } from "@/sanity/lib/types";

export const metadata = {
  title: "Casos de éxito",
  description: "Casos de éxito de Promarketing Perú.",
  alternates: {
    canonical: "/casos-de-exito",
  },
};

function getSituacionExtracto(situacion: string) {
  if (situacion.length <= 220) {
    return situacion;
  }

  return `${situacion.slice(0, 217).trim()}...`;
}

export default async function CasosDeExitoPage() {
  const casos = await client.fetch<CasoDeExito[]>(CASOS_DE_EXITO_QUERY);

  return (
    <section className="border-y border-border bg-muted/40 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold tracking-normal text-muted-foreground uppercase">
            Casos de exito
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Resultados cuando el problema comercial se diagnostica antes de
            invertir mas.
          </h1>
        </div>

        {casos.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {casos.map((caso) => (
              <div
                key={caso._id}
                className="flex min-h-full flex-col gap-6 rounded-lg border border-border bg-card p-6 text-card-foreground sm:p-8"
              >
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">
                    {caso.cliente}
                  </p>
                  <h2 className="mt-4 text-2xl leading-tight font-semibold text-foreground">
                    Situacion
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {getSituacionExtracto(caso.situacion)}
                  </p>
                </div>

                <CaseResultCard
                  label={caso.cifraDestacada || "Resultado"}
                  result={caso.resultado}
                  className="mt-auto border-border bg-background"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg border border-border bg-card p-8 text-card-foreground">
            <p className="text-base leading-7 text-muted-foreground">
              Todavia no hay casos de exito publicados en Sanity.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
