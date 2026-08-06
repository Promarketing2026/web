"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { BrandIsotipo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { id: "inicio", label: "Inicio", href: "/#inicio" },
  { id: "solucion", label: "Solución", href: "/#solucion" },
  { id: "contacto", label: "Contacto", href: "/#contacto" },
];

const resourceItems = [
  { label: "Blog", href: "/blog" },
  { label: "Glosario", href: "/glosario" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("inicio");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeOrHoveredId = hoveredId || activeId;

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

        {/* Navegación Principal con Kinetic Sliding Pill de alta precisión y sin saltos */}
        <nav
          aria-label="Navegación principal"
          className="relative flex items-center gap-1 md:gap-2"
          onMouseLeave={() => setHoveredId(null)}
        >
          {navItems.map((item) => {
            const isSelected = activeOrHoveredId === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredId(item.id)}
                onClick={() => setActiveId(item.id)}
                onFocus={() => setHoveredId(item.id)}
                className="relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                {/* Desplazamiento kinetico fluido sin saltos iniciales ni parpadeos */}
                {isSelected && (
                  <motion.span
                    layoutId="kinetic-navbar-pill"
                    className="absolute inset-0 z-0 rounded-md border border-accent-connection/40 bg-secondary/80 shadow-xs"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            ease: [0.65, 0, 0.35, 1],
                            duration: 0.4,
                          }
                    }
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("recursos")}
              onFocus={() => setHoveredId("recursos")}
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {activeOrHoveredId === "recursos" && (
                <motion.span
                  layoutId="kinetic-navbar-pill"
                  className="absolute inset-0 z-0 rounded-md border border-accent-connection/40 bg-secondary/80 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          ease: [0.65, 0, 0.35, 1],
                          duration: 0.4,
                        }
                  }
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${activeOrHoveredId === "recursos" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Recursos
              </span>
              <ChevronDown
                aria-hidden="true"
                className="relative z-10 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection"
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
