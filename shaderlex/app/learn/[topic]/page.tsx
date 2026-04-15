import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, BrainCircuit, ScanSearch } from "lucide-react";
import { notFound } from "next/navigation";

import { ShaderPillarSections } from "@/components/learn/shader-pillar-sections";
import { SHADER_KNOWLEDGE_PILLARS } from "@/data/knowledge-map";
import { getTopicSummary, getTopics } from "@/lib/content";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const summary = getTopicSummary(topic);

  if (!summary) {
    return {
      title: "Topic Not Found",
    };
  }

  return {
    title: summary.topic.name,
    description: summary.topic.seoDescription,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const summary = getTopicSummary(topic);

  if (!summary) {
    notFound();
  }

  if (summary.topic.slug === "shaders") {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <section className="panel p-8 sm:p-10" id="overview">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className={`text-sm uppercase tracking-[0.24em] ${summary.topic.accent}`}>{summary.topic.shortName}</p>
                  <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{summary.topic.name}</h1>
                  <p className="mt-4 text-base leading-8 text-slate-300">{summary.topic.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="topic-pill">{summary.counts.lessons} lessons</span>
                  <span className="topic-pill">{summary.counts.questions} questions</span>
                  <span className="topic-pill">{SHADER_KNOWLEDGE_PILLARS.length} pillars</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/learn/start-here"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
                >
                  <BookOpenText className="h-4 w-4" />
                  Start Here
                </Link>
                <Link
                  href={`/practice/${summary.topic.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  <ScanSearch className="h-4 w-4" />
                  Practice
                </Link>
              </div>
            </section>

            <section id="pillars">
              <div className="mb-4">
                <p className="eyebrow">Topic Taxonomy</p>
                <h2 className="section-title mt-4">Read by pillar, not by random order.</h2>
              </div>
              <ShaderPillarSections lessons={summary.lessons} />
            </section>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-28 panel p-5">
              <p className="micro-label">Jump to pillar</p>
              <nav className="mt-4 space-y-2 text-sm">
                <Link className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white" href="#overview">
                  Overview
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
              </nav>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="panel p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={`text-sm uppercase tracking-[0.24em] ${summary.topic.accent}`}>{summary.topic.shortName}</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{summary.topic.name}</h1>
            <p className="mt-4 text-sm text-slate-300">{summary.topic.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="topic-pill">{summary.counts.lessons} lessons</span>
            <span className="topic-pill">{summary.counts.questions} questions</span>
            <span className="topic-pill">{summary.quizBank.sessionSize} per set</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/practice/${summary.topic.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
          >
            <ScanSearch className="h-4 w-4" />
            Start session
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            All practice
          </Link>
        </div>

        <details className="disclosure mt-6">
          <summary>Show track details</summary>
          <div className="disclosure-content">
            <p>{summary.topic.description}</p>
            <ul className="mt-4 space-y-2">
              {summary.topic.outcomes.map((outcome) => (
                <li key={outcome}>- {outcome}</li>
              ))}
            </ul>
          </div>
        </details>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lessons</p>
            <h2 className="section-title mt-4">Read, then switch to recall.</h2>
          </div>
          <Link href="/practice" className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 hover:text-white">
            View all tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          {summary.lessons.map((lesson) => (
            <article key={lesson.slug} className="panel p-5 transition hover:-translate-y-0.5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <BookOpenText className="h-4 w-4 text-teal-200" />
                    <span>{lesson.duration}</span>
                    <span>/</span>
                    <span>{lesson.level}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{lesson.summary}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/learn/${summary.topic.slug}/${lesson.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 transition hover:text-white"
                  >
                    Read
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/practice/${summary.topic.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                  >
                    <BrainCircuit className="h-4 w-4" />
                    Practice
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
