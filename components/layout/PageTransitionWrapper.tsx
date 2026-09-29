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
      {/* Main Page Flat Micro-Lift Transition */}
      <motion.div
        key={pathname}
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 4,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </ViewProjectCursorProvider>
  );
}
