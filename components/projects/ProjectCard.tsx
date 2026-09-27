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

export default function ProjectCard({
  project,
  priority = false,
  featured = false,
  supporting = false,
  className,
}: ProjectCardProps) {
  const credit = project.client ? `${project.role} · ${project.client}` : project.role;

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
              featured ? "aspect-[16/9]" : "aspect-[16/9.5]"
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

          </div>
        </article>
      </SpotlightCard>
    </Link>
  );
}
