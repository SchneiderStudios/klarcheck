// Lokale, deterministische Prüfungen – laufen auf unserem Server, ohne KI.
// Ergebnis: Hinweise (Signale) und ein gekürzter Text, der an die KI geht.

export type Severity = "info" | "caution" | "danger";
export type Level = "safe" | "caution" | "danger";

export interface Signal {
  source: "local" | "ai";
  severity: Severity;
  label: string;
  detail: string;
  data?: string;
}

const IBAN_LENGTHS: Record<string, number> = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
  BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, EG: 29,
  ES: 24, FI: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28,
  HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20,
  LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19,
  MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
  RO: 24, RS: 22, SA: 24, SC: 31, SE: 24, SI: 19, SK: 24, SM: 27, ST: 25, SV: 28,
  TL: 23, TN: 24, TR: 26, UA: 29, VA: 22, VG: 24, XK: 20,
};

const COUNTRY_NAMES: Record<string, string> = {
  DE: "Deutschland", AT: "Österreich", CH: "Schweiz", LT: "Litauen", LV: "Lettland",
  EE: "Estland", MT: "Malta", CY: "Zypern", BG: "Bulgarien", RO: "Rumänien",
  GB: "Großbritannien", IE: "Irland", NL: "Niederlande", BE: "Belgien", FR: "Frankreich",
  ES: "Spanien", PT: "Portugal", IT: "Italien", PL: "Polen", CZ: "Tschechien",
  HU: "Ungarn", LU: "Luxemburg", TR: "Türkei", UA: "Ukraine", GI: "Gibraltar",
};

export function isValidIban(raw: string): boolean {
  const iban = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) return false;
  const len = IBAN_LENGTHS[iban.slice(0, 2)];
  if (!len || iban.length !== len) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const v = ch >= "A" && ch <= "Z" ? (ch.charCodeAt(0) - 55).toString() : ch;
    for (const d of v) remainder = (remainder * 10 + Number(d)) % 97;
  }
  return remainder === 1;
}

const IBAN_RE = /\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]){11,30}\b/g;

export function extractIbans(text: string): string[] {
  const found = new Set<string>();
  for (const m of text.toUpperCase().matchAll(IBAN_RE)) {
    const compact = m[0].replace(/\s+/g, "");
    const cc = compact.slice(0, 2);
    const len = IBAN_LENGTHS[cc];
    // Treffer kann zu lang sein (Folgetext) – auf die Länge des Landes kürzen.
    const candidate = len ? compact.slice(0, len) : compact;
    if (len && candidate.length === len) found.add(candidate);
  }
  return [...found];
}

