import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────
// LEGAL-1 — Página de Política de Privacidad
//
// Plantilla base alineada a la Ley N° 29733 (Ley de Protección de Datos
// Personales, Perú) y su Reglamento vigente (D.S. N° 016-2024-JUS).
//
// TODO ANTES DE LANZAR — completar y hacer revisar por un abogado:
//   1. Confirmar que la razón social, RUC, domicilio y correo para ejercer
//      derechos coinciden con la información legal vigente de la empresa.
//   2. Confirmar si el banco de datos personales está inscrito (o se
//      inscribirá) en el Registro Nacional de Protección de Datos Personales
//      y añadir la información correspondiente si aplica.
//   3. Una vez revisado y aprobado el contenido legal, eliminar el banner
//      <ReviewNotice /> de abajo (o el flag SHOW_REVIEW_NOTICE).
//   4. Enlazar esta página desde el checkbox de consentimiento del
//      formulario (A12b) y desde el Footer (ya existe la columna Legal).
// ─────────────────────────────────────────────────────────────────────────

const SHOW_REVIEW_NOTICE = true;
const LAST_UPDATED = "5 de agosto de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Promarketing Perú recopila, usa y protege los datos personales de quienes contactan a través de este sitio, conforme a la Ley N° 29733.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

function ReviewNotice() {
  if (!SHOW_REVIEW_NOTICE) return null;
  return (
    <div className="mb-10 border-l-4 border-foreground/30 bg-muted px-4 py-3 text-sm text-muted-foreground">
      <strong className="text-foreground">Versión preliminar.</strong> Este
      documento es una plantilla de referencia y todavía no ha sido revisado
      por un abogado. No debe considerarse asesoría legal ni un documento
      final hasta que se complete esa revisión.
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="mb-2 text-sm uppercase tracking-wide text-muted-foreground">
        Legal
      </p>
      <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
        Política de Privacidad
      </h1>

      <ReviewNotice />

      <Section title="1. Responsable del tratamiento">
        <p>
          PROMARKETING CONSULTING S.A.C., identificada con RUC 20601326532,
          con domicilio en Calle Las Cantamas Mz. 13 Lt. 6, Musa II Etapa, La
          Molina, Lima, Perú (en adelante,
          &ldquo;Promarketing Perú&rdquo;), es responsable del tratamiento de
          los datos personales que usted proporciona a través de este sitio
          web, de conformidad con la Ley N° 29733, Ley de Protección de Datos
          Personales, y su Reglamento vigente, aprobado por el D.S. N°
          016-2024-JUS.
        </p>
      </Section>

      <Section title="2. Datos personales que recopilamos">
        <p>
          Cuando usted completa el formulario de solicitud de Auditoría
          C.L.A.R.O. en este sitio, recopilamos los siguientes datos:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Empresa a la que representa</li>
          <li>Servicio de su interés</li>
        </ul>
        <p>
          Adicionalmente, las herramientas de analítica y medición que se
          habiliten pueden recopilar identificadores en línea, información del
          navegador o dispositivo, dirección IP aproximada, páginas visitadas
          e interacciones con el sitio. Estas categorías opcionales se
          mantienen desactivadas hasta que usted expresa su preferencia en el
          panel de cookies.
        </p>
        <p>
          La configuración prevista para el lanzamiento incluye Google
          Analytics 4 para analítica y Meta Pixel para medición de campañas.
          Google Ads y Microsoft Clarity no están activos actualmente; si se
          incorporan, esta política y el panel de preferencias deberán
          actualizarse antes de activarlos.
        </p>
        <p>
          Su elección se conserva localmente en el navegador y puede
          modificarla en cualquier momento mediante el enlace
          &ldquo;Preferencias de cookies&rdquo; disponible en el pie de página.
        </p>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Los datos que usted nos proporciona se utilizan para:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Contactarlo respecto a su solicitud de Auditoría C.L.A.R.O. y
            coordinar una reunión a través de nuestro calendario en línea.
          </li>
          <li>
            Enviarle información comercial sobre nuestros servicios, cuando
            usted lo haya autorizado expresamente.
          </li>
          <li>
            Elaborar estadísticas internas sobre el uso del sitio y la
            efectividad de nuestras campañas de marketing.
          </li>
        </ul>
        <p>
          No utilizamos sus datos personales para fines distintos a los aquí
          señalados sin solicitar un nuevo consentimiento.
        </p>
      </Section>

      <Section title="4. Base legal y consentimiento">
        <p>
          El tratamiento de sus datos personales se basa en el consentimiento
          previo, informado, expreso e inequívoco que usted otorga al marcar
          la casilla de aceptación en nuestro formulario de contacto, conforme
          al artículo 5 de la Ley N° 29733.
        </p>
        <p>
          El consentimiento para analítica y marketing se solicita de manera
          separada mediante el panel de preferencias de cookies. Rechazar esas
          categorías no impide utilizar las funciones necesarias del sitio, y
          usted puede retirar o modificar su elección en cualquier momento.
        </p>
      </Section>

      <Section title="5. Encargados de tratamiento y terceros">
        <p>
          Para gestionar sus datos utilizamos las siguientes plataformas, que
          actúan como encargadas de tratamiento bajo nuestras instrucciones:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className="text-foreground">HubSpot</strong> (CRM):
            almacenamiento y gestión de sus datos de contacto, y
            coordinación de reuniones a través de su Programador de
            Reuniones.
          </li>
          <li>
            <strong className="text-foreground">Sanity.io</strong>: gestión
            del contenido editorial del sitio (no almacena datos de
            formularios).
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong>: hospedaje
            técnico del sitio web.
          </li>
          <li>
            <strong className="text-foreground">Google</strong>: gestión de
            etiquetas mediante Google Tag Manager y, únicamente con
            consentimiento de analítica, medición mediante Google Analytics 4.
          </li>
          <li>
            <strong className="text-foreground">Meta Platforms</strong>:
            medición y atribución de campañas mediante Meta Pixel, únicamente
            con consentimiento de marketing. La coincidencia avanzada
            automática está desactivada y no enviamos intencionalmente a esta
            herramienta el nombre, correo electrónico ni empresa ingresados en
            el formulario.
          </li>
        </ul>
        <p>
          No vendemos sus datos personales. Solo los comunicamos a los
          proveedores indicados en la medida necesaria para las finalidades
          aquí descritas y según las preferencias que usted haya elegido.
        </p>
      </Section>

      <Section title="6. Tratamiento fuera del Perú">
        <p>
          Algunos de los proveedores tecnológicos indicados pueden procesar o
          almacenar información fuera del Perú. Estas operaciones deberán
          realizarse con las garantías contractuales y medidas de seguridad
          exigibles para proteger los datos personales.
        </p>
      </Section>

      <Section title="7. Plazo de conservación">
        <p>
          Conservamos sus datos personales mientras exista una relación
          comercial o de interés vigente con usted, y hasta 24
          meses después del último contacto, salvo que usted solicite antes
          su eliminación o exista una obligación legal de conservarlos por
          más tiempo.
        </p>
      </Section>

      <Section title="8. Sus derechos (derechos ARCO)">
        <p>
          Usted puede ejercer en cualquier momento sus derechos de Acceso,
          Rectificación, Cancelación y Oposición (derechos ARCO), así como
          solicitar la portabilidad de sus datos, escribiendo a{" "}
          <a
            href="mailto:info@promarketingperu.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            info@promarketingperu.com
          </a>
          , indicando el derecho que desea ejercer y adjuntando copia de su
          documento de identidad.
        </p>
        <p>
          Si considera que el tratamiento de sus datos personales vulnera la
          normativa vigente, puede presentar un reclamo ante la Autoridad
          Nacional de Protección de Datos Personales (ANPD).
        </p>
      </Section>

      <Section title="9. Cambios a esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios legales,
          técnicos o en nuestros servicios. La fecha de la última
          actualización se indica al final de este documento.
        </p>
      </Section>

      <Section title="10. Contacto">
        <p>
          Para cualquier consulta sobre esta Política de Privacidad, escríbanos
          a{" "}
          <a
            href="mailto:info@promarketingperu.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            info@promarketingperu.com
          </a>
          .
        </p>
      </Section>

      <p className="mt-12 text-sm text-muted-foreground">
        Última actualización: {LAST_UPDATED}
      </p>
    </main>
  );
}
