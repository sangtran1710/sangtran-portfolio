"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedFeaturedProjects } from "@/lib/portfolio-content";
import ProjectCard from "@/components/projects/ProjectCard";

export default function FeaturedProjects() {
  const { locale, copy } = useLanguage();
  const projects = getLocalizedFeaturedProjects(locale);

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-white/10 bg-[#070a0f]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {copy.home.selectedWork}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 1 Featured Anchor + 2 Supporting Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Featured Title: Marvel's Wolverine */}
          <div className="lg:col-span-7 flex">
            {projects[0] && (
              <ProjectCard
                project={projects[0]}
                priority
                featured
                className="w-full"
              />
            )}
          </div>

          {/* Supporting Column: Spider-Man 2 & Fortnite */}
          <div className="flex flex-col gap-6 lg:col-span-5 justify-between">
            {projects[1] && (
              <ProjectCard
                project={projects[1]}
                priority
                supporting
                className="flex-1"
              />
            )}
            {projects[2] && (
              <ProjectCard
                project={projects[2]}
                supporting
                className="flex-1"
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
