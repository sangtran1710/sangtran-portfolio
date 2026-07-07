"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedFeaturedProjects } from "@/lib/portfolio-content";
import ProjectCard from "@/components/projects/ProjectCard";

export default function FeaturedProjects() {
  const { locale, copy } = useLanguage();
  const projects = getLocalizedFeaturedProjects(locale);

  return (
    <section
      id="work"
      className="relative z-10 -mt-10 scroll-mt-24 overflow-hidden rounded-t-[2.25rem] border-t border-white/10 bg-[#070a0f] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:py-[4.75rem]">
        <motion.div
          className="mb-9 flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {copy.home.selectedWork}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-stone-400">
              {copy.home.selectedWorkBody}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-stone-300 shadow-md transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            {copy.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              offset={["start 0.95", "start 0.7"]}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <ProjectCard
                project={project}
                compact={i !== 0}
                featured={i === 0}
                priority
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#5c9d98] shadow-md transition-colors hover:text-white hover:bg-white/10 hover:border-white/20"
          >
            {copy.common.viewAllProjects}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
