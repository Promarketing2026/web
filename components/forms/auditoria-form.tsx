"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitAuditoriaForm, type AuditoriaFormState } from "@/lib/hubspot";
import { getStoredUtmParams } from "@/lib/utm";

const initialState: AuditoriaFormState = { status: "idle" };

export function AuditoriaForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitAuditoriaForm,
    initialState,
  );
  const [servicio, setServicio] = useState("");

  useEffect(() => {
    if (state.status !== "success") return;

    const params = new URLSearchParams();
    if (servicio) params.set("servicio", servicio);

    const utms = getStoredUtmParams();
    for (const [key, value] of Object.entries(utms)) {
      if (value) params.set(key, value);
    }

    const query = params.toString();
    const timeoutId = window.setTimeout(() => {
      router.push(`/gracias${query ? `?${query}` : ""}`);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [state.status, servicio, router]);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-border bg-muted p-6 text-center">
        <p className="text-lg font-medium text-foreground">
          ¡Listo! Te estamos redirigiendo...
        </p>
      </div>
    );
  }

  const nombreError = state.fieldErrors?.nombre;
  const emailError = state.fieldErrors?.email;
  const consentimientoError = state.fieldErrors?.consentimiento;

  return (
    <form action={formAction} className="space-y-4" noValidate={false}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="pagina_web">No completar este campo</label>
        <input
          id="pagina_web"
          name="pagina_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
          aria-invalid={Boolean(nombreError)}
          aria-describedby={nombreError ? "nombre-error" : undefined}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
        {nombreError && (
          <p id="nombre-error" role="alert" className="mt-1 text-sm text-destructive">
            {nombreError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Correo electronico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "email-error" : undefined}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
        {emailError && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">
            {emailError}
          </p>
        )}
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
          Servicio de tu interes
        </label>
        <select
          id="servicio"
          name="servicio"
          value={servicio}
          onChange={(event) => setServicio(event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <option value="" disabled>
            Selecciona una opcion
          </option>
          <option value="auditoria-claro">Auditoria C.L.A.R.O.</option>
          <option value="diseno-marca">Diseno y Gestion de Marca</option>
          <option value="infraestructura-web">Infraestructura Web</option>
          <option value="ecommerce-conversion">
            Ecommerce y Conversion
          </option>
          <option value="seo-geo-aeo">SEO / GEO / AEO</option>
          <option value="ads-paid-media">Ads / Paid Media</option>
          <option value="automatizacion-comercial">
            Automatizacion Comercial
          </option>
          <option value="tracking-trazabilidad">
            Tracking y Trazabilidad
          </option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consentimiento"
          name="consentimiento"
          type="checkbox"
          required
          aria-invalid={Boolean(consentimientoError)}
          aria-describedby={
            consentimientoError ? "consentimiento-error" : undefined
          }
          className="mt-1 h-4 w-4 rounded border-border"
        />
        <label htmlFor="consentimiento" className="text-sm text-muted-foreground">
          He leido y acepto la{" "}
          <a
            href="/politica-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Politica de Privacidad
          </a>
          , y autorizo el tratamiento de mis datos para ser contactado.
        </label>
      </div>
      {consentimientoError && (
        <p
          id="consentimiento-error"
          role="alert"
          className="-mt-2 text-sm text-destructive"
        >
          {consentimientoError}
        </p>
      )}

      {state.status === "error" && !nombreError && !emailError && !consentimientoError && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-foreground px-4 py-2 font-medium text-background transition-opacity disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Solicitar Auditoria C.L.A.R.O."}
      </button>
    </form>
  );
}