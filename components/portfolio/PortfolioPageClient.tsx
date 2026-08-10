"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PortfolioPageClient() {
  const { locale } = useLanguage();
  const workLabel = locale === "vi" ? "Công việc" : "Work";
  const experimentLabel = locale === "vi" ? "Thử nghiệm" : "Experiments";

  return (
    <div className="min-h-screen bg-[#070a0f] pt-20 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">{workLabel}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <ProjectGrid />
      </section>

      <section className="border-t border-white/10 bg-[#0b0e12]">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12 lg:pt-24">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">{experimentLabel}</h2>
        </div>
        <RndSection />
      </section>
    </div>
  );
}
