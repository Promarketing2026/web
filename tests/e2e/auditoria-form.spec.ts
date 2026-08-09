import { test, expect } from "@playwright/test";

test.describe("Formulario de Auditoría C.L.A.R.O.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contacto");
  });

  test("debe mostrar errores de validación si se envía el formulario vacío", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /Cuéntanos tu situación|Solicitar Auditoria/i });
    await expect(submitButton).toBeVisible();

    await submitButton.click();

    // Mensaje de error de validación para el nombre
    const nombreError = page.locator("#nombre-error");
    await expect(nombreError).toBeVisible();
    await expect(nombreError).toContainText(/Ingresa tu nombre completo/i);

    // Mensaje de error para el correo
    const emailError = page.locator("#email-error");
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText(/Ingresa un correo electrónico válido/i);

    // Mensaje de error para el consentimiento legal
    const consentimientoError = page.locator("#consentimiento-error");
    await expect(consentimientoError).toBeVisible();
    await expect(consentimientoError).toContainText(/Debes aceptar la política de privacidad/i);
  });

  test("debe tener el campo oculto honeypot para prevención anti-spam", async ({ page }) => {
    const honeypotInput = page.locator("input[name='pagina_web']");
    await expect(honeypotInput).toBeAttached();
    await expect(honeypotInput).toHaveValue("");
  });
});
