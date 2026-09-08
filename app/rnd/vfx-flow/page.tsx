import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Terminal, Wrench, Lock, Layers, Zap } from "lucide-react";
import QualityGatePreview from "@/components/projects/vfx-flow/QualityGatePreview";

export const metadata: Metadata = {
  title: "VFX Flow — Production Asset Validator & Perforce Submission Tool",
  description:
    "A lightweight, non-intrusive pipeline companion tool built for a confidential AAA production (PROJECT-TITAN) to automate asset QC, protect shared repositories, and streamline Perforce submissions.",
  alternates: {
    canonical: "/rnd/vfx-flow",
  },
  openGraph: {
    title: "VFX Flow | Henry Tran",
    description:
      "A deep dive into building an automated asset quality control gatekeeper, work log rollover engine, and Perforce staging toolkit for AAA game production.",
    url: "/rnd/vfx-flow",
    images: ["/projects/vfx-flow/showcase_asset_qc_ready.png"],
  },
};

const facts = [
  { label: "Role", value: "VFX Technical Artist / Pipeline Tool Developer" },
  { label: "Production Target", value: "Confidential AAA Action Title (PROJECT-TITAN)" },
  { label: "Built with", value: "PowerShell 5.1, WPF (XAML), Python, Perforce CLI, Task Scheduler" },
];

const metrics = [
  {
    number: "< 2 min",
    label: "Submission Prep Time",
    subtext: "Down from 15 mins of manual checklists",
  },
  {
    number: "100%",
    label: "Shared Library Protection",
    subtext: "Guarded against accidental /fx_library/ edits",
  },
  {
    number: "0 WIP Loss",
    label: "Automated Nightly Shelve",
    subtext: "Scheduled 23:00 Perforce backup pass",
  },
  {
    number: "8 Rules",
    label: "Automated Validation",
    subtext: "Naming, syntax, thumbnails & particle budgets",
  },
];

