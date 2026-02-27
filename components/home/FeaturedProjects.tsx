"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, AAA_PROJECTS, OTHER_PROJECTS } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { useViewProjectCursor } from "@/components/cursor/ViewProjectCursorContext";

const CATEGORY_LABELS: Record<string, string> = {
  aaa: "AAA",
  realtime: "Real-time",
  cinematic: "Cinematic",
  igaming: "iGaming",
};

function ProjectCard({
  slug,
  thumbnail,
  title,
  role,
  year,
  duration,
  platform,
  style,
  categories,
  prefersReducedMotion,
}: {
  slug: string;
  thumbnail: string;
  title: string;
  role: string;
  year: string;
  duration?: string;
  platform?: string;
  style?: "stylized" | "realistic";
  categories: string[];
  prefersReducedMotion: boolean | null;
}) {
  const setOverProjectCard = useViewProjectCursor()?.setOverProjectCard ?? (() => { });

  return (
    <div
      onMouseEnter={() => setOverProjectCard(true)}
      onMouseLeave={() => setOverProjectCard(false)}
    >
      <Link
        href={`/projects/${slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200/70 hover:shadow-md hover:border-teal-300/50 hover:shadow-slate-200/80 transition-all duration-300"
      >
        <div className="flex flex-col">
          <div className="relative w-full aspect-[16/10] flex-shrink-0 overflow-hidden rounded-t-2xl border-b border-slate-200/70 bg-slate-100">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end pointer-events-none">
              {categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/50 px-2 py-0.5 text-[10px] font-medium text-slate-800"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col p-4 sm:p-5 flex-1">
            <h3 className="font-semibold text-[15px] sm:text-base text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-500 mt-1.5">
              {role} · {duration ?? year}
            </p>
            {(platform || style) && (
              <p className="text-xs text-slate-400 mt-1">
                {[platform, style && style.charAt(0).toUpperCase() + style.slice(1)]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setHasVideo(false);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  // Background video parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-[50vh] overflow-hidden bg-slate-50"
    >
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-5 will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-slate-50/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/95" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 py-24 lg:py-32">
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <TextReveal
              text="Work"
              as="h2"
              className="section-title text-slate-900"
              offset={["start 0.95", "start 0.65"]}
            />
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors group/link"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mb-14">
          <motion.h3
            className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            AAA
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AAA_PROJECTS.map((project, i) => (
              <ScrollReveal
                key={project.slug}
                variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
                offset={["start 0.95", "start 0.7"]}
              >
                <ProjectCard
                  slug={project.slug}
                  thumbnail={project.thumbnail}
                  title={project.title}
                  role={project.role}
                  year={project.year}
                  duration={project.duration}
                  platform={project.platform}
                  style={project.style}
                  categories={project.categories}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Others */}
        <div>
          <motion.h3
            className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Others
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_PROJECTS.map((project, i) => (
              <ScrollReveal
                key={project.slug}
                variant={i % 2 === 0 ? "slideRight" : "slideLeft"}
                offset={["start 0.95", "start 0.7"]}
              >
                <ProjectCard
                  slug={project.slug}
                  thumbnail={project.thumbnail}
                  title={project.title}
                  role={project.role}
                  year={project.year}
                  duration={project.duration}
                  platform={project.platform}
                  style={project.style}
                  categories={project.categories}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
