import type { Metadata } from "next";
import Landing from "../components/Landing";
import { DICTS } from "@/lib/i18n";

export const metadata: Metadata = {
  title: DICTS.en.meta.title,
  description: DICTS.en.meta.description,
  alternates: { canonical: "/en", languages: { de: "/", en: "/en", ru: "/ru" } },
};

export default function Page() {
  return <Landing locale="en" />;
}
