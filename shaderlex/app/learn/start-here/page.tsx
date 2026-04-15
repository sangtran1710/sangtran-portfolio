import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";

import {
  SHADER_BUILD_FLOW,
  SHADER_KNOWLEDGE_PILLARS,
  SHADER_START_HERE_STEPS,
  START_HERE_RULES,
} from "@/data/knowledge-map";

export const metadata: Metadata = {
  title: "Start Here",
  description: "A guided starting point for learning shaders in ShaderLex.",
};

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-8">
          <section className="panel overflow-hidden" id="overview">
            <div className="bg-grid px-8 py-10 sm:px-10">
              <p className="eyebrow">Start Here</p>
              <h1 className="section-title mt-4">Use ShaderLex like a roadmap, not a pile of notes.</h1>
              <p className="section-copy mt-4">
                The fastest route is simple: foundations first, language patterns second, build flow third, optimization
                fourth, and tricks only after the logic is clear.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-6 py-3 font-medium text-slate-950 transition hover:bg-white"
                >
                  Open knowledge map
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/practice/shaders"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-slate-200 transition hover:border-white/20 hover:text-white"
                >
                  <ScanSearch className="h-4 w-4" />
                  Practice shaders
                </Link>
              </div>
            </div>
          </section>

          <section className="panel p-6 sm:p-8" id="roadmap">
            <p className="eyebrow">Roadmap</p>
            <h2 className="section-title mt-4">Follow this sequence.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {SHADER_START_HERE_STEPS.map((step) => (
                <Link
                  key={step.title}
                  href={step.href}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.05]"
                >
                  <p className="text-lg font-semibold text-white">{step.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="panel p-6 sm:p-8" id="build-flow">
            <p className="eyebrow">Build Flow</p>
            <h2 className="section-title mt-4">How to build a shader without getting lost.</h2>
            <div className="mt-8 space-y-4">
              {SHADER_BUILD_FLOW.map((step) => (
                <article
                  key={step.title}
                  className="flex flex-col gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-start"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-teal-200">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel p-6 sm:p-8" id="rules">
            <p className="eyebrow">Reading Rules</p>
            <h2 className="section-title mt-4">Three habits that keep the system useful.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {START_HERE_RULES.map((rule) => (
                <article key={rule} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm leading-7 text-slate-300">{rule}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel p-6 sm:p-8" id="pillars">
            <p className="eyebrow">Core Pillars</p>
            <h2 className="section-title mt-4">What you are actually learning.</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {SHADER_KNOWLEDGE_PILLARS.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/learn/shaders#${pillar.slug}`}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-teal-200">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="micro-label">{pillar.eyebrow}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{pillar.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-28 panel p-5">
            <p className="micro-label">On this page</p>
            <nav className="mt-4 space-y-2 text-sm">
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#overview">
                Overview
              </Link>
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#roadmap">
                Roadmap
              </Link>
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#build-flow">
                Build Flow
              </Link>
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#rules">
                Reading Rules
              </Link>
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#pillars">
                Core Pillars
              </Link>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
