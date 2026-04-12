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
  { value: "igaming", label: "Slot Game" },
];

export default function ProjectGrid() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(active));

  return (
    <div>
      {/* Filter tabs — pill style */}
      <div className="mb-10 flex flex-wrap gap-3 border-b border-white/10 pb-6">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
              active === value
                ? "bg-white text-zinc-950 shadow-[0_16px_34px_rgba(255,255,255,0.08)]"
                : "border border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/14 hover:bg-white/[0.06] hover:text-zinc-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid — gap and cols */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-zinc-800/80 bg-zinc-900/20 py-12">
          <p className="text-sm text-zinc-500">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
