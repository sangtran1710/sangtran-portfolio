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
import MagneticButton from "@/components/ui/MagneticButton";

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
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 pt-14"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/50 to-zinc-950" />
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40 will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
        />
      )}
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950/80" />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(20,184,166,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Interactive particle network */}
      <ParticleCanvas
        className="z-[1]"
        particleCount={70}
        color="20, 184, 166"
        maxDistance={140}
        mouseRadius={180}
        speed={0.3}
      />

      {/* Main content */}
      <motion.div
        className="relative z-[2] text-center px-6 max-w-4xl mx-auto"
        style={
          !prefersReducedMotion
            ? { opacity: titleOpacity, y: titleY }
            : undefined
        }
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-4 py-1.5 mb-6"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span className="text-xs font-medium tracking-wider text-teal-300 uppercase">
            Available for Work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {HERO.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl font-light text-white/70 tracking-wide mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          {HERO.tagline}
        </motion.p>

        {/* Animated divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400/60"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          />
          <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          <motion.div
            className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400/60"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Một dòng; video + CTA là chính */}
        <motion.p
          className="text-sm text-white/50 max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          {HERO.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
        >
          <MagneticButton
            href="/showreel"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors duration-300 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/20"
          >
            <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
            Watch Showreel
          </MagneticButton>
          <MagneticButton
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition-colors duration-300 hover:bg-white/10 hover:border-white/25 backdrop-blur-sm"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom stats strip */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-8 sm:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={!prefersReducedMotion ? { opacity: chevronOpacity } : undefined}
      >
        {[
          { value: "7+", label: "Years" },
          { value: "15+", label: "Projects" },
          { value: "AAA", label: "Titles" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
          >
            <span className="block text-lg sm:text-xl font-bold text-teal-400">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#profile"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors z-[2]"
        aria-label="Scroll to profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        style={!prefersReducedMotion ? { opacity: chevronOpacity } : undefined}
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
