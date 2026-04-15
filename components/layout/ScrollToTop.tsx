"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SHOW_AFTER_PX = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { copy } = useLanguage();

  const onScroll = useCallback(() => {
    setVisible(typeof window !== "undefined" ? window.scrollY > SHOW_AFTER_PX : false);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={copy.common.scrollToTop}
          className="fixed bottom-20 right-4 z-50 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/90 bg-[rgba(255,251,245,0.9)] text-slate-600 shadow-[0_10px_22px_rgba(15,23,42,0.07)] backdrop-blur-md transition-colors hover:border-stone-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5c9d98]/30 focus:ring-offset-0"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp className="h-4.5 w-4.5" strokeWidth={2} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
