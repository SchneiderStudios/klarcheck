import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidIban, extractIbans, extractHosts, analyzeText, redact, levelFromSignals } from "./signals.ts";

test("IBAN-Prüfziffer", () => {
  assert.equal(isValidIban("DE89 3704 0044 0532 0130 00"), true);
  assert.equal(isValidIban("DE89 3704 0044 0532 0130 01"), false);
  assert.equal(isValidIban("LT12 1000 0111 0100 1000"), true);
});

test("IBAN im Fließtext finden", () => {
  const t = "Bitte überweisen Sie auf LT12 1000 0111 0100 1000 bis morgen.";
  assert.deepEqual(extractIbans(t), ["LT121000011101001000"]);
});

test("Hosts finden, E-Mail-Domains und Abkürzungen ignorieren", () => {
  const t = "Mehr unter https://dhl-paket-zustellung.top/track oder an info@sparkasse.de, z.B. heute.";
  assert.deepEqual(extractHosts(t), ["dhl-paket-zustellung.top"]);
});

test("Nachgeahmte Marke wird erkannt, echte nicht", () => {
  const fake = analyzeText("Ihr Paket: https://dhl-zustellung-info.com/abc");
  assert.equal(levelFromSignals(fake), "danger");
  const real = analyzeText("Sendungsverfolgung: https://www.dhl.de/de/privatkunden.html");
  assert.equal(levelFromSignals(real), "safe");
});

test("Ausländische IBAN = Vorsicht", () => {
  assert.equal(levelFromSignals(analyzeText("Zahlung an LT12 1000 0111 0100 1000")), "caution");
});

test("Schwärzen", () => {
  const r = redact("Konto DE89 3704 0044 0532 0130 00, Kundennr. 123456789, max.mustermann@gmail.com, Betrag 41,60 €");
  assert.ok(!r.includes("0532"));
  assert.ok(!r.includes("456"));
  assert.ok(!r.includes("max.mustermann"));
  assert.ok(r.includes("gmail.com"));
  assert.ok(r.includes("41,60"));
});
