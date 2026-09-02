"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Globe,
  HelpCircle,
  Layers,
  Palette,
  Search,
  ShoppingCart,
  Target,
  Zap,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BrandIsotipo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { RollingText } from "@/components/ui/rolling-text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SolutionNavItem = {
  label: string;
  href: string;
  subtitle?: string;
  iconName?: string;
};

const serviceIcons: Record<string, React.ElementType> = {
  Palette,
  Globe,
  ShoppingCart,
  Search,
  Target,
  Zap,
  Activity,
};

const navDoors = [
  {
    number: "01",
    name: "Atrae y Convierte",
    accent: "text-sky-400",
    slugs: [
      "diseno-y-gestion-de-marca",
      "infraestructura-web",
      "ecommerce-y-conversion",
      "seo-geo-aeo",
      "ads-paid-media",
    ],
  },
  {
    number: "02",
    name: "Organiza y Escala",
    accent: "text-accent-connection",
    slugs: ["automatizacion-comercial"],
  },
  {
    number: "03",
    name: "Mide y Controla",
    accent: "text-accent-decision",
    slugs: ["tracking-y-trazabilidad"],
  },
];

const recursosItems = [
  {
    label: "Cómo pensamos",
    href: "/#como-pensamos",
    subtitle: "Principios de diseño y arquitectura comercial",
    icon: Layers,
  },
  {
    label: "Blog de Estrategia",
    href: "/blog",
    subtitle: "Artículos sobre tecnología, conversión y demanda",
    icon: BookOpen,
  },
  {
    label: "Glosario Comercial",
    href: "/glosario",
    subtitle: "Conceptos clave de operaciones comerciales",
    icon: HelpCircle,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/promarketingperu",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://pe.linkedin.com/company/promarketingpe",
    icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ProMarketingConsulting/",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@promarketingperu",
    icon: FaYoutube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@promarketingperu",
    icon: FaTiktok,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/promarketing",
    icon: FaXTwitter,
  },
];

