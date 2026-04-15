import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";

import { ShaderPillarSections } from "@/components/learn/shader-pillar-sections";
import { SHADER_KNOWLEDGE_PILLARS, SHADER_START_HERE_STEPS } from "@/data/knowledge-map";
import { getTopicSummary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learning Library",
  description: "A knowledge map for shader foundations, HLSL/GLSL, optimization, tricks, and technical English.",
};

export default function LearnPage() {
  const shaderSummary = getTopicSummary("shaders");
  const englishSummary = getTopicSummary("english");

  if (!shaderSummary || !englishSummary) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-8">
          <section className="panel overflow-hidden" id="overview">
            <div className="bg-grid px-8 py-10 sm:px-10">
              <div className="flex flex-wrap gap-2">
                <span className="topic-pill border-teal-300/20 bg-teal-300/10 text-teal-50">Knowledge Map</span>
                <span className="topic-pill">Shader-first learning path</span>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
                <div>
                  <p className="eyebrow">Library</p>
                  <h1 className="section-title mt-4">Study shaders in a sequence that stays readable.</h1>
                  <p className="section-copy mt-4">
                    Start with the map, move through the four core shader pillars, and keep technical English as a support
                    lane instead of mixing everything together.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/learn/start-here"
                      className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-6 py-3 font-medium text-slate-950 transition hover:bg-white"
                    >
                      Open Start Here
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

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
                  <p className="micro-label">Current map</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="micro-label">Shader lessons</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{shaderSummary.counts.lessons}</p>
                    </div>
                    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="micro-label">Shader questions</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{shaderSummary.counts.questions}</p>
                    </div>
                    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="micro-label">Core pillars</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{SHADER_KNOWLEDGE_PILLARS.length}</p>
                    </div>
                    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="micro-label">Support lane</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{englishSummary.counts.lessons}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="panel p-6 sm:p-8" id="start-here">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Start Here</p>
                <h2 className="section-title mt-4">Follow a fixed path before you branch out.</h2>
              </div>
              <Link href="/learn/start-here" className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 hover:text-white">
                Full onboarding page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

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

          <section id="pillars">
            <div className="mb-4">
              <p className="eyebrow">Shader Taxonomy</p>
              <h2 className="section-title mt-4">Four pillars. One clean map.</h2>
            </div>
            <ShaderPillarSections lessons={shaderSummary.lessons} />
          </section>

          <section className="panel p-6 sm:p-8" id="english">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="eyebrow">Support Track</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Technical English stays available, but secondary.</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  Keep English as a support lane for explaining tradeoffs, feedback, and production decisions after the
                  shader core is clear.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="topic-pill">{englishSummary.counts.lessons} lessons</span>
                <span className="topic-pill">{englishSummary.counts.questions} questions</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {englishSummary.lessons.map((lesson) => (
                <article key={lesson.slug} className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>{lesson.level}</span>
                    <span>/</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{lesson.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {lesson.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="topic-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/learn/${lesson.topic}/${lesson.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 transition hover:text-white"
                    >
                      Read lesson
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/practice/english"
                      className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                      Practice English
                    </Link>
                  </div>
                </article>
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
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#start-here">
                Start Here
              </Link>
              {SHADER_KNOWLEDGE_PILLARS.map((pillar) => (
                <Link
                  key={pillar.slug}
                  className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  href={`#${pillar.slug}`}
                >
                  {pillar.title}
                </Link>
              ))}
              <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#english">
                Technical English
              </Link>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
