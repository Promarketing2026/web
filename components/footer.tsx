import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { BrandIsotipo } from "@/components/brand-logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { SERVICES } from "@/lib/services";

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
];

const recursosLinks = [
  { label: "Cómo pensamos", href: "/#como-pensamos" },
  { label: "Blog de Estrategia", href: "/blog" },
  { label: "Glosario Comercial", href: "/glosario" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Marca (2 Cols en Desktop) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="group inline-flex items-center gap-2.5">
              <BrandIsotipo size={22} className="text-foreground" />
              <p className="text-base font-bold text-foreground">
                Promarketing
              </p>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted-foreground">
              Firma de sistemas comerciales integrados. Diseñamos la conexión entre marca, demanda, conversión, procesos y equipo para proteger tu rentabilidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-foreground/30 hover:bg-background hover:text-foreground hover:scale-105"
                  >
                    <Icon aria-hidden="true" className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Soluciones (7 Servicios Reales) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Soluciones
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`} className="transition-colors hover:text-foreground">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Casos de Éxito (Destacado) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Casos de Éxito
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Evidencia real de transformaciones comerciales y resultados medibles en distintas organizaciones.
            </p>
            <div className="pt-1">
              <Link
                href="/casos-de-exito"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-accent-connection hover:underline underline-offset-4"
              >
                <span>Ver casos y evidencia</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Col 4: Recursos & Newsletter */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Recursos
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {recursosLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Promarketing Perú. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link
              href="/politica-de-privacidad"
              className="transition-colors hover:text-foreground"
            >
              Política de Privacidad
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
