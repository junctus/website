import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, Fragment_Mono } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const mono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://junctus.org"),
  title: "Junctus — an anonymity layer for the internet",
  description:
    "A dispersed, post-quantum, verifiable, censorship-resistant anonymity layer. Traffic is encrypted, sliced k-of-n, and sent down disjoint onion paths — no single node ever holds the whole.",
  openGraph: {
    title: "Junctus — an anonymity layer for the internet",
    description:
      "Post-quantum, information-sliced, timing-mixed anonymity layer. No node holds the whole.",
    url: "https://junctus.org",
    siteName: "Junctus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
