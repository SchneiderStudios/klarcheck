export type Locale = "de" | "en" | "ru";
export const LOCALES: Locale[] = ["de", "en", "ru"];
export const LOCALE_PATH: Record<Locale, string> = { de: "/", en: "/en", ru: "/ru" };
export const LOCALE_LABEL: Record<Locale, string> = { de: "DE", en: "EN", ru: "RU" };

type Level = "safe" | "caution" | "danger";

export interface Dict {
  meta: { title: string; description: string };
  nav: { how: string; important: string; faq: string; deasy: string; langLabel: string };
  hero: { pill: string; h1a: string; h1b: string; lead: string; checks: [string, string, string]; note: string; noteLink: string };
  marqueeLabel: string;
  marquee: string[];
  steps: { title: string; items: [string, string][] };
  what: { title: string; items: [string, string][] };
  notice: { title: string; text: string; cards: [string, string][]; footer: string };
  privacy: { title: string; text: string; provider: string; providerLink: string; items: [string, string, string] };
  faq: { title: string; items: [string, string][] };
  deasy: { title: string; text: string; items: [string, string, string]; cta: string };
  footer: { text: string; imprint: string; privacy: string; legalNote: string };
  checker: {
    tablistLabel: string;
    tabText: string;
    tabFile: string;
    textLabel: string;
    textPlaceholder: string;
    fileTitle: string;
    takePhoto: string;
    chooseFile: string;
    remove: string;
    photoTip: string;
    resultIn: string;
    consent: string;
    consentLink: string;
    submit: string;
    submitting: string;
    scanning: string;
    needText: string;
    needFile: string;
    needConsent: string;
    recommendation: string;
    deasyCta: string;
    disclaimer: string;
    disclaimerLink: string;
    again: string;
    fallback: Record<Level, string>;
    errors: Record<string, string>;
  };
}

