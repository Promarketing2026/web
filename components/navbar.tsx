"use client";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/85 px-6 backdrop-blur-md transition-colors duration-300 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <Link
          href="/#inicio"
          className="group inline-flex items-center gap-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:text-accent-connection focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base rounded-md p-1 -ml-1"
        >
          <BrandIsotipo size={24} className="text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <span className="tracking-tight">Promarketing Perú</span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-5 md:gap-7"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-accent-connection transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full"
              />
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="group relative inline-flex items-center gap-1.5 py-1 text-sm font-medium text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-xs">
              <span>Recursos</span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-accent-connection transition-all duration-300 ease-out group-hover:w-full group-data-[state=open]:w-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {resourceItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="w-full font-medium transition-colors hover:text-accent-connection"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button
          asChild
          size="lg"
          className="group relative h-10 w-full gap-2 px-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20 active:translate-y-0 active:scale-98 sm:w-fit"
        >
          <Link href="/#contacto">
            <span>Solicitar Auditoría C.L.A.R.O.</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Button>
      </div>
    </header>
  );
}
