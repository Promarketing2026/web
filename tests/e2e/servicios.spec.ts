import { test, expect } from "@playwright/test";

test.describe("Módulo de Servicios (7 Sistemas de Oferta)", () => {
  test("todos los destinos del menú Soluciones deben existir", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Soluciones" }).click();

    const links = page.getByRole("menu").locator("a[href^='/servicios/']");
    await expect(links).toHaveCount(7);

    const destinations = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")),
    );

    expect(new Set(destinations).size).toBe(7);

    for (const destination of destinations) {
      expect(destination).toBeTruthy();
      const response = await page.request.get(destination!);
      expect(response.status(), `${destination} respondió ${response.status()}`).toBeLessThan(400);
    }
  });

  test("debe cargar el Hub de Servicios /servicios y mostrar las 7 capacidades", async ({ page }) => {
    await page.goto("/servicios");

    await expect(page).toHaveTitle(/Sistemas y Capacidades Comerciales/i);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText(/Nuestros 7 Sistemas de Oferta/i);

    // Verificar las 7 tarjetas de servicios en el cuerpo principal
    const serviceCards = page.locator("main a[href^='/servicios/']");
    await expect(serviceCards).toHaveCount(7);
  });

  test("debe navegar hacia la página de detalle del servicio Infraestructura Web", async ({ page }) => {
    await page.goto("/servicios/infraestructura-web");

    await expect(page).toHaveTitle(/Infraestructura Web de Alto Rendimiento/i);

    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toContainText(/Infraestructura Web/i);

    // Verificar sección de entregables
    const deliverablesHeading = page.locator("#deliverables-heading");
    await expect(deliverablesHeading).toBeVisible();

    // Verificar que incluya el formulario de auditoría
    const auditSection = page.locator("#auditoria");
    await expect(auditSection).toBeVisible();
  });
});
