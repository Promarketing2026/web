import { test, expect } from "@playwright/test";

test.describe("Páginas Institucionales y Contenidos", () => {
  test("debe cargar la página del Blog /blog", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog/i);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("debe cargar la página del Glosario /glosario", async ({ page }) => {
    await page.goto("/glosario");
    await expect(page).toHaveTitle(/Glosario/i);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("debe cargar la página de Casos de Éxito /casos-de-exito", async ({ page }) => {
    await page.goto("/casos-de-exito");
    await expect(page).toHaveTitle(/Casos de éxito/i);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("debe cargar la página de Política de Privacidad /politica-de-privacidad", async ({ page }) => {
    await page.goto("/politica-de-privacidad");
    await expect(page).toHaveTitle(/Política de Privacidad/i);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Política de Privacidad/i);
  });
});
