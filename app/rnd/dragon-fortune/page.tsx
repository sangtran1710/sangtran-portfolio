import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Dragon Fortune - Personal Slot Prototype",
  description:
    "A self-directed HTML5 slot prototype for testing iGaming UI, particle FX, win-state timing, and free-spin flow in browser.",
};

// Disable SSR for the game (uses Canvas + browser APIs)
const DragonFortuneGame = dynamic(
  () => import("@/components/slotgame/DragonFortuneGame"),
  { ssr: false }
);

const TECH_TAGS = [
  "PixiJS 8 (WebGL)",
  "GSAP 3",
  "Web Audio API",
  "Next.js 14",
  "10 Paylines",
  "Wild & Scatter",
  "Free Spins",
  "Particle FX",
];

export default function DragonFortunePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          {/* Game frame */}
          <div
            className="w-full rounded-xl overflow-hidden border border-yellow-900/25"
            style={{ boxShadow: "0 0 80px rgba(120,80,0,0.18), 0 25px 60px rgba(0,0,0,0.7)" }}
          >
            <DragonFortuneGame />
          </div>

          {/* Back link and project classification */}
          <div className="flex items-center justify-between py-3 px-1 border-b border-white/5 mt-0.5">
            <Link
              href="/rnd"
              className="inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/70 transition-colors uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Labs
            </Link>
            <span className="text-[10px] text-white/20 uppercase tracking-[0.22em]">
              Personal Test Project
            </span>
          </div>

          {/* Title and credit */}
          <div className="mt-6 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Dragon Fortune
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-0.5 rounded-md font-medium">
                  iGaming
                </span>
                <span className="text-xs bg-white/5 text-white/40 border border-white/10 px-2.5 py-0.5 rounded-md">
                  HTML5
                </span>
                <span className="text-xs bg-white/5 text-white/40 border border-white/10 px-2.5 py-0.5 rounded-md">
                  5-Reel Slot
                </span>
                <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2.5 py-0.5 rounded-md">
                  Playable Prototype
                </span>
              </div>
            </div>

            {/* Credit badge */}
            <div className="shrink-0 text-right">
              <p className="text-[9px] text-white/25 uppercase tracking-[0.25em] mb-1">Created by</p>
              <p
                className="text-base font-black tracking-[0.14em] uppercase text-white leading-none"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
              >
                SANG TRAN.
              </p>
              <p className="text-[10px] text-teal-400 uppercase tracking-[0.18em] mt-1">
                Technical VFX Artist
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-3xl">
            A personal test project for exploring iGaming UI, interaction timing,
            and real-time VFX in browser. It includes a 5-reel flow with 10 paylines,
            weighted symbol pools, Wild substitution, a Scatter to Free Spins trigger,
            Canvas-based coin rain, and timeline-driven win feedback.
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-teal-300/60 bg-teal-500/5 border border-teal-500/15 rounded-md px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
