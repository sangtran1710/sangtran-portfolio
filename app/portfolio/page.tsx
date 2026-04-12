import type { Metadata } from "next";
import RndSection from "@/components/home/RndSection";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Portfolio - Sang Tran",
  description:
    "AAA game VFX projects by Sang Tran - Spider-Man 2, Fortnite, New World, and more.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#070a12_0%,#0b1018_18%,#101722_100%)]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-28">
        <section className="mb-14 rounded-[2rem] border border-white/10 bg-[#0f1520] px-7 py-10 shadow-[0_22px_55px_rgba(0,0,0,0.2)] sm:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-teal-300">
            Work
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Curated portfolio, shipped first.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                A focused selection of launch-ready VFX, cinematic work, and
                technical art. The main grid highlights shipped and
                presentation-ready pieces first, while the lab section below
                keeps experiments and R&amp;D in their own lane.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-200">
                Reading order
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Start with the main grid for strongest portfolio signals, then
                continue into the lab for experiments, reels, and technical
                exploration.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-300">
                Showcase
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Selected projects
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Filter by category when you want a narrow pass, or scroll the full
              set to see the strongest mix of shipped work and signature style.
            </p>
          </div>
          <ProjectGrid />
        </section>
      </div>

      <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,14,22,0.82),rgba(9,12,19,0.96))]">
        <RndSection />
      </div>
    </div>
  );
}
