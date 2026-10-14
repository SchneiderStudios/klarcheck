import { ShieldCheck } from "./icons";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <a href="/" className="brand">
          <span className="brand-mark"><ShieldCheck size={20} /></span>
          Klarcheck
        </a>
        <nav className="nav" aria-label="Hauptnavigation">
          <a href="/#so-gehts">So geht&apos;s</a>
          <a href="/#hinweis">Wichtig</a>
          <a href="/#faq">FAQ</a>
          <a href="/#deasy" className="accent">Brief verstehen → DEASY</a>
        </nav>
      </div>
    </header>
  );
}
