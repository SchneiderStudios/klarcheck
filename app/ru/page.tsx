import type { Metadata } from "next";
import Landing from "../components/Landing";
import { DICTS } from "@/lib/i18n";

export const metadata: Metadata = {
  title: DICTS.ru.meta.title,
  description: DICTS.ru.meta.description,
  alternates: { canonical: "/ru", languages: { de: "/", en: "/en", ru: "/ru" } },
};

export default function Page() {
  return <Landing locale="ru" />;
}
