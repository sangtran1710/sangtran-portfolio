"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { getProjectByline, type Project } from "@/data/portfolio";
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

  const credit = getProjectByline(project);
  const primaryCategory = project.categories?.[0] || "aaa";
  const categoryLabel =
    primaryCategory === "aaa"
      ? "AAA Production"
      : `${primaryCategory.toUpperCase()} Production`;

  const hasPreviewVideo = Boolean(project.previewVideo) && !prefersReducedMotion;

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
        {/* Viewport Frame — Crisp architectural edge + hover motion loop */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-sm border border-border bg-section transition-colors duration-300 group-hover:border-primary",
            featured ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]",
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
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                isHovering && videoReady ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {/* Top-left Index + Live Motion Status HUD */}
          <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
            {indexLabel && (
              <span className="rounded-sm border border-border bg-background/90 px-2 py-0.5 text-[11px] font-mono text-white">
                {indexLabel}
              </span>
            )}
            {hasPreviewVideo && isHovering && (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/90 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-foreground">
                <Play className="h-2.5 w-2.5 fill-current text-primary" />
                Preview
              </span>
            )}
          </div>

          {/* Bottom-right Platform / Engine Spec */}
          {(project.platform || project.engine) && (
            <div className="pointer-events-none absolute bottom-3 right-3 hidden sm:block">
              <span className="rounded-sm border border-border bg-background/90 px-2.5 py-1 text-[11px] font-mono text-foreground">
                {[project.platform, project.engine].filter(Boolean).join(" · ")}
              </span>
            </div>
          )}
        </div>

        {/* Typography & Technical Metadata */}
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-primary">{categoryLabel}</span>
              <span className="text-quiet">/</span>
              <span className="text-muted-foreground">{project.year}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-muted-foreground transition-colors group-hover:text-primary">
              <span>Breakdown</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
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

          {project.techStack && project.techStack.length > 0 && (
            <p className="mt-2 text-xs font-mono text-muted-foreground">
              {project.techStack.slice(0, 4).join(" · ")}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
