import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { BrandIsotipo } from "@/components/brand-logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";

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

const solucionesLinks = [
  { label: "Web y experiencia digital", href: "/servicios/infraestructura-web" },
  { label: "Marca y posicionamiento", href: "/servicios/diseno-de-marca" },
  { label: "Generación de demanda", href: "/servicios/ads-paid-media" },
  { label: "Conversión", href: "/servicios/seo-geo-aeo" },
  { label: "Gestión comercial y CRM", href: "/servicios/ecommerce" },
  { label: "Automatización", href: "/servicios/automatizacion-comercial" },
  { label: "Información y analítica", href: "/servicios/tracking-trazabilidad" },
];

const comoAyudamosLinks = [
  { label: "Sistema de Marca", href: "/#como-ayudamos" },
  { label: "Sistema de Demanda", href: "/#como-ayudamos" },
  { label: "Sistema de Conversión", href: "/#como-ayudamos" },
  { label: "Sistema de Gestión Comercial", href: "/#como-ayudamos" },
  { label: "Sistema de Información y Decisión", href: "/#como-ayudamos" },
];

const conocimientoLinks = [
  { label: "Cómo pensamos", href: "/#como-pensamos" },
  { label: "Blog", href: "/blog" },
  { label: "Glosario", href: "/glosario" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Marca */}
          <div className="space-y-4 lg:col-span-2">
            <div className="group inline-flex items-center gap-2.5">
              <BrandIsotipo size={22} className="text-foreground" />
              <p className="text-base font-bold text-foreground">
                Promarketing
              </p>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted-foreground">
              Firma de sistemas comerciales integrados. Diseñamos las capacidades comerciales que tu negocio necesita para funcionar mejor.
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

          {/* Col 2: Soluciones */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Soluciones
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {solucionesLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cómo ayudamos */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Cómo ayudamos
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {comoAyudamosLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Conocimiento & Newsletter */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Conocimiento
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {conocimientoLinks.map((link) => (
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
