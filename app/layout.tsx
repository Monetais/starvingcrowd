import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "StarvingCrowd — Profitable Nischen in Minuten finden",
  description:
    "StarvingCrowd hilft dir, Märkte mit hoher Nachfrage, geringer Konkurrenz und echtem Profit-Potenzial für Produkte, Services und digitale Angebote zu entdecken.",
  openGraph: {
    title: "StarvingCrowd",
    description: "Finde profitable Nischen in Minuten.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
