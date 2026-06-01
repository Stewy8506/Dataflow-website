import type { Metadata } from "next";
import { DM_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";


import { ThemeProvider } from "./components/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const quicksand = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${quicksand.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
