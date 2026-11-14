"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type ProjectCategory } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProjects } from "@/lib/portfolio-content";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectGrid() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const prefersReducedMotion = useReducedMotion();
  const { locale, copy } = useLanguage();
  const allProjects = getLocalizedProjects(locale);
  const projects = allProjects.filter((p) => p.projectType !== "film");
  const filters: { value: "all" | ProjectCategory; label: string }[] = [
    { value: "all", label: copy.categories.all },
    { value: "aaa", label: copy.categories.aaa },
    { value: "realtime", label: copy.categories.realtime },
    { value: "cinematic", label: copy.categories.cinematic },
  ];

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap items-center gap-1 rounded-md border border-border/80 bg-section/80 p-1" role="group" aria-label="Filter projects">
          {filters.map(({ value, label }) => {
            const isSelected = active === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActive(value)}
                className={cn(
                  "relative min-h-10 rounded-md px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isSelected
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {isSelected && !prefersReducedMotion && (
                  <motion.div
                    layoutId="portfolio-filter-pill"
                    className="pointer-events-none absolute inset-0 select-none rounded-md bg-white/[0.1] border border-white/10"
                    transition={{ type: "spring", stiffness: 450, damping: 34 }}
                  />
                )}
                <span className="pointer-events-none relative z-10 select-none">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                className={index === 0 ? "md:col-span-2" : undefined}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: -8 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.03,
                }}
              >
                <ProjectCard project={project} featured={index === 0} priority={index < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border py-16"
        >
          <p className="text-[13px] text-white/55">{copy.common.noProjects}</p>
        </motion.div>
      )}
    </div>
  );
}
