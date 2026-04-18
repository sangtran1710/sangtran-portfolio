import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      title: `${project.title} - Sang Tran`,
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
      title: `${project.title} - Sang Tran`,
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
  // Already an embed URL
  if (url.includes("/embed/")) return url;
  // youtube.com/watch?v=ID
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  // Bare ID (11 chars)
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
        <div className="flex flex-wrap gap-2 mb-3">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="secondary">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          {project.duration ?? project.year}
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
        <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-10"
          style={{ paddingTop: "56.25%" }}>
          <iframe
            src={embedUrl}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
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

      {/* Additional images — compact grid */}
      {project.images && project.images.length > 0 && (
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
      )}

      {/* Breakdown — Behance-style: video → text → video → image → video */}
      {project.breakdownClips && project.breakdownClips.length > 0 && (() => {
        const clips = project.breakdownClips;
        const gallery = project.images ?? [];
        type Block = { type: "video"; clip: (typeof clips)[0]; index: number } | { type: "image"; src: string; index: number };
        const blocks: Block[] = [];
        let imgIndex = 0;
        clips.forEach((clip, i) => {
          blocks.push({ type: "video", clip, index: i });
          // Sau mỗi 3 video chèn 1 hình từ gallery (nếu còn)
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

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.workSummary && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-3">My role</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.workSummary}
                </p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-4">Contributions</h2>
            <ul className="space-y-3">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar: Role, Platform, Engine, Category */}
        <div className="space-y-6">
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
