import { expect, test } from "@playwright/test";

import {
  buildLeadNotificationHtml,
  escapeHtml,
  sanitizeEmailSubjectPart,
} from "../../lib/email-template";
import { isLeadServiceValue } from "../../lib/lead-input";
import { normalizeUtmParams } from "../../lib/utm";

test.describe("Saneamiento de entradas", () => {
  test("escapa datos no confiables antes de construir el correo", () => {
    const malicious = `<img src=x onerror="alert('xss')">`;
    const html = buildLeadNotificationHtml(
      {
        nombre: malicious,
        email: "persona@example.com",
        empresa: malicious,
        servicio: malicious,
        utms: { utm_campaign: malicious },
      },
      "9 ago 2026, 19:00",
    );

    expect(html).not.toContain(malicious);
    expect(html).not.toContain("<img src=x");
    expect(html).toContain(escapeHtml(malicious));
  });

  test("limita UTMs y descarta tipos no válidos", () => {
    const normalized = normalizeUtmParams({
      utm_source: `  ${"a".repeat(250)}  `,
      utm_medium: 42,
      unexpected: "ignored",
    });

    expect(normalized.utm_source).toHaveLength(200);
    expect(normalized.utm_medium).toBeUndefined();
    expect(Object.keys(normalized)).toEqual(["utm_source"]);
  });

  test("rechaza servicios arbitrarios y elimina saltos del asunto", () => {
    expect(isLeadServiceValue("automatizar-procesos")).toBe(true);
    expect(isLeadServiceValue("<script>alert(1)</script>")).toBe(false);
    expect(sanitizeEmailSubjectPart("Persona\r\nBcc: atacante@example.com")).toBe(
      "Persona Bcc: atacante@example.com",
    );
  });
});
