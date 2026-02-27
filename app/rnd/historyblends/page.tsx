import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, FlaskConical, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "HistoryBlends — AI Filmmaking",
    description:
        "A deep dive into the AI-driven storytelling process used to create HistoryBlends, leveraging Sora, Veo-2, ChatGPT, and Midjourney.",
};

export default function HistoryBlendsPage() {
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
                        <Badge variant="secondary" className="bg-teal-500/10 text-teal-400 hover:bg-teal-500/20">
                            <FlaskConical className="h-3 w-3 mr-1" />
                            AI Content Creation
                        </Badge>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                            Generative Filmmaking
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
                        History<span className="text-teal-400">Blends</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Directing and producing historical narratives exclusively using
                        generative AI tools and prompt engineering.
                    </p>
                </div>

                {/* Hero Image / Video */}
                <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-10 border border-white/10"
                    style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src="https://www.youtube.com/embed/2xLceh37Gsk?start=259"
                        title="HistoryBlends Showcase"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    />
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Project Overview</h2>
                            <p className="text-zinc-400 leading-relaxed text-base">
                                HistoryBlends is a storytelling initiative where I actively leverage generative AI—including Sora, Veo-2, and Midjourney—to direct and produce full historical sequences. The project serves as a showcase of blending cutting-edge AI tools with established cinematic principles to craft compelling visual narratives that retain viewer engagement.
                            </p>
                            <p className="text-zinc-400 leading-relaxed text-base mt-4">
                                Generating reliable, high-quality historical visuals requires an intricate understanding of prompt engineering to avoid artifacts, ensure frame-to-frame consistency, and match the emotional tone of the voiceover narrative.
                            </p>
                        </section>

                        <Separator className="bg-white/10" />

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Workflow & Pipeline</h2>

                            <div className="space-y-8">
                                <div className="relative pl-6 border-l-2 border-teal-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-teal-400" />
                                        Script Analysis via ChatGPT
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Breaking down historical facts and narratives into vivid, shot-by-shot visual descriptions. I use advanced prompting to analyze the pacing and extract physical characteristics of the subjects, environments, and required camera movements for each scene.
                                    </p>
                                </div>

                                <div className="relative pl-6 border-l-2 border-teal-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-teal-400" />
                                        Image & Concept Direction
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Utilizing Midjourney to establish the visual language, character designs, and initial mood boards. Creating a consistent style guide ensures that the subsequent motion generation remains cohesive.
                                    </p>
                                </div>

                                <div className="relative pl-6 border-l-2 border-teal-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-teal-400" />
                                        Generative Motion (Sora & Veo-2)
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Translating still concepts into cinematic motion. This step involves highly specific prompt engineering to control camera angles (e.g., "tracking shot", "rack focus"), lighting, and character actions, minimizing hallucinatory glitches while retaining historical authenticity.
                                    </p>
                                </div>

                                <div className="relative pl-6 border-l-2 border-teal-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-teal-400" />
                                        Editing & Synchronization
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Piecing together the generated clips and syncing them meticulously with the voiceover and sound effects. The visuals must breathe with the script to maintain an attractive flow and prevent viewer fatigue.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                                AI Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Sora", "Veo-2", "ChatGPT", "Midjourney", "Prompt Engineering"].map((tech) => (
                                    <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-300">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 space-y-5">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Role</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">Creator / AI Director</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Platform</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">YouTube</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Status</p>
                                <p className="text-sm font-medium text-teal-400 mt-1">Ongoing R&D</p>
                            </div>

                            <div className="pt-4 mt-2 border-t border-white/10">
                                <a
                                    href="https://www.youtube.com/@HistoryBlends"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                                >
                                    Visit Channel
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
