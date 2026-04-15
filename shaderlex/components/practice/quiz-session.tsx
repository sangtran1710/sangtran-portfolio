"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, CircleDashed, Clock3, Goal, RotateCcw, ScanSearch } from "lucide-react";

import { PROGRESS_STORAGE_KEY, shuffleArray } from "@/lib/helpers";
import type {
  ProgressEntry,
  PublicMultipleChoiceQuestion,
  PublicQuizBank,
  QuizBucket,
  QuizSubmissionResponse,
  TopicMeta,
} from "@/types/learning";

interface QuizSessionProps {
  topic: TopicMeta;
  bank: PublicQuizBank;
}

const ALL_BUCKET_ID = "all";

function buildSession(questions: PublicMultipleChoiceQuestion[], sessionSize: number, bucketId: string, randomize = false) {
  const pool = bucketId === ALL_BUCKET_ID ? questions : questions.filter((question) => question.bucketId === bucketId);

  if (!randomize) {
    return pool.slice(0, Math.min(sessionSize, pool.length));
  }

  return shuffleArray(pool).slice(0, Math.min(sessionSize, pool.length));
}

function getBucketMeta(buckets: QuizBucket[], bucketId?: string) {
  if (!bucketId) {
    return null;
  }

  return buckets.find((bucket) => bucket.id === bucketId) ?? null;
}

