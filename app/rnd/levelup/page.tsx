import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Box, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Level Up — 3D Environment",
    description:
        "A personal R&D project exploring 3D environment creation in Blender, inspired by Crypto.com's 2025 slogan 'Level Up'.",
};

export default function LevelUpPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-6">
                {/* Back link */}
                <Link
                    href="/rnd"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to The Lab
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                            <Box className="h-3 w-3 mr-1" />
                            3D Environment
                        </Badge>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                            Personal R&D
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
                        Level <span className="text-blue-400">Up</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Researching and building high-fidelity 3D environments in Blender, inspired by Crypto.com.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-10 border border-white/10"
                    style={{ paddingTop: "56.25%" }}>
                    <Image
                        src="/images/LevelUp.png"
                        alt="Level Up Environment Thumbnail"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Project Overview</h2>
                            <p className="text-zinc-400 leading-relaxed text-base">
                                "Level Up" is a personal research and development project focused on pushing the boundaries of 3D environment creation using Blender. This project serves as a technical playground to refine my skills in world-building, texturing, lighting, and creating grand cinematic compositions.
                            </p>
                        </section>

                        <Separator className="bg-white/10" />

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Inspiration & Concept</h2>

                            <div className="space-y-8">
                                <div className="relative pl-6 border-l-2 border-blue-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4 text-blue-400" />
                                        Inspired by Crypto.com
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        The core aesthetic and thematic inspiration comes from Crypto.com's brand identity. Specifically, the project is built around their 2025 slogan: <strong>"Level Up"</strong>. By taking this concept, I aimed to visualize what "Leveling Up" looks like translated into an epic, large-scale 3D cinematic environment.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Blender", "After Effects"].map((tech) => (
                                    <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-300">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 space-y-5">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Role</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">3D Environment Artist</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Type</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">Personal R&D</p>
                            </div>

                            <div className="pt-4 mt-2 border-t border-white/10">
                                <a
                                    href="https://www.behance.net/gallery/234998189/Case-Study-Level-Up-Cryptocom"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                                >
                                    View Case Study
                                    <ArrowLeft className="h-4 w-4 rotate-[135deg]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
