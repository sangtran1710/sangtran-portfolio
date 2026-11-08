"use client";

import { useRef, useState } from "react";
import ProjectThumbnail from "./ProjectThumbnail";
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
            "relative w-full overflow-hidden rounded-xl border border-border/80 bg-section transition-all duration-500 ease-out group-hover:border-primary/50 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_28px_rgba(88,207,200,0.1)] group-active:scale-[0.99]",
            featured ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          <ProjectThumbnail
            src={project.thumbnail}
            alt={project.title}
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
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

        </div>


        {/* Typography & Technical Metadata */}
        <div className="flex flex-1 flex-col pt-4">
          <p className="text-sm text-muted-foreground">{project.year}</p>

          <h3
            className={cn(
              "mt-1.5 font-sans font-normal tracking-tight text-white transition-colors duration-200 group-hover:text-primary",
              featured ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
            )}
          >
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-normal text-foreground [text-wrap:pretty]">
            {credit}
          </p>
        </div>
      </article>
    </Link>
  );
}
