"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MAGNETIC_STRENGTH = 0.22;
const SPRING = { stiffness: 300, damping: 20 };

type Props = Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href" | "target" | "rel">;

export default function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
    const deltaY = (e.clientY - centerY) * MAGNETIC_STRENGTH;
    const clamp = 8;
    x.set(Math.max(-clamp, Math.min(clamp, deltaX)));
    y.set(Math.max(-clamp, Math.min(clamp, deltaY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
