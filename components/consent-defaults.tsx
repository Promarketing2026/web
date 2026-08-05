import Script from "next/script";

import { CONSENT_STORAGE_KEY } from "@/lib/consent";

const consentDefaultsScript = `
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var storedPreferences = null;

  try {
    var parsedPreferences = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
    if (
      parsedPreferences &&
      parsedPreferences.version === 1 &&
      typeof parsedPreferences.analytics === 'boolean' &&
      typeof parsedPreferences.marketing === 'boolean'
    ) {
      storedPreferences = parsedPreferences;
    }
  } catch (_) {}

  var analyticsConsent = storedPreferences && storedPreferences.analytics ? 'granted' : 'denied';
  var marketingConsent = storedPreferences && storedPreferences.marketing ? 'granted' : 'denied';
  var defaults = {
    ad_personalization: marketingConsent,
    ad_storage: marketingConsent,
    ad_user_data: marketingConsent,
    analytics_storage: analyticsConsent,
    functionality_storage: 'granted',
    personalization_storage: marketingConsent,
    security_storage: 'granted'
  };

  if (!storedPreferences) defaults.wait_for_update = 500;
  window.gtag('consent', 'default', defaults);
})();`;

export function ConsentDefaults() {
  return (
    // App Router permite beforeInteractive en el layout raíz. Esta regla de
    // ESLint conserva el mensaje heredado del Pages Router.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="consent-mode-defaults" strategy="beforeInteractive">
      {consentDefaultsScript}
    </Script>
  );
}
