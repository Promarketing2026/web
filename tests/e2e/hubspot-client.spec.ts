import { expect, test } from "@playwright/test";

import { upsertHubSpotContact } from "../../lib/hubspot-client";

const properties = {
  email: "persona@example.com",
  firstname: "Persona",
};

test.describe("Cliente HubSpot con respuestas simuladas", () => {
  test("crea un contacto sin ejecutar PATCH cuando POST responde OK", async () => {
    const calls: Array<{ input: string; method?: string }> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push({ input: input.toString(), method: init?.method });
      return new Response(null, { status: 201 });
    };

    const result = await upsertHubSpotContact({
      accessToken: "test-token",
      email: properties.email,
      fetcher,
      properties,
    });

    expect(result).toEqual({ ok: true, operation: "created" });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.method).toBe("POST");
  });

  test("actualiza por email cuando POST responde 409", async () => {
    const calls: Array<{ input: string; method?: string }> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push({ input: input.toString(), method: init?.method });
      return calls.length === 1
        ? new Response("duplicate", { status: 409 })
        : new Response(null, { status: 200 });
    };

    const result = await upsertHubSpotContact({
      accessToken: "test-token",
      email: properties.email,
      fetcher,
      properties,
    });

    expect(result).toEqual({ ok: true, operation: "updated" });
    expect(calls.map(({ method }) => method)).toEqual(["POST", "PATCH"]);
    expect(calls[1]?.input).toContain("persona%40example.com?idProperty=email");
  });

  test("devuelve un error controlado sin reintentos para otros estados", async () => {
    const fetcher: typeof fetch = async () =>
      new Response("upstream unavailable", { status: 503 });

    const result = await upsertHubSpotContact({
      accessToken: "test-token",
      email: properties.email,
      fetcher,
      properties,
    });

    expect(result).toEqual({
      ok: false,
      reason: "create",
      status: 503,
      detail: "upstream unavailable",
    });
  });
});
