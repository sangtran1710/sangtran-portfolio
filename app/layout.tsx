import type { Metadata } from "next";
import { Inter, Kanit, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialStrip from "@/components/layout/SocialStrip";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SkipToContentLink from "@/components/layout/SkipToContentLink";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SITE } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: SITE.title,
    template: `%s | Henry Tran`,
  },
  description: SITE.description,
  authors: [{ name: "Henry Tran" }],
  keywords: [
    "VFX Artist",
    "Real-time VFX",
    "Unreal Engine",
    "Houdini",
    "HLSL",
    "AAA Games",
    "Niagara",
    "Henry Tran",
    "Game VFX",
    "Technical Artist",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    images: [
      {
        url: "/images/NWA.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Tran VFX artist portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/NWA.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${kanit.variable} ${mono.variable} dark`}>
      <body className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary/30">
        <LanguageProvider>
          <SkipToContentLink />
          <Navbar />
          <main id="main" className="relative">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </main>
          <SocialStrip />
          <Footer />
          <ScrollToTop />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
