// A12d (parte 1) — captura de UTMs en sessionStorage, siguiendo RETOQUE-4:
// se capturan al llegar al sitio (no en /gracias, donde ya no existen en
// la URL) y viajan como query params hacia /gracias tras un envío exitoso.
//
// IMPORTANTE: por ahora estas UTMs NO se envían a HubSpot como propiedades
// del contacto. Enviar una propiedad que no existe en HubSpot devuelve un
// error que puede romper la creación de TODO el contacto (no solo ese
// campo) — así que eso queda pendiente hasta crear las propiedades
// personalizadas utm_source/utm_medium/etc. en HubSpot.

const UTM_STORAGE_KEY = "promarketing_utms";
export const UTM_UPDATE_EVENT = "promarketing:utm-update";
const UTM_VALUE_MAX_LENGTH = 200;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export function normalizeUtmParams(input: unknown): UtmParams {
  if (!input || typeof input !== "object") return {};

  const source = input as Record<string, unknown>;
  const normalized: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = source[key];
    if (typeof value !== "string") continue;

    const trimmed = value.trim();
    if (trimmed) normalized[key] = trimmed.slice(0, UTM_VALUE_MAX_LENGTH);
  }

  return normalized;
}

export function captureUtmParams(searchParams: URLSearchParams): void {
  if (typeof window === "undefined") return;

  const found = normalizeUtmParams(
    Object.fromEntries(UTM_KEYS.map((key) => [key, searchParams.get(key)])),
  );

  // Solo sobrescribimos si la URL actual trae UTMs nuevos. Si alguien
  // navega dentro del sitio sin UTMs en la URL, conservamos los que ya
  // se guardaron antes en esta misma sesión de navegador.
  if (Object.keys(found).length > 0) {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  }

  window.dispatchEvent(new Event(UTM_UPDATE_EVENT));
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? normalizeUtmParams(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export { UTM_KEYS };
