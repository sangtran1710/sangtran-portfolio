"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  supporting?: boolean;
  className?: string;
}

export default function ProjectCard({
  project,
  priority = false,
  featured = false,
  supporting = false,
  className,
}: ProjectCardProps) {
  const credit = project.client ? `${project.role} · ${project.client}` : project.role;
  const primaryCategory = project.categories?.[0] || "aaa";
  const categoryLabel = primaryCategory === "aaa" ? "AAA Production" : `${primaryCategory.toUpperCase()} Production`;

  return (
    <Link
      href={project.link || `/projects/${project.slug}`}
      className={cn("group block h-full", className)}
    >
      <article className="flex h-full flex-col">
        {/* Visual Showcase - Pure flat image with subtle border */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-lg border border-[#364156]/70 bg-[#161a23] transition-colors duration-300 group-hover:border-[#5eb3ab]/60",
            featured ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 1200px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        </div>

        {/* Typography & Editorial Metadata */}
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="uppercase tracking-[0.14em] text-[#5eb3ab]">
              {categoryLabel}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{project.year}</span>
          </div>

          <h3
            className={cn(
              "mt-1.5 font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-[#5eb3ab]",
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            )}
          >
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-normal text-slate-300">
            {credit}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <p className="mt-2 text-xs font-mono text-slate-400">
              {project.techStack.slice(0, 3).join(" · ")}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
