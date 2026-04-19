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
      className="relative z-10 -mt-10 scroll-mt-24 overflow-hidden rounded-t-[2.25rem] border-t border-stone-200/80 bg-[#f6f2eb] shadow-[0_-16px_36px_rgba(15,23,42,0.06)]"
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
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {copy.home.selectedWork}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
              {copy.home.selectedWorkBody}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_5px_9px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:text-slate-950 hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)] sm:inline-flex"
          >
            {copy.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              offset={["start 0.95", "start 0.7"]}
            >
              <ProjectCard project={project} compact />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-[#4f8e89] shadow-[0_5px_9px_rgba(0,0,0,0.04)] transition-colors hover:text-slate-900"
          >
            {copy.common.viewAllProjects}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
