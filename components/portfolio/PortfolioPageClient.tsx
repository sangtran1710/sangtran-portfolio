"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Image from "next/image";

export default function PortfolioPageClient() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";
  const workLabel = isVi ? "Dự án Sản xuất" : "Production Work";

  return (
    <div className="min-h-screen bg-[#070a0f] pt-20 text-white">
      {/* Header */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#070a0f]">
        <Image
          src="/images/projects/wolverine/wolverine-artblast-hangar.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover object-center opacity-[0.14]"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#070a0f_0%,rgba(7,10,15,0.82)_42%,rgba(7,10,15,0.45)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_0%,rgba(92,157,152,0.12),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <h1 className="font-kanit text-5xl font-normal tracking-tight sm:text-7xl">{workLabel}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
            {copy.portfolio.body}
          </p>
        </div>
      </section>

      {/* Tier 1: AAA Games & Commercial Releases */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
              {isVi ? "01 / Dự án Sản xuất" : "01 / Production Releases"}
            </span>
          </div>
          <h2 className="font-kanit text-3xl font-normal tracking-tight text-white sm:text-4xl">
            {isVi ? "Game AAA & Kỹ xảo Thương mại" : "AAA Games & Commercial Releases"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/55 sm:text-base">
            {isVi
              ? "Gameplay VFX và cinematic cho console, PC và streaming."
              : "Gameplay VFX and in-engine cinematics for console, PC, and streaming."}
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
              {isVi ? "VFX Stylized & Công cụ" : "Stylized VFX & Tools"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              {isVi
                ? "Các thử nghiệm stylized, Niagara và công cụ hỗ trợ workflow."
                : "Stylized effects, Niagara experiments, and tools that support the workflow."}
            </p>
          </div>

          <RndSection />
        </div>
      </section>
    </div>
  );
}
