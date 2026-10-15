import { DICTS, type Locale } from "@/lib/i18n";

export default function Footer({ locale = "de" }: { locale?: Locale }) {
  const t = DICTS[locale].footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="small muted" style={{ flex: "1 1 320px" }}>
          {t.text}
          {t.legalNote && <> {t.legalNote}</>}
        </span>
        <nav aria-label="Legal">
          <a href="/impressum">{t.imprint}</a>
          <a href="/datenschutz">{t.privacy}</a>
        </nav>
      </div>
    </footer>
  );
}
