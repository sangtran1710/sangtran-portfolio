"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { getProjectByline, type Project } from "@/data/portfolio";
import { useCanHover } from "@/lib/use-media";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  featured?: boolean;
  supporting?: boolean;
  indexLabel?: string;
  className?: string;
}

export default function ProjectCard({
  project,
  priority = false,
  featured = false,
  indexLabel,
  className,
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();

  const credit = getProjectByline(project);
  const primaryCategory = project.categories?.[0] || "aaa";
  const categoryLabel =
    primaryCategory === "aaa"
      ? "AAA Production"
      : `${primaryCategory.toUpperCase()} Production`;

  // Only enable preview videos on Desktop devices with fine pointer and hover support
  const hasPreviewVideo = Boolean(project.previewVideo) && !prefersReducedMotion && canHover;

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hasPreviewVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link
      href={project.link || `/projects/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className={cn("group block h-full", className)}
    >
      <article className="flex h-full flex-col">
        {/* Viewport Frame — Tactile Framer lift + hover motion loop */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl border border-border/80 bg-section transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-primary/50 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_28px_rgba(88,207,200,0.1)] group-active:scale-[0.99]",
            featured ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
              isHovering && videoReady && hasPreviewVideo ? "opacity-0" : "opacity-100"
            )}
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 1200px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />

          {hasPreviewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              onCanPlay={() => setVideoReady(true)}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                isHovering && videoReady ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {project.mobyGamesUrl && (
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wide text-primary border border-primary/40 backdrop-blur-md">
                MobyGames Credit
              </span>
            </div>
          )}
        </div>

        {/* Typography & Technical Metadata */}
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-2.5 flex-wrap text-xs font-mono">
            <span className="rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wider text-primary border border-primary/20 uppercase">
              {categoryLabel}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
            {project.mobyGamesUrl && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#4bb8ff] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4bb8ff]" />
                MobyGames
              </span>
            )}
          </div>

          <h3
            className={cn(
              "mt-1.5 font-kanit font-normal tracking-tight text-white transition-colors duration-200 group-hover:text-primary",
              featured ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
            )}
          >
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-normal text-foreground">
            {credit}
          </p>
        </div>
      </article>
    </Link>
  );
}
