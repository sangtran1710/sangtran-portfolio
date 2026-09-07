import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Wrench, FileCheck2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectVideo from "@/components/projects/ProjectVideo";
import { PROJECTS } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  const image = project.thumbnail || "/images/NWA.jpg";
  return {
    title: `${project.title} - VFX Project`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} - Henry Tran`,
      description: project.description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${project.title} VFX project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Henry Tran`,
      description: project.description,
      images: [absoluteUrl(image)],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  aaa: "AAA",
  realtime: "Real-time",
  cinematic: "Cinematic",
  igaming: "iGaming",
};

function getYoutubeEmbedUrl(url: string): string {
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return `https://www.youtube.com/embed/${url}`;
  return url;
}

function getYoutubeVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getYoutubeWatchUrl(url: string): string {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const embedUrl = project.videoUrl ? getYoutubeEmbedUrl(project.videoUrl) : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        All Work
      </Link>

      {/* Header: Title + period @ client */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="secondary">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
          {project.engine && (
            <Badge variant="outline" className="border-primary/40 text-primary">
              {project.engine}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          {project.role} · {project.duration ?? project.year}
          {project.client && (
            <>
              {" @ "}
              <span className="text-primary font-medium">{project.client}</span>
            </>
          )}
        </p>
      </div>

      {/* Video embed or image */}
      {embedUrl ? (
        <ProjectVideo
          embedUrl={embedUrl}
          poster={project.thumbnail || "/images/NWA.jpg"}
          title={project.title}
        />
      ) : project.thumbnail ? (
        <div className="relative h-72 sm:h-96 overflow-hidden rounded-xl bg-muted mb-10">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {project.slug === "spider-man-2" && (
        <figure className="mb-10 overflow-hidden rounded-xl border border-white/10 bg-muted/30">
          <div className="relative aspect-video">
            <Image
              src="/images/projects/spider-man-2/sparx-studio-team.webp"
              alt="Sparx studio team gathering during Marvel's Spider-Man 2 production"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            A Sparx* studio team gathering during the Marvel&apos;s Spider-Man 2 production period.
          </figcaption>
        </figure>
      )}


{/* Evidence Breakdown (Rich annotated showcase) */}
      {project.evidenceBreakdown && project.evidenceBreakdown.length > 0 ? (
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                In-Engine Evidence & Systems Breakdown
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Direct in-editor captures, profiling logs, and simulation node graphs from production.
              </p>
            </div>
            {project.steamUrl && (
              <a
                href={project.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                Official Steam Store
                <ArrowUpRight className="h-3.5 w-3.5 text-[#7db5b0]" />
              </a>
            )}
          </div>
          <div className="space-y-8">
            {project.evidenceBreakdown.map((item, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017] shadow-xl"
              >
                <div className="relative aspect-video w-full bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </div>
                <figcaption className="border-t border-white/10 bg-[#0e131b] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-[#a7d2ce]">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : project.images && project.images.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Breakdown clips */}
      {project.breakdownClips && project.breakdownClips.length > 0 && (() => {
        const clips = project.breakdownClips;
        const gallery = project.images ?? [];
        type Block = { type: "video"; clip: (typeof clips)[0]; index: number } | { type: "image"; src: string; index: number };
        const blocks: Block[] = [];
        let imgIndex = 0;
        clips.forEach((clip, i) => {
          blocks.push({ type: "video", clip, index: i });
          if ((i + 1) % 3 === 0 && imgIndex < gallery.length) {
            blocks.push({ type: "image", src: gallery[imgIndex], index: imgIndex });
            imgIndex += 1;
          }
        });
        return (
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Breakdown Clips
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Click any clip to watch on YouTube.
            </p>
            <div className="space-y-10 sm:space-y-14">
              {blocks.map((block) => {
                if (block.type === "video") {
                  const { clip } = block;
                  const id = getYoutubeVideoId(clip.url);
                  const watchUrl = getYoutubeWatchUrl(clip.url);
                  if (!id) return null;
                  return (
                    <section key={id} className="space-y-3">
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative w-full aspect-video overflow-hidden rounded-2xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                          alt={clip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 1024px) 100vw, 896px"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
                          <div className="rounded-full bg-red-600 p-4 text-white shadow-xl group-hover:scale-110 transition-transform duration-200">
                            <svg className="h-8 w-8 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                        {clip.title}
                      </h3>
                      {clip.caption && (
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                          {clip.caption}
                        </p>
                      )}
                    </section>
                  );
                }
                return (
                  <div key={`img-${block.index}`} className="relative w-full aspect-video overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={block.src}
                      alt={`${project.title} breakdown ${block.index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Structured Case Study Grid */}
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main content: 5-part structure */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Role & Scope */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-xs font-mono text-primary">01</span>
              Role & Scope
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.workSummary || project.description}
            </p>
            {project.workSummary && project.description && project.workSummary !== project.description && (
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <Separator />

          {/* 2. What I Contributed */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xs font-mono text-primary">02</span>
              What I Contributed
            </h2>
            <ul className="space-y-3">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Production Constraints */}
          {project.constraints && project.constraints.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xs font-mono text-primary">03</span>
                  Production Constraints
                </h2>
                <ul className="space-y-3">
                  {project.constraints.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <ShieldCheck className="h-4 w-4 text-amber-400/90 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* 4. Technical Implementation */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xs font-mono text-primary">04</span>
                  Technical Implementation
                </h2>
                <ul className="space-y-3">
                  {project.technicalHighlights.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <Wrench className="h-4 w-4 text-[#7db5b0] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* 5. Verified Evidence */}
          <Separator />
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-xs font-mono text-primary">05</span>
              Verified Evidence & Proof
            </h2>
            <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-3">
                <FileCheck2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  Work delivered under professional contract through Sparx* / client pipelines.
                  {project.slug === "spider-man-2" && " Verified with Sparx* team production gathering and published credits."}
                  {project.slug === "fortnite-remix" && " Verified with published cinematic trailer footage and official breakdown clips."}
                  {project.slug === "new-world" && " Verified with published PS5 cinematic trailer footage."}
                  {project.slug === "until-dawn" && " Verified with published PS5 remake cinematic sequences."}
                  {project.slug === "black-knight" && " Verified with official Netflix broadcast end credits."}
                  {project.slug === "malignant" && (
                    <span>
                      {" "}Verified with 5.0★ Upwork client contract (&ldquo;Unreal Engine Gameplay and Content Creation Specialist&rdquo;), in-editor UE5 project evidence, and the official{" "}
                      <a
                        href="https://store.steampowered.com/app/4314740/Malignant/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        Steam store listing
                      </a>.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Role, Platform, Engine, Category, Tech Stack */}
        <div className="space-y-6">
          {project.steamUrl && (
            <a
              href={project.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5c9d98] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-[#538f8a]"
            >
              View on Steam Store
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium mt-0.5">{project.role}</p>
            </div>
            {project.engine && (
              <div>
                <p className="text-xs text-muted-foreground">Engine</p>
                <p className="text-sm font-medium mt-0.5 text-[#7db5b0]">{project.engine}</p>
              </div>
            )}
            {project.platform && (
              <div>
                <p className="text-xs text-muted-foreground">Platform</p>
                <p className="text-sm font-medium mt-0.5">{project.platform}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Period</p>
              <p className="text-sm font-medium mt-0.5">
                {project.duration ?? project.year}
              </p>
            </div>
            {project.client && (
              <div>
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="text-sm font-medium mt-0.5 text-primary">
                  {project.client}
                </p>
              </div>
            )}
            {project.style && (
              <div>
                <p className="text-xs text-muted-foreground">Style</p>
                <p className="text-sm font-medium mt-0.5 capitalize">
                  {project.style}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Category</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {CATEGORY_LABELS[cat] ?? cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
