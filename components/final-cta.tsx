import { AuditoriaForm } from "@/components/forms/auditoria-form";

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

        <p className="text-sm text-muted-foreground">
          Diagnóstico de tu operación comercial, sin costo.
        </p>

        <div className="w-full max-w-md text-left">
          <AuditoriaForm />
        </div>
      </div>
    </section>
  );
}
