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
import { ArrowRight, Gamepad2, Code, GitBranch, Film } from "lucide-react";
import { EXPERIENCES, VFX_EXPERIENCE_IMAGE } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const HIGHLIGHTS = [
  { text: "AAA · Spider-Man 2, Fortnite, New World, Until Dawn", Icon: Gamepad2 },
  { text: "Niagara · HLSL · Houdini", Icon: Code },
  { text: "Pipeline & Perforce", Icon: GitBranch },
  { text: "Cinematic & in-game VFX", Icon: Film },
];

export default function VFXExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Opposing parallax: image and content move in opposite directions
  const imageRaw = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const contentRaw = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const imageY = useSpring(imageRaw, { stiffness: 100, damping: 30 });
  const contentY = useSpring(contentRaw, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="vfx-experience"
      className="relative border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image with parallax */}
          <motion.div
            className="order-2 lg:order-1 relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-lg ring-1 ring-black/5 will-change-transform"
            style={!prefersReducedMotion ? { y: imageY } : undefined}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={VFX_EXPERIENCE_IMAGE}
              alt=""
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content with opposing parallax */}
          <motion.div
            className="order-1 lg:order-2"
            style={!prefersReducedMotion ? { y: contentY } : undefined}
          >
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Film className="h-4 w-4 text-primary" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Experience
              </p>
            </motion.div>
            <TextReveal
              text="Visual Effect and Animation"
              as="h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
              offset={["start 0.85", "start 0.55"]}
            />
            <ul className="space-y-3">
              {HIGHLIGHTS.map(({ text, Icon }, i) => (
                <ScrollReveal
                  key={text}
                  variant="slideRight"
                  offset={["start 0.95", "start 0.7"]}
                >
                  <li className="flex items-start gap-3 rounded-lg border border-border/40 bg-muted/30 p-3 transition-all duration-300 hover:border-primary/30 hover:bg-muted/50 hover:shadow-md">
                    <motion.div
                      className="mt-0.5 rounded-md bg-primary/10 p-1.5 text-primary flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                    <span className="text-sm text-foreground/90">{text}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group/link"
              >
                About
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
