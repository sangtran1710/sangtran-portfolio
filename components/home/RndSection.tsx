"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, FlaskConical, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { RND_PROJECTS } from "@/data/portfolio";
import TypewriterTitle from "@/components/animations/TypewriterTitle";

const RND_VIDEO = "/video/RND.mp4";

export default function RndSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytIframeRef = useRef<HTMLIFrameElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(true);

  const projectsByYear = useMemo(() => {
    const grouped = RND_PROJECTS.reduce((acc, project) => {
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
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-slate-50/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/90" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 pb-16">
        {/* Compact header — fits first viewport alongside 1 row of projects */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <FlaskConical className="h-3.5 w-3.5" />
              Case Studies
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              Selected Experiments
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-[0.1em] text-slate-900 mb-2">
            <TypewriterTitle
              prefix=""
              words={["CASE STUDIES", "COMMERCIAL WORKS", "PERSONAL PROJECTS"]}
              run={true}
              reducedMotion={prefersReducedMotion}
              wordClassName="text-slate-900"
              cursorClassName="text-teal-600"
            />
          </h1>
          <p className="text-slate-600 mt-1.5 text-[15px] sm:text-base max-w-2xl leading-relaxed">
            Personal experiments and commercial works — where I research new software, tools, and techniques.
          </p>
        </header>

        <div className="space-y-16">
          {sortedYears.map((year, yearIndex) => (
            <div key={year} className="space-y-6">
              {/* Year Header Divider */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase tracking-widest">{year}</h2>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Projects Grid for this Year */}
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
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/70 group-hover:border-teal-300/50 group-hover:shadow-md group-hover:shadow-slate-200/80 transition-all duration-300">
                      {project.image.endsWith('.mp4') || project.image.endsWith('.webm') ? (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm border border-slate-200/50">
                        <Sparkles className="h-3 w-3 text-teal-600" />
                        {project.linkLabel ?? "View on Behance"}
                      </div>
                    </div>

                    <div className="mt-4 flex-1 flex flex-col px-1">
                      <h3 className="font-semibold text-[15px] sm:text-base text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 mb-3">
                        {project.category}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] text-teal-700 bg-teal-50 border border-teal-100 rounded-md px-2 py-0.5 group-hover:bg-teal-100 transition-colors"
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
