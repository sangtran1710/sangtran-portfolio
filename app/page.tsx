import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechnicalSpotlight from "@/components/home/TechnicalSpotlight";
import ContactSection from "@/components/home/ContactSection";
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
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <TechnicalSpotlight />
      <ProfileSection />
      <ContactSection />
    </>
  );
}
