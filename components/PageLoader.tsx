"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem("loader-shown");
    if (seen) {
      setVisible(false);
      return;
    }

    // Progress bar animation: fill over 0.8s
    const start = performance.now();
    const duration = 800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    // Hide after 1.2s total
    const timer = setTimeout(() => {
      sessionStorage.setItem("loader-shown", "1");
      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem("loader-shown", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Teal glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mb-8"
          >
            <span className="text-7xl font-bold tracking-tight text-white select-none">
              Welcome
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Name + role */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-[0.3em] text-white/80 uppercase">
              Sang Tran
            </p>
            <p className="text-xs tracking-[0.2em] text-teal-400/70 uppercase mt-1">
              Senior VFX Artist
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40"
          >
            <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-none rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-[10px] text-white/20 mt-2 tracking-widest">
              {Math.round(progress)}%
            </p>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 text-[10px] lg:text-xs text-white/30 hover:text-white/80 transition-colors uppercase tracking-[0.2em] z-50 p-2"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
