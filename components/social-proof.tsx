import { CaseResultCard } from "@/components/case-result-card";

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

        <CaseResultCard
          label="100%"
          result="de los lotes vendidos, en las 3 subastas"
          context="Antes: solo 6 de 45 lotes vendidos por subasta"
          className="max-w-3xl"
        />
      </div>
    </section>
  );
}
