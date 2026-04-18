"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
  featured?: boolean;
}

export default function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const { copy } = useLanguage();
  const categoryLabels: Record<string, string> = {
    aaa: copy.categories.aaa,
    realtime: copy.categories.realtime,
    cinematic: copy.categories.cinematic,
    igaming: copy.categories.igaming,
  };

  return (
    <Link href={project.link || `/projects/${project.slug}`} className="group/card block h-full">
      <article className="h-full overflow-hidden rounded-[1.6rem] border border-stone-200/90 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.045)] transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:border-stone-300 group-hover/card:shadow-[0_18px_38px_rgba(15,23,42,0.075)]">
        <div className={featured ? "relative aspect-[16/10] overflow-hidden bg-stone-100 lg:aspect-[16/8.4]" : "relative aspect-[16/10] overflow-hidden bg-stone-100"}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 56rem"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>

        <div className={featured ? "space-y-3 px-6 py-6 sm:px-7" : compact ? "space-y-2 px-5 py-4" : "space-y-2 px-5 py-5"}>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#4f8e89]">
            {project.role} / {project.year}
          </p>
          <h3 className={featured ? "max-w-2xl text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-[2rem]" : "text-[1.25rem] font-semibold leading-[1.18] tracking-[-0.02em] text-slate-900"}>
            {project.title}
          </h3>
          {!compact && (
            <>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                {project.categories.map((cat) => categoryLabels[cat] ?? cat).join(" / ")}
              </p>
              <p className={featured ? "max-w-2xl text-[14.5px] leading-[1.8] text-slate-600" : "line-clamp-2 text-[13.5px] leading-[1.75] text-slate-600"}>
                {project.description}
              </p>
            </>
          )}
        </div>
      </article>
    </Link>
  );
}
