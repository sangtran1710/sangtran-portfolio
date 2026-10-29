import type { Metadata } from "next";
import { ABOUT } from "@/data/portfolio";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Henry Tran — Senior VFX Artist",
    description:
      "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Henry Tran — Senior VFX Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Henry Tran — Senior VFX Artist",
    description:
      "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
    images: ["/images/og-about.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
