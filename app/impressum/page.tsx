import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Impressum – Klarcheck", robots: { index: false } };

export default function Impressum() {
  return (
    <>
      <Header />
      <main className="wrap legal">
        <h1>Impressum</h1>
        <h2>Anbieter</h2>
        <p>
          Schneider Studios
        </p>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:herr.ishneider@gmail.com">herr.ishneider@gmail.com</a>
        </p>
        <h2>Hinweis zum Angebot</h2>
        <p>
          Klarcheck ist eine kostenlose Orientierungshilfe. Die Ergebnisse werden automatisch mit Hilfe künstlicher Intelligenz erstellt und sind unverbindliche Empfehlungen. Sie sind keine Rechtsberatung und keine Garantie für die Echtheit eines Dokuments oder einer Nachricht.
        </p>
      </main>
      <Footer />
    </>
  );
}
