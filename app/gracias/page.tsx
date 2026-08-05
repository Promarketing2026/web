import { Suspense } from "react";

import { ThankYouRedirect } from "@/components/thank-you-redirect";

export const metadata = {
  title: "Gracias",
  description: "Gracias por contactar a Promarketing Perú.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GraciasPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouRedirect />
    </Suspense>
  );
}
