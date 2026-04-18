import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import BackstorySection from "@/components/home/BackstorySection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechnicalSkillsSection from "@/components/home/TechnicalSkillsSection";
import VFXExperienceSection from "@/components/home/VFXExperienceSection";
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
      <ProfileSection />
      <BackstorySection />
      <TechnicalSkillsSection />
      <VFXExperienceSection />
      <ContactSection />
    </>
  );
}
