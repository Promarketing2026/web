export function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-title"
      className="border-y border-border bg-muted/40 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="max-w-3xl space-y-6">
          <h2
            id="social-proof-title"
            className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl"
          >
            El caso EMILIMA: cuando la publicidad no era el problema.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            EMILIMA, una institución del Estado, invertía en publicidad
            omnicanal para su subasta pública de lotes — pero apenas vendía. El
            equipo de ventas y el de marketing operaban desconectados, y la
            publicidad no apuntaba al público objetivo correcto porque no se
            había diagnosticado el problema real del mercado.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            Investigamos, identificamos el error de raíz y reconectamos la
            comunicación entre ambos equipos y todo el sistema.
          </p>
        </div>

        <article
          aria-label="Resultado de las subastas de EMILIMA"
          className="max-w-3xl rounded-lg border border-border bg-card p-6 sm:p-8"
        >
          <p className="text-6xl leading-none font-semibold text-foreground">
            100%
          </p>
          <p className="mt-3 text-lg font-medium text-foreground">
            de los lotes vendidos, en las 3 subastas
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Antes: solo 6 de 45 lotes vendidos por subasta
          </p>
        </article>
      </div>
    </section>
  );
}
