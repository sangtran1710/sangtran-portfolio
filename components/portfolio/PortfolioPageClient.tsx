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
    <div className="min-h-screen bg-background pt-20 text-white">
      {/* Header */}
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <Image
          src="/images/projects/wolverine/wolverine-artblast-hangar.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover object-center opacity-[0.14]"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0D1015_0%,rgba(13,16,21,0.85)_42%,rgba(13,16,21,0.45)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_0%,rgba(88,207,200,0.08),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-16">
          <h1 className="font-kanit text-5xl font-normal tracking-tight sm:text-7xl">{workLabel}</h1>
        </div>
      </section>

      {/* Tier 1: AAA Games & Commercial Releases */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <ProjectGrid />
      </section>

      {/* Tier 2: Technical VFX & Pipeline R&D (plus Tier 3 Collapsible Archive) */}
      <section id="rnd" className="border-t border-border bg-section py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8 border-b border-border pb-4">
            <h2 className="font-kanit text-2xl font-normal tracking-tight text-white sm:text-3xl">
              {isVi ? "Kỹ thuật VFX & R&D" : "Technical VFX & R&D"}
            </h2>
          </div>

          <RndSection />
        </div>
      </section>
    </div>
  );
}
