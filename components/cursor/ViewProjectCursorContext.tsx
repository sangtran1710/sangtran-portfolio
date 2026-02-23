"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { motion, useSpring } from "framer-motion";

type CursorState = {
  mouseX: number;
  mouseY: number;
  isOverProjectCard: boolean;
  setOverProjectCard: (over: boolean) => void;
};

const CursorContext = createContext<CursorState | null>(null);

export function useViewProjectCursor() {
  const ctx = useContext(CursorContext);
  return ctx;
}

export function ViewProjectCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isOverProjectCard, setOverProjectCard] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{
        mouseX,
        mouseY,
        isOverProjectCard,
        setOverProjectCard,
      }}
    >
      {children}
      <ViewProjectCursor
        x={mouseX}
        y={mouseY}
        visible={isOverProjectCard}
      />
    </CursorContext.Provider>
  );
}

function ViewProjectCursor({
  x,
  y,
  visible,
}: {
  x: number;
  y: number;
  visible: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const springConfig = { stiffness: 300, damping: 25 };
  const scaleSpring = useSpring(0, springConfig);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    scaleSpring.set(visible ? 1 : 0);
  }, [visible, scaleSpring]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] flex items-center justify-center"
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        scale: scaleSpring,
      }}
      aria-hidden
    >
      {/* Motion graphic: ring + dot, no text */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-teal-400/80"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          className="absolute h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.6)]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
