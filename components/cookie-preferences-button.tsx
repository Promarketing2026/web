"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="hover:text-foreground"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Preferencias de cookies
    </button>
  );
}