const de: Dict = {
  meta: {
    title: "Klarcheck – Echt oder Masche? Kostenlos prüfen",
    description: "Brief, Rechnung, SMS oder E-Mail verdächtig? Klarcheck zeigt in Sekunden typische Betrugsmerkmale – kostenlos, ohne Konto, in deiner Sprache.",
  },
  nav: { how: "So geht's", important: "Wichtig", faq: "FAQ", deasy: "Brief verstehen → DEASY", langLabel: "Sprache" },
  hero: {
    pill: "Kostenlos · ohne Konto · nichts gespeichert",
    h1a: "Echt oder Masche?",
    h1b: "In Sekunden prüfen.",
    lead: "SMS, E-Mail, WhatsApp oder Brief komisch? Füge die Nachricht ein oder fotografiere den Brief – Klarcheck zeigt dir typische Betrugsmerkmale und sagt, was du jetzt tun kannst.",
    checks: ["Für alle, kostenlos", "Ergebnis in 6 Sprachen", "Keine Speicherung"],
    note: "Klarcheck ist eine Orientierungshilfe, keine Rechtsberatung.",
    noteLink: "Was das bedeutet",
  },
  marqueeLabel: "Was du prüfen kannst",
  marquee: ["Paket-SMS", "„Hallo Mama“-Nachrichten", "Bank-E-Mails", "Mahnungen & Inkasso", "Behördenbriefe", "Rechnungen", "Jobangebote", "Gewinnspiele", "Mietangebote", "Kleinanzeigen-Käufer"],
  steps: {
    title: "Drei Schritte. Fertig.",
    items: [
      ["Einfügen oder fotografieren", "Text aus SMS oder E-Mail einfügen, Brief fotografieren, Screenshot oder PDF hochladen."],
      ["Klarcheck prüft", "Unsere eigene Prüfung von Links und Bankverbindung plus KI-Analyse von Ton, Absender und bekannten Maschen."],
      ["Ampel lesen", "Grün, Gelb oder Rot – mit Begründung und einem klaren nächsten Schritt."],
    ],
  },
  what: {
    title: "Was wir prüfen",
    items: [
      ["Links & Domains", "Nachgeahmte Adressen von DHL, PayPal, Sparkasse & Co., Kurzlinks und typische Betrugs-Endungen."],
      ["Bankverbindung", "Prüfziffer der IBAN und Land des Kontos – passt das zum angeblichen Absender?"],
      ["Druck & Drohungen", "Kurze Fristen, Kontosperrung, Pfändung, Gutscheinkarten oder Krypto als Zahlungsweg."],
      ["Absender & Maschen", "Passt der Absender? Erinnert die Nachricht an bekannte Maschen wie „Hallo Mama“ oder falsches Inkasso?"],
    ],
  },
  notice: {
    title: "Wichtig: Klarcheck gibt nur Empfehlungen",
    text: "Klarcheck ist ein Hilfsmittel. Es schätzt ein, wie wahrscheinlich eine Nachricht oder ein Brief echt ist – anhand typischer Betrugsmerkmale. Den Inhalt prüfen wir nicht: Ob eine Forderung berechtigt, ein Betrag richtig oder eine Frist wirksam ist, bewertet Klarcheck nicht.",
    cards: [
      ["Zweifel am Absender?", "Kontaktiere die Behörde, Firma oder Bank direkt – über die Kontaktdaten auf ihrer offiziellen Website, nicht über die in der Nachricht."],
      ["Verdacht auf Betrug?", "Wende dich an die Polizei – auch online über die Onlinewache deines Bundeslandes – oder an die Verbraucherzentrale."],
      ["Rechtliche Fragen?", "Ob du zahlen musst oder widersprechen kannst, klären Anwältinnen und Anwälte, die Verbraucherzentrale oder eine Beratungsstelle."],
    ],
    footer: "Jede Entscheidung – zahlen, antworten, ignorieren – triffst du selbst. Das Ergebnis von Klarcheck ersetzt keine Prüfung durch die zuständige Stelle.",
  },
  privacy: {
    title: "Wir speichern nichts.",
    text: "Deine Nachricht wird nur für die Prüfung verarbeitet und danach verworfen. Kein Konto, keine Datenbank, kein Archiv. Bankverbindungen und lange Nummern kürzen wir im Text, bevor die KI ihn sieht.",
    provider: "Für die Analyse nutzen wir einen KI-Dienstleister. Details:",
    providerLink: "Datenschutzerklärung",
    items: ["Keine Speicherung deiner Inhalte", "Kontonummern im Text werden gekürzt", "Ohne Konto, ohne E-Mail-Adresse"],
  },
  faq: {
    title: "Fragen?",
    items: [
      ["Kostet Klarcheck etwas?", "Nein. Klarcheck ist kostenlos – ohne Konto und ohne Abo."],
      ["Ist ein grünes Ergebnis eine Garantie?", "Nein. Grün heißt: keine typischen Warnzeichen gefunden. Gute Fälschungen sind möglich – bei Zweifeln beim Absender über offizielle Kontaktdaten nachfragen."],
      ["Gibt Klarcheck Rechtsberatung?", "Nein. Klarcheck gibt nur Empfehlungen: Wir schätzen ein, wie wahrscheinlich eine Nachricht echt ist. Ob eine Forderung berechtigt ist, prüfen wir nicht."],
      ["Was passiert mit meinen Daten?", "Wir speichern nichts. Der Inhalt wird zur Analyse an unseren KI-Dienstleister übermittelt und danach verworfen. Im Text kürzen wir vorher Kontonummern, lange Nummern und E-Mail-Namen. Auf Fotos kannst du Namen und Adresse vorher abdecken."],
      ["Was tun bei Rot?", "Nicht zahlen, keine Links öffnen, keine Daten eingeben. Absender über die offizielle Website kontaktieren. Bei Schaden: Polizei und Verbraucherzentrale."],
    ],
  },
  deasy: {
    title: "Echt, aber unverständlich?",
    text: "Klarcheck sagt dir, ob ein Brief verdächtig wirkt. DEASY hilft dir mit dem Inhalt:",
    items: ["Brief in deiner Sprache erklärt", "Hilfe bei Formularen", "Erinnerung an Fristen"],
    cta: "Zu DEASY",
  },
  footer: {
    text: "Klarcheck · Orientierungshilfe mit KI. Ergebnisse sind unverbindliche Empfehlungen, keine Rechtsberatung und keine Garantie für Echtheit. Bei Zweifeln wende dich an die zuständige Stelle.",
    imprint: "Impressum",
    privacy: "Datenschutz",
    legalNote: "",
  },
  checker: {
    tablistLabel: "Was möchtest du prüfen?",
    tabText: "SMS / E-Mail",
    tabFile: "Brief / Foto",
    textLabel: "Nachricht einfügen",
    textPlaceholder: "z. B.: Ihr Paket konnte nicht zugestellt werden. Bitte bestätigen Sie Ihre Adresse: https://…",
    fileTitle: "Foto, Screenshot oder PDF",
    takePhoto: "Foto aufnehmen",
    chooseFile: "Datei wählen",
    remove: "Entfernen",
    photoTip: "Tipp: Deinen Namen, deine Adresse und Kundennummern kannst du vorher abdecken – für die Prüfung braucht es sie nicht.",
    resultIn: "Ergebnis auf",
    consent: "Ich verstehe: Klarcheck gibt nur eine Empfehlung, keine Rechtsberatung und keine Garantie. Ich habe die",
    consentLink: "Datenschutzhinweise gelesen",
    submit: "Jetzt kostenlos prüfen",
    submitting: "Wird geprüft …",
    scanning: "Prüfe Text, Links, Bankverbindung und Absender …",
    needText: "Füge zuerst die Nachricht ein.",
    needFile: "Wähle zuerst ein Foto oder PDF.",
    needConsent: "Bitte bestätige oben den Hinweis mit dem Häkchen.",
    recommendation: "Unsere Empfehlung",
    deasyCta: "Was steht im Brief? Mit DEASY verstehen",
    disclaimer: "Nur eine Empfehlung der KI. Keine Rechtsberatung, keine Garantie für Echtheit. Bei Zweifeln: zuständige Stelle fragen.",
    disclaimerLink: "Mehr dazu",
    again: "Weitere Nachricht prüfen",
    fallback: { safe: "Keine Auffälligkeiten gefunden", caution: "Vorsicht – Warnzeichen gefunden", danger: "Hohes Risiko – deutliche Warnzeichen" },
    errors: {
      RATE_LIMIT: "Zu viele Prüfungen in kurzer Zeit. Bitte warte eine Minute.",
      FILE_TOO_LARGE: "Die Datei ist zu groß. Bitte ein kleineres Foto oder ein PDF unter 3 MB wählen.",
      BAD_FILE_TYPE: "Dieses Format wird nicht unterstützt. Bitte JPG, PNG oder PDF verwenden.",
      EMPTY: "Bitte füge einen Text ein oder lade eine Datei hoch.",
      NO_API_KEY: "Die Prüfung ist gerade nicht eingerichtet. Bitte versuche es später.",
      AI_FAILED: "Die Prüfung hat nicht geklappt. Bitte versuche es noch einmal.",
      IMAGE_DECODE: "Dieses Foto kann der Browser nicht öffnen (z. B. HEIC-Format vom iPhone). Bitte mach einen Screenshot davon oder speichere es als JPG.",
      AI_AUTH: "Die Prüfung ist gerade nicht eingerichtet. Bitte versuche es später.",
      AI_BILLING: "Die Prüfung ist gerade nicht verfügbar. Bitte versuche es später.",
      AI_BUSY: "Gerade sind sehr viele Anfragen unterwegs. Bitte versuche es in einer Minute noch einmal.",
    },
  },
};

