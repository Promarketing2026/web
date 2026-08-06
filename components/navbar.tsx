"use client";

import { useEffect, useRef, useState } from "react";
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

  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  const targetId = hoveredId || activeId;

  const updatePill = (id: string | null) => {
    if (!id || !itemRefs.current[id]) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[id];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updatePill(targetId);
  }, [targetId]);

  useEffect(() => {
    const handleResize = () => updatePill(targetId);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [targetId]);

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

        {/* Navegación Principal con el efecto .pill exacto de kinetics.colorion.co */}
        <nav
          aria-label="Navegación principal"
          className="relative flex items-center gap-1 md:gap-2"
          onMouseLeave={() => {
            setHoveredId(null);
            updatePill(activeId);
          }}
        >
          {/* El elemento .pill con la regla CSS exacta de kinetics.colorion.co */}
          <span
            className="pill pointer-events-none absolute top-1 bottom-1 rounded-md border border-accent-connection/40 bg-secondary/80 shadow-xs"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
              transition:
                "left 0.4s cubic-bezier(0.65, 0, 0.35, 1), width 0.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease",
            }}
            aria-hidden="true"
          />

          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() => setActiveId(item.id)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              ref={(el) => {
                itemRefs.current["recursos"] = el;
              }}
              onMouseEnter={() => setHoveredId("recursos")}
              onFocus={() => setHoveredId("recursos")}
              onBlur={() => setHoveredId(null)}
              className="group relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <span>Recursos</span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection"
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
