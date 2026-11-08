"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PortfolioPageClient() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";
  const workLabel = isVi ? "Dự án Sản xuất" : "Selected work";

  return (
    <div className="min-h-screen bg-background pt-20 text-white">
      {/* Header */}
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-16">
          <h1 className="font-sans text-5xl font-normal tracking-tight sm:text-7xl">{workLabel}</h1>
        </div>
      </section>

      {/* Tier 1: AAA Games & Commercial Releases */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <h2 className="sr-only">Production projects</h2>
        <ProjectGrid />
      </section>

      {/* Tier 2: Technical VFX & Pipeline R&D (plus Tier 3 Collapsible Archive) */}
      <section id="rnd" className="border-t border-border bg-section py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8 border-b border-border pb-4">
            <h2 className="font-sans text-2xl font-normal tracking-tight text-white sm:text-3xl">
              {isVi ? "Kỹ thuật VFX & R&D" : "Technical VFX & R&D"}
            </h2>
          </div>

          <RndSection />
        </div>
      </section>
    </div>
  );
}
