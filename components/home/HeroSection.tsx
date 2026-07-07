"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import ParticleCanvas from "@/components/animations/ParticleCanvas";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedHero } from "@/lib/portfolio-content";
import {
  siPlaystation,
  siEpicgames,
  siSony,
  siNetflix,
  siUnrealengine,
} from "simple-icons";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const hero = getLocalizedHero(locale);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion === true;

  const motionIfAllowed = <T extends object>(props: T): T | { initial: false } =>
    shouldReduceMotion ? { initial: false } : props;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#06090d] pt-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {shouldReduceMotion ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#06090d] to-[#0a1018]" />
        ) : (
          <video
            className="h-full w-full object-cover object-center pointer-events-none"
            src={hero.showreelUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Henry Tran technical art showreel preview"
          />
        )}
      </div>

      {/* Dark Overlay Gradients */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#070a0f] z-[1]" />
      <div
        className="absolute inset-0 opacity-[0.012] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <ParticleCanvas
        className="z-[2] opacity-60 pointer-events-none"
        particleCount={55}
        color="92, 157, 152"
        maxDistance={140}
        mouseRadius={180}
        speed={0.25}
      />

      <div className="relative z-[3] mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 lg:px-12 min-h-[78svh] text-center">
        <motion.div
          style={!shouldReduceMotion ? { opacity: contentOpacity, y: contentY } : undefined}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Subtitle / Role kicker */}
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5c9d98] mb-4"
            {...motionIfAllowed({
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05, duration: 0.48 }
            })}
          >
            Technical Art / Real-time VFX
          </motion.p>

          {/* Huge centered Name */}
          <motion.h1
            className="text-[4.5rem] font-black leading-[0.85] tracking-[-0.05em] text-white sm:text-[6.5rem] lg:text-[7.5rem] uppercase"
            {...motionIfAllowed({
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: {
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            })}
          >
            Henry Tran
          </motion.h1>

          {/* Bio tagline */}
          <motion.p
            className="mt-6 max-w-2xl text-[1.1rem] leading-[1.6] text-stone-300 sm:text-[1.25rem]"
            {...motionIfAllowed({
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.48, ease: "easeOut" },
            })}
          >
            {hero.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            {...motionIfAllowed({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.36, duration: 0.45, ease: "easeOut" },
            })}
          >
            <Link
              href="/showreel"
              className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#7ab0ab]/35 bg-[#5c9d98] px-8 py-3.5 text-sm font-semibold leading-none text-white shadow-[0_12px_30px_rgba(92,157,152,0.18)] transition-all hover:scale-[1.01] hover:bg-[#538f8a]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Showreel
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex min-w-[8.6rem] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/16 bg-white/[0.04] px-8 py-3.5 text-sm font-medium leading-none text-white transition-all hover:border-white/24 hover:bg-white/[0.07]"
            >
              View Work
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Brand logos under buttons */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-5"
            {...motionIfAllowed({
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.48, duration: 0.5, ease: "easeOut" }
            })}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#5c9d98]/75">
              {locale === "vi" ? "Đã tham gia các dự án của" : "Worked on projects for"}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {[
                { name: "PlayStation", path: siPlaystation.path, scale: 1.15 },
                { name: "Epic Games", path: siEpicgames.path, scale: 1.0 },
                { name: "Sony", path: siSony.path, scale: 2.2 },
                { name: "Netflix", path: siNetflix.path, scale: 0.95 },
                { name: "Unreal Engine", path: siUnrealengine.path, scale: 1.2 },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 opacity-25 text-white transition-all duration-300 hover:opacity-90 hover:text-[#5c9d98]"
                    style={{
                      transform: `scale(${brand.scale})`,
                    }}
                    aria-label={brand.name}
                  >
                    <path d={brand.path} />
                  </svg>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-[#5c9d98] rounded-full"
              animate={{ 
                y: [0, 14, 0],
                opacity: [1, 0.2, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
