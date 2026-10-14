"use client";

import { useRef, useState } from "react";
import { Arrow, Camera, CheckCircle, FileText, Info, Message, Octagon, Shield, Triangle, Upload, Lock } from "./icons";

type Level = "safe" | "caution" | "danger";
type Severity = "info" | "caution" | "danger";
interface Result {
  level: Level;
  headline: string;
  documentType: string;
  signals: { severity: Severity; label: string; detail: string; data?: string; source: "local" | "ai" }[];
  recommendation: string;
  escalated: boolean;
}

const LANGS: [string, string][] = [
  ["de", "Deutsch"],
  ["ru", "Русский"],
  ["uk", "Українська"],
  ["en", "English"],
  ["tr", "Türkçe"],
  ["ar", "العربية"],
];

const ERRORS: Record<string, string> = {
  RATE_LIMIT: "Zu viele Prüfungen in kurzer Zeit. Bitte warte eine Minute.",
  FILE_TOO_LARGE: "Die Datei ist zu groß. Bitte ein kleineres Foto oder ein PDF unter 3 MB wählen.",
  BAD_FILE_TYPE: "Dieses Format wird nicht unterstützt. Bitte JPG, PNG oder PDF verwenden.",
  EMPTY: "Bitte füge einen Text ein oder lade eine Datei hoch.",
  NO_API_KEY: "Die Prüfung ist gerade nicht eingerichtet. Bitte versuche es später.",
  AI_FAILED: "Die Prüfung hat nicht geklappt. Bitte versuche es noch einmal.",
  AI_AUTH: "Die Prüfung ist gerade nicht eingerichtet (Schlüssel ungültig). Bitte versuche es später.",
  AI_BILLING: "Die Prüfung ist gerade nicht verfügbar. Bitte versuche es später.",
  AI_BUSY: "Gerade sind sehr viele Anfragen unterwegs. Bitte versuche es in einer Minute noch einmal.",
};

const FALLBACK_HEADLINE: Record<Level, string> = {
  safe: "Keine Auffälligkeiten gefunden",
  caution: "Vorsicht – Warnzeichen gefunden",
  danger: "Hohes Risiko – deutliche Warnzeichen",
};

const DEASY_URL = process.env.NEXT_PUBLIC_DEASY_URL || "#deasy";
const MAX_PDF_BYTES = 3 * 1024 * 1024;

