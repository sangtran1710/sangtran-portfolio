import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SHADER_KNOWLEDGE_PILLARS } from "@/data/knowledge-map";
import type { LessonMeta } from "@/types/learning";

interface ShaderPillarSectionsProps {
  lessons: LessonMeta[];
}

export function ShaderPillarSections({ lessons }: ShaderPillarSectionsProps) {
  return (
    <div className="space-y-6">
      {SHADER_KNOWLEDGE_PILLARS.map((pillar) => {
        const pillarLessons = lessons.filter((lesson) => lesson.pillar === pillar.slug);

        return (
          <section key={pillar.slug} className="panel p-6 sm:p-8" id={pillar.slug}>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-teal-200">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="eyebrow">{pillar.eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">{pillar.title}</h2>
                  </div>
                </div>

                <p className="mt-5 text-base leading-8 text-slate-300">{pillar.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {pillar.concepts.map((concept) => (
                    <span key={concept} className="topic-pill">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-4 xl:max-w-sm">
                <p className="micro-label">Why this pillar exists</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.summary}</p>
                <p className="mt-4 text-sm text-slate-400">{pillarLessons.length} lessons ready now</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {pillarLessons.map((lesson) => (
                <article
                  key={lesson.slug}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>{lesson.level}</span>
                    <span>/</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{lesson.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.summary}</p>

                  {lesson.prerequisites?.length ? (
                    <div className="mt-4 rounded-[1rem] border border-white/10 bg-slate-950/35 px-4 py-3">
                      <p className="micro-label">Before this</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {lesson.prerequisites.map((item) => (
                          <span key={item} className="topic-pill border-white/8 bg-white/[0.02] text-slate-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {lesson.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="topic-pill border-teal-300/12 bg-teal-300/[0.07] text-teal-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/learn/${lesson.topic}/${lesson.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-100 transition hover:text-white"
                  >
                    Read lesson
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
