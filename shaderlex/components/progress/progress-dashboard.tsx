"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock3, ScanSearch, TrendingUp } from "lucide-react";

import { PROGRESS_STORAGE_KEY, formatTopicLabel, getTopicMetricBarClass, getTopicMetricFillClass } from "@/lib/helpers";
import { TOPICS } from "@/data/topics";
import type { ProgressEntry } from "@/types/learning";

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function ProgressDashboard() {
  const [entries] = useState<ProgressEntry[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    const validTopics = new Set(TOPICS.map((topic) => topic.slug));
    const parsed = stored ? (JSON.parse(stored) as ProgressEntry[]) : [];
    return parsed.filter((entry) => validTopics.has(entry.topic));
  });

  if (entries.length === 0) {
    return (
      <div className="panel p-8 text-center">
        <p className="eyebrow">No sessions yet</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Progress shows up after your first scan.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/shaders"
            className="inline-flex items-center gap-2 rounded-full bg-teal-200 px-5 py-3 font-medium text-slate-950 transition hover:bg-white"
          >
            Start Shader Practice
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/practice/shaders"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Start Shader Practice
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Open Library
          </Link>
        </div>
      </div>
    );
  }

  const overallAverage = average(entries.map((entry) => entry.score));
  const averageAccuracy = average(entries.map((entry) => entry.accuracy)) * 100;
  const recentEntries = entries.slice(0, 6).reverse();
  const topicGroups = entries.reduce<Record<string, ProgressEntry[]>>((accumulator, entry) => {
    accumulator[entry.topic] = accumulator[entry.topic] ?? [];
    accumulator[entry.topic].push(entry);
    return accumulator;
  }, {});

  const topicStats = Object.entries(topicGroups).map(([topic, group]) => ({
    topic,
    average: average(group.map((entry) => entry.score)),
    attempts: group.length,
  })).sort((left, right) => {
    const leftIndex = TOPICS.findIndex((topic) => topic.slug === left.topic);
    const rightIndex = TOPICS.findIndex((topic) => topic.slug === right.topic);
    return leftIndex - rightIndex;
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <section className="panel p-6">
          <p className="eyebrow">Average</p>
          <p className="mt-3 text-5xl font-semibold text-white">{overallAverage.toFixed(1)}</p>
        </section>

        <section className="panel p-6">
          <p className="eyebrow">Accuracy</p>
          <p className="mt-3 text-5xl font-semibold text-white">{Math.round(averageAccuracy)}%</p>
        </section>

        <section className="panel p-6">
          <p className="eyebrow">Sessions</p>
          <p className="mt-3 text-5xl font-semibold text-white">{entries.length}</p>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="panel p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-teal-200" />
            <h2 className="text-xl font-semibold text-white">Recent Trend</h2>
          </div>

          <div className="mt-8 flex items-end gap-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-52 w-full items-end rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3">
                  <div
                    className={`w-full rounded-[1rem] ${getTopicMetricBarClass(entry.topic)}`}
                    style={{ height: `${entry.score * 10}%` }}
                  />
                </div>
                <div className="text-center text-xs text-slate-400">
                  <p>{entry.topicLabel}</p>
                  <p>{entry.score.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <section className="panel p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-teal-200" />
              <h2 className="text-xl font-semibold text-white">By Topic</h2>
            </div>
            <div className="mt-6 space-y-4">
              {topicStats.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{formatTopicLabel(topic.topic as ProgressEntry["topic"])}</span>
                    <span>{topic.average.toFixed(1)}</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-white/8">
                    <div
                      className={`h-full rounded-full ${getTopicMetricFillClass(topic.topic as ProgressEntry["topic"])}`}
                      style={{ width: `${topic.average * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <details className="disclosure">
            <summary>Latest coaching notes</summary>
            <div className="disclosure-content">
              <ul className="space-y-2">
                {entries[0].nextSteps.slice(0, 3).map((step) => (
                  <li key={step}>- {step}</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>

      <details className="disclosure" open>
        <summary>Session history</summary>
        <div className="disclosure-content space-y-4">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="text-lg font-medium text-white">{entry.sessionTitle}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {entry.topicLabel} /{" "}
                  {new Date(entry.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="topic-pill">Score {entry.score.toFixed(1)}</span>
                <span className="topic-pill">
                  <Clock3 className="mr-2 h-3.5 w-3.5" />
                  {entry.mcqCorrect}/{entry.mcqTotal}
                </span>
                <span className="topic-pill">
                  <ScanSearch className="mr-2 h-3.5 w-3.5" />
                  {Math.round(entry.accuracy * 100)}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </details>
    </div>
  );
}
