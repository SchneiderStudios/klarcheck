import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klarcheck – Echt oder Masche? Kostenlos prüfen",
  description:
    "Brief, Rechnung, SMS oder E-Mail verdächtig? Klarcheck zeigt in Sekunden typische Betrugsmerkmale – kostenlos, ohne Konto, in deiner Sprache.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F9FB" },
    { media: "(prefers-color-scheme: dark)", color: "#08151D" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
