"use client";

import Link from "next/link";
import Image from "next/image";
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
      href={project.link || `/projects/${project.slug}`}
      className="group/card relative block overflow-hidden"
    >
      {/* Image wrapper */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800 rounded-xl md:rounded-2xl">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out scale-100 group-hover/card:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Category badges — always visible, top-right */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end z-10">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90"
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </span>
          ))}
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 ease-out" />

        {/* Shine/Glare effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay">
          <div
            className="absolute top-0 w-3/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] -left-[125%] group-hover/card:left-[125%] transition-all ease-out opacity-0 group-hover/card:opacity-100"
            style={{ transitionDuration: "800ms" }}
          />
        </div>

        {/* Hover content — slides up from bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out z-10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-400 mb-1">
            {project.role}&nbsp;·&nbsp;{project.year}
          </p>
          <h3 className="font-bold text-white text-sm sm:text-[15px] leading-snug mb-1.5">
            {project.title}
          </h3>
          <p className="text-white/65 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
