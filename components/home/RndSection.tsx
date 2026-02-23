"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, FlaskConical, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { RND_PROJECTS } from "@/data/portfolio";
import TypewriterTitle from "@/components/animations/TypewriterTitle";

const RND_VIDEO = "/video/RND.mp4";
const LAB_YOUTUBE_ID = "FcIUXgQ4c3s";
const LAB_YOUTUBE_EMBED = `https://www.youtube.com/embed/${LAB_YOUTUBE_ID}?autoplay=1&mute=1&rel=0`;
const LAB_YOUTUBE_THUMB = `https://img.youtube.com/vi/${LAB_YOUTUBE_ID}/maxresdefault.jpg`;

export default function RndSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytIframeRef = useRef<HTMLIFrameElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(true);
  const [ytPlaying, setYtPlaying] = useState(false);

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
      <div className="absolute inset-0 bg-zinc-950/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 pb-16">
        {/* Header gọn — fit first viewport cùng 1 hàng project */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
              <FlaskConical className="h-3.5 w-3.5" />
              Personal Projects
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400/90">
              Selected Experiments
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            <TypewriterTitle
              prefix=""
              words={["R&D", "Commercial Works", "Personal Projects"]}
              run={true}
              reducedMotion={prefersReducedMotion}
              wordClassName="text-white"
              cursorClassName="text-teal-400"
            />
          </h1>
          <p className="text-white/70 mt-1.5 text-sm max-w-2xl leading-snug">
            Personal experiments and commercial works — where I research new software, tools, and techniques.
          </p>
        </header>

        {/* YouTube embed — bấm Play để phát */}
        <div className="mb-10">
          <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/50 shadow-xl transition-all duration-300">
            {/* Thumbnail + nút Play — ẩn khi đang phát */}
            <button
              type="button"
              onClick={() => {
                setYtPlaying(true);
                if (ytIframeRef.current) {
                  ytIframeRef.current.src = LAB_YOUTUBE_EMBED;
                }
              }}
              className={`absolute inset-0 bg-zinc-900 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${ytPlaying ? "opacity-0 pointer-events-none" : ""}`}
              aria-label="Play video"
            >
              <Image
                src={LAB_YOUTUBE_THUMB}
                alt=""
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
                unoptimized
              />
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-xl hover:bg-white hover:scale-110 transition-transform duration-200">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </span>
            </button>
            {/* Iframe: hiện sau khi bấm Play, autoplay muted */}
            <iframe
              ref={ytIframeRef}
              title="YouTube video"
              src=""
              className={`absolute inset-0 w-full h-full ${ytPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="text-center text-xs text-white/50 mt-2">
            Bấm Play để xem ·{" "}
            <a
              href={`https://www.youtube.com/watch?v=${LAB_YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              Mở trên YouTube
            </a>
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RND_PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block flex flex-col transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: inView ? `${i * 0.06}s` : "0s" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900 border border-white/10 group-hover:border-teal-400/50 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="h-3 w-3" />
                  {project.linkLabel ?? "View on Behance"}
                </div>
              </div>

              <div className="mt-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-white/60 mt-0.5 mb-2">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] text-white/50 border border-white/20 rounded-md px-2 py-0.5 bg-white/5 group-hover:border-teal-400/40 transition-colors"
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
    </section>
  );
}
