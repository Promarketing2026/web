"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentPreferences,
  isConsentPreferences,
  toGoogleConsentMode,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentSelection = Pick<ConsentPreferences, "analytics" | "marketing">;

const initialSelection: ConsentSelection = {
  analytics: false,
  marketing: false,
};

function readStoredPreferences(): ConsentPreferences | null {
  try {
    const storedValue = localStorage.getItem(CONSENT_STORAGE_KEY);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : null;

    return isConsentPreferences(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selection, setSelection] =
    useState<ConsentSelection>(initialSelection);

  const openPreferences = useCallback(() => {
    const storedPreferences = readStoredPreferences();

    setSelection(
      storedPreferences
        ? {
            analytics: storedPreferences.analytics,
            marketing: storedPreferences.marketing,
          }
        : initialSelection,
    );
    setShowDetails(Boolean(storedPreferences));
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const visibilityTimer = window.setTimeout(() => {
      if (!readStoredPreferences()) setIsVisible(true);
    }, 0);

    window.addEventListener(CONSENT_OPEN_EVENT, openPreferences);
    return () => {
      window.clearTimeout(visibilityTimer);
      window.removeEventListener(CONSENT_OPEN_EVENT, openPreferences);
    };
  }, [openPreferences]);

  const savePreferences = useCallback((preferences: ConsentSelection) => {
    const storedPreferences: ConsentPreferences = {
      ...preferences,
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify(storedPreferences),
      );
    } catch {
      // El consentimiento se aplica a la sesión aunque el navegador bloquee
      // el almacenamiento local.
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        // Google define gtag como un wrapper de `arguments`; conservar esa
        // forma evita transformar el comando antes de enviarlo a dataLayer.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };

    window.gtag("consent", "update", toGoogleConsentMode(preferences));
    window.dataLayer.push({
      consent_analytics: preferences.analytics,
      consent_marketing: preferences.marketing,
      event: "promarketing_consent_update",
    });

    setSelection(preferences);
    setIsVisible(false);
    setShowDetails(false);
  }, []);

  if (!isVisible) return null;

  return (
    <section
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background p-5 shadow-2xl sm:p-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h2
            id="cookie-consent-title"
            className="text-lg font-semibold text-foreground"
          >
            Tu privacidad importa
          </h2>
          <p
            id="cookie-consent-description"
            className="text-sm leading-6 text-muted-foreground"
          >
            Usamos almacenamiento necesario para el funcionamiento del sitio.
            Con tu permiso, también utilizaremos analítica para mejorar la
            experiencia y medición de marketing para evaluar campañas. Puedes
            cambiar tu decisión en cualquier momento. Consulta nuestra{" "}
            <Link
              href="/politica-de-privacidad"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>

        {showDetails ? (
          <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium text-foreground">
                  Necesarias
                </span>
                <span className="block text-xs leading-5 text-muted-foreground">
                  Seguridad, funcionamiento y conservación de tus preferencias.
                </span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                aria-label="Cookies necesarias, siempre activas"
                className="mt-1 size-4 accent-foreground"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium text-foreground">
                  Analítica
                </span>
                <span className="block text-xs leading-5 text-muted-foreground">
                  Ayuda a entender el uso del sitio y mejorar su rendimiento.
                </span>
              </span>
              <input
                type="checkbox"
                checked={selection.analytics}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
                className="mt-1 size-4 accent-foreground"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium text-foreground">
                  Marketing
                </span>
                <span className="block text-xs leading-5 text-muted-foreground">
                  Permite medir campañas y conversiones publicitarias.
                </span>
              </span>
              <input
                type="checkbox"
                checked={selection.marketing}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
                className="mt-1 size-4 accent-foreground"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={() => savePreferences(initialSelection)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Rechazar opcionales
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() => savePreferences(selection)}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Configurar
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              savePreferences({ analytics: true, marketing: true })
            }
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </section>
  );
}
