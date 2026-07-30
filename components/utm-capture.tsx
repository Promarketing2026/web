"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureUtmParams } from "@/lib/utm";

// Componente invisible (no renderiza nada). Se monta en el layout raíz
// para capturar UTMs sin importar por qué página entre alguien al sitio.
export function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams(searchParams);
  }, [searchParams]);

  return null;
}