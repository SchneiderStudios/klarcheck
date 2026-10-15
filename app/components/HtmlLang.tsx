"use client";

import { useEffect } from "react";

/** Setzt das lang-Attribut von <html> für die englische und russische Seite. */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
