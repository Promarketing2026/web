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

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export function captureUtmParams(searchParams: URLSearchParams): void {
  if (typeof window === "undefined") return;

  const found: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      found[key] = value;
    }
  }

  // Solo sobrescribimos si la URL actual trae UTMs nuevos. Si alguien
  // navega dentro del sitio sin UTMs en la URL, conservamos los que ya
  // se guardaron antes en esta misma sesión de navegador.
  if (Object.keys(found).length > 0) {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export { UTM_KEYS };