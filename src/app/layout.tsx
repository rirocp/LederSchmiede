import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond, Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Leder Schmiede - Sarah Röttig | Fahrzeugsattlerin",
  description: "Meisterbetrieb für anspruchsvolle Handwerkskunst in der Fahrzeugsattlerei",
  metadataBase: new URL('https://leder-schmiede.de'),
  openGraph: {
    title: "Leder Schmiede - Sarah Röttig",
    description: "Meisterbetrieb für anspruchsvolle Handwerkskunst in der Fahrzeugsattlerei",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${cinzel.variable} ${cinzelDecorative.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
