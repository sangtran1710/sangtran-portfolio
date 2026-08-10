"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedHero } from "@/lib/portfolio-content";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const hero = getLocalizedHero(locale);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -28]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#050607] pt-[4.5rem]"
    >
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <div className="h-full w-full bg-[#0b0e12]" />
        ) : (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/optimized/hero-reel-poster.jpg"
            aria-label="Henry Tran technical art showreel preview"
          >
            <source media="(max-width: 767px)" src="/video/hero-reel-mobile.mp4" type="video/mp4" />
            <source src="/video/hero-reel-desktop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.88)_0%,rgba(5,6,7,0.42)_48%,rgba(5,6,7,0.1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(5,6,7,0.95)_0%,rgba(5,6,7,0)_100%)]" />

      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      >
        <p className="text-base font-normal text-white/75">{hero.tagline}</p>
        <h1 className="mt-3 max-w-4xl font-kanit text-5xl font-normal leading-none text-white sm:text-[4rem] lg:text-[5rem]">
          {hero.name}
        </h1>
        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 text-base font-medium text-white">
          <Link href="/showreel" className="inline-flex items-center gap-2 border-b border-white/60 pb-2 transition-colors hover:border-[#7db5b0] hover:text-[#a7d2ce]">
            <Play className="h-3.5 w-3.5 fill-current" />
            Showreel
          </Link>
          <Link href="/portfolio" className="inline-flex items-center gap-2 border-b border-white/20 pb-2 text-white/75 transition-colors hover:border-white hover:text-white">
            Work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
