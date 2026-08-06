"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { serverEnv } from "@/lib/env/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadNotificationEmail } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────
// A12c completo — honeypot (ya integrado antes) + rate limiting por IP
// usando lib/rate-limit.ts (Upstash Redis vía Vercel Marketplace). Ver
// ese archivo para los prerrequisitos manuales (instalar la integración
// de Upstash desde el Marketplace de Vercel; el paquete usado es
// @upstash/redis, no @vercel/kv, que ya está descontinuado).
//
// Cómo obtenemos la IP: en un Server Action no hay acceso directo al
// objeto Request, así que leemos el header "x-forwarded-for" con
// headers() de next/headers. Vercel lo agrega automáticamente en
// producción. En desarrollo local puede venir vacío — por eso hay un
// fallback a "unknown", que simplemente comparte una sola "IP" para todas
// tus pruebas locales (no afecta a usuarios reales).
//
// A12a — retoque QA: si el contacto ya existe en HubSpot (mismo email),
// la API responde 409. Antes, ese caso se trataba como "éxito" sin
// actualizar nada — así que reenviar el formulario con el mismo correo
// pero con Empresa/Servicio distintos nunca llegaba a HubSpot. Ahora, en
// caso de 409, hacemos un PATCH al contacto existente (usando el email
// como identificador) para actualizar sus propiedades con los datos
// nuevos del envío.
// ─────────────────────────────────────────────────────────────────────────

export type AuditoriaFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    nombre?: string;
    email?: string;
    consentimiento?: string;
  };
};

const HUBSPOT_CONTACTS_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

const auditoriaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo.")
    .max(120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo electrónico válido."),
  empresa: z
    .string()
    .trim()
    .max(120, "El nombre de la empresa es demasiado largo.")
    .optional()
    .or(z.literal("")),
  servicio: z.string().trim().optional().or(z.literal("")),
  consentimiento: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar la política de privacidad para continuar.",
  }),
});

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

async function updateExistingContact(
  email: string,
  properties: Record<string, string | undefined>,
): Promise<boolean> {
  const url = `${HUBSPOT_CONTACTS_URL}/${encodeURIComponent(email)}?idProperty=email`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${serverEnv.hubspotServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        "HubSpot: fallo al actualizar contacto existente:",
        response.status,
        errorBody,
      );
    }

    return response.ok;
  } catch (error) {
    console.error("Error de red al actualizar contacto en HubSpot:", error);
    return false;
  }
}

export async function submitAuditoriaForm(
  _prevState: AuditoriaFormState,
  formData: FormData,
): Promise<AuditoriaFormState> {
  // ── Honeypot: primero que nada, es gratis y no requiere red. ──────────
  const honeypot = formData.get("pagina_web");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn(
      "Honeypot activado — posible envío de bot, ignorado silenciosamente.",
    );
    return { status: "success" };
  }

  // ── Rate limiting por IP ────────────────────────────────────────────
  const ip = await getClientIp();
  const { allowed } = await checkRateLimit(ip);

  if (!allowed) {
    return {
      status: "error",
      message:
        "Has enviado demasiadas solicitudes en poco tiempo. Espera unos minutos e intenta de nuevo.",
    };
  }

  const parsed = auditoriaSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    empresa: formData.get("empresa"),
    servicio: formData.get("servicio"),
    consentimiento: formData.get("consentimiento") === "on",
  });

  if (!parsed.success) {
    const fieldErrors: AuditoriaFormState["fieldErrors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "nombre" ||
        field === "email" ||
        field === "consentimiento"
      ) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Revisa los campos marcados antes de continuar.",
      fieldErrors,
    };
  }

  const { nombre, email, empresa, servicio } = parsed.data;
  const [firstname, ...restoDelNombre] = nombre.split(" ");
  const lastname = restoDelNombre.join(" ") || undefined;

  const properties = {
    firstname,
    lastname,
    email,
    company: empresa || undefined,
    servicio_de_interes: servicio || undefined,
  };

  try {
    const response = await fetch(HUBSPOT_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serverEnv.hubspotServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    });

    if (response.ok) {
      void sendLeadNotificationEmail({ nombre, email, empresa, servicio });
      return { status: "success" };
    }

    if (response.status === 409) {
      // El contacto ya existe (mismo email) — actualizamos sus
      // propiedades en vez de descartar los datos nuevos del envío.
      const updated = await updateExistingContact(email, properties);

      if (updated) {
        void sendLeadNotificationEmail({ nombre, email, empresa, servicio });
        return { status: "success" };
      }

      return {
        status: "error",
        message:
          "No pudimos actualizar tu solicitud en este momento. Intenta de nuevo en unos minutos.",
      };
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
