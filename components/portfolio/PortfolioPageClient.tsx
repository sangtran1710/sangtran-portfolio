"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PortfolioPageClient() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";
  const workLabel = isVi ? "Dự án Sản xuất" : "Selected work";

  return (
    <div className="min-h-screen bg-background pt-32 text-white">
      <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12">
        <h1 className="font-sans text-4xl font-normal tracking-tight text-white sm:text-7xl">{workLabel}</h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <h2 className="sr-only">Production projects</h2>
        <ProjectGrid />
      </section>

      <section id="rnd" className="bg-section py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <h2 className="font-sans text-2xl font-normal tracking-tight text-white sm:text-4xl">
              {isVi ? "Kỹ thuật VFX & R&D" : "Technical VFX & R&D"}
            </h2>
          </div>

          <RndSection />
        </div>
      </section>
    </div>
  );
}
