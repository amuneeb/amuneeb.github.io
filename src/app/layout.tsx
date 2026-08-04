import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/config/site";
import { profile } from "@/data/profile";
import "./globals.css";

/** Structured data for rich search results ("Muneeb Abbasi AI engineer"). */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: site.ogDescription,
  url: site.url,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kent",
    addressRegion: "WA",
    addressCountry: "US",
  },
  sameAs: [profile.github, profile.linkedin],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [...site.keywords],
  openGraph: {
    title: site.title,
    description: site.ogDescription,
    url: site.url,
    type: "website",
    images: [
      {
        url: site.ogImage.path,
        width: site.ogImage.width,
        height: site.ogImage.height,
        alt: site.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.ogDescription,
    images: [site.ogImage.path],
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
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-neutral-900"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {site.analytics.umamiWebsiteId && (
          <Script
            src={site.analytics.umamiScriptUrl}
            data-website-id={site.analytics.umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
