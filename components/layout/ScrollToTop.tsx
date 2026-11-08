"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SHOW_AFTER_PX = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { copy, locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const currentScroll = window.scrollY;
    setVisible(currentScroll > SHOW_AFTER_PX);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100));
      setProgress(scrollPercent);
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // SVG circular gauge metrics (radius = 19, circumference = 2 * PI * 19 ≈ 119.38)
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 14 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={copy.common?.scrollToTop || "Scroll to top"}
            title={locale === "vi" ? "Cuộn lên đầu trang" : "Scroll to top"}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#07090D]/85 backdrop-blur-md text-neutral-300 transition-all duration-300 hover:text-white hover:bg-black hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_12px_rgba(88,207,200,0.12)] border border-white/10 hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Circular Scroll Progress HUD Ring */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
              viewBox="0 0 44 44"
              aria-hidden="true"
            >
              {/* Background faint track */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-white/[0.08]"
                strokeWidth="1.75"
                fill="none"
              />
              {/* Active progress dial */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-out"
                strokeWidth="1.75"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Bespoke VFX Timeline / Sequence 'Return to Start' Glyph */}
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 text-neutral-200 group-hover:text-primary"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              {/* Ceiling Origin Line */}
              <line
                x1="3"
                y1="3"
                x2="13"
                y2="3"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              {/* Vertical Spine */}
              <line
                x1="8"
                y1="13"
                x2="8"
                y2="5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              {/* Apex Arrowhead */}
              <path
                d="M4.5 9L8 5.5L11.5 9"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
