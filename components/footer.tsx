import { Mail, MapPin, Phone } from "lucide-react";
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

const footerNavLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Solución", href: "/#solucion" },
  { label: "Blog", href: "/blog" },
  { label: "Glosario", href: "/glosario" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
];

const mapsUrl =
  "https://www.google.com/maps/place/ProMarketing+Per%C3%BA/@-12.0829092,-76.9308383,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c7285d790497:0x15527a5ed810ec98!8m2!3d-12.0829145!4d-76.9282634!16s%2Fg%2F11cp02f_3";

export function Footer() {
  return (
    <div className="border-t border-border bg-muted/40 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="group inline-flex items-center gap-2.5">
              <BrandIsotipo size={22} className="text-foreground" />
              <p className="text-base font-semibold text-foreground">
                Promarketing Perú
              </p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Diseñamos Infraestructura Comercial Conectada para organizaciones
              que necesitan crecer con claridad.
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
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-foreground/30 hover:bg-background hover:text-foreground hover:scale-105 active:scale-95"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">
              Navegación
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Contacto</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:crece@promarketingperu.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  crece@promarketingperu.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/51992573585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  992 573 585
                </a>
              </li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <MapPin aria-hidden="true" className="size-4" />
                  Ver ubicación
                </a>
              </li>
            </ul>
          </div>

          <div>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-sm text-muted-foreground sm:flex-row">
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
    </div>
  );
}
