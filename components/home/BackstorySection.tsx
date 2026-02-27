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
import { ArrowRight } from "lucide-react";
import TypewriterTitle from "@/components/animations/TypewriterTitle";
import MagneticButton from "@/components/ui/MagneticButton";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
      className="relative min-h-[80vh] py-24 lg:py-32 overflow-hidden bg-slate-50"
    >
      {hasVideo && (
        <motion.video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/reel_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-5 will-change-transform"
          style={!prefersReducedMotion ? { y: videoBgY } : undefined}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-slate-50/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center text-slate-900 mb-16 sm:mb-20"
        >
          <TypewriterTitle
            prefix="My "
            words={["Backstory", "Journey"]}
            prefixClassName="text-slate-900"
            wordClassName="text-teal-600"
            cursorClassName="text-teal-600"
            reducedMotion={prefersReducedMotion}
            run={titleInView}
          />
        </h2>

        <div ref={timelineRef} className="relative max-w-3xl mx-auto pb-8">
          {/* Scroll-driven timeline vertical line */}
          <motion.div
            className="absolute left-6 md:left-8 top-6 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-teal-300 via-teal-200/50 to-transparent origin-top"
            style={
              !prefersReducedMotion
                ? { scaleY: lineScale }
                : undefined
            }
            initial={prefersReducedMotion ? undefined : { scaleY: 0 }}
          />

          <ul className="space-y-10 sm:space-y-12">
            {EXPERIENCES.map((exp, i) => {
              const techList = exp.technologies ? exp.technologies.split(",").map(t => t.trim()) : [];
              return (
                <motion.li
                  key={`${exp.company}-${exp.duration}`}
                  className="relative flex group"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                >
                  {/* Timeline Node - perfectly aligned with the line */}
                  <div className="absolute left-6 md:left-8 top-8 -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white border-4 border-slate-50 ring-2 ring-teal-200 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:ring-teal-300 group-hover:border-white"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.4)] transition-all duration-300 group-hover:bg-teal-600" />
                    </motion.div>
                  </div>

                  {/* Single Column Card Content */}
                  <div className="flex-1 pl-16 md:pl-20 pr-0 sm:pr-4">
                    <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/70 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-teal-300/50 group-hover:-translate-y-1">
                      <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-wide">{exp.role}</h3>
                      <p className="font-medium text-sm mt-1 mb-4 flex flex-wrap items-center gap-2">
                        <span className="text-teal-700 font-semibold">{exp.company}</span>
                        <span className="text-slate-300 text-xs">|</span>
                        <span className="text-slate-500">{exp.duration}</span>
                      </p>

                      {/* Responsibilities - Truncated to 2 for compactness */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-4 space-y-2.5 text-sm md:text-base text-slate-600 mb-6">
                          {exp.responsibilities.slice(0, 2).map((task, idx) => (
                            <li key={idx} className="leading-relaxed relative pl-4 opacity-90 group-hover:opacity-100 transition-opacity">
                              <span className="absolute left-0 top-2.5 w-1 h-1 rounded-full bg-teal-400" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack Tags - Max 4 to prevent clutter */}
                      {techList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {techList.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-[11px] md:text-xs font-medium bg-teal-50 border border-teal-100 text-teal-700 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {techList.length > 4 && (
                            <span className="px-2.5 py-1 text-[11px] md:text-xs font-medium bg-slate-100 border border-slate-200 text-slate-500 rounded-md">
                              +{techList.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.p
          className="mt-16 max-w-2xl mx-auto text-center text-slate-500 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Always open to new challenges, from Niagara setups and shaders to comprehensive Houdini pipelines and cross-studio environments.
        </motion.p>

        <motion.div
          className="mt-10 text-center flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <MagneticButton
            href="/about"
            className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200/70 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:text-teal-700 transition-all duration-300 ease-out hover:bg-slate-50 hover:border-teal-300 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Read Full Resume
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
