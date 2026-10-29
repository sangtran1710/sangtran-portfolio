import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechnicalSpotlight from "@/components/home/TechnicalSpotlight";
import { SITE } from "@/data/portfolio";

export const metadata: Metadata = {
  title: {
    absolute: SITE.title,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Tran — Senior VFX Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-main.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <TechnicalSpotlight />
      <ProfileSection />
    </>
  );
}
