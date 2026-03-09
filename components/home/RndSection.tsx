"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { ArrowUpRight, Gamepad2, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RND_PROJECTS } from "@/data/portfolio";
import type { RndProject } from "@/data/portfolio";

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

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export default function RndSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const igamingProjects = useMemo(
    () => RND_PROJECTS.filter((p) => p.group === "igaming"),
    []
  );
  const vfxProjects = useMemo(
    () => RND_PROJECTS.filter((p) => p.group === "vfx"),
    []
  );
  const recentProjects = useMemo(
    () => RND_PROJECTS.filter((p) => !p.group && Number(p.year) >= 2025),
    []
  );
  const archiveProjects = useMemo(
    () => RND_PROJECTS.filter((p) => !p.group && (Number(p.year) <= 2024 || !p.year)),
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
    <section ref={sectionRef} id="rnd" className="relative w-full">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 pb-20">
        <div className="space-y-14">

          {/* ── iGAMING ── */}
          {igamingProjects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <Gamepad2 className="h-5 w-5 text-yellow-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">
                  iGaming
                </h2>
                <span className="text-[10px] text-yellow-400/50 uppercase tracking-widest font-medium">
                  Playable Demo
                </span>
                <div className="h-px flex-1 bg-yellow-500/10" />
              </div>
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                {igamingProjects.map((project, i) => (
                  <CardLink
                    key={project.title}
                    project={project}
                    className={`group relative block overflow-hidden transition-all duration-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: inView ? `${i * 0.08}s` : "0s" }}
                  >
                    <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden rounded-xl md:rounded-2xl">
                      <Thumbnail project={project} sizes="(max-width: 640px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-yellow-500/20 backdrop-blur-sm text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-yellow-400">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-yellow-300 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {project.tools.map((tool) => (
                            <span key={tool} className="text-[10px] text-yellow-200/70 bg-yellow-500/10 px-1.5 py-0.5">
                              {tool}
                            </span>
                          ))}
                        </div>
                        {project.linkLabel && (
                          <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-medium text-yellow-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Gamepad2 className="h-3 w-3" />
                            {project.linkLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>
          )}

          {/* ── VFX ── */}
          {vfxProjects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">VFX</h2>
                <div className="h-px flex-1 bg-white/8" />
              </div>
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {vfxProjects.map((project, i) => (
                  <CardLink
                    key={project.title}
                    project={project}
                    className={`group relative block overflow-hidden transition-all duration-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: inView ? `${i * 0.06}s` : "0s" }}
                  >
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden rounded-xl md:rounded-2xl">
                      <Thumbnail project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                      <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-[9px] font-medium uppercase tracking-widest text-teal-400/80 mb-0.5">{project.category}</p>
                        <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-teal-300 transition-colors line-clamp-1">{project.title}</h3>
                      </div>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>
          )}

          {/* ── RECENT (2025–2026) ── */}
          {recentProjects.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">Recent</h2>
                <span className="text-[10px] text-white/25 uppercase tracking-widest font-medium">2025 — 2026</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentProjects.map((project, i) => (
                  <CardLink
                    key={project.title}
                    project={project}
                    className={`group relative block overflow-hidden transition-all duration-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: inView ? `${i * 0.06}s` : "0s" }}
                  >
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden rounded-xl md:rounded-2xl">
                      <Thumbnail project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                      <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400 mb-0.5">{project.category}</p>
                        <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-teal-300 transition-colors line-clamp-1">{project.title}</h3>
                      </div>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>
          )}

          {/* ── ARCHIVE (2020–2024) ── */}
          {archiveProjects.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest">Archive</h2>
                <span className="text-[10px] text-white/20 uppercase tracking-widest">2020 — 2024</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {archiveProjects.map((project, i) => (
                  <CardLink
                    key={project.title}
                    project={project}
                    className={`group relative block overflow-hidden transition-all duration-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: inView ? `${i * 0.04}s` : "0s" }}
                  >
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden rounded-lg md:rounded-xl">
                      <Thumbnail project={project} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-[8px] font-medium uppercase tracking-widest text-white/30 mb-0.5">{project.year}</p>
                        <h3 className="text-[11px] sm:text-xs font-medium text-white/70 leading-tight group-hover:text-white transition-colors line-clamp-1">{project.title}</h3>
                      </div>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </section>
  );
}
