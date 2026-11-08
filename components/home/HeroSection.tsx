"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedHero } from "@/lib/portfolio-content";
import { useCanHover } from "@/lib/use-media";

interface HeroShot {
  id: string;
  title: string;
  meta: string;
  poster: string;
  videoSrc: string;
  href: string;
}

const HERO_SHOTS: HeroShot[] = [
  {
    id: "wolverine",
    title: "Marvel's Wolverine",
    meta: "Insomniac Games · PS5",
    poster: "/images/hero-wolverine-night-assault.webp",
    videoSrc: "/video/previews/wolverine-preview.mp4",
    href: "/projects/wolverine",
  },
  {
    id: "spider-man-2",
    title: "Marvel's Spider-Man 2",
    meta: "Insomniac Games · PS5",
    poster: "/images/projects/spider-man-2/story-fire.webp",
    videoSrc: "/video/previews/spider-man-2-preview.mp4",
    href: "/projects/spider-man-2",
  },
  {
    id: "fortnite-remix",
    title: "Fortnite: Remix Finale",
    meta: "Epic Games · Unreal Engine",
    poster: "/images/showreel/shot-01-fortnite.webp",
    videoSrc: "/video/previews/fortnite-preview.mp4",
    href: "/projects/fortnite-remix",
  },
  {
    id: "new-world",
    title: "New World: Aeternum",
    meta: "Amazon Games · Unreal Engine",
    poster: "/images/optimized/new-world-aeternum.jpg",
    videoSrc: "/video/previews/new-world-preview.mp4",
    href: "/projects/new-world",
  },
];

const ROTATE_MS = 8000;
const subscribe = () => () => {};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeShot, setActiveShot] = useState(0);
  const [userLocked, setUserLocked] = useState(false);
  const [inView, setInView] = useState(true);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { locale } = useLanguage();
  const hero = getLocalizedHero(locale);
  const isVi = locale === "vi";
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -28]);

  // Pause all motion once the hero leaves the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || userLocked || !inView) return;
    const interval = window.setInterval(() => {
      setActiveShot((current) => (current + 1) % HERO_SHOTS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, userLocked, inView]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeShot && inView) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        if (index !== activeShot) video.currentTime = 0;
      }
    });
  }, [activeShot, inView, prefersReducedMotion]);

  const currentShot = HERO_SHOTS[activeShot] ?? HERO_SHOTS[0];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[72svh] items-end overflow-hidden border-b border-border bg-background pt-[4.5rem]"
    >
      <div className="absolute inset-0">
        {HERO_SHOTS.map((shot, index) => {
          const isActive = activeShot === index;
          return (
            <div
              key={shot.id}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                isActive ? "opacity-95" : "opacity-0"
              }`}
            >
              <Image
                src={shot.poster}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[50%_30%]"
              />
              {!prefersReducedMotion && canHover && (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={shot.videoSrc}
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : "none"}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,26,35,0.85)_0%,rgba(22,26,35,0.42)_48%,rgba(22,26,35,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(22,26,35,0.95)_0%,rgba(22,26,35,0)_100%)]" />

      <motion.div
        style={mounted && prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="font-sans text-5xl font-normal leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              {hero.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
              Senior VFX Artist
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-base font-medium">
              <Link
                href="/portfolio"
                className="group inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-background font-medium transition-all duration-300 ease-out hover:bg-white hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_24px_rgba(88,207,200,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {isVi ? "Xem dự án" : "Selected work"}
              </Link>
              <Link
                href="/showreel"
                className="group inline-flex min-h-12 items-center gap-2.5 px-4 py-3 text-white transition-all duration-300 ease-out hover:text-primary hover:scale-[1.03] active:scale-[0.97]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/20 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-background group-hover:scale-110">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                <span>Showreel</span>
              </Link>
            </div>

            {/* Mobile: quiet caption with direct link for the shot currently playing */}
            <div className="mt-8 lg:hidden">
              <Link
                href={currentShot.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-section/80 px-4 py-2 text-xs font-sans text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                <span>{currentShot.title} · {currentShot.meta}</span>
              </Link>
            </div>
          </div>

          {/* Desktop shot selector */}
          <div className="hidden lg:block">
            <ol className="divide-y divide-border/60 border-y border-border">
              {HERO_SHOTS.map((shot, index) => {
                const isActive = activeShot === index;
                return (
                  <li key={shot.id} className="relative">
                    <Link
                      href={shot.href}
                      onMouseEnter={() => {
                        setActiveShot(index);
                        setUserLocked(true);
                      }}
                      onFocus={() => {
                        setActiveShot(index);
                        setUserLocked(true);
                      }}
                      className={`group relative flex w-full items-center justify-between gap-4 py-3.5 px-3.5 rounded-xl text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                        isActive ? "text-white" : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="hero-shot-active-pill"
                          className="pointer-events-none absolute inset-0 select-none rounded-xl bg-white/[0.07] border border-white/10 shadow-sm"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 text-sm font-medium">
                        {shot.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
