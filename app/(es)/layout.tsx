import type { ReactNode } from "react";
import { Layout, localeMetadata } from "../../components/Layout";
import "../globals.css";

export const metadata = localeMetadata("es");

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <Layout locale="es">{children}</Layout>;
}
