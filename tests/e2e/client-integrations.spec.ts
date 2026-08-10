import { expect, test } from "@playwright/test";

test.describe("Integraciones del cliente sin efectos externos", () => {
  test("persiste el rechazo de consentimiento y actualiza dataLayer", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Rechazar opcionales" }).click();

    const state = await page.evaluate(() => ({
      consent: JSON.parse(localStorage.getItem("promarketing-consent-v1") || "null"),
      event: window.dataLayer?.find(
        (entry) =>
          typeof entry === "object" &&
          entry !== null &&
          "event" in entry &&
          entry.event === "promarketing_consent_update",
      ),
    }));

    expect(state.consent).toMatchObject({
      analytics: false,
      marketing: false,
      version: 1,
    });
    expect(state.event).toMatchObject({
      consent_analytics: false,
      consent_marketing: false,
    });

    await page.reload();
    await expect(page.getByRole("dialog", { name: "Tu privacidad importa" })).toHaveCount(0);
  });

  test("conserva y limita UTMs en los campos del formulario", async ({ page }) => {
    const longCampaign = "a".repeat(250);
    await page.goto(`/?utm_source=google&utm_campaign=${longCampaign}`);

    await expect(page.locator("input[name='utm_source']")).toHaveValue("google");
    await expect(page.locator("input[name='utm_campaign']")).toHaveValue(
      "a".repeat(200),
    );
  });

  test("el newsletter bloquea un correo vacío antes de ejecutar la acción", async ({ page }) => {
    await page.goto("/");

    const email = page.locator("#newsletter-email");
    await page.getByRole("button", { name: "Suscribirme" }).click();

    await expect(email).toBeFocused();
    expect(await email.evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(false);
  });
});
