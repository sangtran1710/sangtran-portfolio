import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BrainCircuit, Clock3, ScanSearch } from "lucide-react";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/learn/markdown-content";
import { getKnowledgePillar } from "@/data/knowledge-map";
import { getAdjacentLessons, getAllLessons, getLesson, getTopic } from "@/lib/content";

type LessonPageProps = {
  params: Promise<{ topic: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    topic: lesson.topic,
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { topic, slug } = await params;
  const lesson = getLesson(topic, slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found",
    };
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { topic, slug } = await params;
  const lesson = getLesson(topic, slug);
  const topicMeta = getTopic(topic);

  if (!lesson || !topicMeta) {
    notFound();
  }

  const adjacent = getAdjacentLessons(lesson.topic, lesson.slug);
  const pillar = lesson.pillar ? getKnowledgePillar(lesson.pillar) : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Link href={`/learn/${lesson.topic}`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to {topicMeta.name}
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="panel overflow-hidden">
          <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-teal-300/[0.06] px-6 py-7 sm:px-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className={`uppercase tracking-[0.24em] ${topicMeta.accent}`}>{topicMeta.shortName}</span>
              {pillar ? (
                <>
                  <span>/</span>
                  <span>{pillar.title}</span>
                </>
              ) : null}
              <span>/</span>
              <span>{lesson.level}</span>
              <span>/</span>
              <span>{lesson.duration}</span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{lesson.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{lesson.description}</p>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <MarkdownContent content={lesson.content} />
          </div>
        </article>

        <aside className="space-y-4">
          <section className="panel p-6">
            <p className="eyebrow">Quick Actions</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {lesson.topic === "shaders" ? (
                <Link
                  href="/learn/start-here"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Start Here
                </Link>
              ) : null}
              <Link
                href={`/practice/${lesson.topic}`}
                className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
              >
                <BrainCircuit className="h-4 w-4" />
                Practice
              </Link>
              <Link
                href={`/learn/${lesson.topic}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Topic hub
              </Link>
            </div>
          </section>

          <details className="disclosure">
            <summary>Lesson facts</summary>
            <div className="disclosure-content space-y-3">
              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-teal-200" />
                <span>{lesson.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <ScanSearch className="h-4 w-4 text-teal-200" />
                <span>Aligned with backend-scored practice</span>
              </div>
            </div>
          </details>

          <details className="disclosure">
            <summary>Objectives</summary>
            <div className="disclosure-content">
              <ul className="space-y-2">
                {lesson.objectives.map((objective) => (
                  <li key={objective}>- {objective}</li>
                ))}
              </ul>
            </div>
          </details>

          {lesson.prerequisites?.length ? (
            <details className="disclosure">
              <summary>Before this lesson</summary>
              <div className="disclosure-content">
                <ul className="space-y-2">
                  {lesson.prerequisites.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ) : null}

          <details className="disclosure" open>
            <summary>Continue reading</summary>
            <div className="disclosure-content space-y-4">
              {adjacent.previous ? (
                <Link
                  href={`/learn/${adjacent.previous.topic}/${adjacent.previous.slug}`}
                  className="block rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                >
                  <p className="micro-label">Previous</p>
                  <p className="mt-2 text-white">{adjacent.previous.title}</p>
                </Link>
              ) : null}
              {adjacent.next ? (
                <Link
                  href={`/learn/${adjacent.next.topic}/${adjacent.next.slug}`}
                  className="block rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                >
                  <p className="micro-label">Next</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-white">{adjacent.next.title}</p>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                </Link>
              ) : null}
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}
