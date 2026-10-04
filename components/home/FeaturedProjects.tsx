"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedFeaturedProjects } from "@/lib/portfolio-content";
import ProjectCard from "@/components/projects/ProjectCard";

export default function FeaturedProjects() {
  const { locale, copy } = useLanguage();
  const projects = getLocalizedFeaturedProjects(locale);

  const isVi = locale === "vi";

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
              {isVi ? "DỰ ÁN TIÊU BIỂU" : "FEATURED PRODUCTIONS"}
            </span>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {copy.home.selectedWork}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            {isVi ? "Xem tất cả" : "View all work"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial Rhythm: 1 Dominant Hero + 2 Supporting Releases */}
        <div className="space-y-12">
          {/* Dominant Hero: Marvel's Wolverine */}
          {projects[0] && (
            <ProjectCard
              project={projects[0]}
              priority
              featured
              className="mx-auto w-full max-w-5xl"
            />
          )}

          {/* Supporting Duo: Spider-Man 2 & Fortnite */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects[1] && (
              <ProjectCard
                project={projects[1]}
                priority
                supporting
                className="w-full"
              />
            )}
            {projects[2] && (
              <ProjectCard
                project={projects[2]}
                supporting
                className="w-full"
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/75 transition-colors hover:border-white hover:text-white"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
