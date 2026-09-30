"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  return (
    <Link
      href={project.link || `/projects/${project.slug}`}
      className={cn("group block h-full", className)}
    >
      <div
        className={cn(
          "h-full rounded-lg border border-[#364156] bg-[#232a38] p-4 transition-colors duration-200 hover:border-[#4b5a75] hover:bg-[#2b3445] sm:p-5",
          featured && "p-5 sm:p-6"
        )}
      >
        <article className="flex h-full flex-col">
          {/* Visual Showcase - Pure image, no heavy dark vignette */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-md border border-[#364156] bg-[#161a23]",
              featured ? "aspect-[16/9]" : "aspect-[16/9.5]"
            )}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 1200px"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />

            {/* Top-right subtle flat indicator */}
            <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded border border-white/20 bg-black/70 text-slate-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Typography & Editorial Metadata */}
          <div className="flex flex-1 flex-col pt-4">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-[#5eb3ab] uppercase tracking-wider">
                [{primaryCategory.toUpperCase()} RELEASE]
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{project.year}</span>
            </div>

            <h3
              className={cn(
                "mt-2 font-medium tracking-tight text-white transition-colors group-hover:text-[#5eb3ab]",
                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
              )}
            >
              {project.title}
            </h3>

            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-300">
              {credit}
            </p>

            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 pt-2">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-[#364156] bg-[#161a23] px-2 py-0.5 text-[10px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </Link>
  );
}
