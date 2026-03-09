import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";
import RndSection from "@/components/home/RndSection";

export const metadata: Metadata = {
  title: "Portfolio — Sang Tran",
  description:
    "AAA game VFX projects by Sang Tran — Spider-Man 2, Fortnite, New World, and more.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Game / AAA Work ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">
            Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Portfolio
          </h1>
          <p className="text-zinc-400 max-w-xl">
            Real-time VFX, cinematic effects, and technical art across AAA game
            titles, live-service content, and personal projects.
          </p>
        </div>

        <ProjectGrid />
      </div>

      {/* ── Labs / Personal / Commercial ── */}
      <div className="border-t border-zinc-800/60">
        <RndSection />
      </div>
    </div>
  );
}
