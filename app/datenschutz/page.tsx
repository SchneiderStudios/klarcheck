import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Datenschutz – Klarcheck", robots: { index: false } };

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main className="wrap legal">
        <h1>Datenschutzerklärung</h1>
        <p className="placeholder">Entwurf: vor dem öffentlichen Start bitte von einer Fachperson für Datenschutz prüfen lassen und Platzhalter ausfüllen.</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          <span className="placeholder">[Name, Anschrift, E-Mail – wie im Impressum]</span>
        </p>

        <h2>2. Das Wichtigste in Kürze</h2>
        <p>
          Wir speichern die Inhalte, die du prüfen lässt, nicht. Es gibt kein Nutzerkonto, keine Datenbank mit Nachrichten oder Dokumenten, keine Cookies und kein Tracking. Schriften werden von unserem eigenen Server geladen, nicht von Google.
        </p>

        <h2>3. Prüfung einer Nachricht oder eines Dokuments</h2>
        <p>
          Wenn du einen Text, ein Foto oder ein PDF prüfen lässt, wird der Inhalt verschlüsselt an unseren Server übertragen. Dort prüfen wir automatisch Links und Bankverbindungen. Bei Texten kürzen wir anschließend Kontonummern, lange Nummern und den Namensteil von E-Mail-Adressen. Danach wird der Inhalt zur Analyse an unseren KI-Dienstleister übermittelt. Das Ergebnis wird an deinen Browser zurückgeschickt; der Inhalt wird von uns nicht gespeichert und nach der Prüfung verworfen.
        </p>
        <p>
          Fotos und PDFs werden nicht gekürzt. Bitte decke persönliche Angaben (Name, Adresse, Kundennummern) vorher ab, wenn möglich – für die Prüfung werden sie nicht gebraucht.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erbringung des von dir angefragten Dienstes). Bitte lade keine besonderen Kategorien personenbezogener Daten (z. B. Gesundheitsdaten) hoch.
        </p>

        <h2>4. KI-Dienstleister</h2>
        <p>
          Für die Analyse nutzen wir die API von Anthropic PBC, 548 Market Street, San Francisco, CA 94104, USA. Dabei kann es zu einer Übermittlung in die USA kommen. <span className="placeholder">[Grundlage der Übermittlung ergänzen, z. B. Standardvertragsklauseln / EU-US Data Privacy Framework, sowie Auftragsverarbeitungsvertrag (AVV) und die aktuellen Aufbewahrungsfristen laut Vertrag mit dem Anbieter]</span>
        </p>

        <h2>5. Hosting</h2>
        <p>
          Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet; die Prüfung läuft auf Servern in Frankfurt am Main. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, Browser) in Server-Protokollen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer Betrieb). <span className="placeholder">[AVV mit Vercel und Grundlage der Drittlandübermittlung ergänzen]</span>
        </p>
        <p>
          Zum Schutz vor Missbrauch zählen wir kurzfristig im Arbeitsspeicher, wie viele Prüfungen von einer IP-Adresse kommen. Diese Zähler werden nicht dauerhaft gespeichert.
        </p>

        <h2>6. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Da wir keine Inhalte speichern, können wir zu geprüften Nachrichten in der Regel keine Auskunft geben.
        </p>
      </main>
      <Footer />
    </>
  );
}
