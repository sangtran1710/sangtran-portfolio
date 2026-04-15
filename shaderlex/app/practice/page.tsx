import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ScanSearch } from "lucide-react";

import { getTopicSummary, getTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Practice Hub",
  description: "Open randomized shader and technical English practice sessions in ShaderLex.",
};

export default function PracticePage() {
  const topics = getTopics();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="panel relative overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-transparent to-amber-300/10" />
        <div className="relative">
          <p className="eyebrow">Practice Hub</p>
          <h1 className="section-title mt-4">Randomized active recall for every topic track.</h1>
          <p className="section-copy mt-4">
            Every live track now follows the same backend-scored recall flow: open a topic, answer a short set, and use
            the scan to see where your understanding is solid or still too vague.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {topics.map((topic) => {
          const summary = getTopicSummary(topic.slug);

          return (
            <article key={topic.slug} className="panel p-6 sm:p-8">
              <div className={`h-1 rounded-full bg-gradient-to-r ${topic.color}`} />
              <p className={`mt-6 text-sm uppercase tracking-[0.24em] ${topic.accent}`}>{topic.shortName}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{summary?.quizBank.title}</h2>
              <p className="mt-4 text-slate-300">{summary?.quizBank.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="topic-pill">{summary?.counts.questions ?? 0} questions</span>
                <span className="topic-pill">{summary?.quizBank.estimatedTime}</span>
                <span className="topic-pill">Server-side answer scan</span>
                {summary?.quizBank.buckets?.length ? <span className="topic-pill">{summary.quizBank.buckets.length} buckets</span> : null}
              </div>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                {topic.practiceFocus.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <BrainCircuit className="h-4 w-4 text-teal-200" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {summary?.quizBank.buckets?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {summary.quizBank.buckets.map((bucket) => (
                    <span key={bucket.id} className="topic-pill border-sky-200/15 bg-slate-950/35 text-slate-200">
                      {bucket.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/practice/${topic.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
                >
                  Start session
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/learn/${topic.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Review notes first
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <section className="panel mt-8 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <ScanSearch className="mt-1 h-5 w-5 text-amber-200" />
          <div>
            <h2 className="text-2xl font-semibold text-white">Current scoring model</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              The answer key now lives in the backend quiz files. That gives us cleaner public practice flow and keeps the
              grading logic separate from the interface you expose to users.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Shader systems and technical English now share one consistent practice loop, which makes the product feel
              tighter and easier to extend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
