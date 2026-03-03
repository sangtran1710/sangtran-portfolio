import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "TradingPower Tool v9.2 — AE Plugin Case Study",
  description:
    "A ScriptUI panel for After Effects that automates trading and financial education video editing with standardized branding and motion tools.",
};

export default function TradingPowerToolPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link
          href="/rnd"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-teal-500/10 text-teal-400 hover:bg-teal-500/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Motion Graphics · AE Plugin
            </Badge>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              Tooling & Automation
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.1em] text-white mb-4">
            TradingPower Tool v9.2
          </h1>
          <p className="text-zinc-400 text-lg">
            A professional ScriptUI panel for Adobe After Effects that standardizes branding and accelerates trading /
            financial education video editing.
          </p>
        </div>

        {/* Hero: YouTube walkthrough */}
        <div
          className="relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-10 border border-white/10"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            src="https://www.youtube.com/embed/5AH8Ys5XTQI?si=baN_i0LOqXwobX9d"
            title="TradingPower Tool v9.2 — Quick Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Project Overview</h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                TradingPower Tool was built to solve a very specific production problem: editing large batches of trading
                and financial education videos while keeping typography, motion language, and color branding perfectly
                consistent. Instead of rebuilding the same layouts and animations by hand, the tool exposes a ScriptUI
                panel that generates ready-to-use compositions and presets inside After Effects.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                The panel ships with a gold-accented visual identity (Bebas Neue type system, branded highlight styles)
                and a set of motion helpers that map directly to typical trading content: chart highlights, zoom-ins on
                key areas, meme-style fullscreen frames, and audit utilities to keep everything on-brand.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Technique & Implementation</h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                The plugin is written in <strong className="text-zinc-200">Extended JavaScript (ExtendScript)</strong>, the scripting
                engine used by Adobe After Effects. ScriptUI is used to build the panel UI (buttons, dropdowns, inputs);
                ExtendScript then drives the After Effects API to create compositions, apply animation presets (.ffx),
                and run consistency checks. This keeps the tool lightweight, install-free, and fully integrated with the
                host application.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                Key techniques: programmatic composition and layer creation, batch application of .ffx motion presets,
                layer naming and style audits, and coordinate math for the Super Zoom tool (selection bounds → keyframed
                scale and position).
              </p>
            </section>

            <Separator className="bg-white/10" />

            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Key Features</h2>
              <div className="space-y-6">
                <FeatureBlock
                  title="Standardized Typography & Titles"
                  description="Generate lesson titles, section headers, and lower-third text with a single click. All text elements share the same font, weight, and animation style to keep long-form courses visually consistent."
                />
                <FeatureBlock
                  title="Dynamic Highlights for Charts"
                  description="Circle FX and basic highlight presets are bundled as .ffx files. The panel applies them to selected layers, making it easy to call attention to price zones, support/resistance, or key candles."
                />
                <FeatureBlock
                  title="Super Zoom Tool"
                  description="Draw a rectangle over the area of interest, select it with your video layer, then run Super Zoom. The script automatically builds animated zoom-in/zoom-out moves that respect safe margins and timing."
                />
                <FeatureBlock
                  title="Fullscreen Meme & Overlay Frames"
                  description="Quickly generate branded fullscreen overlays for memes, transitions, or emphasis moments. The presets handle GIF looping, text styling, and screen framing so editors can focus on timing and storytelling."
                />
                <FeatureBlock
                  title="Audit & Consistency Checks"
                  description="Run an audit on the active composition to ensure fonts, colors, and layer naming follow the TradingPower guidelines before delivery. This keeps multi-video batches aligned with the same brand system."
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                Tech Stack & Role
              </h3>
              <div className="flex flex-wrap gap-2">
                {["After Effects ScriptUI", "Extended JavaScript (ExtendScript)", "Animation Presets (.ffx)"].map((tech) => (
                  <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-300">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Role</p>
                  <p className="text-sm font-medium text-zinc-200 mt-1">Tool Author · Motion Designer</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Use Case</p>
                  <p className="text-sm font-medium text-zinc-200 mt-1">
                    Trading channels, financial education, YouTube content
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Repository</h3>
              <p className="text-zinc-400 text-sm">
                Full source code, presets, and installation guide are available on GitHub.
              </p>
              <a
                href="https://github.com/sangtran1710/TradingPower-Tool"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                <Code2 className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative pl-6 border-l-2 border-teal-500/30">
      <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-teal-400" />
        {title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

