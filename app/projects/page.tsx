import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AAA game VFX projects by Sang Tran — Spider-Man 2, Fortnite, New World, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">All Work</h1>
          <p className="text-slate-600 max-w-xl">
            Real-time VFX, cinematic effects, and technical art across AAA game
            titles and live-service content.
          </p>
        </div>

        <ProjectGrid />
      </div>
    </div>
  );
}
