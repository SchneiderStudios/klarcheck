import Checker from "./components/Checker";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Bank, Check, Clock, FileText, Info, LinkIcon, Lock, Mail, Message, Shield, Trash, User, Arrow } from "./components/icons";

const DEASY_URL = process.env.NEXT_PUBLIC_DEASY_URL || "#";

const ITEMS = [
  "Paket-SMS",
  "„Hallo Mama“-Nachrichten",
  "Bank-E-Mails",
  "Mahnungen & Inkasso",
  "Behördenbriefe",
  "Rechnungen",
  "Jobangebote",
  "Gewinnspiele",
  "Mietangebote",
  "Kleinanzeigen-Käufer",
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="wrap hero" id="pruefen">
          <div className="hero-text">
            <span className="pill"><span className="dot pulse" /> Kostenlos · ohne Konto · nichts gespeichert</span>
            <h1>
              Echt oder Masche?
              <br />
              <span>In Sekunden prüfen.</span>
            </h1>
            <p className="lead">
              SMS, E-Mail, WhatsApp oder Brief komisch? Füge die Nachricht ein oder fotografiere den Brief – Klarcheck zeigt dir typische Betrugsmerkmale und sagt, was du jetzt tun kannst.
            </p>
            <ul className="checks">
              <li><Check size={16} /> Für alle, kostenlos</li>
              <li><Check size={16} /> Ergebnis in 6 Sprachen</li>
              <li><Check size={16} /> Keine Speicherung</li>
            </ul>
            <p className="small muted" style={{ maxWidth: "34em" }}>
              Klarcheck ist eine Orientierungshilfe, keine Rechtsberatung. <a href="#hinweis">Was das bedeutet</a>
            </p>
          </div>
          <Checker />
        </div>

        <section className="band" aria-label="Was du prüfen kannst">
          <div className="marquee">
            <div className="track">
              {[...ITEMS, ...ITEMS].map((t, i) => (
                <span key={i} aria-hidden={i >= ITEMS.length || undefined}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section" id="so-gehts">
          <h2 className="h2">Drei Schritte. Fertig.</h2>
          <div className="grid">
            <div className="tile">
              <span className="num">01</span>
              <h3>Einfügen oder fotografieren</h3>
              <p>Text aus SMS oder E-Mail einfügen, Brief fotografieren, Screenshot oder PDF hochladen.</p>
            </div>
            <div className="tile">
              <span className="num">02</span>
              <h3>Klarcheck prüft</h3>
              <p>Unsere eigene Prüfung von Links und Bankverbindung plus KI-Analyse von Ton, Absender und bekannten Maschen.</p>
            </div>
            <div className="tile">
              <span className="num">03</span>
              <h3>Ampel lesen</h3>
              <p>Grün, Gelb oder Rot – mit Begründung und einem klaren nächsten Schritt.</p>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap section">
            <h2 className="h2">Was wir prüfen</h2>
            <div className="grid">
              <div className="tile">
                <span className="tile-icon"><LinkIcon size={26} /></span>
                <h3>Links & Domains</h3>
                <p>Nachgeahmte Adressen von DHL, PayPal, Sparkasse & Co., Kurzlinks und typische Betrugs-Endungen.</p>
              </div>
              <div className="tile">
                <span className="tile-icon"><Bank size={26} /></span>
                <h3>Bankverbindung</h3>
                <p>Prüfziffer der IBAN und Land des Kontos – passt das zum angeblichen Absender?</p>
              </div>
              <div className="tile">
                <span className="tile-icon"><Clock size={26} /></span>
                <h3>Druck & Drohungen</h3>
                <p>Kurze Fristen, Kontosperrung, Pfändung, Gutscheinkarten oder Krypto als Zahlungsweg.</p>
              </div>
              <div className="tile">
                <span className="tile-icon"><Mail size={26} /></span>
                <h3>Absender & Maschen</h3>
                <p>Passt der Absender? Erinnert die Nachricht an bekannte Maschen wie „Hallo Mama“ oder falsches Inkasso?</p>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap" id="hinweis" style={{ paddingTop: 80 }}>
          <div className="notice">
            <div className="notice-head">
              <span className="notice-icon"><Info size={28} /></span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                <h2 className="h2" style={{ fontSize: "clamp(26px, 3.4vw, 34px)" }}>Wichtig: Klarcheck gibt nur Empfehlungen</h2>
                <p style={{ fontSize: 18, lineHeight: "27px", maxWidth: "46em" }}>
                  Klarcheck ist ein Hilfsmittel. Es schätzt ein, wie wahrscheinlich eine Nachricht oder ein Brief echt ist – anhand typischer Betrugsmerkmale. Den Inhalt prüfen wir nicht: Ob eine Forderung berechtigt, ein Betrag richtig oder eine Frist wirksam ist, bewertet Klarcheck nicht.
                </p>
              </div>
            </div>
            <div className="grid">
              <div className="tile">
                <h3>Zweifel am Absender?</h3>
                <p>Kontaktiere die Behörde, Firma oder Bank direkt – über die Kontaktdaten auf ihrer offiziellen Website, nicht über die in der Nachricht.</p>
              </div>
              <div className="tile">
                <h3>Verdacht auf Betrug?</h3>
                <p>Wende dich an die Polizei – auch online über die Onlinewache deines Bundeslandes – oder an die Verbraucherzentrale.</p>
              </div>
              <div className="tile">
                <h3>Rechtliche Fragen?</h3>
                <p>Ob du zahlen musst oder widersprechen kannst, klären Anwältinnen und Anwälte, die Verbraucherzentrale oder eine Beratungsstelle.</p>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: "22px", fontWeight: 500 }}>
              Jede Entscheidung – zahlen, antworten, ignorieren – triffst du selbst. Das Ergebnis von Klarcheck ersetzt keine Prüfung durch die zuständige Stelle.
            </p>
          </div>
        </section>

        <section className="wrap section" id="datenschutz-kurz">
          <div className="privacy">
            <div style={{ flex: "1 1 340px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <Shield size={36} />
              <h2 className="h2">Wir speichern nichts.</h2>
              <p className="lead">
                Deine Nachricht wird nur für die Prüfung verarbeitet und danach verworfen. Kein Konto, keine Datenbank, kein Archiv. Bankverbindungen und lange Nummern kürzen wir im Text, bevor die KI ihn sieht.
              </p>
              <p className="small" style={{ color: "#93A7B4" }}>
                Für die Analyse nutzen wir einen KI-Dienstleister. Details: <a href="/datenschutz">Datenschutzerklärung</a>.
              </p>
            </div>
            <ul>
              <li><Trash size={22} /> Keine Speicherung deiner Inhalte</li>
              <li><Lock size={22} /> Kontonummern im Text werden gekürzt</li>
              <li><User size={22} /> Ohne Konto, ohne E-Mail-Adresse</li>
            </ul>
          </div>
        </section>

        <section className="wrap section faq" id="faq" style={{ paddingTop: 0 }}>
          <h2 className="h2">Fragen?</h2>
          <div>
            <details>
              <summary>Kostet Klarcheck etwas?</summary>
              <p>Nein. Klarcheck ist kostenlos – ohne Konto und ohne Abo.</p>
            </details>
            <details>
              <summary>Ist ein grünes Ergebnis eine Garantie?</summary>
              <p>Nein. Grün heißt: keine typischen Warnzeichen gefunden. Gute Fälschungen sind möglich – bei Zweifeln beim Absender über offizielle Kontaktdaten nachfragen.</p>
            </details>
            <details>
              <summary>Gibt Klarcheck Rechtsberatung?</summary>
              <p>Nein. Klarcheck gibt nur Empfehlungen: Wir schätzen ein, wie wahrscheinlich eine Nachricht echt ist. Ob eine Forderung berechtigt ist, prüfen wir nicht.</p>
            </details>
            <details>
              <summary>Was passiert mit meinen Daten?</summary>
              <p>Wir speichern nichts. Der Inhalt wird zur Analyse an unseren KI-Dienstleister übermittelt und danach verworfen. Im Text kürzen wir vorher Kontonummern, lange Nummern und E-Mail-Namen. Auf Fotos kannst du Namen und Adresse vorher abdecken. Mehr in der <a href="/datenschutz">Datenschutzerklärung</a>.</p>
            </details>
            <details>
              <summary>Was tun bei Rot?</summary>
              <p>Nicht zahlen, keine Links öffnen, keine Daten eingeben. Absender über die offizielle Website kontaktieren. Bei Schaden: Polizei und Verbraucherzentrale.</p>
            </details>
          </div>
        </section>

        <section className="wrap" id="deasy" style={{ paddingBottom: 80 }}>
          <div className="deasy">
            <div className="deasy-text">
              <span style={{ fontSize: 24, lineHeight: "30px", fontWeight: 600 }}>Echt, aber unverständlich?</span>
              <span className="muted">Klarcheck sagt dir, ob ein Brief verdächtig wirkt. DEASY hilft dir mit dem Inhalt:</span>
              <ul className="checks" style={{ color: "var(--ink)" }}>
                <li><FileText size={16} /> Brief in deiner Sprache erklärt</li>
                <li><Message size={16} /> Hilfe bei Formularen</li>
                <li><Clock size={16} /> Erinnerung an Fristen</li>
              </ul>
            </div>
            <a className="btn btn-primary" href={DEASY_URL}>
              Zu DEASY <Arrow size={20} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
