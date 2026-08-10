import { expect, test } from "@playwright/test";

import { BRAND_COLORS } from "../../lib/brand-tokens";

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
    background: "#0a0e14",
    foreground: "#f0f3f6",
    connection: "#3cf5b5",
    decision: "#ff6a00",
  });

  const lightTokens = await page.evaluate(() => {
    document.documentElement.classList.remove("dark");
    const styles = getComputedStyle(document.documentElement);
    return {
      background: styles.getPropertyValue("--background").trim(),
      foreground: styles.getPropertyValue("--foreground").trim(),
      connection: styles.getPropertyValue("--accent-connection").trim(),
      decision: styles.getPropertyValue("--accent-decision").trim(),
    };
  });

  expect(lightTokens).toEqual({
    background: BRAND_COLORS.canvasLight.toLowerCase(),
    foreground: BRAND_COLORS.ink.toLowerCase(),
    connection: BRAND_COLORS.connectionLight.toLowerCase(),
    decision: BRAND_COLORS.decisionLight.toLowerCase(),
  });
  expect(BRAND_COLORS.logoOnLight.toLowerCase()).toBe(lightTokens.foreground);
});
