import { Resend } from "resend";
import { serverEnv } from "@/lib/env/server";
import {
  buildLeadNotificationHtml,
  sanitizeEmailSubjectPart,
  type LeadNotificationData,
} from "@/lib/email-template";

const NOTIFICATION_RECIPIENT = "promarketing2027@gmail.com";
const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL ||
  "Auditoría Promarketing <notificaciones@promarketingperu.com>";

export type { LeadNotificationData } from "@/lib/email-template";

export async function sendLeadNotificationEmail(
  data: LeadNotificationData,
): Promise<{ success: boolean; error?: string }> {
  if (!serverEnv.resendApiKey) {
    console.warn(
      "Resend: RESEND_API_KEY no configurada. Notificación por correo omitida.",
    );
    return { success: false, error: "RESEND_API_KEY no configurada." };
  }

  const resend = new Resend(serverEnv.resendApiKey);

  const fecha = new Date().toLocaleString("es-PE", {
    timeZone: "America/Lima",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = buildLeadNotificationHtml(data, fecha);

  try {
    const { data: responseData, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [NOTIFICATION_RECIPIENT],
      subject: `[Lead Promarketing] Auditoría C.L.A.R.O. - ${sanitizeEmailSubjectPart(data.nombre)}`,
      html,
    });

    if (error) {
      console.error("Resend API devolvió error al enviar notificación:", error);
      return { success: false, error: error.message };
    }

    console.log("Notificación por email enviada exitosamente con Resend ID:", responseData?.id);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("Error al enviar email con Resend:", message);
    return { success: false, error: message };
  }
}
