"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  color: string;
}

export default function AtmosphericVfxCanvas({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motesRef = useRef<Mote[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const animFrameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const initMotes = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 28000), 45);
    const motes: Mote[] = [];
    const colors = [
      "92, 157, 152",  // signature teal
      "125, 181, 176", // soft cyan
      "167, 210, 206", // pale glow
      "220, 180, 120", // subtle warm ember spark
    ];

    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.12 - Math.random() * 0.22, // gently drift upwards
        radius: Math.random() * 1.8 + 0.8, // 0.8px to 2.6px
        baseOpacity: Math.random() * 0.25 + 0.12, // 0.12 to 0.37 (very subtle)
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    motesRef.current = motes;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initMotes(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, w, h);

      const motes = motesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 130;

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];

        // Gentle mouse displacement (air disturbance)
        if (mouse.active) {
          const dx = m.x - mouse.x;
          const dy = m.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.45;
            m.vx += (dx / dist) * force;
            m.vy += (dy / dist) * force;
          }
        }

        // Damping towards natural gentle drift
        m.vx *= 0.985;
        m.vy = m.vy * 0.985 + (-0.18 * 0.015);

        // Update position
        m.x += m.vx;
        m.y += m.vy;

        // Wrap around borders
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.y > h + 10) m.y = -10;

        // Breathing opacity
        const pulse = Math.sin(time + m.phase) * 0.08;
        const currentOpacity = Math.max(0.05, Math.min(0.6, m.baseOpacity + pulse));

        // Draw soft glowing mote
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.color}, ${currentOpacity})`;
        ctx.fill();

        // Subtle soft outer halo for larger motes
        if (m.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${m.color}, ${currentOpacity * 0.18})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, initMotes]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[5] ${className}`}
      aria-hidden
    />
  );
}
