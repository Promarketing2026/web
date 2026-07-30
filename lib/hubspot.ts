"use server";

// ─────────────────────────────────────────────────────────────────────────
// A12a — Integración base del formulario de Auditoría C.L.A.R.O. con HubSpot
//
// NOTA IMPORTANTE sobre TASKS.md: el ítem original decía "HubSpot Forms
// API", pero el Service Key que ya tienes (scopes
// crm.objects.contacts.read/write) es un token de Private App para la
// CRM API, no para la Forms API pública (que usa portalId + formGuid y no
// necesita este tipo de scopes). Por eso esta implementación llama
// directamente a POST /crm/v3/objects/contacts. Si más adelante prefieren
// usar la Forms API real (útil para trackear el "form ID" nativo de
// HubSpot en reportes de marketing), es una integración distinta —
// avísame y la armamos aparte.
//
// LO QUE FALTA (fuera de esta tarea, cubierto en A12b/A12c/A12d):
//   - Validación server-side con zod (A12b)
//   - Honeypot + rate limiting (A12c)
//   - Redirección a /gracias con UTMs + link a Meetings (A12d)
//
// PRERREQUISITO MANUAL EN HUBSPOT (antes de probar este código):
//   Crear la propiedad de contacto personalizada "servicio_de_interes"
//   (Configuración → Propiedades → Propiedades de contacto → Crear
//   propiedad, tipo texto de una línea, nombre interno EXACTO:
//   servicio_de_interes). Si no existe, HubSpot responde 400 al enviar
//   ese campo.
// ─────────────────────────────────────────────────────────────────────────

export type AuditoriaFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const HUBSPOT_CONTACTS_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

export async function submitAuditoriaForm(
  _prevState: AuditoriaFormState,
  formData: FormData,
): Promise<AuditoriaFormState> {
  const nombre = formData.get("nombre")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const empresa = formData.get("empresa")?.toString().trim() ?? "";
  const servicio = formData.get("servicio")?.toString().trim() ?? "";

  // Validación mínima solo para no llamar a HubSpot con datos vacíos.
  // La validación completa (formato de email, longitudes, etc.) es A12b.
  if (!nombre || !email) {
    return {
      status: "error",
      message: "Nombre y correo son obligatorios.",
    };
  }

  const [firstname, ...restoDelNombre] = nombre.split(" ");
  const lastname = restoDelNombre.join(" ") || undefined;

  try {
    const response = await fetch(HUBSPOT_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname,
          lastname,
          email,
          company: empresa || undefined,
          servicio_de_interes: servicio || undefined,
        },
      }),
    });

    if (response.ok) {
      return { status: "success" };
    }

    // 409 = el contacto ya existe en HubSpot (mismo email). No es un error
    // real para el usuario que llena el formulario — lo tratamos como éxito.
    if (response.status === 409) {
      return { status: "success" };
    }

    const errorBody = await response.text();
    console.error("HubSpot respondió con error:", response.status, errorBody);

    return {
      status: "error",
      message:
        "No pudimos guardar tu solicitud en este momento. Intenta de nuevo en unos minutos.",
    };
  } catch (error) {
    console.error("Error de red al contactar HubSpot:", error);
    return {
      status: "error",
      message:
        "No pudimos conectarnos con nuestro sistema. Revisa tu conexión e intenta de nuevo.",
    };
  }
}
