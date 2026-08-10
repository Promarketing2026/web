export const LEAD_SERVICE_OPTIONS = [
  { value: "necesito-web", label: "Necesito una web o mejorar la que tengo" },
  { value: "fortalecer-marca", label: "Quiero fortalecer mi marca" },
  { value: "generar-oportunidades", label: "Necesito generar más oportunidades" },
  {
    value: "convertir-oportunidades",
    label: "Tengo oportunidades pero no estoy convirtiendo",
  },
  {
    value: "ordenar-ventas-crm",
    label: "Necesito ordenar ventas, CRM o seguimiento",
  },
  { value: "automatizar-procesos", label: "Quiero automatizar procesos" },
  { value: "entender-resultados", label: "Necesito entender mejor mis resultados" },
  { value: "otra-necesidad", label: "Tengo otra necesidad" },
  { value: "no-seguro", label: "No estoy seguro todavía" },
] as const;

export type LeadServiceValue = (typeof LEAD_SERVICE_OPTIONS)[number]["value"];

const LEAD_SERVICE_VALUES = new Set<string>(
  LEAD_SERVICE_OPTIONS.map(({ value }) => value),
);

export function isLeadServiceValue(value: unknown): value is LeadServiceValue {
  return typeof value === "string" && LEAD_SERVICE_VALUES.has(value);
}
