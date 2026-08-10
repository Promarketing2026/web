export type HubSpotContactProperties = Record<string, string | undefined>;

type UpsertSuccess = {
  ok: true;
  operation: "created" | "updated";
};

type UpsertFailure = {
  ok: false;
  reason: "create" | "update" | "network";
  status?: number;
  detail?: string;
};

export type HubSpotUpsertResult = UpsertSuccess | UpsertFailure;

export const HUBSPOT_CONTACTS_URL =
  "https://api.hubapi.com/crm/v3/objects/contacts";

export async function upsertHubSpotContact({
  accessToken,
  email,
  fetcher = fetch,
  properties,
}: {
  accessToken: string;
  email: string;
  fetcher?: typeof fetch;
  properties: HubSpotContactProperties;
}): Promise<HubSpotUpsertResult> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const createResponse = await fetcher(HUBSPOT_CONTACTS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ properties }),
    });

    if (createResponse.ok) return { ok: true, operation: "created" };

    if (createResponse.status !== 409) {
      return {
        ok: false,
        reason: "create",
        status: createResponse.status,
        detail: await createResponse.text(),
      };
    }

    const updateUrl = `${HUBSPOT_CONTACTS_URL}/${encodeURIComponent(email)}?idProperty=email`;
    const updateResponse = await fetcher(updateUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ properties }),
    });

    if (updateResponse.ok) return { ok: true, operation: "updated" };

    return {
      ok: false,
      reason: "update",
      status: updateResponse.status,
      detail: await updateResponse.text(),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "network",
      detail: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
