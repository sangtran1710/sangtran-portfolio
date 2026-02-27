"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Number of particles displayed (fewer = better performance, while remaining "alive") */
const PARTICLE_COUNT = 24;

const particlePositions = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: `${3 + (i * 4.1) % 94}%`,
  top: `${5 + (i * 6) % 88}%`,
  size: 2.5 + (i % 4),
  delay: (i * 0.35) % 6,
  duration: 8 + (i % 5),
}));

export default function AboutHeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(20,184,166,0.06) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <>
      {/* Gradient orbs — clearer movement, increased opacity for a "live" feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[min(85vw,480px)] h-[min(85vw,480px)] rounded-full blur-[90px] opacity-[0.2]"
          style={{
            left: "5%",
            top: "10%",
            background: "radial-gradient(circle, rgba(20,184,166,0.7) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, 60, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[min(65vw,380px)] h-[min(65vw,380px)] rounded-full blur-[75px] opacity-[0.15]"
          style={{
            right: "0%",
            top: "35%",
            background: "radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, -70, 45, 0],
            y: [0, 40, -25, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[min(55vw,320px)] h-[min(55vw,320px)] rounded-full blur-[70px] opacity-[0.12]"
          style={{
            left: "45%",
            bottom: "0%",
            background: "radial-gradient(circle, rgba(6,182,212,0.55) 0%, transparent 65%)",
          }}
          animate={{
            x: [0, -45, 55, 0],
            y: [0, 30, -35, 0],
            scale: [1, 0.88, 1.18, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles — clearer, faster movement */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particlePositions.map((p, i) => (
          <div
            key={i}
            className="about-hero-particle absolute rounded-full bg-teal-300/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Keep a soft static glow at the top (layer beneath orbs/particles) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(20,184,166,0.05) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
