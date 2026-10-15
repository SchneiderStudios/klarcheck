"use client";

import { useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
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
    const max = 1600;
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82).split(",")[1];
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

export default function Checker({ t, locale }: { t: Dict["checker"]; locale: Locale }) {
  const ERRORS = t.errors;
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lang, setLang] = useState<string>(locale);
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
        if (file.type === "application/pdf") {
          payload.file = { mediaType: "application/pdf", data: await fileToBase64(file) };
        } else {
          try {
            payload.file = { mediaType: "image/jpeg", data: await imageToJpegBase64(file) };
          } catch {
            // Bild kann im Browser nicht gelesen werden (z. B. HEIC vom iPhone am Computer)
            setError(ERRORS.IMAGE_DECODE);
            setLoading(false);
            return;
          }
        }
      }
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const code = res.status === 413 ? "FILE_TOO_LARGE" : (json.error as string);
        setError(ERRORS[code] ?? ERRORS.AI_FAILED);
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
    const headline = result.escalated || !result.headline ? t.fallback[result.level] : result.headline;
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
                <strong>{t.recommendation}</strong>
                <span>{result.recommendation}</span>
              </div>
            )}
            {result.level === "safe" && (
              <a className="btn btn-small" href={DEASY_URL}>
                {t.deasyCta} <Arrow size={18} />
              </a>
            )}
          </div>
          <div className="disclaimer">
            <Shield size={16} />
            <span>
              {t.disclaimer} <a href="#hinweis">{t.disclaimerLink}</a>
            </span>
          </div>
        </div>
        <button type="button" className="btn btn-block" onClick={reset}>
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form className="card checker" onSubmit={submit} aria-busy={loading}>
      <div className="tabs" role="tablist" aria-label={t.tablistLabel}>
        <button type="button" role="tab" className="tab" aria-selected={mode === "text"} onClick={() => setMode("text")}>
          <Message size={18} /> {t.tabText}
        </button>
        <button type="button" role="tab" className="tab" aria-selected={mode === "file"} onClick={() => setMode("file")}>
          <FileText size={18} /> {t.tabFile}
        </button>
      </div>

      {loading ? (
        <div className="scanning" aria-label={t.submitting}>
          <div className="bar" style={{ width: "40%" }} />
          <div className="bar" style={{ width: "88%" }} />
          <div className="bar" style={{ width: "72%" }} />
          <div className="bar" style={{ width: "92%" }} />
          <div className="bar" style={{ width: "56%" }} />
          <div className="beam" />
          <p className="small muted pulse" style={{ marginTop: 8 }}>{t.scanning}</p>
        </div>
      ) : mode === "text" ? (
        <>
          <label className="field-label" htmlFor="kc-text">{t.textLabel}</label>
          <textarea
            id="kc-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.textPlaceholder}
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
            <span style={{ fontWeight: 600 }}>{t.fileTitle}</span>
            <div className="drop-buttons">
              <button type="button" className="btn btn-small" onClick={() => cameraInput.current?.click()}>
                <Camera size={18} /> {t.takePhoto}
              </button>
              <button type="button" className="btn btn-small" onClick={() => fileInput.current?.click()}>
                <Upload size={18} /> {t.chooseFile}
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
                {t.remove}
              </button>
            </div>
          )}
          <p className="hint">
            <Lock size={16} />
            <span>{t.photoTip}</span>
          </p>
        </>
      )}

      <div className="row">
        <label className="small muted" htmlFor="kc-lang">{t.resultIn}</label>
        <select id="kc-lang" value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGS.map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          {t.consent} <a href="/datenschutz">{t.consentLink}</a>.
        </span>
      </label>

      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !canSubmit && (
        <p className="small muted" style={{ textAlign: "center" }}>
          {mode === "text" && text.trim().length < 10
            ? t.needText
            : mode === "file" && !file
              ? t.needFile
              : !consent
                ? t.needConsent
                : ""}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={!canSubmit}>
        <Shield size={22} /> {loading ? t.submitting : t.submit}
      </button>
    </form>
  );
}
