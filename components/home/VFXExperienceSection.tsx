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
import { ArrowUpRight } from "lucide-react";
import { VFX_EXPERIENCE_IMAGE } from "@/data/portfolio";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const SPECS = [
  { label: "SHIPPED AAA", value: "Spider-Man 2, Fortnite, New World, Until Dawn" },
  { label: "TECH STACK", value: "Niagara, HLSL, Houdini, Unreal Engine 5" },
  { label: "PIPELINE", value: "Python Tools, Perforce Integration" },
  { label: "EXPERTISE", value: "Cinematic & Real-time In-game VFX" },
];

export default function VFXExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Opposing parallax for a more dynamic editorial feel
  const imageRaw = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const contentRaw = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const imageY = useSpring(imageRaw, { stiffness: 100, damping: 30 });
  const contentY = useSpring(contentRaw, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="vfx-experience"
      className="relative bg-background py-24 lg:py-32 overflow-hidden"
    >
      {/* Editorial Top Border */}
      <div className="absolute top-0 left-6 right-6 lg:left-12 lg:right-12 h-px bg-border/40" />

      <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] xl:gap-24 items-center">

          {/* Content side */}
          <motion.div
            className="order-2 lg:order-1"
            style={!prefersReducedMotion ? { y: contentY } : undefined}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4">
                02 // Experience
              </p>
              <TextReveal
                text="Visual Effect"
                as="h2"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]"
                offset={["start 0.9", "start 0.6"]}
              />
              <TextReveal
                text="& Animation."
                as="h2"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-muted-foreground leading-[0.9] mt-1"
                offset={["start 0.85", "start 0.55"]}
              />
            </motion.div>

            {/* Editorial Spec List */}
            <div className="flex flex-col border-t border-border/40">
              {SPECS.map(({ label, value }, i) => (
                <ScrollReveal
                  key={label}
                  variant="fadeUp"
                  offset={["start 0.95", "start 0.75"]}
                >
                  <div className="group flex flex-col sm:flex-row sm:items-baseline py-5 border-b border-border/40 transition-colors hover:bg-muted/20">
                    <span className="w-40 flex-shrink-0 text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1 sm:mb-0">
                      {label}
                    </span>
                    <span className="text-base sm:text-lg font-medium text-foreground/90 leading-snug">
                      {value}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Premium CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors"
              >
                <span className="relative">
                  Discover More
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image side - Sharp, Cinematic, Edge-to-edge feel */}
          <motion.div
            className="order-1 lg:order-2 relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/5] object-cover bg-muted will-change-transform"
            style={!prefersReducedMotion ? { y: imageY } : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={VFX_EXPERIENCE_IMAGE}
              alt="New World Aeternum VFX"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle inner shadow for cinematic depth */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