export function Navbar({ solutionItems }: { solutionItems: SolutionNavItem[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("inicio");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const shouldReduceMotion = useReducedMotion();

  // Resetear el menú cuando cambia la ruta
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const isManualScroll = useRef<boolean>(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (id?: string) => {
    if (id) setActiveId(id);
    setMenuOpen(false);
    isManualScroll.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const routeActiveId = useMemo(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/servicios")) return "soluciones";
      if (pathname.startsWith("/casos-de-exito")) return "casos";
      if (pathname.startsWith("/blog") || pathname.startsWith("/glosario")) return "recursos";
      return "";
    }
    return null;
  }, [pathname]);

  // Listener de scroll para cambiar opacidad del Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver para secciones activas del Home
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["inicio", "tension", "como-pensamos", "como-ayudamos", "autonomia", "contacto"];
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

  // Agrupar los servicios en las 3 Puertas
  const servicesByDoor = useMemo(() => {
    return navDoors.map((door) => ({
      ...door,
      items: solutionItems.filter((item) =>
        door.slugs.some((slug) => item.href.endsWith(`/${slug}`)),
      ),
    }));
  }, [solutionItems]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 transition-all duration-300 sm:px-8 ${
        isScrolled || menuOpen
          ? "border-border/80 bg-background/90 shadow-xs backdrop-blur-md"
          : "border-transparent bg-background/45 backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3 md:h-16 md:py-0">
        {/* Logo de Marca */}
        <Link
          href="/#inicio"
          onClick={() => handleNavClick("inicio")}
          className="group inline-flex items-center gap-2.5 rounded-md p-1 -ml-1 text-sm font-semibold text-foreground transition-all duration-300 hover:text-accent-connection active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base cursor-pointer"
        >
          <BrandIsotipo size={24} className="text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95" />
          <span className="tracking-tight font-bold">Promarketing</span>
        </Link>

        {/* Navegación Principal en Desktop */}
        <nav
          aria-label="Navegación principal"
          className="relative hidden items-center gap-1 md:flex md:gap-1.5"
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Dropdown Soluciones (Agrupado por las 3 Puertas) */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("soluciones")}
              onFocus={() => setHoveredId("soluciones")}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
            >
              <span
                className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                  hoveredId === "soluciones" || effectiveActiveId === "soluciones"
                    ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
              <span className="relative z-10">
                <RollingText
                  text="Soluciones"
                  active={effectiveActiveId === "soluciones"}
                  className="text-muted-foreground transition-colors group-hover:text-accent-connection"
                />
              </span>
              <ChevronDown className="relative z-10 size-4 text-muted-foreground transition-all duration-200 group-hover:text-accent-connection group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[420px] p-3 space-y-3 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border/50 pb-2 px-1">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  Sistemas por Puerta de Entrada
                </span>
                <Link
                  href="/servicios"
                  className="text-[11px] font-semibold text-accent-connection hover:underline"
                >
                  Ver todos (7)
                </Link>
              </div>

              {servicesByDoor.map((door) => (
                <div key={door.number} className="space-y-1">
                  <div className="flex items-center gap-1.5 px-2 pt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    <span className={door.accent}>Puerta {door.number}</span>
                    <span>·</span>
                    <span className="text-foreground">{door.name}</span>
                  </div>
                  {door.items.map((item) => {
                    const IconComponent = item.iconName ? serviceIcons[item.iconName] || Zap : Zap;
                    return (
                      <DropdownMenuItem key={item.label} asChild className="cursor-pointer">
                        <Link
                          href={item.href}
                          className="group flex items-start gap-2.5 rounded-lg p-2 transition-all duration-150 hover:bg-muted/60 active:scale-98"
                        >
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-all group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15">
                            <IconComponent className="size-3.5" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-accent-connection">
                              {item.label}
                            </span>
                            {item.subtitle && (
                              <span className="text-[11px] leading-tight text-muted-foreground line-clamp-1">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Link Directo: Casos de Éxito */}
          <Link
            href="/casos-de-exito"
            onMouseEnter={() => setHoveredId("casos")}
            onClick={() => handleNavClick()}
            className="group relative inline-flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
          >
            <span
              className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                hoveredId === "casos" || effectiveActiveId === "casos"
                  ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            />
            <span className="relative z-10">
              <RollingText
                text="Casos de Éxito"
                active={effectiveActiveId === "casos"}
                className="text-muted-foreground transition-colors group-hover:text-accent-connection"
              />
            </span>
          </Link>

          {/* Dropdown Recursos */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("recursos")}
              onFocus={() => setHoveredId("recursos")}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
            >
              <span
                className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                  hoveredId === "recursos" || effectiveActiveId === "recursos"
                    ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
              <span className="relative z-10">
                <RollingText
                  text="Recursos"
                  active={effectiveActiveId === "recursos"}
                  className="text-muted-foreground transition-colors group-hover:text-accent-connection"
                />
              </span>
              <ChevronDown className="relative z-10 size-4 text-muted-foreground transition-all duration-200 group-hover:text-accent-connection group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[320px] p-2 space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                Conocimiento y Método
              </div>
              {recursosItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <DropdownMenuItem key={item.label} asChild className="cursor-pointer">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (item.href.includes("#")) {
                          handleNavClick(item.href.replace("/#", ""));
                        } else {
                          handleNavClick();
                        }
                      }}
                      className="group flex items-start gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-muted/60 active:scale-98"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-all group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15 group-hover:scale-105">
                        <IconComponent className="size-4" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-accent-connection sm:text-sm">
                          {item.label}
                        </span>
                        <span className="text-[11px] leading-tight text-muted-foreground line-clamp-1">
                          {item.subtitle}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Acciones de la barra (Theme Toggle + CTA Unificado + Hamburguesa) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Botón CTA Unificado */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex group relative h-9 px-4.5 text-xs font-semibold shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/45 active:translate-y-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <Link href="/#contacto" onClick={() => handleNavClick("contacto")}>
              <span>Agenda tu diagnóstico</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Button>

          {/* Botón Hamburguesa */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className={`group inline-flex size-9.5 items-center justify-center rounded-lg border transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer md:hidden ${
              menuOpen
                ? "border-accent-connection/50 bg-secondary text-accent-connection shadow-xs"
                : "border-border/60 bg-secondary/60 text-foreground hover:border-border hover:bg-secondary hover:text-accent-connection"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-5 overflow-visible">
              <rect
                x="3"
                y="11"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
                className={`origin-center transition-all duration-300 ease-out ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
                className={`origin-center transition-all duration-200 ease-out ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
                className={`origin-center transition-all duration-300 ease-out ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Móvil Simplificado (Máximo 4 bloques limpios) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.32, ease: [0.25, 1, 0.5, 1] }
            }
            className="overflow-hidden border-t border-border/80 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-6xl py-6 px-4 space-y-6">
              {/* CTA Fijo Arriba */}
              <Button asChild size="default" className="w-full justify-center text-xs font-semibold cursor-pointer">
                <Link href="/#contacto" onClick={() => handleNavClick("contacto")}>
                  <span>Agenda tu diagnóstico</span>
                  <ArrowUpRight aria-hidden="true" className="ml-1 size-3.5" />
                </Link>
              </Button>

              {/* Bloque 1: Soluciones por Puerta */}
              <div className="space-y-3 rounded-xl border border-border/60 bg-secondary/20 p-4">
                <div className="flex items-center justify-between text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  <span>Soluciones por Puerta</span>
                  <Link
                    href="/servicios"
                    onClick={() => handleNavClick()}
                    className="text-[11px] font-semibold text-accent-connection"
                  >
                    Ver todas →
                  </Link>
                </div>
                <div className="space-y-3 pt-1">
                  {servicesByDoor.map((door) => (
                    <div key={door.number} className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-foreground/80">
                        Puerta {door.number} — {door.name}
                      </span>
                      <div className="grid grid-cols-1 gap-1 pl-2 border-l border-border/50">
                        {door.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => handleNavClick()}
                            className="text-xs text-muted-foreground hover:text-accent-connection py-1 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloque 2: Casos de Éxito */}
              <Link
                href="/casos-de-exito"
                onClick={() => handleNavClick()}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3.5 text-sm font-semibold text-foreground hover:border-accent-connection/40 hover:text-accent-connection transition-all"
              >
                <span>Casos de Éxito</span>
                <ArrowUpRight className="size-4 text-accent-connection" />
              </Link>

              {/* Bloque 3: Recursos */}
              <div className="space-y-2 rounded-xl border border-border/60 bg-secondary/20 p-4">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Recursos
                </span>
                <div className="space-y-1 pt-1">
                  {recursosItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        if (item.href.includes("#")) {
                          handleNavClick(item.href.replace("/#", ""));
                        } else {
                          handleNavClick();
                        }
                      }}
                      className="block text-xs text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Redes Sociales en el pie del menú móvil */}
              <div className="flex items-center justify-center gap-3 pt-2 border-t border-border/50">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-accent-connection"
                    >
                      <IconComponent className="size-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
