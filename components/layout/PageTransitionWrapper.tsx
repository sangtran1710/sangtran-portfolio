"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ViewProjectCursorProvider } from "@/components/cursor/ViewProjectCursorContext";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <ViewProjectCursorProvider>
      {/* Top HUD Energy Pulse: Micro feedback on page navigation */}
      {!prefersReducedMotion && (
        <motion.div
          key={`top-pulse-${pathname}`}
          className="pointer-events-none fixed top-0 inset-x-0 z-[100] h-[2px] bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent shadow-[0_0_12px_rgba(45,212,191,0.8)]"
          initial={{ scaleX: 0, opacity: 0.9, transformOrigin: "left" }}
          animate={{
            scaleX: 1,
            opacity: [0.9, 0.7, 0],
          }}
          transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      )}

      {/* Main Page Shutter & HUD Focus */}
      <motion.div
        key={pathname}
        style={{ transformOrigin: "50% 0%" }}
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 8,
                scale: 0.996,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.24,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </ViewProjectCursorProvider>
  );
}
