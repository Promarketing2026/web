import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { BrandIsotipo } from "@/components/brand-logo";
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
        <Link
          href="/#inicio"
          className="group inline-flex items-center gap-2.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 sm:text-base"
        >
          <BrandIsotipo size={22} className="text-foreground" />
          <span>Promarketing Perú</span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-5 md:gap-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
              Recursos
              <ChevronDown aria-hidden="true" className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {resourceItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button asChild size="lg" className="h-11 w-full px-4 text-sm transition-transform active:scale-98 sm:w-fit">
          <Link href="/#contacto">
            Solicitar Auditoría C.L.A.R.O.
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
