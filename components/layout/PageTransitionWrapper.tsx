"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ViewProjectCursorProvider } from "@/components/cursor/ViewProjectCursorContext";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useMemo } from "react";

function FrozenRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  // Freeze the router context for the lifetime of this route tree during exit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frozen = useMemo(() => context, []);
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <ViewProjectCursorProvider>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          exit={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -8,
                  transition: {
                    duration: 0.14,
                    ease: [0.32, 0, 0.67, 0],
                  },
                }
          }
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </ViewProjectCursorProvider>
  );
}
