"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { BrandIsotipo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SolutionNavItem = {
  label: string;
  href: string;
};

const comoAyudamosItems = [
  { label: "Sistema de Marca", href: "/#como-ayudamos" },
  { label: "Sistema de Demanda", href: "/#como-ayudamos" },
  { label: "Sistema de Conversión", href: "/#como-ayudamos" },
  { label: "Sistema de Gestión Comercial", href: "/#como-ayudamos" },
  { label: "Sistema de Información y Decisión", href: "/#como-ayudamos" },
];

export function Navbar({ solutionItems }: { solutionItems: SolutionNavItem[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("inicio");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isManualScroll = useRef<boolean>(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    isManualScroll.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const routeActiveId = useMemo(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/servicios")) return "soluciones";
      if (pathname.startsWith("/blog") || pathname.startsWith("/glosario") || pathname.startsWith("/casos-de-exito")) return "conocimiento";
      return "";
    }
    return null;
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["inicio", "necesidades", "tension", "como-ayudamos", "demostracion", "como-pensamos", "evidencia", "conocimiento", "contacto"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScroll.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-15% 0px -55% 0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [pathname]);

  const effectiveActiveId = routeActiveId !== null ? routeActiveId : activeId;
  const activeOrHoveredId = hoveredId || effectiveActiveId;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/85 px-4 backdrop-blur-md transition-colors duration-300 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0">
        <Link
          href="/#inicio"
          onClick={() => handleNavClick("inicio")}
          className="group inline-flex items-center gap-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:text-accent-connection focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base rounded-md p-1 -ml-1"
        >
          <BrandIsotipo size={24} className="text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <span className="tracking-tight font-bold">Promarketing</span>
        </Link>

        {/* Navegación Principal */}
        <nav
          aria-label="Navegación principal"
          className="relative flex flex-wrap items-center gap-1 md:gap-1.5"
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Dropdown Soluciones */}
          <DropdownMenu>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("soluciones")}
              onFocus={() => setHoveredId("soluciones")}
              className="group relative inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {activeOrHoveredId === "soluciones" && (
                <motion.span
                  layoutId="kinetic-navbar-pill"
                  className="absolute inset-0 z-0 rounded-md border border-accent-connection/50 bg-secondary/80 shadow-xs"
                  transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${activeOrHoveredId === "soluciones" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Soluciones
              </span>
              <ChevronDown className="relative z-10 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {solutionItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="w-full text-xs sm:text-sm font-medium transition-colors hover:text-accent-connection">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Cómo ayudamos */}
          <DropdownMenu>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("como-ayudamos")}
              onFocus={() => setHoveredId("como-ayudamos")}
              className="group relative inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {activeOrHoveredId === "como-ayudamos" && (
                <motion.span
                  layoutId="kinetic-navbar-pill"
                  className="absolute inset-0 z-0 rounded-md border border-accent-connection/50 bg-secondary/80 shadow-xs"
                  transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${activeOrHoveredId === "como-ayudamos" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Cómo ayudamos
              </span>
              <ChevronDown className="relative z-10 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {comoAyudamosItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="w-full text-xs sm:text-sm font-medium transition-colors hover:text-accent-connection">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Link Cómo pensamos */}
          <Link
            href="/#como-pensamos"
            onMouseEnter={() => setHoveredId("como-pensamos")}
            onClick={() => handleNavClick("como-pensamos")}
            className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none rounded-md"
          >
            {activeOrHoveredId === "como-pensamos" && (
              <motion.span
                layoutId="kinetic-navbar-pill"
                className="absolute inset-0 z-0 rounded-md border border-accent-connection/50 bg-secondary/80 shadow-xs"
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${activeOrHoveredId === "como-pensamos" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Cómo pensamos
            </span>
          </Link>

          {/* Link Conocimiento */}
          <Link
            href="/blog"
            onMouseEnter={() => setHoveredId("conocimiento")}
            onClick={() => handleNavClick("conocimiento")}
            className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none rounded-md"
          >
            {activeOrHoveredId === "conocimiento" && (
              <motion.span
                layoutId="kinetic-navbar-pill"
                className="absolute inset-0 z-0 rounded-md border border-accent-connection/50 bg-secondary/80 shadow-xs"
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${activeOrHoveredId === "conocimiento" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Conocimiento
            </span>
          </Link>
        </nav>

        <Button
          asChild
          size="sm"
          className="group relative h-9 px-4 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20 active:translate-y-0 active:scale-98"
        >
          <Link href="/#contacto" onClick={() => handleNavClick("contacto")}>
            <span>Hablemos</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Button>
      </div>
    </header>
  );
}
