import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dataflow Visualiser",
  description: "A high-performance native desktop tool for indexing, visualizing, and analyzing local codebases with blast-radius simulation.",
  openGraph: {
    title: "Dataflow Visualiser",
    description: "Understand the structure before you break it. Native-speed parsing and interactive WebGL canvas.",
    type: "website",
    url: "https://dataflow-visualiser.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataflow Visualiser",
    description: "Understand the structure before you break it.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Dataflow Visualiser",
              "operatingSystem": "macOS, Windows, Linux",
              "applicationCategory": "DeveloperApplication",
              "description": "A high-performance native desktop tool for indexing, visualizing, and analyzing local codebases with blast-radius simulation.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${sans.variable} ${display.variable} ${mono.variable} ${hand.variable}`}>
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
