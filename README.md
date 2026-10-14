# Klarcheck

Kostenlose Betrugsprüfung für Briefe, Rechnungen, SMS und E-Mails – für alle. Ergebnis als Ampel mit Begründung, in 6 Sprachen. Keine Speicherung.

## Wie es funktioniert
1. **Lokale Prüfung** (`lib/signals.ts`): IBAN-Prüfziffer und Land, nachgeahmte Marken-Domains, Kurzlinks, riskante Domain-Endungen.
2. **Kürzen**: IBAN-Mitte, lange Nummern und E-Mail-Namen werden im Text entfernt, bevor die KI ihn sieht.
3. **KI-Analyse** (`lib/ai.ts`): Ton, Druck, Zahlungswege, Absender, bekannte Maschen → strukturierte Ampel.
4. Lokale Warnzeichen können das KI-Ergebnis nur verschärfen, nie entschärfen.

Inhalte werden nicht gespeichert und nicht geloggt.

## Einrichten
```
npm install
cp .env.example .env.local   # ANTHROPIC_API_KEY eintragen
npm run dev
npm test                     # Tests der lokalen Prüfungen
```

## Deployment (Vercel)
Repository importieren, `ANTHROPIC_API_KEY` als Environment Variable setzen. Region: Frankfurt (`vercel.json`).

## Vor dem öffentlichen Start
- Impressum und Datenschutzerklärung ausfüllen und prüfen lassen (Platzhalter in `app/impressum`, `app/datenschutz`)
- AVV mit KI-Anbieter und Vercel abschließen
- `NEXT_PUBLIC_DEASY_URL` setzen, sobald DEASY online ist
