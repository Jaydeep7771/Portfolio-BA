import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Preloader } from "@/components/preloader";
import { PageTransition, ScrollProgress } from "@/components/page-transition";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.fullName} — Business Analyst & Product Analyst`,
    template: `%s · ${profile.fullName}`,
  },
  description: profile.tagline,
  keywords: [
    "Business Analyst",
    "Product Analyst",
    "AI Automation",
    "Requirements Gathering",
    "Power BI",
    "SQL",
    "Product Management",
    "Prompt Engineering",
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.siteUrl,
    siteName: `${profile.fullName} — Portfolio`,
    title: `${profile.fullName} — Business Analyst & Product Analyst`,
    description: profile.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — Business Analyst & Product Analyst`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Scroll-revealed content starts hidden. Without JS the observer
            never runs, so force it visible rather than serving a blank page. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <Preloader />
          <SiteNav />
          <ScrollProgress />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
          <ChatWidgetLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
