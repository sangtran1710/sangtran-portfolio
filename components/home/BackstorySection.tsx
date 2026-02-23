"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { HERO, EXPERIENCES } from "@/data/portfolio";
import { ChevronRight } from "lucide-react";
import TypewriterTitle from "@/components/animations/TypewriterTitle";

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function BackstorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const titleInView = useInView(titleRef, { amount: 0.5, once: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setHasVideo(false);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  // Section-level scroll for video parallax
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoBgY = useTransform(sectionProgress, [0, 1], ["0%", "20%"]);

  // Timeline scroll-driven line draw
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useSpring(timelineProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="backstory"
      className="relative min-h-[80vh] py-28 lg:py-32 overflow-hidden bg-zinc-950"
    >
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30 will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-zinc-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950/80" />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center text-white mb-16"
        >
          <TypewriterTitle
            prefix="My "
            words={["Backstory", "Road"]}
            prefixClassName="text-white"
            wordClassName="text-teal-400"
            cursorClassName="text-teal-400"
            reducedMotion={prefersReducedMotion}
            run={titleInView}
          />
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Scroll-driven timeline line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-white/20 origin-top"
            style={
              !prefersReducedMotion
                ? { scaleY: lineScale }
                : undefined
            }
            initial={prefersReducedMotion ? undefined : { scaleY: 0 }}
          />
          <ul className="space-y-12">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={`${exp.company}-${exp.duration}`}
                  className="relative flex"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                >
                  <motion.div
                    className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-teal-400 -translate-x-1/2 mt-2 sm:mt-3 ring-4 ring-zinc-950 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 200 }}
                  />
                  <div
                    className={`flex-1 pl-12 sm:pl-0 max-w-[calc(100%-2rem)] sm:max-w-[calc(50%-1.5rem)] ${isLeft ? "sm:mr-auto sm:pr-8 sm:text-right" : "sm:ml-auto sm:pl-8"}`}
                  >
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    <p className="text-white/80 text-sm mt-0.5">
                      {exp.company} · {exp.duration}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.p
          className="mt-12 max-w-2xl mx-auto text-center text-white/70 text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Focus on real-time VFX for games and cinematics — from Niagara and shaders to Houdini pipelines and cross-studio collaboration. Always open to new challenges and remote opportunities.
        </motion.p>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-teal-400/40 transition-all duration-300 group"
          >
            About
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
