export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="small muted" style={{ flex: "1 1 320px" }}>
          Klarcheck · Orientierungshilfe mit KI. Ergebnisse sind unverbindliche Empfehlungen, keine Rechtsberatung und keine Garantie für Echtheit. Bei Zweifeln wende dich an die zuständige Stelle.
        </span>
        <nav aria-label="Rechtliches">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
