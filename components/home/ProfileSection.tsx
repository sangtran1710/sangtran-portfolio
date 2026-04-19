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
import { SOCIALS } from "@/data/portfolio";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/animations/TextReveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile } from "@/lib/portfolio-content";

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();
  const { locale, copy } = useLanguage();
  const profile = getLocalizedProfile(locale);

  const stats = profile.stats;
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
      className="relative scroll-mt-24 overflow-hidden border-t border-stone-200 bg-[#f6f2eb]"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:gap-20">
          <div className="order-2 flex flex-col gap-9 rounded-[1.75rem] border border-stone-200/90 bg-[#fbfaf7] p-7 shadow-[0_5px_9px_rgba(0,0,0,0.06)] sm:p-9 lg:order-1">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="space-y-5"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#5c9d98]/18 bg-[#eef6f4] px-3.5 py-2 text-xs font-semibold text-[#3d7470]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5c9d98]" />
                Freelance technical VFX
              </div>
              <p className="section-label">{profile.headline}</p>
              <h2 className="section-title mt-1 max-w-md text-slate-950">
                {profile.title}
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
              text={profile.paragraph}
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {numberStats.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    custom={2 + i}
                    variants={slideUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-stone-200 bg-white px-4 py-4 transition-colors hover:border-stone-300"
                  >
                    <span className="block text-2xl font-bold leading-none tracking-[-0.04em] text-slate-950">
                      {value}
                    </span>
                    <span className="mt-2 block text-xs font-medium leading-5 text-slate-500">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
              {toolsAndSoftware.length > 0 && (
                <div className="grid gap-3 border-t border-stone-200/80 pt-4 sm:grid-cols-2">
                  {toolsAndSoftware.map(({ label, value }, i) => (
                    <motion.div
                      key={label}
                      custom={5 + i}
                      variants={slideUp}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm transition-colors hover:border-stone-300"
                    >
                      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {label}
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {value.split(/,\s*/).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </span>
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
                className="gap-2.5 rounded-full border border-stone-200 bg-[#5c9d98] text-white hover:border-[#5c9d98] hover:bg-[#538f8a] hover:shadow-[0_12px_30px_rgba(92,157,152,0.18)]"
              >
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                  {profile.ctaText}
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={!prefersReducedMotion ? { y: avatarY } : undefined}
            className="order-1 lg:order-2 relative aspect-[4/5] max-h-[560px] w-full will-change-transform"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-[#e9e1d5] shadow-[0_5px_9px_rgba(0,0,0,0.08)]">
              {!avatarError ? (
                <Image
                  src={profile.portraitImage}
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
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,12,0.02)_42%,rgba(5,8,12,0.24)_100%)]" />
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/36 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                {copy.home.profilePhotoCaption}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
