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
      className="relative flex min-h-[74svh] w-full items-center overflow-hidden bg-[#06090d] pt-20 lg:min-h-[78svh]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,8,1)_0%,rgba(6,9,13,0.98)_42%,rgba(12,18,24,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,18,0.82)_0%,rgba(9,13,18,0.18)_42%,rgba(9,13,18,0.95)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <ParticleCanvas
        className="z-[1] opacity-45"
        particleCount={10}
        color="92, 157, 152"
        maxDistance={120}
        mouseRadius={140}
        speed={0.08}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-7xl flex-col justify-center px-6 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] lg:gap-14">
          <motion.div
            style={!shouldReduceMotion ? { opacity: contentOpacity, y: contentY } : undefined}
            className="max-w-[34rem] lg:pl-2"
          >
            <motion.h1
              className="max-w-xl text-[4rem] font-black leading-[0.84] tracking-[-0.06em] text-white sm:text-[4.8rem] lg:text-[5.6rem]"
              {...motionIfAllowed({
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.58,
                  delay: 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              })}
            >
              SANG
              <br />
              <span className="text-white/82">TRAN</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-[1.34rem] leading-[1.5] text-white sm:text-[1.5rem]"
              {...motionIfAllowed({
                initial: { opacity: 0, y: 18 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.18, duration: 0.48, ease: "easeOut" },
              })}
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              {...motionIfAllowed({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.36, duration: 0.45, ease: "easeOut" },
              })}
            >
              <Link
                href="/showreel"
                className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#7ab0ab]/35 bg-[#5c9d98] px-6 py-3 text-sm font-semibold leading-none text-white shadow-[0_12px_30px_rgba(92,157,152,0.18)] transition-all hover:scale-[1.01] hover:bg-[#538f8a]"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Showreel
              </Link>

              <Link
                href="/portfolio"
                className="group inline-flex min-w-[8.6rem] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/16 bg-white/[0.04] px-6 py-3 text-sm font-medium leading-none text-white transition-all hover:border-white/24 hover:bg-white/[0.07]"
              >
                Portfolio
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden w-full justify-self-end lg:block"
            {...motionIfAllowed({
              initial: { opacity: 0, x: 26 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.22, duration: 0.58, ease: "easeOut" },
            })}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/12 bg-[#111820] shadow-[0_34px_90px_rgba(0,0,0,0.48)]">
              {shouldReduceMotion ? (
                <Image
                  src="/images/reel_poster.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 700px, 0px"
                  className="object-cover object-center"
                  aria-hidden
                />
              ) : (
                <video
                  className="h-full w-full object-cover object-center"
                  src={hero.showreelUrl}
                  poster="/images/reel_poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Sang Tran technical art showreel preview"
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.24)_0%,rgba(5,8,12,0)_42%),linear-gradient(180deg,rgba(5,8,12,0.02)_48%,rgba(5,8,12,0.52)_100%)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
