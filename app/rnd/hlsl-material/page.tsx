import type { Metadata } from "next";
import { RND_PROJECTS } from "@/data/portfolio";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "HLSL Material R&D — Unreal Engine",
  description:
    "R&D on HLSL custom materials in Unreal Engine: noise, flowing textures, and procedural patterns for real-time VFX.",
};

const VIDEOS = [
  { id: "VTB2IAmcQO8", label: "HLSL Material 1" },
  { id: "go2mcMHq0EQ", label: "HLSL Material 2" },
  { id: "Tuv-oRMs4-E", label: "HLSL Material 3" },
  { id: "DZeDBRn_pJs", label: "HLSL Material 4" },
];

export default function HlslMaterialPage() {
  const project = RND_PROJECTS.find((p) => p.slug === "hlsl-material");

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-foreground selection:bg-teal-500/30">
      <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <Link
          href="/rnd"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Labs
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs font-medium text-white/60 border border-white/20 rounded-md px-2.5 py-1 bg-white/5"
              >
                {tool}
              </span>
            ))}
          </div>
        </header>

        {/* Video grid */}
        <section className="mb-16 space-y-10">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Videos</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {VIDEOS.map(({ id, label }) => (
              <div
                key={id}
                className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0`}
                  title={label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
                <p className="absolute bottom-2 left-2 text-xs font-medium text-white/80 bg-black/50 px-2 py-1 rounded">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detail: HLSL noise, flowing texture */}
        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6">
            HLSL noise & flowing texture
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            This R&D focuses on custom HLSL in Unreal Engine to drive material effects: procedural noise and flowing
            textures that would be expensive or inflexible with node-based materials alone. Writing shader code
            directly gives control over UV animation, noise octaves, and blending so that surfaces can scroll, distort,
            or reveal patterns in real time—useful for energy shields, holograms, damage decals, and environmental VFX.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The clips above show different passes: noise-based distortion, flowing tex coordinates with time and
            parameters, and combinations with Unreal’s material system (e.g. masking, emissive, opacity). All are
            implemented in HLSL inside Unreal’s material editor (Custom Expression / Material Function) for iteration
            speed while keeping the heavy logic in code for performance and reuse across projects.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            Techniques used include: animated UVs (pan, scroll), simple and fractal noise (value, simplex-style),
            flow maps for directional distortion, and parameter-driven blend between multiple noise layers. The goal
            is to have reusable, artist-tweakable building blocks (noise scale, speed, intensity) that plug into
            existing materials without rewriting entire graphs.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mt-12 bg-zinc-900/50 p-6 sm:p-8 rounded-xl border border-white/5">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Role</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Technical R&D</li>
                <li>HLSL / Material authoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Tech</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><strong className="text-white">Unreal Engine:</strong> Material Editor, Custom Expression</li>
                <li><strong className="text-white">HLSL:</strong> Noise, UV flow, procedural texture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
