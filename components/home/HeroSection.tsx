"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import ParticleCanvas from "@/components/animations/ParticleCanvas";
import { HERO } from "@/data/portfolio";

const HERO_STATS = [
  { value: "7+", label: "Years" },
  { value: "15+", label: "Projects" },
  { value: "AAA", label: "Standard" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion === true;
  const showFallbackPoster = shouldReduceMotion || !hasVideo;

  const motionIfAllowed = <T extends object>(props: T): T | { initial: false } =>
    shouldReduceMotion ? { initial: false } : props;

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

  const videoBgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-zinc-950 pt-24"
    >
      {showFallbackPoster && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.28]"
          style={{ backgroundImage: "url('/images/reel_poster.jpg')" }}
          aria-hidden
        />
      )}
      {hasVideo && !shouldReduceMotion && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/reel_poster.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22] will-change-transform"
          style={{ y: videoBgY }}
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,9,15,0.98)_0%,rgba(6,9,15,0.93)_44%,rgba(6,9,15,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_36%,rgba(45,212,191,0.08),transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/45 via-transparent to-zinc-950" />
      <div
        className="absolute inset-0 opacity-[0.014]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <ParticleCanvas
        className="z-[1]"
        particleCount={28}
        color="20, 184, 166"
        maxDistance={140}
        mouseRadius={180}
        speed={0.12}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[86rem] flex-col justify-center px-6 lg:px-12">
        <div className="grid items-center gap-10 xl:grid-cols-[1.1fr_0.75fr]">
          <motion.div
            style={!shouldReduceMotion ? { opacity: contentOpacity, y: contentY } : undefined}
            className="max-w-3xl"
          >
            <motion.div
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
              {...motionIfAllowed({
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.45, ease: "easeOut" },
              })}
            >
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-200">
                Available for roles
              </span>
            </motion.div>

            <motion.h1
              className="max-w-2xl text-[4.3rem] font-black leading-[0.84] tracking-[-0.06em] text-white sm:text-[5.2rem] lg:text-[6.4rem] xl:text-[7.2rem]"
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
              <span className="text-white/76">TRAN</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-xl leading-8 text-zinc-100 sm:text-[1.95rem] sm:leading-[1.45]"
              {...motionIfAllowed({
                initial: { opacity: 0, y: 18 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.18, duration: 0.48, ease: "easeOut" },
              })}
            >
              {HERO.tagline}
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl text-base leading-8 text-zinc-300"
              {...motionIfAllowed({
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.28, duration: 0.45 },
              })}
            >
              {HERO.description}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              {...motionIfAllowed({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.36, duration: 0.45, ease: "easeOut" },
              })}
            >
              <Link
                href="/showreel"
                className="inline-flex items-center gap-3 rounded-full border border-teal-300/35 bg-gradient-to-r from-teal-400 to-cyan-400 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 shadow-[0_18px_40px_rgba(20,184,166,0.24)] transition-all hover:scale-[1.01] hover:shadow-[0_22px_48px_rgba(20,184,166,0.32)]"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Play showreel
              </Link>

              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-white/16 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-white/28 hover:bg-white/[0.03]"
              >
                View portfolio
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden xl:block"
            style={!shouldReduceMotion ? { opacity: contentOpacity, y: contentY } : undefined}
            {...motionIfAllowed({
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.28, duration: 0.5, ease: "easeOut" },
            })}
          >
            <div className="ml-auto max-w-[24rem] rounded-[1.75rem] border border-white/10 bg-black/26 p-5 backdrop-blur-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-200">
                Snapshot
              </p>
              <div className="mt-4 grid gap-3">
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.25rem] border border-white/12 bg-white/[0.03] px-5 py-4"
                  >
                    <span className="block text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid max-w-xl grid-cols-3 gap-3 xl:hidden"
          {...motionIfAllowed({
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.46, duration: 0.45, ease: "easeOut" },
          })}
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.15rem] border border-white/10 bg-black/24 px-4 py-4 backdrop-blur-md"
            >
              <span className="block text-2xl font-bold text-white">{stat.value}</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-6 z-[2] hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white lg:left-12 lg:flex"
        aria-label="Scroll to work"
        {...motionIfAllowed({
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.85, duration: 0.45 },
        })}
        style={!shouldReduceMotion ? { opacity: chevronOpacity } : undefined}
      >
        <motion.span
          animate={!shouldReduceMotion ? { y: [0, 3, 0] } : undefined}
          transition={
            !shouldReduceMotion
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <ChevronDown className="h-3 w-3" />
        </motion.span>
        Scroll down
      </motion.a>
    </section>
  );
}
