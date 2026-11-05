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
      <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-border/60 pb-5" role="tablist">
        {filters.map(({ value, label }) => {
          const isSelected = active === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-pressed={isSelected}
              onClick={() => setActive(value)}
              className={cn(
                "relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 focus-visible:outline-none",
                isSelected
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {isSelected && !prefersReducedMotion && (
                <motion.div
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30 shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={active}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index < 3} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border py-16"
          >
            <p className="text-sm text-white/55">{copy.common.noProjects}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
