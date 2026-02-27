"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/portfolio";

const CATEGORY_LABELS: Record<string, string> = {
  aaa: "AAA",
  realtime: "Real-time",
  cinematic: "Cinematic",
  igaming: "iGaming",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200/70 hover:shadow-md hover:border-teal-300/50 hover:shadow-slate-200/80 transition-all duration-300 block flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200/70">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Category badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/50 px-2 py-0.5 text-[10px] font-medium text-slate-800"
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col px-5 pb-5">
        <h3 className="font-semibold text-slate-900 text-[15px] sm:text-base leading-tight group-hover:text-teal-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-[13px] sm:text-sm mt-1.5">
          {project.role} · {project.year}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 relative">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-teal-50 border border-teal-100 px-2 py-0.5 text-[10px] text-teal-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
