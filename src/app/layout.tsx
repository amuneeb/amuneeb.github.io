import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muneeb Abbasi — Principal AI Engineer",
  description:
    "Principal AI Engineer building enterprise AI platforms — LLMs, RAG, AI agents, and cloud-native systems on Azure. 15+ years of experience, ex-Microsoft.",
  keywords: [
    "Muneeb Abbasi",
    "AI Engineer",
    "LLM",
    "RAG",
    "AI agents",
    "Azure",
    "Seattle",
  ],
  openGraph: {
    title: "Muneeb Abbasi — Principal AI Engineer",
    description:
      "Enterprise AI platforms: LLMs, RAG, AI agents, and cloud-native systems on Azure.",
    url: "https://amuneeb.github.io",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
