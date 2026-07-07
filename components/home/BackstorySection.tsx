"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedExperiences } from "@/lib/portfolio-content";

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { locale, copy } = useLanguage();
  const experiences = getLocalizedExperiences(locale);

  // Section-level scroll for a lightweight poster parallax.
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const visualBgY = useTransform(sectionProgress, [0, 1], ["0%", "12%"]);

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
      className="relative min-h-[80vh] py-24 lg:py-32 overflow-hidden bg-[#0b0e14]"
    >
      <motion.div
        className="absolute inset-0 opacity-[0.045] will-change-transform"
        style={!prefersReducedMotion ? { y: visualBgY } : undefined}
        aria-hidden
      >
        <Image
          src="/images/optimized/showreel-fortnite-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0b0e14]/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0e14]/50 to-[#0b0e14]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center text-white mb-16 sm:mb-20"
        >
          {locale === "vi" ? "Kinh nghiệm" : "Experience"}
        </h2>

        <div ref={timelineRef} className="relative max-w-3xl mx-auto pb-8">
          {/* Scroll-driven timeline vertical line */}
          <motion.div
            className="absolute left-6 md:left-8 top-6 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#5c9d98] via-[#5c9d98]/30 to-transparent origin-top"
            style={
              !prefersReducedMotion
                ? { scaleY: lineScale }
                : undefined
            }
            initial={prefersReducedMotion ? undefined : { scaleY: 0 }}
          />

          <ul className="space-y-10 sm:space-y-12">
            {experiences.map((exp, i) => {
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
                      className="w-5 h-5 rounded-full bg-stone-900 border-4 border-stone-800 ring-2 ring-[#5c9d98]/20 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:ring-[#5c9d98]/50 group-hover:border-stone-700"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5c9d98] shadow-[0_0_8px_rgba(92,157,152,0.4)] transition-all duration-300 group-hover:bg-[#6aa9a4]" />
                    </motion.div>
                  </div>

                  {/* Single Column Card Content */}
                  <div className="flex-1 pl-16 md:pl-20 pr-0 sm:pr-4">
                    <div className="p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(92,157,152,0.06)] group-hover:border-[#5c9d98]/50 group-hover:-translate-y-1">
                      <h3 className="font-bold text-white text-lg md:text-xl tracking-wide">{exp.role}</h3>
                      <p className="font-medium text-sm mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-[#5c9d98] font-semibold">{exp.company}</span>
                        <span className="text-stone-700 text-xs">|</span>
                        <span className="text-stone-400">{exp.duration}</span>
                      </p>

                      {/* Tech Stack Tags - Max 4 to prevent clutter */}
                      {techList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {techList.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-[11px] md:text-xs font-medium bg-white/5 border border-white/10 text-stone-300 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {techList.length > 4 && (
                            <span className="px-2.5 py-1 text-[11px] md:text-xs font-medium bg-white/10 border border-white/20 text-stone-400 rounded-md">
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
          className="mt-16 max-w-2xl mx-auto text-center text-stone-500 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {copy.home.backstoryOutro}
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
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-stone-300 hover:text-white transition-all duration-300 ease-out hover:bg-white/10 hover:border-[#5c9d98]/50 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            {copy.home.backstoryCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
