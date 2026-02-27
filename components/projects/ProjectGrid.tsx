"use client";

import { useState } from "react";
import { PROJECTS, type ProjectCategory } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const FILTERS: { value: "all" | ProjectCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "aaa", label: "AAA" },
  { value: "realtime", label: "Real-time" },
  { value: "cinematic", label: "Cinematic" },
  { value: "igaming", label: "iGaming" },
];

export default function ProjectGrid() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(active));

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-10">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-colors border",
              active === value
                ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-teal-300 hover:bg-teal-50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
