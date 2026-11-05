"use client";

import React, { useRef, useState, useCallback } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(88, 207, 200, 0.12)",
  spotlightSize = 480,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--spotlight-x", `${x}px`);
    divRef.current.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* High-performance CSS variable spotlight glow (zero React re-renders on mousemove) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 select-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
