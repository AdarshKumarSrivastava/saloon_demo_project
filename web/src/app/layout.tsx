import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Cinzel } from "next/font/google";
import "./globals.css";
import { GenderProvider } from "@/context/GenderContext";
import { ReactLenis } from 'lenis/react';
import Preloader from "@/components/Preloader";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: '--font-display' });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: '--font-body' });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: '--font-accent' });

export const metadata: Metadata = {
  title: "Maison Éclat | Unisex Luxury Salon",
  description: "A premium, sophisticated unisex salon experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}>
      <body className="bg-obsidian text-ivory font-body antialiased">
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
          <GenderProvider>
            <Preloader />
            {children}
          </GenderProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
