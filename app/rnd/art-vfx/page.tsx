import { RND_PROJECTS } from "@/data/portfolio";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ArtVfxPage() {
    const project = RND_PROJECTS.find((p) => p.slug === "art-vfx");

    if (!project) {
        notFound();
    }

    // The youtube ID for the Art VFX video
    const youtubeId = "FcIUXgQ4c3s";

    return (
        <main className="min-h-screen bg-zinc-950 text-foreground selection:bg-teal-500/30">
            <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
                <Link
                    href="/rnd"
                    className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Lab
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
                            <Sparkles className="h-3.5 w-3.5" />
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-[0.1em] text-white asym-tight mb-4">
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

                {/* Video Embed */}
                <div className="mb-16">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-zinc-900">
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&rel=0`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>

                {/* Project Details */}
                <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6">About the Project</h2>
                    <p className="text-white/70 leading-relaxed mb-6">
                        A comprehensive showcase of real-time Visual Effects created dynamically within Unreal Engine 5.
                        This reel demonstrates complex particle systems, procedural destruction, and fluid simulations
                        driven by Houdini and deeply integrated into Unreal's Niagara system.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mt-12 bg-zinc-900/50 p-6 sm:p-8 rounded-xl border border-white/5">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Role</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li>VFX Artist</li>
                                <li>Technical Animation</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Core Tech Stack</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><strong className="text-white">Unreal Engine 5:</strong> Niagara, Real-time Rendering</li>
                                <li><strong className="text-white">SideFX Houdini:</strong> Vellum, Flip Simulations, RBD</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
