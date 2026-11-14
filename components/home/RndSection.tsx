"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RND_PROJECTS } from "@/data/portfolio";
import type { RndProject } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { mediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Thumbnail — always static image, never autoplay video / iframe    */
/* ------------------------------------------------------------------ */
function Thumbnail({ project, sizes }: { project: RndProject; sizes: string }) {
  const src = project.image;
  const [broken, setBroken] = useState(false);
  const onError = useCallback(() => setBroken(true), []);

  if (broken) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 text-white/20">
        <ImageOff className="h-8 w-8 mb-1" />
        <span className="text-xs tracking-normal">{project.title}</span>
      </div>
    );
  }

  if (src.endsWith(".mp4") || src.endsWith(".webm")) {
    return (
      <video
        src={mediaUrl(src)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        muted
        playsInline
        preload="metadata"
        onError={onError}
      />
    );
  }
  if (src.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        loading="lazy"
        onError={onError}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      sizes={sizes}
      onError={onError}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Link wrapper — external vs internal                                */
/* ------------------------------------------------------------------ */
function CardLink({
  project,
  children,
  className,
  style,
}: {
  project: RndProject;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const isExternal = project.link.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={project.link} className={className} style={style}>
      {children}
    </Link>
  );
}

const ARCHIVE_SLUGS = new Set([
  "historyblends",
  "levelup",
  "Ethereum Bloom",
  "ethereum-bloom",
  "utop-bitexco",
  "smart-menu",
  "utop-events",
  "iPhone 11 Pro Max TVC",
  "Circle and Vellum",
  "project-my",
  "Divecore - Diving Watch Strap",
]);

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export default function RndSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  // Tier 2: Technical VFX, Niagara Systems, Shaders & Pipeline Tooling
  const technicalProjects = useMemo(
    () => RND_PROJECTS.filter((p) => !ARCHIVE_SLUGS.has(p.slug || p.title)),
    []
  );

  // Tier 3: Older Commercial TVCs & Early Product Renders (Collapsed)
  const archiveProjects = useMemo(
    () => RND_PROJECTS.filter((p) => ARCHIVE_SLUGS.has(p.slug || p.title)),
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef as unknown as React.RefObject<HTMLDivElement>} className="relative w-full pt-4 pb-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {technicalProjects.map((project, i) => (
          <CardLink
            key={project.title}
            project={project}
            className={`group block h-full transition-opacity duration-300 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: inView ? `${i * 0.05}s` : "0s" }}
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-section">
                <Thumbnail project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>

              <div className="flex flex-1 flex-col pt-3.5">
                <h3 className="text-base font-normal tracking-tight text-white group-hover:underline underline-offset-4 line-clamp-1">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] font-sans text-muted-foreground">
                  {project.category}
                </p>
              </div>
            </article>
          </CardLink>
        ))}
      </div>

      {archiveProjects.length > 0 && (
        <div className="mt-14 pt-8">
          <button
            type="button"
            onClick={() => setIsArchiveOpen((prev) => !prev)}
            className="inline-flex min-h-11 items-center text-base text-muted-foreground underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {isVi
              ? (isArchiveOpen ? "Thu gọn lưu trữ" : `Xem dự án trước đây (${archiveProjects.length})`)
              : (isArchiveOpen ? "Hide archive" : `Earlier work (${archiveProjects.length})`)}
          </button>

          <AnimatePresence initial={false}>
          {isArchiveOpen && (
            <motion.div
              key="archive"
              initial={{ height: reducedMotion ? "auto" : 0, opacity: reducedMotion ? 1 : 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
            <div className="pt-8 grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
              {archiveProjects.map((project) => (
                <CardLink
                  key={project.title}
                  project={project}
                  className="group block"
                >
                  <article className="flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-section">
                      <Thumbnail project={project} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-[13px] font-normal text-white group-hover:underline underline-offset-4 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="mt-0.5 text-[13px] font-sans text-muted-foreground">
                        {project.year || "Archive"}
                      </p>
                    </div>
                  </article>
                </CardLink>
              ))}
            </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
