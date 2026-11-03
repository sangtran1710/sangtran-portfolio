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
      className="scroll-mt-24 border-b border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h2 className="font-kanit text-3xl font-normal tracking-tight text-white sm:text-4xl">
              {copy.home.selectedWork}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            {isVi ? "Xem tất cả dự án" : "View all work"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial Rhythm: 1 Dominant Hero + 2 Supporting Releases */}
        <div className="space-y-12">
          {/* Dominant Hero: Marvel's Wolverine */}
          {projects[0] && (
            <ProjectCard
              project={{
                ...projects[0],
                thumbnail: "/images/projects/wolverine/wolverine-artblast-explosion.webp",
              }}
              priority
              featured
              className="w-full"
            />
          )}

          {/* Supporting Duo: Spider-Man 2 & Fortnite */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects[1] && (
              <ProjectCard
                project={{
                  ...projects[1],
                  thumbnail: "/images/projects/spider-man-2/story-fire.webp",
                }}
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
            className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-white"
          >
            {isVi ? "Xem tất cả dự án" : "View all work"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
