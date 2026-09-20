"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PortfolioPageClient() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";
  const workLabel = isVi ? "Dự án Sản xuất" : "Production Work";

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

      {/* Tier 1: AAA Games & Commercial Releases */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
              {isVi ? "01 / Dự án Sản xuất" : "01 / Production Releases"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {isVi ? "Game AAA & Kỹ xảo Thương mại" : "AAA Games & Commercial Releases"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            {isVi
              ? "Kỹ xảo thời gian thực, gameplay VFX và in-engine cinematic trên các hệ máy console, PC và streaming."
              : "Real-time gameplay effects, in-engine cinematics, and broadcast VFX across console, PC, and streaming productions."}
          </p>
        </div>

        <ProjectGrid />
      </section>

      {/* Tier 2: Technical VFX & Pipeline R&D (plus Tier 3 Collapsible Archive) */}
      <section id="rnd" className="border-t border-white/10 bg-[#090d14] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-6 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
                {isVi ? "02 / Kỹ thuật VFX & R&D" : "02 / Technical VFX & R&D"}
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {isVi ? "Kỹ xảo Anime, Shader & Công cụ Pipeline" : "Stylized Anime VFX, Shaders & Pipeline Tools"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              {isVi
                ? "Thử nghiệm cel-shading, hệ thống hạt Niagara chuyên sâu và công cụ tự động hóa pipeline Python/DCC."
                : "Stylized cel-shading, advanced Niagara systems, custom shaders, and automated Python DCC pipeline tooling."}
            </p>
          </div>

          <RndSection />
        </div>
      </section>
    </div>
  );
}
