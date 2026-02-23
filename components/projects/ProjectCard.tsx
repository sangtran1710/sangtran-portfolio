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
      className="group relative overflow-hidden rounded-xl bg-zinc-900 block"
    >
      {/* Thumbnail — chiếm toàn bộ card */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay gradient — luôn hiện nhẹ ở bottom, đậm hơn khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badges — top right */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white/80"
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </span>
          ))}
        </div>

        {/* Info — bottom, luôn hiện */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-white text-sm leading-tight">
            {project.title}
          </h3>
          <p className="text-white/60 text-xs mt-0.5">
            {project.role} · {project.year}
          </p>

          {/* Tech stack — chỉ hiện khi hover */}
          <div className="flex flex-wrap gap-1 mt-2 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
