import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // El checkout está en una unidad lenta; un solo worker evita timeouts falsos
  // al compilar rutas de Next en paralelo durante las pruebas locales.
  workers: 1,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testIgnore: ["**/hubspot-client.spec.ts", "**/security-inputs.spec.ts"],
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testIgnore: ["**/hubspot-client.spec.ts", "**/security-inputs.spec.ts"],
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
