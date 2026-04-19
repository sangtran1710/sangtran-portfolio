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
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? false : { opacity: 0.96 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.16,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </ViewProjectCursorProvider>
  );
}
