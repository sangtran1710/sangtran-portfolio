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
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="space-y-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4f8e89]">
                {profile.headline}
              </p>
              <motion.span
                className="inline-block h-0.5 w-12 rounded-full bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
              />
            </motion.div>

            {/* Bio paragraph — main content */}
            <TextReveal
              text={profile.paragraph}
              as="p"
              className="max-w-xl text-[1.05rem] leading-[1.7] text-slate-700"
              offset={["start 0.85", "start 0.45"]}
            />

            {/* Modern, minimalist stats row */}
            <div className="grid grid-cols-3 gap-6 border-t border-stone-200/80 pt-6 mt-2 max-w-lg">
              {profile.stats.slice(0, 3).map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <span className="block text-3xl font-light tracking-tight text-slate-900 leading-none">
                    {value}
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.4, duration: 0.4 }}
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
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-md">
                {copy.home.profilePhotoCaption}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
