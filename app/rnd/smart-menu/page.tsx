import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Video, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Smart Menu TVC — App Promo",
    description:
        "An app promo TVC for Utop (FPT Software) highlighting the Smart Menu feature.",
};

export default function SmartMenuPage() {
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
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
                            <Video className="h-3 w-3 mr-1" />
                            App Promo
                        </Badge>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                            TVC
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
                        Smart <span className="text-red-400">Menu</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        A promotional TVC for the Utop app (an FPT Software subsidiary), focusing on the convenience of the Smart Menu feature.
                    </p>
                </div>

                {/* Video Embed */}
                <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-10 border border-white/10"
                    style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src="https://www.youtube.com/embed/FHKK2hgJiVU?si=dI06u8xpU2HQNpar"
                        title="Smart Menu TVC"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Project Overview</h2>
                            <p className="text-zinc-400 leading-relaxed text-base">
                                Following the success of previous campaigns, I continued my collaboration with Utop to produce a promotional TVC specifically targeting their "Smart Menu" feature. The goal was to communicate the speed, ease of use, and convenience of ordering ahead to skip the line.
                            </p>
                        </section>

                        <Separator className="bg-white/10" />

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Workflow & Execution</h2>

                            <div className="space-y-8">
                                <div className="relative pl-6 border-l-2 border-red-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-red-400" />
                                        Concept & Production
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Designed the visual flow of the commercial to effectively highlight the UI of the Utop app while telling a relatable story of a busy customer saving time. Managed the shoot to capture vibrant, engaging lifestyle footage.
                                    </p>
                                </div>

                                <div className="relative pl-6 border-l-2 border-red-500/30">
                                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                                        <Video className="h-4 w-4 text-red-400" />
                                        Post-Production & Motion Graphics
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Executed the video editing with a focus on upbeat pacing. Integrated custom motion graphics using After Effects to animate the app interface elements, ensuring the product features were clearly demonstrated within the live-action context.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                                Tech Stack & Roles
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Filming", "Premiere Pro", "After Effects", "Motion Graphics"].map((tech) => (
                                    <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-300">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 space-y-5">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Client</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">Utop (FPT Software)</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Role</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">Director, Editor, Motion Designer</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Type</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">App Promo TVC</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
