"use client";

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
    transition: { delay: (Number(i) ?? 0) * 0.08 + 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
      className="relative border-t border-border/60 bg-background overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background: "linear-gradient(120deg, hsl(var(--primary)) 0%, transparent 40%, transparent 60%, hsl(var(--primary)) 100%)",
          backgroundSize: "200% 200%",
          animation: "profile-gradient 10s ease-in-out infinite",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Framer Motion stagger + hover */}
          <div className="order-2 lg:order-1 flex flex-col gap-10">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {PROFILE.headline}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {PROFILE.title}
              </h2>
              <motion.span
                className="inline-block h-0.5 w-16 rounded-full bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>

            {/* TextReveal word-by-word for paragraph */}
            <TextReveal
              text={PROFILE.paragraph}
              as="p"
              className="text-muted-foreground text-[15px] leading-relaxed max-w-lg"
              offset={["start 0.85", "start 0.45"]}
            />

            <motion.div
              custom={2}
              variants={stagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {numberStats.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    custom={2 + i}
                    variants={slideUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.03, x: 2 }}
                    className="rounded-lg px-3 py-2 -mx-3 -my-2 transition-colors hover:bg-primary/5"
                  >
                    <span className="font-semibold text-foreground">{value}</span>
                    <span className="text-muted-foreground ml-1.5">{label}</span>
                  </motion.div>
                ))}
              </div>
              {toolsAndSoftware.length > 0 && (
                <div className="flex flex-col gap-3 pt-2 border-t border-border/60">
                  {toolsAndSoftware.map(({ label, value }, i) => (
                    <motion.div
                      key={label}
                      custom={5 + i}
                      variants={slideUp}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ x: 4 }}
                      className="text-sm rounded-lg py-2 pl-2 -ml-2 transition-colors hover:bg-primary/5"
                    >
                      <span className="text-muted-foreground block text-xs font-medium uppercase tracking-wider mb-1">
                        {label}
                      </span>
                      <span className="text-foreground/90">{value}</span>
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
                className="gap-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all hover:scale-[1.02] hover:shadow-md hover:shadow-teal-500/10"
              >
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
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
            className="order-1 lg:order-2 relative aspect-[4/5] max-h-[480px] w-full will-change-transform"
          >
            <div className="group/card h-full w-full cursor-pointer [perspective:1000px]">
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden bg-zinc-200 shadow-lg ring-1 ring-black/5">
                  {!avatarError ? (
                    <img
                      src={PROFILE.portraitImage}
                      alt="Tran Minh Sang"
                      className="h-full w-full object-cover object-center"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm">
                      Photo
                    </div>
                  )}
                </div>
                {hasSecondary && (
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden bg-zinc-200 shadow-lg ring-1 ring-black/5">
                    {!backError ? (
                      <img
                        src={PROFILE.portraitImageSecondary}
                        alt="Tran Minh Sang"
                        className="h-full w-full object-cover object-center"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
