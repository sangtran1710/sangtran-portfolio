"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

interface UseScrollParallaxOptions {
  offset?: [string, string];
  inputRange?: number[];
  outputRange?: number[];
  springConfig?: { stiffness?: number; damping?: number };
}

export function useScrollParallax(
  target: React.RefObject<HTMLElement>,
  options: UseScrollParallaxOptions = {}
): MotionValue<number> {
  const {
    offset = ["start end", "end start"],
    inputRange = [0, 1],
    outputRange = [-50, 50],
    springConfig = { stiffness: 100, damping: 30 },
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const zero = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target,
    offset: offset as any,
  });

  const transformed = useTransform(scrollYProgress, inputRange, outputRange);
  const smoothed = useSpring(transformed, springConfig);

  if (prefersReducedMotion) return zero;
  return smoothed;
}

export function useScrollOpacity(
  target: React.RefObject<HTMLElement>,
  options: {
    offset?: [string, string];
    inputRange?: number[];
    outputRange?: number[];
  } = {}
): MotionValue<number> {
  const {
    offset = ["start start", "end start"],
    inputRange = [0, 0.5],
    outputRange = [1, 0],
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const one = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target,
    offset: offset as any,
  });

  const opacity = useTransform(scrollYProgress, inputRange, outputRange);

  if (prefersReducedMotion) return one;
  return opacity;
}

export function useScrollProgress(
  target: React.RefObject<HTMLElement>,
  offset: [string, string] = ["start end", "end start"]
) {
  const { scrollYProgress } = useScroll({
    target,
    offset: offset as any,
  });
  return scrollYProgress;
}
