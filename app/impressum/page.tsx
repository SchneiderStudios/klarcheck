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
        <p className="placeholder">Entwurf: Bitte Platzhalter ausfüllen, bevor die Seite öffentlich beworben wird.</p>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <span className="placeholder">[Vor- und Nachname / Firmenname]</span>
          <br />
          <span className="placeholder">[Straße Hausnummer]</span>
          <br />
          <span className="placeholder">[PLZ Ort]</span>
        </p>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <span className="placeholder">[kontakt@…]</span>
        </p>
        <h2>Umsatzsteuer</h2>
        <p>
          <span className="placeholder">[USt-IdNr., falls vorhanden – sonst Abschnitt entfernen]</span>
        </p>
        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          <span className="placeholder">[Name, Anschrift wie oben]</span>
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
