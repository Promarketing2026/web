import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promarketing Per\u00fa",
  description: "Promarketing Per\u00fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header aria-label="Encabezado del sitio">
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <footer aria-label="Pie de p\u00e1gina">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
