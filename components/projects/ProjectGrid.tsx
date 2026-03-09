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
      <div className="flex gap-3 flex-wrap mb-10 pb-6 border-b border-zinc-700/60">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
              active === value
                ? "bg-white text-zinc-900 shadow-sm"
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid — gap and cols */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-zinc-800/80 rounded-2xl bg-zinc-900/20">
          <p className="text-zinc-500 text-sm">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
