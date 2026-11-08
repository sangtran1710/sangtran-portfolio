"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8 flex flex-wrap items-baseline justify-between gap-4"
        >
          <div>
            <h2 className="font-sans text-3xl font-normal tracking-tight text-white sm:text-4xl">
              {copy.home.selectedWork}
            </h2>

          </div>

        </motion.div>

        {/* Editorial Rhythm: 1 Dominant Hero + 2 Supporting Releases */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="space-y-12"
        >
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
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-section/70 hover:bg-section hover:border-primary/50 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_24px_rgba(88,207,200,0.2)] shadow-sm"
          >
            <span>{isVi ? "Khám phá toàn bộ danh mục dự án & Breakdown" : "Explore the work"}</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
