import { ShieldCheck } from "./icons";
import { DICTS, LOCALES, LOCALE_LABEL, LOCALE_PATH, type Locale } from "@/lib/i18n";

export default function Header({ locale = "de" }: { locale?: Locale }) {
  const t = DICTS[locale].nav;
  const home = LOCALE_PATH[locale];
  const anchor = (id: string) => (home === "/" ? `/#${id}` : `${home}#${id}`);
  return (
    <header className="header">
      <div className="wrap">
        <a href={home} className="brand">
          <span className="brand-mark"><ShieldCheck size={20} /></span>
          Klarcheck
        </a>
        <nav className="nav" aria-label="Navigation">
          <a href={anchor("so-gehts")}>{t.how}</a>
          <a href={anchor("hinweis")}>{t.important}</a>
          <a href={anchor("faq")}>{t.faq}</a>
          <a href={anchor("deasy")} className="accent">{t.deasy}</a>
        </nav>
        <nav className="lang-switch" aria-label={t.langLabel}>
          {LOCALES.map((l) => (
            <a key={l} href={LOCALE_PATH[l]} hrefLang={l} aria-current={l === locale ? "page" : undefined}>
              {LOCALE_LABEL[l]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
