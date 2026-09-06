"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProjects } from "@/lib/portfolio-content";
import { Film } from "lucide-react";

export default function PortfolioPageClient() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";
  const workLabel = isVi ? "Dự án Sản xuất" : "Production Work";
  const experimentLabel = isVi ? "Thử nghiệm & R&D" : "Experiments & Pipeline Tools";

  const allProjects = getLocalizedProjects(locale);
  const filmProjects = allProjects.filter((p) => p.projectType === "film");

  return (
    <div className="min-h-screen bg-[#070a0f] pt-20 text-white">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">{workLabel}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
            {copy.portfolio.body}
          </p>
        </div>
      </section>

      {/* 1. Real-time Game Projects */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
              {isVi ? "01 / Game Production" : "01 / Game Production"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {copy.portfolio.gameSectionTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            {copy.portfolio.gameSectionBody}
          </p>
        </div>

        <ProjectGrid />
      </section>

      {/* 2. Film & Broadcast VFX (Separated from realtime games) */}
      {filmProjects.length > 0 && (
        <section className="border-t border-white/10 bg-[#090d14] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5c9d98]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#7db5b0] border border-[#5c9d98]/20">
                  <Film className="h-3.5 w-3.5" />
                  {isVi ? "Kỹ xảo Phim & Truyền hình" : "Film & Broadcast Production"}
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {copy.portfolio.filmSectionTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                {copy.portfolio.filmSectionBody}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filmProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Experiments & R&D */}
      <section id="rnd" className="border-t border-white/10 bg-[#0b0e12]">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12 lg:pt-24">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
              {isVi ? "03 / Nghiên cứu & Công cụ" : "03 / Research & Tooling"}
            </span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {experimentLabel}
          </h2>
        </div>
        <RndSection />
      </section>
    </div>
  );
}
