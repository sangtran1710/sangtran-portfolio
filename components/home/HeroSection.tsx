"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      className="relative flex min-h-[68svh] items-end overflow-hidden bg-[#050607] pt-[4.5rem] sm:min-h-[72svh]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-tech-art.png"
          alt="Henry Tran Technical VFX"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-70"
        />
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
        <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-base font-medium text-white">
          <Link href="/portfolio" className="inline-flex items-center gap-2 border-b border-white/60 pb-2 transition-colors hover:border-[#7db5b0] hover:text-[#a7d2ce]">
            Selected work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/rnd/erlangmon-vfx" className="inline-flex items-center gap-2 border-b border-white/20 pb-2 text-white/75 transition-colors hover:border-white hover:text-white">
            Technical breakdown
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