export function QuizSession({ topic, bank }: QuizSessionProps) {
  const buckets = bank.buckets ?? [];
  const hasBuckets = buckets.length > 0;

  const [activeBucket, setActiveBucket] = useState<string>(ALL_BUCKET_ID);
  const [questions, setQuestions] = useState<PublicMultipleChoiceQuestion[]>(() =>
    buildSession(bank.questions, bank.sessionSize, ALL_BUCKET_ID),
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<QuizSubmissionResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setQuestions(buildSession(bank.questions, bank.sessionSize, activeBucket));
    setAnswers({});
    setError("");
    setResult(null);
  }, [activeBucket, bank]);

  const answeredCount = useMemo(
    () => questions.filter((question) => Boolean(answers[question.id]?.trim())).length,
    [answers, questions],
  );

  const activeBucketMeta = activeBucket === ALL_BUCKET_ID ? null : getBucketMeta(buckets, activeBucket);

  function updateAnswer(questionId: string, value: string) {
    if (result) {
      return;
    }

    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function resetSession() {
    setQuestions(buildSession(bank.questions, bank.sessionSize, activeBucket, true));
    setAnswers({});
    setError("");
    setResult(null);
  }

  async function submitSession() {
    if (questions.length === 0) {
      return;
    }

    const unanswered = questions.filter((question) => !answers[question.id]?.trim());

    if (unanswered.length > 0) {
      setError("Please answer every multiple-choice question before submitting.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: bank.topic,
          questionIds: questions.map((question) => question.id),
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Quiz submission failed.");
      }

      const payload = (await response.json()) as QuizSubmissionResponse;
      const progressEntry: ProgressEntry = {
        id: `${bank.topic}-${Date.now()}`,
        topic: bank.topic,
        topicLabel: topic.name,
        sessionTitle: activeBucketMeta ? `${bank.title} / ${activeBucketMeta.label}` : bank.title,
        createdAt: new Date().toISOString(),
        score: payload.score,
        mcqCorrect: payload.correct,
        mcqTotal: payload.total,
        accuracy: payload.accuracy,
        strengths: payload.strengths,
        nextSteps: payload.nextSteps,
      };

      const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      const existingEntries = stored ? (JSON.parse(stored) as ProgressEntry[]) : [];
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify([progressEntry, ...existingEntries].slice(0, 24)));

      setResult(payload);
    } catch {
      setError("The backend could not scan this attempt. Try resubmitting or opening a new set.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_25rem]">
      <section className="panel overflow-hidden">
        <div className="border-b border-white/10 bg-gradient-to-r from-teal-300/10 via-white/[0.02] to-amber-300/10 px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="eyebrow">Backend Scored Practice</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">{bank.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{bank.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <span className="topic-pill">
                <Clock3 className="mr-2 h-4 w-4" />
                {bank.estimatedTime}
              </span>
              <span className="topic-pill">
                <ScanSearch className="mr-2 h-4 w-4" />
                Answers checked server-side
              </span>
            </div>
          </div>

          {hasBuckets ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Question buckets</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeBucket === ALL_BUCKET_ID
                      ? "border-white/18 bg-white/[0.08] text-white"
                      : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setActiveBucket(ALL_BUCKET_ID)}
                  type="button"
                >
                  All buckets
                </button>
                {buckets.map((bucket) => (
                  <button
                    key={bucket.id}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      activeBucket === bucket.id
                        ? "border-sky-200/30 bg-sky-200/15 text-white"
                        : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-white/20 hover:text-white"
                    }`}
                    onClick={() => setActiveBucket(bucket.id)}
                    type="button"
                  >
                    {bucket.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 max-w-3xl text-sm text-slate-300">
                {activeBucketMeta ? activeBucketMeta.description : "Mix every available question area in the same set."}
              </p>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Questions</p>
              <p className="mt-3 text-3xl font-semibold text-white">{questions.length}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Answered</p>
              <p className="mt-3 text-3xl font-semibold text-white">{answeredCount}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Status</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {result ? "Scanned" : answeredCount === questions.length && questions.length > 0 ? "Ready to submit" : "In progress"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 transition-all duration-300"
              style={{ width: `${questions.length === 0 ? 0 : (answeredCount / questions.length) * 100}%` }}
            />
          </div>

          {questions.length === 0 ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-7 text-slate-300">
              This bucket has no questions yet. Switch to another bucket or open all buckets.
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => {
                const review = result?.questionResults.find((item) => item.id === question.id);
                const bucketMeta = getBucketMeta(buckets, question.bucketId);

                return (
                  <article
                    key={question.id}
                    className={`rounded-[1.65rem] border p-5 transition ${
                      review
                        ? review.isCorrect
                          ? "border-teal-300/20 bg-teal-300/[0.07]"
                          : "border-amber-300/20 bg-amber-300/[0.06]"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="topic-pill">Question {index + 1}</span>
                        {bucketMeta ? <span className="topic-pill">{bucketMeta.label}</span> : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {question.skills.map((skill) => (
                          <span key={skill} className="rounded-full border border-white/8 px-3 py-1 text-[11px] text-slate-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="mt-4 text-xl font-medium leading-8 text-white">{question.prompt}</h2>
                    {question.viPrompt ? (
                      <p className="mt-3 rounded-[1rem] border border-cyan-200/14 bg-cyan-200/8 px-4 py-3 text-sm leading-7 text-slate-200">
                        <span className="block text-xs uppercase tracking-[0.22em] text-cyan-100/70">Vietnamese meaning</span>
                        <span className="mt-2 block">{question.viPrompt}</span>
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-3">
                      {question.options.map((option) => {
                        const isSelected = answers[question.id] === option.id;
                        const isCorrectOption = review?.correctOptionId === option.id;
                        const isIncorrectChoice = Boolean(review && isSelected && !review.isCorrect);

                        return (
                          <button
                            key={option.id}
                            className={`flex w-full items-start justify-between gap-4 rounded-[1.2rem] border px-4 py-4 text-left transition ${
                              isCorrectOption
                                ? "border-teal-300/35 bg-teal-300/12 text-white"
                                : isIncorrectChoice
                                  ? "border-amber-300/35 bg-amber-300/10 text-white"
                                  : isSelected
                                    ? "border-cyan-300/35 bg-cyan-300/10 text-white"
                                    : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20 hover:text-white"
                            }`}
                            disabled={Boolean(result)}
                            onClick={() => updateAnswer(question.id, option.id)}
                            type="button"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/20 text-[11px] uppercase">
                                {option.id}
                              </span>
                              <div>
                                <p className="text-sm leading-7">{option.label}</p>
                                {option.viLabel ? <p className="mt-1 text-xs leading-6 text-cyan-100/80">{option.viLabel}</p> : null}
                                {option.detail ? <p className="mt-1 text-xs text-slate-400">{option.detail}</p> : null}
                              </div>
                            </div>

                            {review ? (
                              isCorrectOption ? (
                                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-200" />
                              ) : isIncorrectChoice ? (
                                <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-200" />
                              ) : (
                                <CircleDashed className="mt-1 h-5 w-5 shrink-0 text-slate-600" />
                              )
                            ) : null}
                          </button>
                        );
                      })}
                    </div>

                    {review ? (
                      <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-slate-950/55 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className={`text-sm font-medium ${review.isCorrect ? "text-teal-100" : "text-amber-100"}`}>
                            {review.isCorrect ? "Correct answer" : "Needs review"}
                          </p>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                            Correct option: {review.correctOptionId.toUpperCase()}
                          </p>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{review.explanation}</p>
                        {review.viExplanation ? (
                          <p className="mt-3 rounded-[1rem] border border-cyan-200/14 bg-cyan-200/8 px-4 py-3 text-sm leading-7 text-slate-200">
                            <span className="block text-xs uppercase tracking-[0.22em] text-cyan-100/70">Vietnamese meaning</span>
                            <span className="mt-2 block">{review.viExplanation}</span>
                          </p>
                        ) : null}

                        {(review.answerSampleEn || review.answerSampleVi) ? (
                          <details className="disclosure mt-4">
                            <summary>Suggested answer</summary>
                            <div className="disclosure-content space-y-4">
                              {review.answerSampleEn ? (
                                <div>
                                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">English sample</p>
                                  <p className="mt-2 text-sm leading-7 text-slate-200">{review.answerSampleEn}</p>
                                </div>
                              ) : null}
                              {review.answerSampleVi ? (
                                <div>
                                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Vietnamese meaning</p>
                                  <p className="mt-2 text-sm leading-7 text-slate-200">{review.answerSampleVi}</p>
                                </div>
                              ) : null}
                            </div>
                          </details>
                        ) : null}

                        {review.followUps?.length ? (
                          <details className="disclosure mt-4">
                            <summary>Likely interviewer follow-ups</summary>
                            <div className="disclosure-content">
                              <ul className="space-y-2">
                                {(review.viFollowUps ?? review.followUps).map((item) => (
                                  <li key={item}>- {item}</li>
                                ))}
                              </ul>
                            </div>
                          </details>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}

          {error ? (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-teal-100 disabled:cursor-wait disabled:opacity-70"
              disabled={isSubmitting || Boolean(result) || questions.length === 0}
              onClick={submitSession}
              type="button"
            >
              <ScanSearch className="h-4 w-4" />
              {isSubmitting ? "Scanning attempt..." : "Submit answers"}
            </button>
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
              onClick={resetSession}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              New random set
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="panel p-6">
          <p className="eyebrow">Session Focus</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{activeBucketMeta?.label ?? topic.name}</h2>
          <p className="mt-3 text-sm text-slate-300">{activeBucketMeta?.description ?? topic.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(activeBucketMeta?.answerSkeleton ?? topic.practiceFocus).map((item) => (
              <span key={item} className="topic-pill">
                <Goal className="mr-2 h-3.5 w-3.5 text-teal-200" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <details className="disclosure">
          <summary>How it works</summary>
          <div className="disclosure-content">
            <ul className="space-y-2">
              {(bank.practiceNotes ?? []).map((note) => (
                <li key={note}>- {note}</li>
              ))}
              <li>- The backend keeps the answer key and only scans after submit.</li>
            </ul>
          </div>
        </details>

        {bank.weakPoints?.length ? (
          <section className="panel p-6">
            <p className="eyebrow">Weak-point section</p>
            <div className="mt-4 space-y-4">
              {bank.weakPoints.map((area) => (
                <article key={area.id} className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-medium text-white">{area.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{area.whyItMatters}</p>
                  <p className="mt-3 text-sm leading-7 text-sky-100">{area.coachLine}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.bucketIds.map((bucketId) => {
                      const bucket = getBucketMeta(buckets, bucketId);

                      return (
                        <button
                          key={`${area.id}-${bucketId}`}
                          className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.2em] transition ${
                            activeBucket === bucketId
                              ? "border-sky-200/30 bg-sky-200/15 text-white"
                              : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-white/20 hover:text-white"
                          }`}
                          onClick={() => setActiveBucket(bucketId)}
                          type="button"
                        >
                          {bucket?.label ?? bucketId}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="panel p-6">
          <p className="eyebrow">After Submit</p>
          {result ? (
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-teal-300/18 bg-gradient-to-br from-teal-300/14 to-cyan-300/10 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-teal-100/70">Session Score</p>
                <p className="mt-3 text-5xl font-semibold text-white">{result.score.toFixed(1)}</p>
                <p className="mt-3 text-sm text-teal-50/80">
                  {result.correct}/{result.total} correct / {Math.round(result.accuracy * 100)}% accuracy
                </p>
              </div>

              <p className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                {result.summary}
              </p>

              <details className="disclosure">
                <summary>Strengths</summary>
                <div className="disclosure-content">
                  <ul className="space-y-2">
                    {result.strengths.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="disclosure">
                <summary>Next steps</summary>
                <div className="disclosure-content">
                  <ul className="space-y-2">
                    {result.nextSteps.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-100 transition hover:text-white"
                href="/progress"
              >
                Open progress dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-300">
              Submit to scan answers and unlock the result breakdown.
            </div>
          )}
        </section>
      </aside>
    </div>
  );
}
