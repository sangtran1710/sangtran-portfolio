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
      <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-stone-200/90 pb-4">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value)}
            className={cn(
              "relative pb-1 text-sm font-medium transition-colors duration-200",
              active === value
                ? "text-slate-900 after:absolute after:-bottom-[17px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#5c9d98]"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {filtered.map((project, index) => (
            <div
              key={project.slug}
              className={cn(active === "all" && index === 0 && "lg:col-span-2")}
            >
              <ProjectCard
                project={project}
                featured={active === "all" && index === 0}
                priority={index < 3}
              />
            </div>
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
