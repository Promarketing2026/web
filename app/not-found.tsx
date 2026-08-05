import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-[70vh] items-center px-4 py-28 sm:px-6"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Error 404
        </p>
        <h1
          id="not-found-title"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Esta página no está conectada
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          La dirección puede ser incorrecta o el contenido pudo haberse movido.
          Puedes volver al inicio o continuar explorando nuestros recursos.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 px-5">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Volver al inicio
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 px-5"
          >
            <Link href="/blog">
              <BookOpen aria-hidden="true" />
              Explorar el blog
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
