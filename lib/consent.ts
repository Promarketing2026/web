export const CONSENT_STORAGE_KEY = "promarketing-consent-v1";
export const CONSENT_OPEN_EVENT = "promarketing:open-consent";

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: 1;
};

export function isConsentPreferences(
  value: unknown,
): value is ConsentPreferences {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<ConsentPreferences>;

  return (
    candidate.version === 1 &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.marketing === "boolean" &&
    typeof candidate.updatedAt === "string"
  );
}

export function toGoogleConsentMode(preferences: {
  analytics: boolean;
  marketing: boolean;
}) {
  const analyticsConsent = preferences.analytics ? "granted" : "denied";
  const marketingConsent = preferences.marketing ? "granted" : "denied";

  return {
    ad_personalization: marketingConsent,
    ad_storage: marketingConsent,
    ad_user_data: marketingConsent,
    analytics_storage: analyticsConsent,
    functionality_storage: "granted",
    personalization_storage: marketingConsent,
    security_storage: "granted",
  } as const;
}
