"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Sparkles, Code, Box } from "lucide-react";
import { SKILL_GROUPS, SKILLS_SECTION_IMAGE } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const DISPLAY_GROUPS = SKILL_GROUPS.slice(0, 3);
const GROUP_ICONS = [
  { Icon: Sparkles, label: "VFX & Simulation", color: "text-amber-500" },
  { Icon: Code, label: "Shaders & Materials", color: "text-violet-500" },
  { Icon: Box, label: "3D Software", color: "text-teal-500" },
];

export default function TechnicalSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageRaw = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageY = useSpring(imageRaw, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="technical-skills"
      className="relative border-t border-border/60 bg-muted/20"
    >
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Box className="h-4 w-4 text-primary" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Toolkit
              </p>
            </motion.div>
            <TextReveal
              text="Skills"
              as="h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
              offset={["start 0.85", "start 0.55"]}
            />
            <div className="space-y-6">
              {DISPLAY_GROUPS.map((group, i) => {
                const { Icon, color } = GROUP_ICONS[i] ?? { Icon: Box, color: "text-primary" };
                return (
                  <ScrollReveal
                    key={group.name}
                    variant={i % 2 === 0 ? "slideRight" : "slideLeft"}
                    offset={["start 0.95", "start 0.65"]}
                  >
                    <div className="group rounded-xl border border-border/60 bg-background/80 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div
                          className={`rounded-lg bg-muted p-1.5 ${color}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                          {group.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-md bg-muted/80 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors group-hover:bg-primary/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group/link"
              >
                Full profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Image with parallax */}
          <motion.div
            className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-lg ring-1 ring-black/5 will-change-transform"
            style={!prefersReducedMotion ? { y: imageY } : undefined}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={SKILLS_SECTION_IMAGE}
              alt=""
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