const en: Dict = {
  meta: {
    title: "Klarcheck – Real or scam? Check for free",
    description: "Suspicious letter, invoice, text message or email? Klarcheck shows typical scam signs in seconds – free, no account, in your language.",
  },
  nav: { how: "How it works", important: "Important", faq: "FAQ", deasy: "Understand a letter → DEASY", langLabel: "Language" },
  hero: {
    pill: "Free · no account · nothing stored",
    h1a: "Real or scam?",
    h1b: "Check it in seconds.",
    lead: "Strange text message, email, WhatsApp or letter? Paste the message or take a photo of the letter – Klarcheck shows you typical scam signs and tells you what to do next.",
    checks: ["Free for everyone", "Results in 6 languages", "Nothing stored"],
    note: "Klarcheck is guidance, not legal advice.",
    noteLink: "What that means",
  },
  marqueeLabel: "What you can check",
  marquee: ["Parcel texts", "“Hi Mum” messages", "Bank emails", "Payment reminders & debt collection", "Letters from authorities", "Invoices", "Job offers", "Prize draws", "Rental offers", "Online marketplace buyers"],
  steps: {
    title: "Three steps. Done.",
    items: [
      ["Paste or take a photo", "Paste text from a text message or email, photograph a letter, or upload a screenshot or PDF."],
      ["Klarcheck checks", "Our own check of links and bank details, plus AI analysis of tone, sender and known scams."],
      ["Read the traffic light", "Green, yellow or red – with reasons and a clear next step."],
    ],
  },
  what: {
    title: "What we check",
    items: [
      ["Links & domains", "Fake addresses imitating DHL, PayPal, Sparkasse & co., short links and typical scam domain endings."],
      ["Bank details", "IBAN check digit and the account's country – does it match the claimed sender?"],
      ["Pressure & threats", "Short deadlines, account suspension, seizure, gift cards or crypto as a payment method."],
      ["Sender & scam patterns", "Does the sender match? Does the message look like known scams such as “Hi Mum” or fake debt collection?"],
    ],
  },
  notice: {
    title: "Important: Klarcheck only gives recommendations",
    text: "Klarcheck is a helping tool. It estimates how likely it is that a message or letter is real, based on typical scam signs. We do not check the content: Klarcheck does not judge whether a claim is justified, an amount is correct or a deadline is valid.",
    cards: [
      ["Doubts about the sender?", "Contact the authority, company or bank directly – using the contact details on their official website, not those in the message."],
      ["Suspect a scam?", "Contact the police – also online via your federal state's online police station – or the consumer advice centre (Verbraucherzentrale)."],
      ["Legal questions?", "Whether you have to pay or can object is a question for a lawyer, the Verbraucherzentrale or an advice centre."],
    ],
    footer: "Every decision – paying, replying, ignoring – is yours. Klarcheck's result does not replace a check by the responsible authority.",
  },
  privacy: {
    title: "We store nothing.",
    text: "Your message is only processed for the check and then discarded. No account, no database, no archive. We shorten bank details and long numbers in text before the AI sees it.",
    provider: "We use an AI provider for the analysis. Details:",
    providerLink: "Privacy policy (German)",
    items: ["Your content is not stored", "Account numbers in text are shortened", "No account, no email address"],
  },
  faq: {
    title: "Questions?",
    items: [
      ["Does Klarcheck cost anything?", "No. Klarcheck is free – no account, no subscription."],
      ["Is a green result a guarantee?", "No. Green means: no typical warning signs found. Good fakes are possible – if in doubt, contact the sender using their official contact details."],
      ["Does Klarcheck give legal advice?", "No. Klarcheck only gives recommendations: we estimate how likely a message is to be real. We do not check whether a claim is justified."],
      ["What happens to my data?", "We store nothing. The content is sent to our AI provider for analysis and then discarded. In text we first shorten account numbers, long numbers and email names. On photos you can cover your name and address beforehand."],
      ["What to do if it's red?", "Don't pay, don't open links, don't enter any data. Contact the sender via their official website. If you've lost money: police and Verbraucherzentrale."],
    ],
  },
  deasy: {
    title: "Real, but hard to understand?",
    text: "Klarcheck tells you whether a letter looks suspicious. DEASY helps you with the content:",
    items: ["Letters explained in your language", "Help with forms", "Deadline reminders"],
    cta: "Go to DEASY",
  },
  footer: {
    text: "Klarcheck · AI-assisted guidance. Results are non-binding recommendations, not legal advice and no guarantee of authenticity. If in doubt, contact the responsible authority.",
    imprint: "Legal notice",
    privacy: "Privacy",
    legalNote: "Legal pages are in German.",
  },
  checker: {
    tablistLabel: "What do you want to check?",
    tabText: "Text / Email",
    tabFile: "Letter / Photo",
    textLabel: "Paste the message",
    textPlaceholder: "e.g.: Your parcel could not be delivered. Please confirm your address: https://…",
    fileTitle: "Photo, screenshot or PDF",
    takePhoto: "Take photo",
    chooseFile: "Choose file",
    remove: "Remove",
    photoTip: "Tip: you can cover your name, address and customer numbers first – they are not needed for the check.",
    resultIn: "Result in",
    consent: "I understand: Klarcheck only gives a recommendation, no legal advice and no guarantee. I have read the",
    consentLink: "privacy notice",
    submit: "Check for free",
    submitting: "Checking …",
    scanning: "Checking text, links, bank details and sender …",
    needText: "Paste the message first.",
    needFile: "Choose a photo or PDF first.",
    needConsent: "Please confirm the notice above with the checkbox.",
    recommendation: "Our recommendation",
    deasyCta: "What does the letter say? Understand it with DEASY",
    disclaimer: "Only an AI recommendation. No legal advice, no guarantee of authenticity. If in doubt: ask the responsible authority.",
    disclaimerLink: "More",
    again: "Check another message",
    fallback: { safe: "No warning signs found", caution: "Caution – warning signs found", danger: "High risk – clear warning signs" },
    errors: {
      RATE_LIMIT: "Too many checks in a short time. Please wait a minute.",
      FILE_TOO_LARGE: "The file is too large. Please choose a smaller photo or a PDF under 3 MB.",
      BAD_FILE_TYPE: "This format isn't supported. Please use JPG, PNG or PDF.",
      EMPTY: "Please paste a text or upload a file.",
      NO_API_KEY: "The check isn't set up right now. Please try again later.",
      AI_FAILED: "The check didn't work. Please try again.",
      IMAGE_DECODE: "Your browser can't open this photo (e.g. HEIC format from an iPhone). Please take a screenshot of it or save it as JPG.",
      AI_AUTH: "The check isn't set up right now. Please try again later.",
      AI_BILLING: "The check isn't available right now. Please try again later.",
      AI_BUSY: "There are a lot of requests right now. Please try again in a minute.",
    },
  },
};

