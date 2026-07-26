import { EducationInfrastructureDiagram } from "@/components/education-infrastructure-diagram";

export function Education() {
  return (
    <section
      aria-labelledby="education-title"
      className="px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <h2
          id="education-title"
          className="max-w-3xl text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
        >
          Invertir sin saber qué funciona no es una estrategia.
        </h2>
        <div className="max-w-3xl space-y-8">
          <p data-education-item className="text-lg leading-8 text-muted-foreground">
            Muchas organizaciones invierten en múltiples canales, pero operan a
            ciegas.
          </p>
          <p data-education-item className="text-lg leading-8 text-muted-foreground">
            Se necesita construir trazabilidad para poder rastrear el origen, el
            recorrido y el resultado exacto de cada oportunidad comercial.
          </p>
          <p
            data-education-item
            className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl"
          >
            Sin capacidad de atribución, no puedes saber qué acciones generan
            resultados reales — y terminas tomando decisiones con información
            parcial.
          </p>
        </div>
        <EducationInfrastructureDiagram />
      </div>
    </section>
  );
}
