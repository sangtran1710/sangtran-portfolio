import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialStrip from "@/components/layout/SocialStrip";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import { SITE } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE.title,
    template: `%s | Sang Tran`,
  },
  description: SITE.description,
  authors: [{ name: "Sang Tran" }],
  keywords: [
    "VFX Artist",
    "Real-time VFX",
    "Unreal Engine",
    "Houdini",
    "HLSL",
    "AAA Games",
    "Niagara",
    "Sang Tran",
    "Game VFX",
    "Technical Artist",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sang Tran — Senior VFX Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <PageLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main" className="relative">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <SocialStrip />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
