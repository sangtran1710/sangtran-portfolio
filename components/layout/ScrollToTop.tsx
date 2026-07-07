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
          className="fixed bottom-8 right-6 z-50 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md text-stone-400 shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:border-white/20 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 md:flex"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="h-4.5 w-4.5" strokeWidth={2} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
