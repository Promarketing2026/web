// ImageResponse no consume de forma fiable las variables de app/globals.css.
// Estos valores reflejan los tokens semánticos aprobados en DOC 08 y deben
// mantenerse sincronizados con CSS y Figma cuando el Design System cambie.
export const BRAND_COLORS = {
  canvasLight: "#F3F2EE",
  surfaceLight: "#FFFFFF",
  logoOnLight: "#111111",
  ink: "#111318",
  textSecondaryLight: "#5A625E",
  connectionLight: "#087A5A",
  decisionLight: "#9A4B0F",
} as const;
