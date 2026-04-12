"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { PROFILE, SOCIALS } from "@/data/portfolio";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/animations/TextReveal";

const stagger = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: (Number(i) ?? 0) * 0.05 + 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 + 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function ProfileSection() {
  const [avatarError, setAvatarError] = useState(false);
  const [backError, setBackError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();

  const hasSecondary = "portraitImageSecondary" in PROFILE && PROFILE.portraitImageSecondary;
  const stats = PROFILE.stats;
  const numberStats = stats.slice(0, 3);
  const toolsAndSoftware = stats.slice(3, 5);

  // Avatar parallax: moves opposite to scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const avatarRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const avatarY = useSpring(avatarRaw, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-transparent"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,10,18,0.98) 0%, rgba(9,12,20,0.96) 18%, rgba(248,244,236,1) 18%, rgba(248,244,236,1) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Framer Motion stagger + hover */}
          <div className="order-2 lg:order-1 flex flex-col gap-10 rounded-[2rem] border border-stone-200/80 bg-white/88 p-8 shadow-[0_26px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="space-y-5"
            >
              <p className="section-label">
                {PROFILE.headline}
              </p>
              <h2 className="section-title mt-1 max-w-md text-slate-950">
                {PROFILE.title}
              </h2>
              <motion.span
                className="inline-block h-0.5 w-16 rounded-full bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
              />
            </motion.div>

            {/* TextReveal word-by-word for paragraph */}
            <TextReveal
              text={PROFILE.paragraph}
              as="p"
              className="section-body max-w-lg"
              offset={["start 0.85", "start 0.45"]}
            />

            <motion.div
              custom={2}
              variants={stagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-wrap gap-3 text-sm">
                {numberStats.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    custom={2 + i}
                    variants={slideUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.03, x: 2 }}
                    className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2.5 transition-colors hover:border-teal-200 hover:bg-teal-50/70"
                  >
                    <span className="font-semibold text-slate-950">{value}</span>
                    <span className="ml-1.5 text-slate-500">{label}</span>
                  </motion.div>
                ))}
              </div>
              {toolsAndSoftware.length > 0 && (
                <div className="grid gap-3 pt-4 border-t border-stone-200/80">
                  {toolsAndSoftware.map(({ label, value }, i) => (
                    <motion.div
                      key={label}
                      custom={5 + i}
                      variants={slideUp}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ x: 4 }}
                      className="rounded-2xl border border-stone-200/80 bg-stone-50/80 px-4 py-4 text-sm transition-colors hover:border-teal-200 hover:bg-white"
                    >
                      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        {label}
                      </span>
                      <span className="text-slate-800">{value}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="pt-2"
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2.5 rounded-full border-teal-600/30 bg-teal-500 text-white hover:bg-teal-600 hover:border-teal-500 hover:shadow-[0_18px_36px_rgba(20,184,166,0.2)]"
              >
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                  {PROFILE.ctaText}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right: avatar with parallax + flip on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={!prefersReducedMotion ? { y: avatarY } : undefined}
            className="order-1 lg:order-2 relative aspect-[4/5] max-h-[560px] w-full will-change-transform"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.26),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_45%)] blur-2xl" />
            <div className="dark-glass-panel group/card relative h-full w-full cursor-pointer rounded-[2rem] p-4 [perspective:1000px]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] transition-transform duration-500 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-[1.5rem] bg-zinc-200 shadow-lg ring-1 ring-white/10">
                  {!avatarError ? (
                    <Image
                      src={PROFILE.portraitImage}
                      alt="Tran Minh Sang"
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover object-center"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm">
                      Photo
                    </div>
                  )}
                </div>
                {hasSecondary && (
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-[1.5rem] bg-zinc-200 shadow-lg ring-1 ring-white/10">
                    {!backError ? (
                      <Image
                        src={PROFILE.portraitImageSecondary}
                        alt="Tran Minh Sang"
                        fill
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-cover object-center"
                        onError={() => setBackError(true)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm">
                        Photo 2
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-8 bottom-8 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-white/75 backdrop-blur-md">
                Real-time VFX / Technical Art
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
