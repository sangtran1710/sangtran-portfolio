"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const credit = project.client || project.role;

  return (
    <Link href={project.link || `/projects/${project.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-stone-900">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-[#a7d2ce]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#7db5b0]">{credit}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/60">{project.description}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 border border-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors group-hover:border-[#7db5b0] group-hover:bg-[#7db5b0] group-hover:text-[#071015]">
            View project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
