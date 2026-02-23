"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type Variant = "fadeUp" | "slideLeft" | "slideRight" | "scaleUp";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  offset?: [string, string];
}

const variantConfig: Record<
  Variant,
  {
    y?: [number, number];
    x?: [number, number];
    scale?: [number, number];
    opacity: [number, number];
  }
> = {
  fadeUp: { y: [40, 0], opacity: [0, 1] },
  slideLeft: { x: [-60, 0], opacity: [0, 1] },
  slideRight: { x: [60, 0], opacity: [0, 1] },
  scaleUp: { scale: [0.92, 1], opacity: [0, 1] },
};

export default function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  offset = ["start 0.92", "start 0.55"],
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const config = variantConfig[variant];

  const opacity = useTransform(scrollYProgress, [0, 1], config.opacity);
  const y = useTransform(scrollYProgress, [0, 1], config.y ?? [0, 0]);
  const x = useTransform(scrollYProgress, [0, 1], config.x ?? [0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], config.scale ?? [1, 1]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={`${className ?? ""} relative`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, scale, willChange: "transform, opacity" }}
      className={`${className ?? ""} relative`}
    >
      {children}
    </motion.div>
  );
}
