import { test, expect } from "@playwright/test";

test.describe("Página Principal (Home)", () => {
  test("debe cargar la página principal y verificar la identidad de marca", async ({ page }) => {
    await page.goto("/");

    // Verificar el título de la página
    await expect(page).toHaveTitle(/Promarketing Perú/i);

    // Verificar presencia del logo en el Navbar
    const brandLogo = page.getByRole("navigation", { name: "Navegación principal" });
    await expect(brandLogo).toBeVisible();

    // Verificar el encabezado principal (H1)
    const mainHeading = page.getByRole("heading", { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText(/capacidades comerciales/i);
  });

  test("debe renderizar las secciones clave del Home", async ({ page }) => {
    await page.goto("/");

    // Sección Hero
    const heroSection = page.locator("#inicio");
    await expect(heroSection).toBeVisible();

    // Sección Necesidades
    const needsSection = page.locator("#necesidades");
    await expect(needsSection).toBeVisible();

    // Sección Cómo ayudamos
    const howWeHelpSection = page.locator("#como-ayudamos");
    await expect(howWeHelpSection).toBeVisible();

    // Sección Contacto / Formulario
    const contactSection = page.locator("#contacto");
    await expect(contactSection).toBeVisible();
  });

  test("debe exponer landmarks de encabezado y pie únicos", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    await expect(page.locator("header header")).toHaveCount(0);
    await expect(page.locator("footer footer")).toHaveCount(0);
  });
});
