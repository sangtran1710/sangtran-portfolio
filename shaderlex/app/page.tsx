import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, ScanSearch } from "lucide-react";

import { FEATURE_CALLOUTS, PRODUCT_MODULES } from "@/data/topics";
import { getTopicIcon } from "@/lib/helpers";
import { getAllLessons, getFeaturedLessons, getTopicSummary, getTopics } from "@/lib/content";

export default function HomePage() {
  const topics = getTopics();
  const featuredLessons = getFeaturedLessons(4);
  const lessonCount = getAllLessons().length;
  const questionCount = topics.reduce((total, topic) => total + (getTopicSummary(topic.slug)?.counts.questions ?? 0), 0);

  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-300/14 via-cyan-300/6 to-amber-300/10" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap gap-2">
              <span className="topic-pill border-teal-300/20 bg-teal-300/10 text-teal-50">ShaderLex</span>
              <span className="topic-pill">Backend-scored practice</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Read less. Recall more.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Public shader notes and technical English drills with answer checking handled on submit.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-6 py-3 font-medium text-slate-950 transition hover:bg-white"
              >
                Library
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/practice/shaders"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-slate-100 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Start shader practice
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-4">
                <p className="micro-label">Lessons</p>
                <p className="mt-3 text-3xl font-semibold text-white">{lessonCount}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-4">
                <p className="micro-label">Questions</p>
                <p className="mt-3 text-3xl font-semibold text-white">{questionCount}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-4">
                <p className="micro-label">Tracks</p>
                <p className="mt-3 text-3xl font-semibold text-white">{topics.length}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="panel p-6">
            <p className="eyebrow">Quick Read</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <p>Notes first.</p>
              <p>Random set second.</p>
              <p>Backend scan on submit.</p>
            </div>
          </div>

          <details className="disclosure">
            <summary>Who this is for</summary>
            <div className="disclosure-content">
              <ul className="space-y-2">
                <li>- Technical artists building deeper shader intuition</li>
                <li>- VFX artists improving optimization language</li>
                <li>- Candidates practicing international interview English</li>
              </ul>
            </div>
          </details>
        </section>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="panel relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300/12 via-cyan-300/6 to-transparent" />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div>
              <p className="eyebrow">Core Track</p>
              <h2 className="section-title mt-4">Shader Systems is the center of the product now.</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Keep the product anchored on the work that matters most: vector math, lighting logic, profiling habits,
                and the production language needed to explain tradeoffs clearly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/practice/shaders"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
                >
                  Start shader session
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/learn/shaders"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Review notes first
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-teal-300/12 bg-slate-950/45 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-teal-100/70">What you rehearse</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-200" />
                  <p>How dot products, normals, and view direction fit together in real shader decisions.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-200" />
                  <p>How to spot when overdraw, layering, or shader cost is the real production risk.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-200" />
                  <p>How to explain fallback paths and optimization tradeoffs without sounding hand-wavy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Tracks</p>
            <h2 className="section-title mt-4">Pick a lane and start fast.</h2>
          </div>
          <Link href="/practice" className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 hover:text-white">
            All practice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {topics.map((topic) => {
            const summary = getTopicSummary(topic.slug);

            return (
              <article key={topic.slug} className="panel p-6 transition hover:-translate-y-0.5">
                <div className={`h-1 rounded-full bg-gradient-to-r ${topic.color}`} />
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className={`text-sm uppercase tracking-[0.24em] ${topic.accent}`}>{topic.shortName}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{topic.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="topic-pill">{summary?.counts.lessons ?? 0} lessons</span>
                    <span className="topic-pill">{summary?.counts.questions ?? 0} questions</span>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{topic.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/learn/${topic.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                  >
                    Notes
                  </Link>
                  <Link
                    href={`/practice/${topic.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-white"
                  >
                    Practice
                  </Link>
                </div>

                <details className="disclosure mt-5">
                  <summary>Show outcomes</summary>
                  <div className="disclosure-content">
                    <ul className="space-y-2">
                      {topic.outcomes.map((outcome) => (
                        <li key={outcome}>- {outcome}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lessons</p>
            <h2 className="section-title mt-4">Featured notes.</h2>
          </div>
          <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 hover:text-white">
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          {featuredLessons.map((lesson) => (
            <article
              key={`${lesson.topic}-${lesson.slug}`}
              className="panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  {(() => {
                    const TopicIcon = getTopicIcon(lesson.topic);

                    return <TopicIcon className="h-4 w-4 text-teal-200" />;
                  })()}
                  <span>{getTopicSummary(lesson.topic)?.topic.name}</span>
                  <span>/</span>
                  <span>{lesson.duration}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">{lesson.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{lesson.summary}</p>
              </div>

              <Link
                href={`/learn/${lesson.topic}/${lesson.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 transition hover:text-white"
              >
                Read
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PRODUCT_MODULES.map((module) => (
            <article key={module.title} className="panel p-5">
              <module.icon className="h-5 w-5 text-teal-200" />
              <h3 className="mt-4 text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{module.description}</p>
            </article>
          ))}
        </div>

        <details className="disclosure mt-6">
          <summary>Show system notes</summary>
          <div className="disclosure-content">
            <div className="grid gap-4 md:grid-cols-3">
              {FEATURE_CALLOUTS.map((feature) => (
                <div key={feature.title} className="rounded-[1.1rem] border border-white/10 bg-slate-950/35 p-4">
                  <feature.icon className="h-5 w-5 text-amber-200" />
                  <p className="mt-3 font-medium text-white">{feature.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="panel flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Launch Path</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Keep this as its own product.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/practice/shaders"
              className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
            >
              <BrainCircuit className="h-4 w-4" />
              Quiz now
            </Link>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              <ScanSearch className="h-4 w-4" />
              Progress
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
