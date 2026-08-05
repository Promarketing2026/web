import { createSocialPreviewImage } from "@/lib/social-preview";

export const alt = "Promarketing Perú — Infraestructura Comercial Conectada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialPreviewImage();
}
