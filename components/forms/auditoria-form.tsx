"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitAuditoriaForm, type AuditoriaFormState } from "@/lib/hubspot";
import { getStoredUtmParams } from "@/lib/utm";

const initialState: AuditoriaFormState = { status: "idle" };

export function AuditoriaForm() {
  const router = useRouter();
  const conversionTrackedRef = useRef(false);
  const [state, formAction, isPending] = useActionState(
    submitAuditoriaForm,
    initialState,
  );
  const [servicio, setServicio] = useState("");
  const [utms] = useState<Record<string, string>>(() => getStoredUtmParams());

  useEffect(() => {
    if (state.status !== "success") return;

    const params = new URLSearchParams();
    if (servicio) params.set("servicio", servicio);

    for (const [key, value] of Object.entries(utms)) {
      if (value) params.set(key, value);
    }

    if (!conversionTrackedRef.current) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_submit_success",
        lead_service: servicio || "not_selected",
        ...utms,
      });
      conversionTrackedRef.current = true;
    }

    const query = params.toString();
    const timeoutId = window.setTimeout(() => {
      router.push(`/gracias${query ? `?${query}` : ""}`);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [state.status, servicio, utms, router]);

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
    <form action={formAction} className="space-y-4" noValidate>
      {/* Campos ocultos de UTMs desde sessionStorage */}
      <input type="hidden" name="utm_source" value={utms.utm_source || ""} />
      <input type="hidden" name="utm_medium" value={utms.utm_medium || ""} />
      <input type="hidden" name="utm_campaign" value={utms.utm_campaign || ""} />
      <input type="hidden" name="utm_content" value={utms.utm_content || ""} />
      <input type="hidden" name="utm_term" value={utms.utm_term || ""} />

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
          ¿Qué necesitas o qué está pasando?
        </label>
        <select
          id="servicio"
          name="servicio"
          value={servicio}
          onChange={(event) => setServicio(event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <option value="" disabled>
            Selecciona una opción inicial
          </option>
          <option value="necesito-web">Necesito una web o mejorar la que tengo</option>
          <option value="fortalecer-marca">Quiero fortalecer mi marca</option>
          <option value="generar-oportunidades">Necesito generar más oportunidades</option>
          <option value="convertir-oportunidades">Tengo oportunidades pero no estoy convirtiendo</option>
          <option value="ordenar-ventas-crm">Necesito ordenar ventas, CRM o seguimiento</option>
          <option value="automatizar-procesos">Quiero automatizar procesos</option>
          <option value="entender-resultados">Necesito entender mejor mis resultados</option>
          <option value="otra-necesidad">Tengo otra necesidad</option>
          <option value="no-seguro">No estoy seguro todavía</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consentimiento"
          name="consentimiento"
          type="checkbox"
          aria-invalid={Boolean(consentimientoError)}
          aria-describedby={
            consentimientoError ? "consentimiento-error" : undefined
          }
          className="mt-1 h-4 w-4 rounded border-border"
        />
        <label htmlFor="consentimiento" className="text-sm text-muted-foreground">
          He leído y acepto la{" "}
          <a
            href="/politica-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Política de Privacidad
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
        className="w-full rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Cuéntanos tu situación"}
      </button>
    </form>
  );
}
