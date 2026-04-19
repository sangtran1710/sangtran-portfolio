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
          <div className="grid gap-8 border-b border-white/8 pb-10 pt-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7db5b0]">
                Portfolio
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-[3.4rem] sm:leading-[1.02]">
                {copy.portfolio.title}
              </h1>
            </div>
            <p className="max-w-md text-[0.98rem] leading-7 text-white/70 lg:justify-self-end">
              {copy.portfolio.body}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12">
        <section>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4f8e89]">
                Released work
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                {copy.portfolio.selectedProjects}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              AAA releases and launch content are prioritized here. R&D, prototypes, and tool experiments are grouped separately below.
            </p>
          </div>
          <ProjectGrid />
        </section>
      </div>

      <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,14,22,0.82),rgba(9,12,19,0.96))]">
        <div className="mx-auto max-w-7xl px-6 pt-14">
          <div className="grid gap-4 border-b border-white/8 pb-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(20rem,0.3fr)] lg:items-end">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7db5b0]">
                Lab archive
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                R&D and experiments
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55 lg:justify-self-end">
              Tooling, prototypes, and exploratory studies stay available without competing with the shipped production portfolio.
            </p>
          </div>
        </div>
        <RndSection />
      </div>
    </div>
  );
}
