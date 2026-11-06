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
      {/* Framer Segmented Dock Header */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md shadow-inner" role="tablist">
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
                  "relative rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 focus-visible:outline-none",
                  isSelected
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {isSelected && !prefersReducedMotion && (
                  <motion.div
                    layoutId="portfolio-filter-pill"
                    className="pointer-events-none absolute inset-0 select-none rounded-full bg-white/[0.14] border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.5),0_0_16px_rgba(88,207,200,0.2)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95, y: -12 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.04,
                }}
              >
                <ProjectCard project={project} priority={index < 3} />
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
          <p className="text-sm text-white/55">{copy.common.noProjects}</p>
        </motion.div>
      )}
    </div>
  );
}
