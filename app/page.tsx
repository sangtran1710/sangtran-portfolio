import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import BackstorySection from "@/components/home/BackstorySection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechnicalSkillsSection from "@/components/home/TechnicalSkillsSection";
import VFXExperienceSection from "@/components/home/VFXExperienceSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProfileSection />
      <BackstorySection />
      <FeaturedProjects />
      <TechnicalSkillsSection />
      <VFXExperienceSection />
      <ContactSection />
    </>
  );
}
