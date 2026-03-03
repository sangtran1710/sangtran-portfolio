"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, FlaskConical, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { RND_PROJECTS } from "@/data/portfolio";
import TypewriterTitle from "@/components/animations/TypewriterTitle";
import type { RndProject } from "@/data/portfolio";

const RND_VIDEO = "/video/RND.mp4";

/** Chỉ load iframe khi thẻ vào viewport — giảm tải cho mạng yếu */
function LazyVideoEmbed({ project }: { project: RndProject }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !project.embedUrl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.embedUrl]);

  if (!shouldLoad) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    );
  }
  return (
    <div ref={containerRef} className="absolute inset-0">
      <iframe
        src={project.embedUrl}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        loading="lazy"
        title={project.title}
      />
    </div>
  );
}

export default function RndSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytIframeRef = useRef<HTMLIFrameElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(true);
  const [showLabsIntro, setShowLabsIntro] = useState(false);

  const vfxProjects = useMemo(
    () => RND_PROJECTS.filter((p) => p.group === "vfx"),
    []
  );

  const projectsByYear = useMemo(() => {
    const others = RND_PROJECTS.filter((p) => p.group !== "vfx");
    const grouped = others.reduce((acc, project) => {
      const y = project.year || "Archive";
      if (!acc[y]) acc[y] = [];
      acc[y].push(project);
      return acc;
    }, {} as Record<string, typeof RND_PROJECTS>);
    return grouped;
  }, []);

  const sortedYears = useMemo(() => {
    return Object.keys(projectsByYear).sort((a, b) => {
      if (a === "Archive") return 1;
      if (b === "Archive") return -1;
      return Number(b) - Number(a);
    });
  }, [projectsByYear]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setVideoReady(false);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  // One-time welcome popup for Labs page (manual close only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem("labs-welcome-dismissed");
    if (dismissed) return;
    setShowLabsIntro(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rnd"
      className="relative w-full overflow-hidden"
    >
      {/* Video background — full width */}
      {videoReady && (
        <video
          ref={videoRef}
          src={RND_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 pb-16">
        {showLabsIntro && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-teal-400/50 bg-zinc-900/95 p-7 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-teal-300 mb-2.5">
                    Labs · VFX / 3D / Tech
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Experimental VFX, 3D animation & techniques
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowLabsIntro(false);
                    if (typeof window !== "undefined") {
                      window.localStorage.setItem("labs-welcome-dismissed", "1");
                    }
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label="Close labs info"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm sm:text-[15px] text-zinc-200 leading-relaxed">
                Labs is a playground for test pieces: VFX studies, 3D animation and tech experiments (AI, engines,
                shaders). Clips here can be heavier than the main portfolio, so a stable connection is recommended
                while videos stream in.
              </p>
            </div>
          </div>
        )}

        {/* Compact header — fits first viewport alongside 1 row of projects */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
              <FlaskConical className="h-3.5 w-3.5" />
              Case Studies
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-500">
              Selected Experiments
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-2">
            <TypewriterTitle
              prefix=""
              words={["CASE STUDIES", "COMMERCIAL WORKS", "PERSONAL PROJECTS"]}
              run={true}
              reducedMotion={prefersReducedMotion}
              wordClassName="text-white"
              cursorClassName="text-teal-500"
            />
          </h1>
          <p className="text-slate-400 mt-1.5 text-[15px] sm:text-base max-w-2xl leading-relaxed">
            Personal experiments and commercial works — where I research new software, tools, and techniques.
          </p>
        </header>

        <div className="space-y-16">
          {/* VFX group — for HR / recruiters */}
          {vfxProjects.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-widest">VFX</h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {vfxProjects.map((project, i) => (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block flex flex-col transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: inView ? `${i * 0.05}s` : "0s" }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900 border border-white/10 group-hover:border-teal-500/50 group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-300">
                      {project.embedUrl ? (
                        <LazyVideoEmbed project={project} />
                      ) : project.image.endsWith(".mp4") || project.image.endsWith(".webm") ? (
                        <video
                          src={project.image}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
                        <Sparkles className="h-3 w-3 text-teal-400" />
                        {project.linkLabel ?? "View on Behance"}
                      </div>
                    </div>
                    <div className="mt-4 flex-1 flex flex-col px-1">
                      <h3 className="font-semibold text-[15px] sm:text-base text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1 mb-3">{project.category}</p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] text-teal-300 bg-teal-500/10 border border-teal-500/20 rounded-md px-2 py-0.5 group-hover:bg-teal-500/20 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {sortedYears.map((year, yearIndex) => (
            <div key={year} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-widest">{year}</h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projectsByYear[year].map((project, i) => (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block flex flex-col transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    style={{ transitionDelay: inView ? `${yearIndex * 0.1 + i * 0.05}s` : "0s" }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900 border border-white/10 group-hover:border-teal-500/50 group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-300">
                      {project.embedUrl ? (
                        <LazyVideoEmbed project={project} />
                      ) : project.image.endsWith('.mp4') || project.image.endsWith('.webm') ? (
                        <video
                          src={project.image}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
                        <Sparkles className="h-3 w-3 text-teal-400" />
                        {project.linkLabel ?? "View on Behance"}
                      </div>
                    </div>

                    <div className="mt-4 flex-1 flex flex-col px-1">
                      <h3 className="font-semibold text-[15px] sm:text-base text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1 mb-3">
                        {project.category}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] text-teal-300 bg-teal-500/10 border border-teal-500/20 rounded-md px-2 py-0.5 group-hover:bg-teal-500/20 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
