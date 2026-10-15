import Checker from "./Checker";
import Header from "./Header";
import Footer from "./Footer";
import HtmlLang from "./HtmlLang";
import { Bank, Check, Clock, FileText, Info, LinkIcon, Lock, Mail, Message, Shield, Trash, User, Arrow } from "./icons";
import { DICTS, type Locale } from "@/lib/i18n";

const DEASY_URL = process.env.NEXT_PUBLIC_DEASY_URL || "#";
const WHAT_ICONS = [LinkIcon, Bank, Clock, Mail];
const PRIVACY_ICONS = [Trash, Lock, User];
const DEASY_ICONS = [FileText, Message, Clock];

export default function Landing({ locale }: { locale: Locale }) {
  const t = DICTS[locale];
  return (
    <>
      <HtmlLang lang={locale} />
      <Header locale={locale} />
      <main>
        <div className="wrap hero" id="pruefen">
          <div className="hero-text">
            <span className="pill"><span className="dot pulse" /> {t.hero.pill}</span>
            <h1>
              {t.hero.h1a}
              <br />
              <span>{t.hero.h1b}</span>
            </h1>
            <p className="lead">{t.hero.lead}</p>
            <ul className="checks">
              {t.hero.checks.map((c) => (
                <li key={c}><Check size={16} /> {c}</li>
              ))}
            </ul>
            <p className="small muted" style={{ maxWidth: "34em" }}>
              {t.hero.note} <a href="#hinweis">{t.hero.noteLink}</a>
            </p>
          </div>
          <Checker t={t.checker} locale={locale} />
        </div>

        <section className="band" aria-label={t.marqueeLabel}>
          <div className="marquee">
            <div className="track">
              {[...t.marquee, ...t.marquee].map((m, i) => (
                <span key={i} aria-hidden={i >= t.marquee.length || undefined}>{m}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section" id="so-gehts">
          <h2 className="h2">{t.steps.title}</h2>
          <div className="grid">
            {t.steps.items.map(([title, text], i) => (
              <div className="tile" key={title}>
                <span className="num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="band">
          <div className="wrap section">
            <h2 className="h2">{t.what.title}</h2>
            <div className="grid">
              {t.what.items.map(([title, text], i) => {
                const Icon = WHAT_ICONS[i];
                return (
                  <div className="tile" key={title}>
                    <span className="tile-icon"><Icon size={26} /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="wrap" id="hinweis" style={{ paddingTop: 80 }}>
          <div className="notice">
            <div className="notice-head">
              <span className="notice-icon"><Info size={28} /></span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                <h2 className="h2" style={{ fontSize: "clamp(26px, 3.4vw, 34px)" }}>{t.notice.title}</h2>
                <p style={{ fontSize: 18, lineHeight: "27px", maxWidth: "46em" }}>{t.notice.text}</p>
              </div>
            </div>
            <div className="grid">
              {t.notice.cards.map(([title, text]) => (
                <div className="tile" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, lineHeight: "22px", fontWeight: 500 }}>{t.notice.footer}</p>
          </div>
        </section>

        <section className="wrap section" id="datenschutz-kurz">
          <div className="privacy">
            <div style={{ flex: "1 1 340px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <Shield size={36} />
              <h2 className="h2">{t.privacy.title}</h2>
              <p className="lead">{t.privacy.text}</p>
              <p className="small" style={{ color: "#93A7B4" }}>
                {t.privacy.provider} <a href="/datenschutz">{t.privacy.providerLink}</a>.
              </p>
            </div>
            <ul>
              {t.privacy.items.map((item, i) => {
                const Icon = PRIVACY_ICONS[i];
                return <li key={item}><Icon size={22} /> {item}</li>;
              })}
            </ul>
          </div>
        </section>

        <section className="wrap section faq" id="faq" style={{ paddingTop: 0 }}>
          <h2 className="h2">{t.faq.title}</h2>
          <div>
            {t.faq.items.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="wrap" id="deasy" style={{ paddingBottom: 80 }}>
          <div className="deasy">
            <div className="deasy-text">
              <span style={{ fontSize: 24, lineHeight: "30px", fontWeight: 600 }}>{t.deasy.title}</span>
              <span className="muted">{t.deasy.text}</span>
              <ul className="checks" style={{ color: "var(--ink)" }}>
                {t.deasy.items.map((item, i) => {
                  const Icon = DEASY_ICONS[i];
                  return <li key={item}><Icon size={16} /> {item}</li>;
                })}
              </ul>
            </div>
            <a className="btn btn-primary" href={DEASY_URL}>
              {t.deasy.cta} <Arrow size={20} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
