import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./components/ThemeProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-light",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Dataflow Visualiser",
  description: "Dataflow Visualiser. Native architecture console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${outfit.variable}`}>
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
