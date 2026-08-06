"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitNewsletterForm, type NewsletterFormState } from "@/lib/hubspot";

const initialState: NewsletterFormState = {
  status: "idle",
};

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    submitNewsletterForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Newsletter</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        Recibe noticias sobre infraestructura comercial.
      </p>

      {/* Honeypot anti-spam (campo oculto) */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website_hp">No llenar este campo</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          disabled={isPending}
          aria-invalid={state.status === "error"}
          aria-describedby={state.message ? "newsletter-message" : undefined}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Enviando..." : "Suscribirme"}
        </button>
      </div>

      {state.message && (
        <p
          id="newsletter-message"
          role={state.status === "error" ? "alert" : undefined}
          className={
            state.status === "error"
              ? "text-sm text-destructive"
              : "text-sm text-emerald-600 font-medium"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
