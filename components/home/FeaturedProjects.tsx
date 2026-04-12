"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS, HERO } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProjectCard from "@/components/projects/ProjectCard";

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoBgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-[#0b1118]">
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.02] will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-[#0b1118]/94" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-[#0b1118]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:py-28">
        <motion.div
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-300">
              Showcase
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Selected work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          A quick read on the strongest shipped projects before the deeper
          profile and process sections.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              offset={["start 0.95", "start 0.7"]}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
