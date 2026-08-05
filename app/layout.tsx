import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { Navbar } from "@/components/navbar";
import { OrganizationJsonLd } from "@/components/organization-jsonld";
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
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {isProductionDeployment && publicEnv.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager containerId={publicEnv.NEXT_PUBLIC_GTM_ID} />
        ) : null}
        <OrganizationJsonLd />
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <header aria-label="Encabezado del sitio">
          <Navbar />
        </header>
        <SmoothScrollProvider>
          <main className="flex-1">{children}</main>
        </SmoothScrollProvider>
        <footer aria-label="Pie de página">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
