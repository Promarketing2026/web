import { expect, test } from "@playwright/test";


test("los tokens de UI y preview social corresponden a DOC 08", async ({ page }) => {
  await page.goto("/");

  const darkTokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      background: styles.getPropertyValue("--background").trim(),
      foreground: styles.getPropertyValue("--foreground").trim(),
      connection: styles.getPropertyValue("--accent-connection").trim(),
      decision: styles.getPropertyValue("--accent-decision").trim(),
    };
  });

  expect(darkTokens).toEqual({
    background: "#030712",
    foreground: "#f8fafc",
    connection: "#38bdf8",
    decision: "#3b82f6",
  });

  const lightTokens = await page.evaluate(() => {
    document.documentElement.classList.remove("dark");
    const styles = getComputedStyle(document.documentElement);
    return {
      background: styles.getPropertyValue("--background").trim().toLowerCase(),
      foreground: styles.getPropertyValue("--foreground").trim().toLowerCase(),
      connection: styles.getPropertyValue("--accent-connection").trim().toLowerCase(),
      decision: styles.getPropertyValue("--accent-decision").trim().toLowerCase(),
    };
  });

  expect(lightTokens).toEqual({
    background: "#f8fafc",
    foreground: "#030712",
    connection: "#0284c7",
    decision: "#1d4ed8",
  });
});
