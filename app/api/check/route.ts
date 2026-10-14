import { NextResponse } from "next/server";
import { AiError, askAi, LANGUAGES } from "@/lib/ai";
import { analyzeHosts, analyzeIbans, analyzeText, extractHosts, extractIbans, levelFromSignals, maxLevel, redact, type Signal } from "@/lib/signals";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]);
const MAX_TEXT = 8000;
const MAX_FILE_B64 = 4_000_000; // Vercel-Grenze für den Request-Body liegt bei 4,5 MB

// Einfache Begrenzung pro Instanz (kein Speicher von Inhalten, nur Zähler pro IP).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 8;
}

function err(status: number, code: string) {
  return NextResponse.json({ error: code }, { status, headers: { "cache-control": "no-store" } });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return err(429, "RATE_LIMIT");

  let body: { text?: unknown; file?: { mediaType?: unknown; data?: unknown }; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return err(400, "BAD_REQUEST");
  }

  const text = typeof body.text === "string" ? body.text.trim().slice(0, MAX_TEXT) : "";
  const lang = typeof body.lang === "string" && body.lang in LANGUAGES ? body.lang : "de";
  let file: { mediaType: string; data: string } | undefined;
  if (body.file) {
    const mediaType = String(body.file.mediaType ?? "");
    const data = String(body.file.data ?? "");
    if (!ALLOWED_TYPES.has(mediaType)) return err(400, "BAD_FILE_TYPE");
    if (data.length > MAX_FILE_B64) return err(413, "FILE_TOO_LARGE");
    if (!/^[A-Za-z0-9+/=]+$/.test(data.slice(0, 200))) return err(400, "BAD_REQUEST");
    file = { mediaType, data };
  }
  if (!text && !file) return err(400, "EMPTY");

  const localSignals: Signal[] = text ? analyzeText(text) : [];

  try {
    const ai = await askAi({ text: text ? redact(text) : undefined, file, lang, localSignals });

    // Aus Bildern/PDFs von der KI gelesene IBANs und Links zusätzlich lokal prüfen.
    if (file) {
      const ibans = ai.extracted.ibans.flatMap((i) => extractIbans(i.toUpperCase()));
      const hosts = ai.extracted.urls.flatMap((u) => extractHosts(u.includes("://") ? u : "https://" + u));
      localSignals.push(...analyzeIbans(ibans), ...analyzeHosts(hosts));
    }

    const level = maxLevel(ai.level, levelFromSignals(localSignals));
    // KI-Signale (in der Zielsprache) zuerst; lokale Warnzeichen nur ergänzen, wenn die KI sie nicht schon nennt.
    const aiSignals = ai.signals.map((s) => ({ ...s, source: "ai" as const }));
    const mentioned = (v?: string) => {
      if (!v) return false;
      const key = v.replace(/\s+/g, "").toLowerCase();
      return aiSignals.some((s) => `${s.data ?? ""}${s.label}${s.detail}`.replace(/\s+/g, "").toLowerCase().includes(key));
    };
    const missingLocal = localSignals.filter((s) => s.severity !== "info" && !mentioned(s.data));
    const signals = [...missingLocal, ...aiSignals].slice(0, 7);

    return NextResponse.json(
      {
        level,
        headline: ai.headline,
        documentType: ai.documentType,
        signals,
        recommendation: ai.recommendation,
        escalated: level !== ai.level,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (e) {
    const code = e instanceof Error ? e.message : "AI_FAILED";
    const res = err(code === "NO_API_KEY" ? 503 : 502, code);
    if (e instanceof AiError) res.headers.set("x-ai-status", `${e.status} ${e.type.split(":")[0]}`.replace(/[^\x20-\x7E]/g, "").trim());
    return res;
  }
}
