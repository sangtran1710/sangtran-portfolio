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
  const isVi = locale === "vi";
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
      className="relative flex min-h-[70svh] items-end overflow-hidden bg-[#1c212c] pt-[4.5rem] sm:min-h-[74svh]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-wolverine-night-assault.webp"
          alt="Marvel's Wolverine Real-Time VFX by Henry Tran"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%] opacity-90 brightness-105"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,33,44,0.92)_0%,rgba(28,33,44,0.55)_45%,rgba(28,33,44,0.15)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(28,33,44,0.98)_0%,rgba(28,33,44,0)_100%)]" />

      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-[#5eb3ab]">
            {isVi ? "Kỹ nghệ Kỹ xảo Real-Time & Pipeline" : "Senior Technical VFX Artist"}
          </p>
          <h1 className="mt-3 font-kanit text-5xl font-normal leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {hero.description}
          </p>
          <p className="mt-2 text-xs font-mono text-slate-400">
            {isVi
              ? "Dự án: Marvel's Wolverine · Spider-Man 2 · Fortnite"
              : "Shipped: Marvel's Wolverine · Marvel's Spider-Man 2 · Fortnite"}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border-b-2 border-[#5eb3ab] pb-1 text-white transition-colors hover:text-[#5eb3ab]"
            >
              {isVi ? "Xem dự án" : "Selected work"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/rnd/erlangmon-vfx"
              prefetch={true}
              onMouseEnter={() => {
                if (typeof window !== "undefined") {
                  const img1 = new window.Image();
                  img1.src = "/projects/erlangmon-vfx/poster.webp";
                  const img2 = new window.Image();
                  img2.src = "/projects/erlangmon-vfx/cel-shading.webp";
                }
              }}
              className="inline-flex items-center gap-2 border-b border-slate-500 pb-1 text-slate-300 transition-colors hover:border-white hover:text-white"
            >
              {isVi ? "Phân tích kỹ thuật" : "Technical breakdown"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
