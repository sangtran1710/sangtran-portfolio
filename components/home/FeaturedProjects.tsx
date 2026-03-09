"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, FEATURED_PROJECTS } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
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

  // Parallax on background video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-[50vh] overflow-hidden bg-zinc-950"
    >
      {/* Subtle video background */}
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-zinc-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-24 lg:py-32">

        {/* Header */}
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
              className="section-title text-white"
              offset={["start 0.95", "start 0.65"]}
            />
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors group/link"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured grid — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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

        {/* Mobile — view all link */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
