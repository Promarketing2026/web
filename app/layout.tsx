import { Suspense } from "react";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { ConsentBanner } from "@/components/consent-banner";
import { ConsentDefaults } from "@/components/consent-defaults";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { MicrosoftClarity } from "@/components/microsoft-clarity";
import { Navbar } from "@/components/navbar";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { UtmCapture } from "@/components/utm-capture";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-config";
import { isProductionDeployment } from "@/lib/env/deployment";
import { publicEnv } from "@/lib/env/public";
import { SERVICES } from "@/lib/services";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: isProductionDeployment
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const solutionItems = SERVICES.map(({ slug, title }) => ({
    label: title,
    href: `/servicios/${slug}`,
  }));

  return (
    <html lang="es" className={`dark ${instrumentSans.variable} h-full antialiased`}>
      <head>
        <ConsentDefaults />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {isProductionDeployment && publicEnv.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager containerId={publicEnv.NEXT_PUBLIC_GTM_ID} />
        ) : null}
        <MicrosoftClarity projectId={publicEnv.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
        <OrganizationJsonLd />
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <Navbar solutionItems={solutionItems} />
        <MotionProvider>
          <SmoothScrollProvider>
            <main className="flex-1">{children}</main>
          </SmoothScrollProvider>
        </MotionProvider>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
