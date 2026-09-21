"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { ArrowUpRight, ChevronDown, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RND_PROJECTS } from "@/data/portfolio";
import type { RndProject } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800/80 text-white/20">
        <ImageOff className="h-8 w-8 mb-1" />
        <span className="text-[10px] uppercase tracking-wider">{project.title}</span>
      </div>
    );
  }

  if (src.endsWith(".mp4") || src.endsWith(".webm")) {
    return (
      <video
        src={src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      {/* ── Tier 2: Technical VFX & Pipeline R&D ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {technicalProjects.map((project, i) => (
          <CardLink
            key={project.title}
            project={project}
            className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-all duration-500 hover:border-teal-500/40 hover:bg-zinc-900/90
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: inView ? `${i * 0.05}s` : "0s" }}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              <Thumbnail project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#7db5b0] mb-1">
                {project.category}
              </p>
              <h3 className="text-base font-semibold text-white group-hover:text-[#a7d2ce] transition-colors line-clamp-1">
                {project.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </CardLink>
        ))}
      </div>

      {/* ── Tier 3: Older Commercial Work & Archive (Collapsed Accordion) ── */}
      {archiveProjects.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#7db5b0] mb-2.5">
                {isVi ? "Dự án trước đây — Motion / CG / Film" : "Earlier work — Motion / CG / Film"}
              </p>
              <button
                type="button"
                onClick={() => setIsArchiveOpen((prev) => !prev)}
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
              >
                <span>
                  {isVi
                    ? (isArchiveOpen ? "Thu gọn lưu trữ" : "Xem lưu trữ →")
                    : (isArchiveOpen ? "Hide archive" : "View archive →")}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
                  {archiveProjects.length}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/50 transition-transform duration-300",
                    isArchiveOpen && "rotate-180 text-white"
                  )}
                />
              </button>
            </div>
            <p className="text-xs text-white/40 max-w-md">
              {isVi
                ? "Dự án thử nghiệm AI, môi trường 3D crypto và video thương mại thời kỳ đầu."
                : "AI filmmaking experiments, crypto 3D environments, and earlier commercial TVCs."}
            </p>
          </div>

          {isArchiveOpen && (
            <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-300">
              {archiveProjects.map((project) => (
                <CardLink
                  key={project.title}
                  project={project}
                  className="group relative block overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 transition-all hover:border-white/20"
                >
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                    <Thumbnail project={project} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[9px] font-mono text-white/50 mb-0.5">{project.year || "Archive"}</p>
                      <h4 className="text-xs font-medium text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                </CardLink>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
