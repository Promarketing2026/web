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
    await expect(mainHeading).toContainText(/Infraestructura Comercial Conectada/i);
  });

  test("debe renderizar las secciones clave del Home", async ({ page }) => {
    await page.goto("/");

    // Sección El Problema
    const problemSection = page.locator("#inicio");
    await expect(problemSection).toBeVisible();

    // Sección Solución / Auditoría
    const solutionSection = page.locator("#solucion");
    await expect(solutionSection).toBeVisible();

    // Sección Contacto / Formulario
    const contactSection = page.locator("#contacto");
    await expect(contactSection).toBeVisible();
  });
});
