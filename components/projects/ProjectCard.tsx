"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
  featured?: boolean;
  priority?: boolean;
  light?: boolean;
}

export default function ProjectCard({ 
  project, 
  compact = false, 
  featured = false, 
  priority = false,
  light = false 
}: ProjectCardProps) {
  const { copy } = useLanguage();
  const categoryLabels: Record<string, string> = {
    aaa: copy.categories.aaa,
    realtime: copy.categories.realtime,
    cinematic: copy.categories.cinematic,
    igaming: copy.categories.igaming,
  };
  const primaryCategory = categoryLabels[project.categories[0]] ?? project.categories[0];
  const compactTools = project.techStack.slice(0, 2);

  const cardBgClass = light
    ? "bg-white/70 border-stone-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:bg-white/90 group-hover/card:border-[#4f8e89]/40 group-hover/card:shadow-[0_16px_36px_rgba(92,157,152,0.08)]"
    : "bg-white/[0.02] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover/card:border-[#5c9d98]/50 group-hover/card:shadow-[0_20px_40px_rgba(92,157,152,0.08)]";

  const textTitleColor = light ? "text-slate-900" : "text-white";
  const textDescColor = light ? "text-slate-600" : "text-stone-300";
  const textRoleColor = light ? "text-[#4f8e89]" : "text-[#5c9d98]";
  const textCatColor = light ? "text-slate-400" : "text-stone-500";
  const tagBgClass = light ? "border-slate-200 bg-slate-100/60 text-slate-600" : "border-white/10 bg-white/5 text-stone-400";
  const arrowBtnClass = light
    ? "border-slate-200 text-slate-400 group-hover/card:border-[#4f8e89] group-hover/card:bg-[#4f8e89] group-hover/card:text-white"
    : "border-white/10 text-stone-400 group-hover/card:border-[#5c9d98] group-hover/card:bg-[#5c9d98] group-hover/card:text-white";

  return (
    <Link href={project.link || `/projects/${project.slug}`} className="group/card block h-full">
      <article className={compact 
        ? `h-full overflow-hidden rounded-[1.35rem] border backdrop-blur-md transition-all duration-300 group-hover/card:-translate-y-1 ${cardBgClass}`
        : `h-full overflow-hidden rounded-[1.6rem] border backdrop-blur-md transition-all duration-300 group-hover/card:-translate-y-1 ${cardBgClass}`
      }>
        <div className={featured ? "relative aspect-[16/10] overflow-hidden bg-stone-900 lg:aspect-[16/8.4]" : compact ? "relative aspect-[16/9] overflow-hidden bg-stone-900" : "relative aspect-[16/10] overflow-hidden bg-stone-900"}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 80rem"
                : "(max-width: 768px) 100vw, 50vw"
            }
          />
          <div className={compact ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,12,0.08),rgba(5,8,12,0.02)_48%,rgba(5,8,12,0.4))]" : "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"} />
          {compact && (
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 text-[10px] font-semibold leading-none tracking-[0.08em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] backdrop-blur-md">
              {primaryCategory} / {project.year}
            </div>
          )}
        </div>

        <div className={featured ? "space-y-3 px-6 py-6 sm:px-7" : compact ? "space-y-2 px-5 py-4" : "space-y-2 px-5 py-5"}>
          {compact ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${textRoleColor}`}>
                    {project.role}
                  </p>
                  <h3 className={`mt-1 text-[1.18rem] font-semibold leading-[1.16] tracking-[-0.02em] ${textTitleColor}`}>
                    {project.title}
                  </h3>
                </div>
                <span className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${arrowBtnClass}`}>
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
              </div>
              {compactTools.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {compactTools.map((tool) => (
                    <span key={tool} className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${tagBgClass}`}>
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className={`text-[10px] font-medium uppercase tracking-[0.14em] ${textRoleColor}`}>
                {project.role} / {project.year}
              </p>
              <h3 className={featured 
                ? `max-w-2xl text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.035em] ${textTitleColor} sm:text-[2rem]`
                : `text-[1.25rem] font-semibold leading-[1.18] tracking-[-0.02em] ${textTitleColor}`
              }>
                {project.title}
              </h3>
            </>
          )}
          {!compact && (
            <>
              <p className={`text-[10px] font-medium uppercase tracking-[0.12em] ${textCatColor}`}>
                {project.categories.map((cat) => categoryLabels[cat] ?? cat).join(" / ")}
              </p>
              <p className={featured 
                ? `max-w-2xl text-[14.5px] leading-[1.8] ${textDescColor}`
                : `line-clamp-2 text-[13.5px] leading-[1.75] ${textDescColor}`
              }>
                {project.description}
              </p>
            </>
          )}
        </div>
      </article>
    </Link>
  );
}
