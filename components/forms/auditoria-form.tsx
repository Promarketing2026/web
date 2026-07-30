"use client";

import { useActionState } from "react";
import { submitAuditoriaForm, type AuditoriaFormState } from "@/lib/hubspot";

// ─────────────────────────────────────────────────────────────────────────
// A12a — Formulario base (sin honeypot, sin checkbox de consentimiento
// todavía, sin validación zod). Eso llega en A12b/A12c.
//
// DÓNDE USAR ESTE COMPONENTE (supuesto que estoy tomando, ajústalo si no
// aplica): lo pensé para reemplazar el botón estático del componente
// "CTA final" (A9), o para vivir en una sección propia dentro de esa
// misma parte del Home. Si prefieres una página dedicada tipo
// /solicitar-auditoria en vez de inline, es un cambio de una línea
// (mover el <AuditoriaForm /> a esa page.tsx) — dime y lo ajustamos.
//
// Ajusta la lista de <option> de "servicio" contra los 7 sistemas reales
// de la oferta (ya listados en el Backlog de TASKS.md) cuando quieras
// que coincidan exactamente.
// ─────────────────────────────────────────────────────────────────────────

const initialState: AuditoriaFormState = { status: "idle" };

export function AuditoriaForm() {
  const [state, formAction, isPending] = useActionState(
    submitAuditoriaForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-border bg-muted p-6 text-center">
        <p className="text-lg font-medium text-foreground">
          ¡Listo! Recibimos tu solicitud.
        </p>
        <p className="mt-1 text-muted-foreground">
          Te contactaremos pronto para coordinar tu Auditoría C.L.A.R.O.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="nombre"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Nombre completo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
      </div>

      <div>
        <label
          htmlFor="empresa"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Empresa
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
      </div>

      <div>
        <label
          htmlFor="servicio"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Servicio de tu interés
        </label>
        <select
          id="servicio"
          name="servicio"
          defaultValue=""
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="auditoria-claro">Auditoría C.L.A.R.O.</option>
          <option value="diseno-marca">Diseño y Gestión de Marca</option>
          <option value="infraestructura-web">Infraestructura Web</option>
          <option value="ecommerce-conversion">
            Ecommerce y Conversión
          </option>
          <option value="seo-geo-aeo">SEO / GEO / AEO</option>
          <option value="ads-paid-media">Ads / Paid Media</option>
          <option value="automatizacion-comercial">
            Automatización Comercial
          </option>
          <option value="tracking-trazabilidad">
            Tracking y Trazabilidad
          </option>
        </select>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-foreground px-4 py-2 font-medium text-background transition-opacity disabled:opacity-60"
      >
        {isPending ? "Enviando…" : "Solicitar Auditoría C.L.A.R.O."}
      </button>
    </form>
  );
}
