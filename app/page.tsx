import type { Metadata } from "next";
import Landing from "./components/Landing";
import { DICTS } from "@/lib/i18n";

export const metadata: Metadata = {
  title: DICTS.de.meta.title,
  description: DICTS.de.meta.description,
  alternates: { canonical: "/", languages: { de: "/", en: "/en", ru: "/ru" } },
};

export default function Page() {
  return <Landing locale="de" />;
}
