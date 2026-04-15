"use client";

import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PortfolioPageClient() {
  const { copy } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f6f2eb]">
      <section className="bg-[linear-gradient(180deg,#11171e_0%,#161c23_100%)]">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-24">
          <div className="max-w-3xl pt-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-[3.4rem] sm:leading-[1.02]">
              {copy.portfolio.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-white/72">
              {copy.portfolio.body}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12">
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {copy.portfolio.selectedProjects}
            </h2>
          </div>
          <ProjectGrid />
        </section>
      </div>

      <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,14,22,0.82),rgba(9,12,19,0.96))]">
        <RndSection />
      </div>
    </div>
  );
}
