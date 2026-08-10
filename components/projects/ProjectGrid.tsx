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
  ];

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 pb-4">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value)}
            className={cn(
              "relative pb-1 text-sm font-medium transition-colors duration-200",
              active === value
                ? "text-white after:absolute after:-bottom-[17px] after:left-0 after:h-[2px] after:w-full after:bg-[#7db5b0]"
                : "text-white/45 hover:text-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center rounded-md border border-dashed border-white/15 py-12">
          <p className="text-sm text-white/55">{copy.common.noProjects}</p>
        </div>
      )}
    </div>
  );
}
