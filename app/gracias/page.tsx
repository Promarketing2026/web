import { Suspense } from "react";

import { ThankYouRedirect } from "@/components/thank-you-redirect";

export const metadata = {
  title: "Gracias | Promarketing Peru",
  description: "Gracias por contactar a Promarketing Peru.",
};

export default function GraciasPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouRedirect />
    </Suspense>
  );
}
