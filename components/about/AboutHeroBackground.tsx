"use client";

export default function AboutHeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 55% 40% at 18% 32%, rgba(92,157,152,0.12) 0%, transparent 72%), radial-gradient(ellipse 42% 30% at 86% 22%, rgba(255,255,255,0.1) 0%, transparent 70%)",
      }}
    />
  );
}