async function imageToJpegBase64(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("decode"));
      i.src = url;
    });
    const max = 1800;
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
  } finally {
    URL.revokeObjectURL(url);
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

function LevelIcon({ level, size = 36 }: { level: Severity | Level; size?: number }) {
  if (level === "danger") return <Octagon size={size} className="danger-ink" />;
  if (level === "caution") return <Triangle size={size} className="caution-ink" />;
  if (level === "info") return <Info size={size} className="muted" />;
  return <CheckCircle size={size} className="safe-ink" />;
}

export default function Checker() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lang, setLang] = useState("de");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [over, setOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function pickFile(f: File | undefined | null) {
    setError(null);
    if (!f) return;
    const isPdf = f.type === "application/pdf";
    if (!isPdf && !f.type.startsWith("image/")) {
      setError(ERRORS.BAD_FILE_TYPE);
      return;
    }
    if (isPdf && f.size > MAX_PDF_BYTES) {
      setError(ERRORS.FILE_TOO_LARGE);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(isPdf ? null : URL.createObjectURL(f));
  }

  function reset() {
    setResult(null);
    setError(null);
    setText("");
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  const canSubmit = consent && !loading && (mode === "text" ? text.trim().length >= 10 : !!file);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: Record<string, unknown> = { lang };
      if (mode === "text") {
        payload.text = text;
      } else if (file) {
        payload.file =
          file.type === "application/pdf"
            ? { mediaType: "application/pdf", data: await fileToBase64(file) }
            : { mediaType: "image/jpeg", data: await imageToJpegBase64(file) };
      }
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(ERRORS[json.error as string] ?? ERRORS.AI_FAILED);
      } else {
        setResult(json as Result);
        // Inhalte sofort aus dem Browser-Speicher entfernen
        setText("");
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
      }
    } catch {
      setError(ERRORS.AI_FAILED);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const headline = result.escalated || !result.headline ? FALLBACK_HEADLINE[result.level] : result.headline;
    return (
      <div className="card checker" ref={resultRef}>
        <div className="result" role="status" aria-live="polite">
          <div className={`verdict ${result.level}`}>
            <LevelIcon level={result.level} size={40} />
            <div>
              <h3 className={`${result.level}-ink`}>{headline}</h3>
              {result.documentType && <p className="small muted">{result.documentType}</p>}
            </div>
          </div>
          <div className="result-body">
            {result.signals.map((s, i) => (
              <div className="signal" key={i}>
                <LevelIcon level={s.severity} size={20} />
                <div className="signal-text">
                  <span className="signal-label">{s.label}</span>
                  <span className="signal-detail">{s.detail}</span>
                  {s.data && <span className="data">{s.data}</span>}
                </div>
              </div>
            ))}
            {result.recommendation && (
              <div className="reco">
                <strong>Unsere Empfehlung</strong>
                <span>{result.recommendation}</span>
              </div>
            )}
            {result.level === "safe" && (
              <a className="btn btn-small" href={DEASY_URL}>
                Was steht im Brief? Mit DEASY verstehen <Arrow size={18} />
              </a>
            )}
          </div>
          <div className="disclaimer">
            <Shield size={16} />
            <span>
              Nur eine Empfehlung der KI. Keine Rechtsberatung, keine Garantie für Echtheit. Bei Zweifeln: zuständige Stelle fragen. <a href="#hinweis">Mehr dazu</a>
            </span>
          </div>
        </div>
        <button type="button" className="btn btn-block" onClick={reset}>
          Weitere Nachricht prüfen
        </button>
      </div>
    );
  }

  return (
    <form className="card checker" onSubmit={submit} aria-busy={loading}>
      <div className="tabs" role="tablist" aria-label="Was möchtest du prüfen?">
        <button type="button" role="tab" className="tab" aria-selected={mode === "text"} onClick={() => setMode("text")}>
          <Message size={18} /> SMS / E-Mail
        </button>
        <button type="button" role="tab" className="tab" aria-selected={mode === "file"} onClick={() => setMode("file")}>
          <FileText size={18} /> Brief / Foto
        </button>
      </div>

      {loading ? (
        <div className="scanning" aria-label="Prüfung läuft">
          <div className="bar" style={{ width: "40%" }} />
          <div className="bar" style={{ width: "88%" }} />
          <div className="bar" style={{ width: "72%" }} />
          <div className="bar" style={{ width: "92%" }} />
          <div className="bar" style={{ width: "56%" }} />
          <div className="beam" />
          <p className="small muted pulse" style={{ marginTop: 8 }}>Prüfe Text, Links, Bankverbindung und Absender …</p>
        </div>
      ) : mode === "text" ? (
        <>
          <label className="field-label" htmlFor="kc-text">Nachricht einfügen</label>
          <textarea
            id="kc-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"z. B.: Ihr Paket konnte nicht zugestellt werden. Bitte bestätigen Sie Ihre Adresse: https://…"}
            maxLength={8000}
          />
        </>
      ) : (
        <>
          <div
            className={`drop${over ? " over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(false);
              pickFile(e.dataTransfer.files?.[0]);
            }}
          >
            <span className="drop-icon"><FileText size={26} /></span>
            <span style={{ fontWeight: 600 }}>Foto, Screenshot oder PDF</span>
            <div className="drop-buttons">
              <button type="button" className="btn btn-small" onClick={() => cameraInput.current?.click()}>
                <Camera size={18} /> Foto aufnehmen
              </button>
              <button type="button" className="btn btn-small" onClick={() => fileInput.current?.click()}>
                <Upload size={18} /> Datei wählen
              </button>
            </div>
            <input ref={cameraInput} className="sr-only" type="file" accept="image/*" capture="environment" tabIndex={-1} onChange={(e) => pickFile(e.target.files?.[0])} />
            <input ref={fileInput} className="sr-only" type="file" accept="image/*,application/pdf" tabIndex={-1} onChange={(e) => pickFile(e.target.files?.[0])} />
          </div>
          {file && (
            <div className="preview">
              {preview ? <img src={preview} alt="" /> : <FileText size={28} />}
              <span className="name">{file.name}</span>
              <button type="button" className="link-btn" onClick={() => { setFile(null); if (preview) URL.revokeObjectURL(preview); setPreview(null); }}>
                Entfernen
              </button>
            </div>
          )}
          <p className="hint">
            <Lock size={16} />
            <span>Tipp: Deinen Namen, deine Adresse und Kundennummern kannst du vorher abdecken – für die Prüfung braucht es sie nicht.</span>
          </p>
        </>
      )}

      <div className="row">
        <label className="small muted" htmlFor="kc-lang">Ergebnis auf</label>
        <select id="kc-lang" value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGS.map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Ich verstehe: Klarcheck gibt nur eine Empfehlung, keine Rechtsberatung und keine Garantie. Ich habe die <a href="/datenschutz">Datenschutzhinweise</a> gelesen.
        </span>
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button type="submit" className="btn btn-primary btn-block" disabled={!canSubmit}>
        <Shield size={22} /> {loading ? "Wird geprüft …" : "Jetzt kostenlos prüfen"}
      </button>
    </form>
  );
}