const ru: Dict = {
  meta: {
    title: "Klarcheck – настоящее или мошенничество? Проверьте бесплатно",
    description: "Подозрительное письмо, счёт, SMS или e-mail? Klarcheck за секунды покажет типичные признаки мошенничества – бесплатно, без регистрации, на вашем языке.",
  },
  nav: { how: "Как это работает", important: "Важно", faq: "Вопросы", deasy: "Понять письмо → DEASY", langLabel: "Язык" },
  hero: {
    pill: "Бесплатно · без регистрации · ничего не храним",
    h1a: "Настоящее или развод?",
    h1b: "Проверьте за секунды.",
    lead: "Странное SMS, письмо по e-mail, сообщение в WhatsApp или бумажное письмо? Вставьте текст или сфотографируйте письмо – Klarcheck покажет типичные признаки мошенничества и подскажет, что делать дальше.",
    checks: ["Бесплатно для всех", "Результат на 6 языках", "Ничего не храним"],
    note: "Klarcheck – это ориентир, а не юридическая консультация.",
    noteLink: "Что это значит",
  },
  marqueeLabel: "Что можно проверить",
  marquee: ["SMS о посылках", "«Привет, мама»", "Письма от банков", "Напоминания об оплате и Inkasso", "Письма от ведомств", "Счета", "Предложения работы", "Розыгрыши", "Объявления об аренде", "Покупатели на Kleinanzeigen"],
  steps: {
    title: "Три шага. Готово.",
    items: [
      ["Вставьте или сфотографируйте", "Вставьте текст из SMS или e-mail, сфотографируйте письмо, загрузите скриншот или PDF."],
      ["Klarcheck проверяет", "Наша собственная проверка ссылок и банковских реквизитов плюс ИИ-анализ тона, отправителя и известных схем."],
      ["Смотрите на светофор", "Зелёный, жёлтый или красный – с объяснением и понятным следующим шагом."],
    ],
  },
  what: {
    title: "Что мы проверяем",
    items: [
      ["Ссылки и домены", "Поддельные адреса DHL, PayPal, Sparkasse и других, короткие ссылки и типичные мошеннические доменные зоны."],
      ["Банковские реквизиты", "Контрольная сумма IBAN и страна счёта – подходит ли она заявленному отправителю?"],
      ["Давление и угрозы", "Короткие сроки, блокировка счёта, арест имущества, оплата подарочными картами или криптовалютой."],
      ["Отправитель и схемы", "Совпадает ли отправитель? Похоже ли сообщение на известные схемы вроде «Привет, мама» или поддельного Inkasso?"],
    ],
  },
  notice: {
    title: "Важно: Klarcheck даёт только рекомендации",
    text: "Klarcheck – это помощник. Он оценивает, насколько вероятно, что сообщение или письмо настоящее, по типичным признакам мошенничества. Содержание мы не проверяем: обоснованно ли требование, верна ли сумма и действует ли срок, Klarcheck не оценивает.",
    cards: [
      ["Сомневаетесь в отправителе?", "Свяжитесь с ведомством, компанией или банком напрямую – по контактам с их официального сайта, а не из сообщения."],
      ["Подозреваете мошенничество?", "Обратитесь в полицию – в том числе онлайн через Onlinewache вашей федеральной земли – или в Verbraucherzentrale."],
      ["Юридические вопросы?", "Нужно ли платить и можно ли оспорить требование, подскажут адвокат, Verbraucherzentrale или консультационный центр."],
    ],
    footer: "Любое решение – заплатить, ответить или проигнорировать – принимаете вы. Результат Klarcheck не заменяет проверку в компетентном органе.",
  },
  privacy: {
    title: "Мы ничего не храним.",
    text: "Ваше сообщение используется только для проверки и затем удаляется. Без аккаунта, без базы данных, без архива. Банковские реквизиты и длинные номера в тексте мы сокращаем до того, как его увидит ИИ.",
    provider: "Для анализа мы используем ИИ-сервис. Подробнее:",
    providerLink: "Политика конфиденциальности (на немецком)",
    items: ["Ваши данные не сохраняются", "Номера счетов в тексте сокращаются", "Без аккаунта и e-mail"],
  },
  faq: {
    title: "Вопросы?",
    items: [
      ["Это платно?", "Нет. Klarcheck бесплатный – без регистрации и подписки."],
      ["Зелёный результат – это гарантия?", "Нет. Зелёный значит: типичных признаков мошенничества не найдено. Хорошие подделки возможны – при сомнениях свяжитесь с отправителем по официальным контактам."],
      ["Klarcheck даёт юридические консультации?", "Нет. Klarcheck даёт только рекомендации: мы оцениваем, насколько вероятно, что сообщение настоящее. Обоснованность требований мы не проверяем."],
      ["Что происходит с моими данными?", "Мы ничего не храним. Содержимое передаётся нашему ИИ-сервису для анализа и затем удаляется. В тексте мы заранее сокращаем номера счетов, длинные номера и имена в e-mail-адресах. На фото можно заранее закрыть имя и адрес."],
      ["Что делать, если красный?", "Не платите, не открывайте ссылки, не вводите никаких данных. Свяжитесь с отправителем через его официальный сайт. Если вы уже потеряли деньги – обратитесь в полицию и Verbraucherzentrale."],
    ],
  },
  deasy: {
    title: "Письмо настоящее, но непонятное?",
    text: "Klarcheck говорит, выглядит ли письмо подозрительно. DEASY помогает с содержанием:",
    items: ["Объяснение письма на вашем языке", "Помощь с формулярами", "Напоминания о сроках"],
    cta: "Перейти в DEASY",
  },
  footer: {
    text: "Klarcheck · ориентир с помощью ИИ. Результаты – необязывающие рекомендации, не юридическая консультация и не гарантия подлинности. При сомнениях обратитесь в компетентный орган.",
    imprint: "Impressum",
    privacy: "Конфиденциальность",
    legalNote: "Юридические страницы – на немецком.",
  },
  checker: {
    tablistLabel: "Что вы хотите проверить?",
    tabText: "SMS / E-mail",
    tabFile: "Письмо / фото",
    textLabel: "Вставьте сообщение",
    textPlaceholder: "Например: Ihr Paket konnte nicht zugestellt werden. Bitte bestätigen Sie Ihre Adresse: https://…",
    fileTitle: "Фото, скриншот или PDF",
    takePhoto: "Сфотографировать",
    chooseFile: "Выбрать файл",
    remove: "Удалить",
    photoTip: "Совет: имя, адрес и номера клиента можно заранее закрыть – для проверки они не нужны.",
    resultIn: "Результат на",
    consent: "Я понимаю: Klarcheck даёт только рекомендацию, а не юридическую консультацию и не гарантию. Я прочитал(а)",
    consentLink: "информацию о защите данных",
    submit: "Проверить бесплатно",
    submitting: "Проверяем …",
    scanning: "Проверяем текст, ссылки, реквизиты и отправителя …",
    needText: "Сначала вставьте сообщение.",
    needFile: "Сначала выберите фото или PDF.",
    needConsent: "Пожалуйста, поставьте галочку выше.",
    recommendation: "Наша рекомендация",
    deasyCta: "Что написано в письме? Разобраться с DEASY",
    disclaimer: "Только рекомендация ИИ. Не юридическая консультация и не гарантия подлинности. При сомнениях обратитесь в компетентный орган.",
    disclaimerLink: "Подробнее",
    again: "Проверить ещё одно сообщение",
    fallback: { safe: "Признаков мошенничества не найдено", caution: "Осторожно – есть тревожные признаки", danger: "Высокий риск – явные признаки мошенничества" },
    errors: {
      RATE_LIMIT: "Слишком много проверок за короткое время. Подождите минуту.",
      FILE_TOO_LARGE: "Файл слишком большой. Выберите фото поменьше или PDF до 3 МБ.",
      BAD_FILE_TYPE: "Этот формат не поддерживается. Используйте JPG, PNG или PDF.",
      EMPTY: "Вставьте текст или загрузите файл.",
      NO_API_KEY: "Проверка сейчас не настроена. Попробуйте позже.",
      AI_FAILED: "Проверка не удалась. Попробуйте ещё раз.",
      IMAGE_DECODE: "Браузер не может открыть это фото (например, формат HEIC с iPhone). Сделайте скриншот или сохраните фото в JPG.",
      AI_AUTH: "Проверка сейчас не настроена. Попробуйте позже.",
      AI_BILLING: "Проверка сейчас недоступна. Попробуйте позже.",
      AI_BUSY: "Сейчас очень много запросов. Попробуйте через минуту.",
    },
  },
};

export const DICTS: Record<Locale, Dict> = { de, en, ru };
