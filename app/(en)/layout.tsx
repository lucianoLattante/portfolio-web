import type { ReactNode } from "react";
import { Layout, localeMetadata } from "../../components/Layout";
import "../globals.css";

export const metadata = localeMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Layout locale="en">{children}</Layout>;
}
