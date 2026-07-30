"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

// ─────────────────────────────────────────────────────────────────────────
// A12c completo — honeypot (ya integrado antes) + rate limiting por IP
// usando lib/rate-limit.ts (Vercel KV). Ver ese archivo para los
// prerrequisitos manuales (crear la base de datos en Vercel, instalar
// @vercel/kv).
//
// Cómo obtenemos la IP: en un Server Action no hay acceso directo al
// objeto Request, así que leemos el header "x-forwarded-for" con
// headers() de next/headers. Vercel lo agrega automáticamente en
// producción. En desarrollo local puede venir vacío — por eso hay un
// fallback a "unknown", que simplemente comparte una sola "IP" para todas
// tus pruebas locales (no afecta a usuarios reales).
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

    if (response.ok || response.status === 409) {
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
