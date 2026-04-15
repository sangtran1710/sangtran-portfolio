"use client";

import { useState } from "react";
import { type ProjectCategory } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProjects } from "@/lib/portfolio-content";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectGrid() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const { locale, copy } = useLanguage();
  const projects = getLocalizedProjects(locale);
  const filters: { value: "all" | ProjectCategory; label: string }[] = [
    { value: "all", label: copy.categories.all },
    { value: "aaa", label: copy.categories.aaa },
    { value: "realtime", label: copy.categories.realtime },
    { value: "cinematic", label: copy.categories.cinematic },
    { value: "igaming", label: copy.categories.slotGame },
  ];

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5 border-b border-stone-200/90 pb-5">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value)}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
              active === value
                ? "bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.1)]"
                : "border border-stone-200 bg-white/80 text-slate-600 hover:border-stone-300 hover:bg-white hover:text-slate-900"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-stone-300 bg-white/70 py-12">
          <p className="text-sm text-slate-500">{copy.common.noProjects}</p>
        </div>
      )}
    </div>
  );
}
