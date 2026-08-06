import { Resend } from "resend";
import { serverEnv } from "@/lib/env/server";

const NOTIFICATION_RECIPIENT = "promarketing2027@gmail.com";
const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL ||
  "Auditoría Promarketing <notificaciones@promarketingperu.com>";

export type LeadNotificationData = {
  nombre: string;
  email: string;
  empresa?: string;
  servicio?: string;
};

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

  const { nombre, email, empresa, servicio } = data;
  const fecha = new Date().toLocaleString("es-PE", {
    timeZone: "America/Lima",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Nuevo Lead - Auditoría C.L.A.R.O.</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; padding: 24px; color: #18181b;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; padding: 32px;">
        <h2 style="margin-top: 0; color: #09090b; font-size: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 12px;">
          🚀 Nuevo Lead - Auditoría C.L.A.R.O.
        </h2>
        <p style="font-size: 15px; color: #52525b; margin-bottom: 24px;">
          Se ha recibido una nueva solicitud de auditoría desde el sitio web.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600; width: 140px;">Nombre:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600;">Empresa:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${empresa || "No especificada"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600;">Servicio de interés:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${servicio || "General / No especificado"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600;">Fecha de recepción:</td>
            <td style="padding: 10px 0;">${fecha} (PET)</td>
          </tr>
        </table>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #a1a1aa; text-align: center;">
          Promarketing Perú — Sistema Automático de Notificaciones
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data: responseData, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [NOTIFICATION_RECIPIENT],
      subject: `[Lead Promarketing] Auditoría C.L.A.R.O. - ${nombre}`,
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
