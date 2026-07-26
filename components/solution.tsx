const auditDimensions = [
  "Claridad",
  "Lógica",
  "Atribución",
  "Relación",
  "Optimización",
];

export function Solution() {
  return (
    <section
      id="solucion"
      aria-labelledby="solution-title"
      className="scroll-mt-16 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="max-w-3xl space-y-6">
          <h2
            id="solution-title"
            className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
          >
            Diagnosticamos antes de intervenir.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            La intervención de Promarketing nunca empieza ejecutando tácticas o
            campañas, sino diagnosticando la arquitectura comercial.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            El método principal para esto es la Auditoría C.L.A.R.O., que evalúa
            cinco dimensiones.
          </p>
        </div>

        <ul aria-label="Dimensiones de la Auditoría C.L.A.R.O." className="max-w-3xl border-t border-border">
          {auditDimensions.map((dimension) => (
            <li
              key={dimension}
              className="border-b border-border py-4 text-lg font-medium text-foreground"
            >
              {dimension}
            </li>
          ))}
        </ul>

        <div className="max-w-3xl space-y-8">
          <p className="text-lg leading-8 text-muted-foreground">
            A través de esta auditoría, Promarketing mapea tu operación real
            para identificar las fricciones, las pérdidas de información y las
            desconexiones exactas entre tus herramientas, el equipo de marketing
            y el de ventas.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            Una vez hecho el diagnóstico y conectada la infraestructura, el
            resultado tangible que recibes es un ecosistema digital integrado,
            medible y ordenado.
          </p>
          <p className="text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
            El mayor valor de esta entrega es la independencia operativa:
            obtienes un sistema que tu equipo comprende, puede auditar y logra
            sostener por sí mismo, sin depender permanentemente de Promarketing
            para que funcione.
          </p>
        </div>
      </div>
    </section>
  );
}
