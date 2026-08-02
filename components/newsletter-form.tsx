"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus("error");
      setMessage("Ingresa un correo electrónico válido.");
      return;
    }

    // Sin conexión a backend todavía (B8-conectar, tarea separada).
    // Por ahora solo confirmamos que el formato es válido.
    setStatus("success");
    setMessage("¡Gracias por tu interés! Pronto activaremos el envío.");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Newsletter</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        Recibe noticias sobre infraestructura comercial.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="newsletter-email"
          name="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          aria-invalid={status === "error"}
          aria-describedby={message ? "newsletter-message" : undefined}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Suscribirme
        </button>
      </div>
      {message && (
        <p
          id="newsletter-message"
          role={status === "error" ? "alert" : undefined}
          className={
            status === "error"
              ? "text-sm text-destructive"
              : "text-sm text-muted-foreground"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
