import { ArrowUpRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Solución", href: "/#solucion" },
  { label: "Contacto", href: "/#contacto" },
];

const resourceItems = [
  { label: "Blog", href: "/blog" },
  { label: "Glosario", href: "/glosario" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
];

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 px-6 backdrop-blur-md sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <a
          href="/#inicio"
          className="text-sm font-semibold text-foreground sm:text-base"
        >
          Promarketing Perú
        </a>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-5 md:gap-6"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
              Recursos
              <ChevronDown aria-hidden="true" className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {resourceItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <a href={item.href}>{item.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button asChild size="lg" className="h-11 w-full px-4 text-sm sm:w-fit">
          <a href="/#contacto">
            Solicitar Auditoría C.L.A.R.O.
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
