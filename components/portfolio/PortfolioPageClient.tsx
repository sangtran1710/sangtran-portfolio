"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";

const RndSection = dynamic(() => import("@/components/home/RndSection"), {
  ssr: false,
  loading: () => <RndSectionSkeleton />,
});

function RndSectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 pb-20" aria-hidden>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="aspect-video rounded-2xl bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPageClient() {
  const { copy } = useLanguage();
  const rndRef = useRef<HTMLDivElement>(null);
  const [showRnd, setShowRnd] = useState(false);

  useEffect(() => {
    const el = rndRef.current;
    if (!el || showRnd) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRnd(true);
          observer.disconnect();
        }
      },
      { rootMargin: "720px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showRnd]);

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
        <div ref={rndRef}>
          {showRnd ? <RndSection /> : <RndSectionSkeleton />}
        </div>
      </div>
    </div>
  );
}
