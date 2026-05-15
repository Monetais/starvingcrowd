import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Kaching OS — Finde die Nachfrage. Baue das Business.",
  description:
    "Kaching OS zeigt dir, wo echte Nachfrage existiert — damit du mit Shopify, Lovable oder No-Code in Tagen ein profitables Business launchen kannst.",
  openGraph: {
    title: "Kaching OS — Finde die Nachfrage. Baue das Business.",
    description: "Finde profitable Nischen mit bewiesener Nachfrage. Baue dein Online-Business darauf.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
