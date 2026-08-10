import type { UtmParams } from "@/lib/utm";

export type LeadNotificationData = {
  nombre: string;
  email: string;
  empresa?: string;
  servicio?: string;
  utms?: UtmParams;
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character] ?? character;
  });
}

export function sanitizeEmailSubjectPart(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function buildLeadNotificationHtml(
  data: LeadNotificationData,
  fecha: string,
): string {
  const nombre = escapeHtml(data.nombre);
  const email = escapeHtml(data.email);
  const empresa = data.empresa ? escapeHtml(data.empresa) : "No especificada";
  const servicio = data.servicio
    ? escapeHtml(data.servicio)
    : "General / No especificado";
  const safeFecha = escapeHtml(fecha);
  const activeUtms = data.utms
    ? Object.entries(data.utms).filter((entry): entry is [string, string] =>
        Boolean(entry[1]),
      )
    : [];

  const utmRowsHtml =
    activeUtms.length > 0
      ? `
        <tr>
          <td colspan="2" style="padding: 14px 0 6px 0; font-weight: 700; color: #09090b; border-bottom: 1px solid #e4e4e7;">
            📌 Parámetros de Atribución (UTM):
          </td>
        </tr>
        ${activeUtms
          .map(
            ([key, value]) => `
          <tr>
            <td style="padding: 6px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #71717a; padding-left: 12px;">${escapeHtml(key)}:</td>
            <td style="padding: 6px 0; border-bottom: 1px solid #f4f4f5; color: #09090b; font-family: monospace;">${escapeHtml(value)}</td>
          </tr>
        `,
          )
          .join("")}
      `
      : "";

  return `
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
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600; width: 160px;">Nombre:</td>
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
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${empresa}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600;">Servicio de interés:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${servicio}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; font-weight: 600;">Fecha de recepción:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">${safeFecha} (PET)</td>
          </tr>
          ${utmRowsHtml}
        </table>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #a1a1aa; text-align: center;">
          Promarketing Perú — Sistema Automático de Notificaciones
        </div>
      </div>
    </body>
    </html>
  `;
}
