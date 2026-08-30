"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Globe,
  HelpCircle,
  Layers,
  Palette,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
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

const comoAyudamosItems = [
  {
    label: "Sistema de Marca",
    href: "/#como-ayudamos",
    subtitle: "Identidad visual y consistencia institucional",
    icon: Sparkles,
  },
  {
    label: "Sistema de Demanda",
    href: "/#como-ayudamos",
    subtitle: "Atracción de prospectos con intención de compra",
    icon: TrendingUp,
  },
  {
    label: "Sistema de Conversión",
    href: "/#como-ayudamos",
    subtitle: "Embudos y experiencias que cierran oportunidades",
    icon: CheckCircle2,
  },
  {
    label: "Sistema de Gestión Comercial",
    href: "/#como-ayudamos",
    subtitle: "CRM, automatización y velocidad de respuesta",
    icon: Briefcase,
  },
  {
    label: "Sistema de Información y Decisión",
    href: "/#como-ayudamos",
    subtitle: "Analítica unificada y atribución de rentabilidad",
    icon: BarChart3,
  },
];

const knowledgeItems = [
  {
    label: "Cómo pensamos",
    href: "/#como-pensamos",
    subtitle: "Principios de diseño y arquitectura de sistemas comerciales",
    icon: Layers,
  },
  {
    label: "Casos de éxito",
    href: "/casos-de-exito",
    subtitle: "Resultados medibles y transformaciones reales",
    icon: CheckCircle2,
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
    subtitle: "Conceptos clave de marketing y operaciones comerciales",
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
      if (pathname.startsWith("/blog") || pathname.startsWith("/glosario") || pathname.startsWith("/casos-de-exito")) return "conocimiento";
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

  // IntersectionObserver para secciones activas
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 transition-all duration-300 sm:px-8 ${
        isScrolled || menuOpen
          ? "border-border/80 bg-background/90 shadow-xs backdrop-blur-md"
          : "border-transparent bg-background/45 backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3 md:h-16 md:py-0">
        {/* Logo de Marca con Estados Completos (Default, Hover, Active, Focus) */}
        <Link
          href="/#inicio"
          onClick={() => handleNavClick("inicio")}
          className="group inline-flex items-center gap-2.5 rounded-md p-1 -ml-1 text-sm font-semibold text-foreground transition-all duration-300 hover:text-accent-connection active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base cursor-pointer"
        >
          <BrandIsotipo size={24} className="text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95" />
          <span className="tracking-tight font-bold">Promarketing</span>
        </Link>

        {/* Navegación Principal en Desktop con Estados Completos y Rolling Text */}
        <nav
          aria-label="Navegación principal"
          className="relative hidden items-center gap-1 md:flex md:gap-1.5"
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Dropdown Soluciones */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("soluciones")}
              onFocus={() => setHoveredId("soluciones")}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
            >
              {/* Píldora de Fondo Hover / Selected */}
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
            <DropdownMenuContent align="start" className="w-[340px] p-2 space-y-1">
              <div className="px-2.5 py-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                Capacidades Comerciales
              </div>
              {solutionItems.map((item) => {
                const IconComponent = item.iconName ? serviceIcons[item.iconName] || Zap : Zap;
                return (
                  <DropdownMenuItem key={item.label} asChild className="cursor-pointer">
                    <Link
                      href={item.href}
                      className="group flex items-start gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-muted/60 active:scale-98"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-all group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15 group-hover:scale-105">
                        <IconComponent className="size-4" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-accent-connection sm:text-sm">
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
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Cómo ayudamos */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={() => setHoveredId("como-ayudamos")}
              onFocus={() => setHoveredId("como-ayudamos")}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
            >
              <span
                className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                  hoveredId === "como-ayudamos" || effectiveActiveId === "como-ayudamos"
                    ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
              <span className="relative z-10">
                <RollingText
                  text="Cómo ayudamos"
                  active={effectiveActiveId === "como-ayudamos"}
                  className="text-muted-foreground transition-colors group-hover:text-accent-connection"
                />
              </span>
              <ChevronDown className="relative z-10 size-4 text-muted-foreground transition-all duration-200 group-hover:text-accent-connection group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-connection" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[340px] p-2 space-y-1">
              <div className="px-2.5 py-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                Macro-Sistemas Comerciales
              </div>
              {comoAyudamosItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <DropdownMenuItem key={item.label} asChild className="cursor-pointer">
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick("como-ayudamos")}
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

          {/* Link Cómo pensamos */}
          <Link
            href="/#como-pensamos"
            onMouseEnter={() => setHoveredId("como-pensamos")}
            onClick={() => handleNavClick("como-pensamos")}
            className="group relative inline-flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
          >
            <span
              className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                hoveredId === "como-pensamos" || effectiveActiveId === "como-pensamos"
                  ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            />
            <span className="relative z-10">
              <RollingText
                text="Cómo pensamos"
                active={effectiveActiveId === "como-pensamos"}
                className="text-muted-foreground transition-colors group-hover:text-accent-connection"
              />
            </span>
          </Link>

          {/* Link Conocimiento */}
          <Link
            href="/blog"
            onMouseEnter={() => setHoveredId("conocimiento")}
            onClick={() => handleNavClick("conocimiento")}
            className="group relative inline-flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md cursor-pointer"
          >
            <span
              className={`absolute inset-0 z-0 rounded-md transition-all duration-200 ${
                hoveredId === "conocimiento" || effectiveActiveId === "conocimiento"
                  ? "border border-accent-connection/40 bg-secondary/80 shadow-xs opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            />
            <span className="relative z-10">
              <RollingText
                text="Conocimiento"
                active={effectiveActiveId === "conocimiento"}
                className="text-muted-foreground transition-colors group-hover:text-accent-connection"
              />
            </span>
          </Link>
        </nav>

        {/* Acciones de la barra (Theme Toggle + CTA + Botón Hamburguesa) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Botón CTA Estable con Estados Completos */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex group relative h-9 px-4.5 text-xs font-semibold shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/45 active:translate-y-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <Link href="/#contacto" onClick={() => handleNavClick("contacto")}>
              <span>Hablemos</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Button>

          {/* Botón Hamburguesa con Estados Completos */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú extendido" : "Abrir menú extendido"}
            aria-expanded={menuOpen}
            className={`group inline-flex size-9.5 items-center justify-center rounded-lg border transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
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

      {/* Panel Desplegable Extendido con Logo, Enlaces y Redes Sociales */}
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
            className="overflow-hidden border-t border-border/80 bg-background/98 backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-6xl py-7 sm:py-9">
              {/* Encabezado del Panel: Logo + Título + Redes Sociales */}
              <div className="mb-8 flex flex-col gap-6 border-b border-border/60 pb-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-secondary/80 shadow-xs">
                    <BrandIsotipo size={26} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Promarketing Perú</h3>
                    <p className="text-xs text-muted-foreground">
                      Infraestructura Comercial Conectada · Marca, Demanda, Conversión y Datos
                    </p>
                  </div>
                </div>

                {/* Redes Sociales Oficiales */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="mr-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Conéctate:
                  </span>
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-8.5 items-center justify-center rounded-lg border border-border/60 bg-secondary/60 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-connection/40 hover:bg-accent-connection/10 hover:text-accent-connection active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <IconComponent className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Rejilla de Enlaces */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Columna 1: Soluciones / Capacidades Comerciales */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    <span className="size-1.5 rounded-full bg-accent-connection" />
                    Capacidades Comerciales
                  </div>
                  <div className="space-y-1">
                    {solutionItems.map((item) => {
                      const IconComponent = item.iconName ? serviceIcons[item.iconName] || Zap : Zap;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => handleNavClick()}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-secondary/70 hover:translate-x-1 active:scale-98"
                        >
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-colors group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15">
                            <IconComponent className="size-4" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-accent-connection sm:text-sm">
                              {item.label}
                            </span>
                            {item.subtitle && (
                              <span className="text-[11px] leading-tight text-muted-foreground line-clamp-1">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Columna 2: Macro-Sistemas Comerciales */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    <span className="size-1.5 rounded-full bg-accent-decision" />
                    Macro-Sistemas Comerciales
                  </div>
                  <div className="space-y-1">
                    {comoAyudamosItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => handleNavClick("como-ayudamos")}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-secondary/70 hover:translate-x-1 active:scale-98"
                        >
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-colors group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15">
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
                      );
                    })}
                  </div>
                </div>

                {/* Columna 3: Conocimiento & Tarjeta de Acción */}
                <div className="space-y-6 md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Conocimiento y Perspectiva
                    </div>
                    <div className="space-y-1">
                      {knowledgeItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
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
                            className="group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-secondary/70 hover:translate-x-1 active:scale-98"
                          >
                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary/80 text-accent-connection shadow-xs transition-colors group-hover:border-accent-connection/40 group-hover:bg-accent-connection/15">
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
                        );
                      })}
                    </div>
                  </div>

                  {/* Tarjeta de Acción / Auditoría */}
                  <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-md">
                    <h4 className="text-sm font-bold text-foreground">¿Listo para estructurar tu crecimiento?</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Analizamos tus canales, conversión y tecnología comercial en una sesión estratégica.
                    </p>
                    <Button asChild size="default" className="mt-4 w-full justify-center text-xs font-semibold">
                      <Link href="/#contacto" onClick={() => handleNavClick("contacto")}>
                        <span>Solicitar Auditoría Comercial</span>
                        <ArrowUpRight aria-hidden="true" className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
