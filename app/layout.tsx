import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dataflow Visualiser | Native Codebase Dependency Maps",
  description:
    "Download Dataflow Visualiser, a native desktop app for dependency graphs, blast-radius analysis, snapshots, AI code mapping, and local-first codebase exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
