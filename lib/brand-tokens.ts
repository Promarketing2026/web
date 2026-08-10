// ImageResponse no consume de forma fiable las variables de app/globals.css.
// Estos valores reflejan los tokens semánticos aprobados en DOC 08 y deben
// mantenerse sincronizados con CSS y Figma cuando el Design System cambie.
export const BRAND_COLORS = {
  canvasLight: "#F0F3F6",
  surfaceLight: "#FFFFFF",
  logoOnLight: "#0A0E14",
  ink: "#0A0E14",
  textSecondaryLight: "#5A625E",
  connectionLight: "#008BA3",
  decisionLight: "#C24100",
} as const;
