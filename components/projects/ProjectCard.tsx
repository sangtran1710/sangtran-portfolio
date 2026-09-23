"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  supporting?: boolean;
  className?: string;
}

function getEditorialLines(project: Project): [string, string] {
  if (project.slug === "wolverine") {
    return ["Gameplay & cinematic VFX", "Proprietary engine"];
  }
  if (project.slug === "spider-man-2") {
    return ["Gameplay & destruction VFX", "Houdini · Proprietary engine"];
  }
  if (project.slug === "fortnite-remix") {
    return ["Weapon skins & live event VFX", "Niagara · Unreal Engine"];
  }
  if (project.slug === "new-world") {
    return ["Cinematic & environment VFX", "Houdini · Unreal Engine"];
  }
  if (project.slug === "until-dawn") {
    return ["Cinematic horror lighting", "Lumen · Unreal Engine 5"];
  }
  if (project.slug === "malignant") {
    return ["Gore simulation & combat VFX", "LiquiGen · Niagara · UE5"];
  }
  if (project.slug === "black-knight") {
    return ["Destruction & pyro simulation", "Houdini · Broadcast VFX"];
  }
  if (project.slug === "havoc") {
    return ["Combat ability VFX", "Niagara · Unreal Engine"];
  }
  if (project.cardHighlight && project.cardHighlight.includes(" · ")) {
    const parts = project.cardHighlight.split(" · ");
    return [parts[0], parts.slice(1).join(" · ")];
  }
  return [project.cardHighlight || project.role, project.engine || "Real-time VFX"];
}

export default function ProjectCard({
  project,
  priority = false,
  featured = false,
  supporting = false,
  className,
}: ProjectCardProps) {
  const [line1, line2] = getEditorialLines(project);
  const credit = project.client ? `${project.role} · ${project.client}` : project.role;
  const enginePlatform = [
    project.engine?.toUpperCase(),
    project.platform?.toUpperCase(),
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <Link
      href={project.link || `/projects/${project.slug}`}
      className={cn("group block h-full", className)}
    >
      <SpotlightCard
        className={cn(
          "h-full p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-[#0c1017]/40 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#0e131b]",
          featured && "p-4 sm:p-5"
        )}
      >
        <article className="flex h-full flex-col">
          {/* Visual Showcase */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-xl bg-zinc-950 transition-colors duration-300",
              featured ? "aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.2/1]" : "aspect-[16/9.5]"
            )}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 1200px"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />
            {/* Subtle bottom vignette on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

            {/* Custom hover arrow in top-right corner */}
            <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-[#7db5b0] opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:bg-[#5c9d98] group-hover:text-white shadow-lg">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Typography & Editorial Metadata */}
          <div className="flex flex-1 flex-col pt-4 sm:pt-5">
            <h3
              className={cn(
                "font-semibold tracking-tight text-white transition-colors group-hover:text-[#a7d2ce]",
                featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
              )}
            >
              {project.title}
            </h3>

            <p className="mt-1 text-xs sm:text-sm font-medium text-[#7db5b0]">
              {credit}
            </p>

            {enginePlatform && (
              <p className="mt-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-white/40">
                {enginePlatform}
              </p>
            )}

            {featured && (
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/60 max-w-3xl line-clamp-2">
                {project.workSummary || project.description}
              </p>
            )}

            {/* Editorial discipline & technical lines */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-xs text-white/75 font-normal leading-relaxed">
                  {line1}
                </p>
                <p className="text-[11px] font-mono text-white/40 leading-relaxed mt-0.5">
                  {line2}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#7db5b0] group-hover:text-white transition-colors flex-shrink-0 ml-4">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </article>
      </SpotlightCard>
    </Link>
  );
}