export default function VfxFlowPage() {
  return (
    <article className="bg-[#070a0f] text-white">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:px-10">
        <Link
          href="/portfolio#rnd"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Experiments
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5c9d98]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#7db5b0] border border-[#5c9d98]/25">
                <Wrench className="h-3.5 w-3.5" />
                Pipeline Tooling & Quality Gate
              </span>
              <span className="text-xs text-zinc-500 font-mono">PROJECT-TITAN</span>
            </div>
            <h1 className="max-w-4xl font-kanit text-5xl font-light leading-none sm:text-6xl lg:text-7xl">
              VFX Flow
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            A production pipeline toolkit and automated quality gatekeeper engineered to eliminate 
            asset submission rejections, protect shared game repositories, and accelerate daily artist workflows.
          </p>
        </div>

        {/* Fact metadata bar */}
        <dl className="mt-12 grid border-y border-white/10 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="py-5 sm:border-r sm:border-white/10 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <dt className="text-xs text-white/45">{fact.label}</dt>
              <dd className="mt-1 text-sm font-medium text-white/85">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Key Metrics Banner */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
            >
              <div className="font-kanit text-3xl font-normal text-[#a7d2ce] sm:text-4xl">
                {m.number}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/90">
                {m.label}
              </div>
              <p className="mt-1 text-xs text-white/50">{m.subtext}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Hero Video Section */}
      <section aria-label="VFX Flow live screencast" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <video
            className="aspect-video w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/projects/vfx-flow/showcase_asset_qc_ready.png"
          >
            <source src="/projects/vfx-flow/showcase.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
          <span>Live screencast: Work Log, Asset QC Gate, and Perforce Submission Staging</span>
          <span className="font-mono">WPF / XAML GUI · Multi-Threaded Runspaces</span>
        </div>
      </section>

      {/* The Core Problem */}
      <section className="bg-[#0e131b] py-20 text-white border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0] mb-2">
                Production Context
              </p>
              <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">
                Why 6 PM submissions break AAA builds
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-zinc-300 sm:text-lg">
              <p>
                In high-velocity AAA development, artists work up to the deadline before committing 
                large changelists to Perforce. With dozens of interrelated files (.visualeffect, .material, .texture, .model), 
                manual checks fail under pressure.
              </p>
              <div className="grid gap-6 sm:grid-cols-3 pt-4">
                <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-4">
                  <h3 className="font-semibold text-rose-300 text-sm mb-1">Naming & Syntax Errors</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Forbidden substrings like &apos;_vfx&apos; or incorrect texture suffixes break automated build packaging.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
                  <h3 className="font-semibold text-amber-300 text-sm mb-1">Shared Library Regressions</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Accidental check-ins to common /fx_library/ files silently break assets across the entire studio.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-4">
                  <h3 className="font-semibold text-blue-300 text-sm mb-1">Uncommitted WIP Loss</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Unshelved local experiments risk corruption or accidental overwrites during daily mainline syncs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 1: Automated Asset QC & Submission Gate */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
            Pillar 01
          </span>
          <h2 className="mt-2 font-kanit text-3xl font-light sm:text-4xl">
            Automated Asset QC & Readiness Gate
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            A static analysis engine scans authored files before any changelist can be created. 
            Try toggling the interactive gate below to inspect how violations are caught and resolved.
          </p>
        </div>

        <QualityGatePreview />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <ShieldCheck className="h-5 w-5 text-[#5c9d98] mb-3" />
            <h3 className="text-base font-medium text-white">8-Rule Validation Engine</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Enforces strict lowercase tokens, forbidden substring filters (_vfx, _fx, _gp), 
              map suffixes (_c, _n, _g, _m), and VFX descriptor hierarchies.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <Zap className="h-5 w-5 text-[#5c9d98] mb-3" />
            <h3 className="text-base font-medium text-white">Particle Budget Heuristics</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Parses particle system capacities and flags configurations exceeding 30,000 particles 
              before runtime profiling to prevent catastrophic overdraw spikes.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <Layers className="h-5 w-5 text-[#5c9d98] mb-3" />
            <h3 className="text-base font-medium text-white">Integrity & AssetKit Audits</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Verifies mandatory .thumbnail presence for all materials and effects, ensuring 
              assets never ship with missing editor icons or broken AssetKit links.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 2: Production Work Log */}
      <section className="bg-[#0b0e14] py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
                Pillar 02
              </span>
              <h2 className="mt-2 font-kanit text-3xl font-light sm:text-4xl">
                Command-Driven Work Log & Rollover Engine
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300">
                Context-switching between Jira, Perforce, and DCC viewports slows artists down. 
                VFX Flow provides an ultra-fast inline terminal interface for tracking daily production beats.
              </p>

              <ul className="mt-8 space-y-4 text-sm text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#5c9d98] mt-1 shrink-0" />
                  <span>
                    <strong className="text-white">Inline Shorthand:</strong> Fast input supporting tags like{" "}
                    <code className="text-xs bg-white/10 px-1 py-0.5 rounded text-zinc-200">!high</code>,{" "}
                    <code className="text-xs bg-white/10 px-1 py-0.5 rounded text-zinc-200">@today</code>, and{" "}
                    <code className="text-xs bg-white/10 px-1 py-0.5 rounded text-zinc-200">cl:10523140</code>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#5c9d98] mt-1 shrink-0" />
                  <span>
                    <strong className="text-white">Task Rollover:</strong> Incomplete tasks automatically move to the next day with a slip-day counter (<code className="text-xs text-rose-300">+9d</code>).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#5c9d98] mt-1 shrink-0" />
                  <span>
                    <strong className="text-white">Brief PDF Parser:</strong> Uses PyMuPDF to extract task names, due dates, and review notes directly from review briefs.
                  </span>
                </li>
              </ul>
            </div>

            <figure className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              <Image
                src="/projects/vfx-flow/showcase_work_log.png"
                alt="VFX Flow Work Log interface with color-coded status rows and rollover banner"
                width={1200}
                height={675}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <figcaption className="p-4 text-xs text-zinc-500 border-t border-white/10 bg-[#0c1017]">
                Color-coded task states: Done (Green), Doing (Amber), Waiting (Blue), Blocked (Red with slip counter).
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Pillar 3: Perforce Submission & Library Guard */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <figure className="order-2 lg:order-1 overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
            <Image
              src="/projects/vfx-flow/showcase_submission_workflow.png"
              alt="Perforce Submission staging interface with color-coded asset families and dual-format descriptions"
              width={1200}
              height={675}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <figcaption className="p-4 text-xs text-zinc-500 border-t border-white/10 bg-[#0c1017]">
              P4 Submission Manager: Smart file visualization, dual description generators, and scheduled 23:00 auto-shelve.
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0]">
              Pillar 03
            </span>
            <h2 className="mt-2 font-kanit text-3xl font-light sm:text-4xl">
              Perforce Automation & Shared Library Guard
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Writing accurate changelist descriptions and sorting asset dependencies by hand is prone to oversight. 
              VFX Flow automates the entire Perforce staging pass.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5c9d98]/10 text-[#7db5b0]">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Shared Library Protection Gate</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Intercepts changelists touching common directories like <code className="text-zinc-200">/fx_library/</code> or <code className="text-zinc-200">/shared/</code>, 
                    locking submission until an explicit supervisor override is granted.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5c9d98]/10 text-[#7db5b0]">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Dual-Format Description Generator</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Produces synchronized internal sync check blocks for lead reviews alongside formal 
                    bulleted descriptions for formal Perforce P4V changelist commits with one click.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5c9d98]/10 text-[#7db5b0]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Automated Nightly Shelve at 23:00</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    A background Windows Task Scheduler passes checked-out assets into a pending shelf 
                    every night without reverting local changes, guaranteeing zero lost progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Engineering Decisions */}
      <section className="bg-[#0b0e12] py-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0] mb-2">
                Engineering
              </p>
              <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">
                Technical decisions
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white">Multi-Threaded Runspaces for Smooth 60 FPS UI</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Perforce CLI queries and regex file scans can block the main application thread on large workspaces. 
                  I designed the backend using isolated PowerShell Runspaces, offloading heavy I/O operations asynchronously 
                  so the XAML WPF interface remains responsive with zero UI freezing.
                </p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white">Asset-Only Sandboxing Boundary</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  The tool operates strictly in user-space without requiring administrative privileges or intrusive daemons. 
                  It interacts purely through standard Perforce CLI wrappers, ensuring safe, frictionless deployment on production workstations.
                </p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white">Confidentiality & NDA Sanitization</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Built and verified in real production at Sparx* for a confidential AAA action-adventure project. 
                  All depot paths, client identifiers, and project codenames in this showcase have been sanitized to{" "}
                  <code className="text-[#a7d2ce]">PROJECT-TITAN</code> and <code className="text-[#a7d2ce]">[STUDIO-FX]</code> in full accordance with client non-disclosure agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t border-white/10 bg-[#070a0f] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-10">
          <div>
            <h3 className="font-kanit text-xl text-white">Looking for hands-on pipeline & VFX support?</h3>
            <p className="mt-1 text-sm text-zinc-400">Open to senior remote roles, freelance VFX, and studio tool development.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/portfolio#rnd"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              All Experiments
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#5c9d98] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#538f8a]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
