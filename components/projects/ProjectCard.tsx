"use client";

import Image from "next/image";
import Link from "next/link";
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
    <Link href={project.link || `/projects/${project.slug}`} className="group/card block">
      <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0f1520] shadow-[0_18px_45px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:border-white/16 group-hover/card:shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
          <div className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-1">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-white/10 bg-black/62 px-2.5 py-1 text-[10px] font-semibold text-white/88 backdrop-blur-sm"
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">
            {project.role} / {project.year}
          </p>
          <h3 className="text-xl font-semibold leading-tight text-white">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-7 text-slate-300">
            {project.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
