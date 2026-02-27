import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Video, Clapperboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Utop Event TVCs — Commercial Production",
    description:
        "A collection of early commercial and event highlight videos produced for Utop, featuring the Thang Long event.",
};

export default function UtopEventsPage() {
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
                            Commercial Production
                        </Badge>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                            Event Highlights
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
                        Utop <span className="text-red-400">Early Works</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        A look back at some of my early commercial-style event coverage and promotional videos produced during my time at Utop (FPT Software) 5 years ago.
                    </p>
                </div>

                {/* Main Video Embed: Thang Long */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                        <Clapperboard className="h-5 w-5 text-red-400" />
                        Featured: Utop Thang Long Event
                    </h2>
                    <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 border border-white/10"
                        style={{ paddingTop: "56.25%" }}>
                        <iframe
                            src="https://www.youtube.com/embed/58BtY3YE4Z0?si=u7lF5BZg-nHPfwUo"
                            title="Utop Thang Long"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Project Overview</h2>
                            <p className="text-zinc-400 leading-relaxed text-base">
                                These videos represent some of my foundational work as a Video Producer at Utop, around 5 years ago. My responsibilities covered the complete pipeline of on-location shooting, directing talent, and post-production (editing and motion graphics). The featured video highlights the vibrant atmosphere of the Utop Thang Long event, capturing the energy and engagement of the app's ecosystem.
                            </p>
                        </section>

                        <Separator className="bg-white/10" />

                        {/* Other Videos Grid */}
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Additional Archives</h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Video 2 */}
                                <div className="space-y-2">
                                    <div className="relative w-full overflow-hidden rounded-lg bg-zinc-900 border border-white/5" style={{ paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://www.youtube.com/embed/roIIubzn-CE?si=hYbYFZahgPXkmLad"
                                            title="Utop Promo 2"
                                            allowFullScreen
                                            className="absolute top-0 left-0 w-full h-full"
                                        ></iframe>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-300">Utop Promotional Clip</p>
                                </div>

                                {/* Video 3 */}
                                <div className="space-y-2">
                                    <div className="relative w-full overflow-hidden rounded-lg bg-zinc-900 border border-white/5" style={{ paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://www.youtube.com/embed/r6ApXnkZ3rA"
                                            title="Utop Promo 3"
                                            allowFullScreen
                                            className="absolute top-0 left-0 w-full h-full"
                                        ></iframe>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-300">Utop App Coverage</p>
                                </div>

                                {/* Video 4 */}
                                <div className="space-y-2">
                                    <div className="relative w-full overflow-hidden rounded-lg bg-zinc-900 border border-white/5" style={{ paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://www.youtube.com/embed/51hriuPb5I8"
                                            title="Utop Promo 4"
                                            allowFullScreen
                                            className="absolute top-0 left-0 w-full h-full"
                                        ></iframe>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-300">Utop Event Highlights</p>
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
                                {["Filming", "Premiere Pro", "After Effects", "Directing"].map((tech) => (
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
                                <p className="text-sm font-medium text-zinc-200 mt-1">Video Producer, Editor, Videographer</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Type</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">Commercial / Event Coverage (Archive)</p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Year</p>
                                <p className="text-sm font-medium text-zinc-200 mt-1">~2019-2020</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