const URL_RE = /\b(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}(?::\d+)?(?:\/[^\s<>"')]*)?/gi;

export function extractHosts(text: string): string[] {
  const hosts = new Set<string>();
  for (const m of text.matchAll(URL_RE)) {
    const start = m.index ?? 0;
    if (start > 0 && text[start - 1] === "@") continue; // Teil einer E-Mail-Adresse
    const raw = m[0];
    const hasScheme = /^https?:\/\//i.test(raw);
    const host = raw.replace(/^https?:\/\//i, "").split(/[/:?#]/)[0].toLowerCase();
    const tld = host.split(".").pop() ?? "";
    // Ohne http:// nur Hosts mit bekannter Endung zählen (vermeidet "z.B." usw.)
    if (!hasScheme && !COMMON_TLDS.has(tld) && !RISKY_TLDS.has(tld)) continue;
    if (/^\d+(\.\d+)*$/.test(host)) continue;
    hosts.add(host);
  }
  return [...hosts];
}

const COMMON_TLDS = new Set(["de", "com", "net", "org", "eu", "at", "ch", "info", "io", "app", "co", "me", "biz", "uk", "ru", "ua", "tr", "nl", "fr", "es", "it", "pl"]);
const RISKY_TLDS = new Set(["xyz", "top", "click", "live", "online", "site", "icu", "buzz", "rest", "cfd", "sbs", "lol", "quest", "shop", "support", "help", "cc", "tk", "ml", "ga", "cf", "gq", "work", "link", "vip", "cyou", "bond"]);
const SHORTENERS = new Set(["bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "rb.gy", "goo.gl", "ow.ly", "shorturl.at", "t.ly", "s.id", "tiny.cc"]);

// Bekannte Marken/Behörden und ihre offiziellen Domains.
const BRANDS: { key: string; name: string; domains: string[] }[] = [
  { key: "dhl", name: "DHL", domains: ["dhl.de", "dhl.com"] },
  { key: "paypal", name: "PayPal", domains: ["paypal.com", "paypal.de"] },
  { key: "sparkasse", name: "Sparkasse", domains: ["sparkasse.de"] },
  { key: "amazon", name: "Amazon", domains: ["amazon.de", "amazon.com"] },
  { key: "postbank", name: "Postbank", domains: ["postbank.de"] },
  { key: "commerzbank", name: "Commerzbank", domains: ["commerzbank.de"] },
  { key: "deutsche-bank", name: "Deutsche Bank", domains: ["deutsche-bank.de", "db.com"] },
  { key: "volksbank", name: "Volksbank", domains: ["vr.de"] },
  { key: "n26", name: "N26", domains: ["n26.com"] },
  { key: "dpd", name: "DPD", domains: ["dpd.de", "dpd.com"] },
  { key: "hermes", name: "Hermes", domains: ["myhermes.de", "hermesworld.com"] },
  { key: "telekom", name: "Telekom", domains: ["telekom.de", "t-online.de"] },
  { key: "vodafone", name: "Vodafone", domains: ["vodafone.de"] },
  { key: "elster", name: "ELSTER", domains: ["elster.de"] },
  { key: "finanzamt", name: "Finanzamt", domains: ["elster.de", "bundesfinanzministerium.de"] },
  { key: "zoll", name: "Zoll", domains: ["zoll.de"] },
  { key: "polizei", name: "Polizei", domains: ["polizei.de", "bka.de"] },
  { key: "rundfunk", name: "Rundfunkbeitrag", domains: ["rundfunkbeitrag.de"] },
  { key: "netflix", name: "Netflix", domains: ["netflix.com"] },
  { key: "ebay", name: "eBay", domains: ["ebay.de", "ebay.com", "kleinanzeigen.de"] },
  { key: "kleinanzeigen", name: "Kleinanzeigen", domains: ["kleinanzeigen.de"] },
  { key: "apple", name: "Apple", domains: ["apple.com", "icloud.com"] },
  { key: "microsoft", name: "Microsoft", domains: ["microsoft.com", "live.com", "office.com"] },
  { key: "bahn", name: "Deutsche Bahn", domains: ["bahn.de"] },
];

function registrableDomain(host: string): string {
  const parts = host.split(".");
  // Grob: letzte zwei Teile (reicht für .de/.com; co.uk wird nicht gebraucht)
  return parts.slice(-2).join(".");
}

function isOfficialSubdomain(host: string, domains: string[]): boolean {
  return domains.some((d) => host === d || host.endsWith("." + d));
}

export function analyzeHosts(hosts: string[]): Signal[] {
  const out: Signal[] = [];
  for (const host of hosts) {
    const tld = host.split(".").pop() ?? "";
    if (SHORTENERS.has(host)) {
      out.push({ source: "local", severity: "caution", label: "Verkürzter Link", detail: "Der Link verbirgt, wohin er wirklich führt.", data: host });
      continue;
    }
    if (host.startsWith("xn--") || host.includes(".xn--")) {
      out.push({ source: "local", severity: "danger", label: "Link mit Sonderzeichen-Domain", detail: "Solche Adressen können bekannte Namen täuschend echt nachahmen.", data: host });
      continue;
    }
    const brand = BRANDS.find((b) => host.replace(/\./g, "-").includes(b.key));
    if (brand && !isOfficialSubdomain(host, brand.domains)) {
      out.push({
        source: "local",
        severity: "danger",
        label: `Link ahmt ${brand.name} nach`,
        detail: `Die Adresse enthält „${brand.name}“, gehört aber nicht zu ${brand.domains.join(" / ")}.`,
        data: host,
      });
      continue;
    }
    if (RISKY_TLDS.has(tld)) {
      out.push({ source: "local", severity: "caution", label: "Ungewöhnliche Domain-Endung", detail: `Endungen wie .${tld} werden häufig für Betrugsseiten genutzt.`, data: host });
    }
    if (registrableDomain(host).split(".")[0].split("-").length >= 3) {
      out.push({ source: "local", severity: "caution", label: "Auffällig zusammengesetzte Adresse", detail: "Viele Bindestriche sind typisch für nachgeahmte Seiten.", data: host });
    }
  }
  return out;
}

export function analyzeIbans(ibans: string[]): Signal[] {
  const out: Signal[] = [];
  for (const iban of ibans) {
    const cc = iban.slice(0, 2);
    const pretty = formatIban(iban);
    if (!isValidIban(iban)) {
      out.push({ source: "local", severity: "caution", label: "IBAN mit Prüfziffer-Fehler", detail: "Die Bankverbindung ist formal ungültig – ein Tippfehler oder eine Fälschung.", data: pretty });
    } else if (cc !== "DE") {
      out.push({
        source: "local",
        severity: "caution",
        label: `Konto im Ausland (${COUNTRY_NAMES[cc] ?? cc})`,
        detail: "Deutsche Behörden und die meisten deutschen Firmen nutzen Konten bei deutschen Banken. Ein ausländisches Konto ist ein häufiges Warnzeichen.",
        data: pretty,
      });
    } else {
      out.push({ source: "local", severity: "info", label: "Deutsches Konto, Prüfziffer korrekt", detail: "Formal gültig. Das sagt nichts darüber, wem das Konto gehört.", data: pretty });
    }
  }
  return out;
}

export function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

/** Kürzt Daten, die die KI nicht braucht: IBAN-Mitte, lange Nummern, E-Mail-Namen. */
export function redact(text: string): string {
  let t = text;
  t = t.replace(IBAN_RE, (m) => {
    const c = m.replace(/\s+/g, "");
    return c.slice(0, 8) + "••••" + c.slice(-2);
  });
  t = t.replace(/\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g, (_m, _local, domain) => `•••@${domain}`);
  t = t.replace(/(?<!\d|\d[.,])\d[\d ]{5,}\d(?!\d|[.,]\d)/g, (m) => {
    const digits = m.replace(/\s/g, "");
    if (digits.length < 7) return m;
    return digits.slice(0, 3) + "•••" + digits.slice(-1);
  });
  return t;
}

export function levelFromSignals(signals: Signal[]): Level {
  if (signals.some((s) => s.severity === "danger")) return "danger";
  if (signals.some((s) => s.severity === "caution")) return "caution";
  return "safe";
}

export function maxLevel(a: Level, b: Level): Level {
  const order: Level[] = ["safe", "caution", "danger"];
  return order[Math.max(order.indexOf(a), order.indexOf(b))];
}

export function analyzeText(text: string): Signal[] {
  return [...analyzeIbans(extractIbans(text)), ...analyzeHosts(extractHosts(text))];
}
