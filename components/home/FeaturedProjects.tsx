"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedFeaturedProjects } from "@/lib/portfolio-content";
import ProjectCard from "@/components/projects/ProjectCard";

export default function FeaturedProjects() {
  const { locale } = useLanguage();
  const projects = getLocalizedFeaturedProjects(locale);

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-white/10 bg-[#070a0f]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Work</h2>
          <Link
            href="/portfolio"
            className="hidden items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 3} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
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
