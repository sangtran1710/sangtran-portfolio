"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HERO } from "@/data/portfolio";
import { ChevronDown, Play, ArrowRight } from "lucide-react";
import ParticleCanvas from "@/components/animations/ParticleCanvas";
import TypewriterTitle from "@/components/animations/TypewriterTitle";

export default function HeroSection() {
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
    offset: ["start start", "end start"],
  });

  const videoBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-zinc-950 pt-24"
    >
      {/* Background Video */}
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/reel_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.35] will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
        />
      )}

      {/* Cinematic Overlays */}
      {/* Heavy gradient from the left to Ensure Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
      {/* Top and Bottom soft fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Interactive particle network */}
      <ParticleCanvas
        className="z-[1]"
        particleCount={40}
        color="20, 184, 166"
        maxDistance={150}
        mouseRadius={200}
        speed={0.15}
      />

      {/* Main Asymmetrical Content */}
      <div className="relative z-[2] w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

          {/* Left Column: Massive Typography */}
          <motion.div
            style={!prefersReducedMotion ? { opacity: contentOpacity, y: contentY } : undefined}
            className="flex flex-col items-start"
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-teal-400 uppercase">
                Available for Roles
              </span>
            </motion.div>

            {/* Massive Name */}
            <motion.h1
              className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] xl:text-[9rem] font-black tracking-tighter leading-[0.85] text-white flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span>{HERO.name.split(" ")[0].toUpperCase()}</span>
              <span className="text-zinc-500">{HERO.name.split(" ")[1]?.toUpperCase() ?? ""}</span>
            </motion.h1>

            {/* Dynamic Tagline */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <div className="h-px w-8 bg-teal-500" />
              <div className="text-lg sm:text-xl lg:text-2xl font-light tracking-wide text-zinc-300">
                <TypewriterTitle
                  prefix=""
                  words={["Real-time VFX Artist", "Technical Artist", "AAA & iGaming"]}
                  run={true}
                  reducedMotion={prefersReducedMotion}
                  wordClassName="text-white"
                  cursorClassName="text-teal-500"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-6 text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {HERO.description}
            </motion.p>

            {/* CTA Buttons - High End Style */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href="/showreel"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-none border border-teal-500/30 bg-teal-500/10 px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase text-white transition-all hover:bg-teal-500 hover:text-zinc-950"
              >
                <div className="absolute inset-0 -z-10 bg-teal-500 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
                <Play className="h-3 w-3 fill-current" />
                Play Showreel
              </Link>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-white transition-colors"
              >
                <span className="relative">
                  View Projects
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Grid Stats */}
          <motion.div
            className="hidden lg:flex flex-col items-end gap-16 justify-center"
            style={!prefersReducedMotion ? { opacity: contentOpacity, y: contentY } : undefined}
          >
            {[
              { value: "7+", label: "Years Experience" },
              { value: "15+", label: "Shipped Projects" },
              { value: "AAA", label: "Studio Standard" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-right border-r-2 border-teal-500/30 pr-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <span className="block text-4xl xl:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Stats (Only visible on small screens) */}
      <motion.div
        className="absolute bottom-24 left-6 right-6 flex lg:hidden items-center justify-between border-t border-white/10 pt-6 z-[2]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={!prefersReducedMotion ? { opacity: chevronOpacity } : undefined}
      >
        {[
          { value: "7+", label: "Years" },
          { value: "15+", label: "Projects" },
          { value: "AAA", label: "Standard" },
        ].map((stat) => (
          <div key={stat.label} className="text-left">
            <span className="block text-xl font-bold text-white mb-1">{stat.value}</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#profile"
        className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors z-[2]"
        aria-label="Scroll to profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={!prefersReducedMotion ? { opacity: chevronOpacity } : undefined}
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3 w-3" />
        </motion.span>
        Scroll Down
      </motion.a>
    </section>
  );
}
