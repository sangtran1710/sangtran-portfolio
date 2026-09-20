import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  if (!id) return url;
  const timeMatch = url.match(/[?&](?:t|start)=(\d+)/);
  const timeParam = timeMatch ? `&t=${timeMatch[1]}s` : "";
  return `https://www.youtube.com/watch?v=${id}${timeParam}`;
}

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const embedUrl = project.videoUrl ? getYoutubeEmbedUrl(project.videoUrl) : null;
  const technicalNotes =
    project.technicalNotes && project.technicalNotes.length > 0
      ? project.technicalNotes
      : [...(project.constraints || []), ...(project.technicalHighlights || [])].slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        All Work
      </Link>

      {/* Header: Title + Badges + Role */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="bg-white/10 text-white text-xs border-0">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
          {project.engine && (
            <Badge variant="outline" className="border-[#7db5b0]/40 text-[#7db5b0] text-xs">
              {project.engine}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          {project.role} · {project.duration ?? project.year}
          {project.client && (
            <>
              {" @ "}
              <span className="text-[#7db5b0] font-medium">{project.client}</span>
            </>
          )}
        </p>
      </div>

      {/* 1. Hero Video embed or banner image */}
      {embedUrl ? (
        <div className="mb-10">
          <ProjectVideo
            embedUrl={embedUrl}
            poster={project.videoPoster || project.thumbnail || "/images/NWA.jpg"}
            title={project.title}
            videoTitle={project.videoTitle}
          />
        </div>
      ) : project.thumbnail ? (
        <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl bg-zinc-900 mb-10 border border-white/10">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {/* 2. My Contribution & Technical Notes */}
      <div className="mb-12 rounded-2xl border border-white/10 bg-[#0c1017] p-6 sm:p-8 shadow-xl">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7db5b0]" />
            My Contribution
          </h2>
          <ul className="space-y-3">
            {project.contributions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-[#7db5b0] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Notes (Combined constraints & tech highlights, max 3 bullets) */}
        {technicalNotes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7db5b0] mb-3">
              Technical Notes
            </h3>
            <ul className="space-y-2.5">
              {technicalNotes.slice(0, 3).map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7db5b0] mt-2 flex-shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. Selected Breakdown (Visual Showcase) */}
      {project.evidenceBreakdown && project.evidenceBreakdown.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-white">
                Selected Breakdown
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Production captures, in-engine setups, and simulation workflows.
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
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video w-full bg-black overflow-hidden cursor-pointer"
                    aria-label={`Watch ${item.title}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 shadow-lg">
                        <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="relative aspect-video w-full bg-black">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                )}
                <figcaption className="border-t border-white/10 bg-[#0e131b] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {item.tag && (
                        <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-[#a7d2ce]">
                          {item.tag}
                        </span>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded border border-white/20 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-white/10 hover:border-white/30"
                        >
                          Watch Video
                          <ArrowUpRight className="h-3 w-3 text-[#7db5b0]" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown clips (e.g. Fortnite: 5-6 premier clips in responsive grid) */}
      {project.breakdownClips && project.breakdownClips.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-white">
              Selected Breakdown Clips
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Click any clip to watch on YouTube.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.breakdownClips.slice(0, 6).map((clip) => {
              const id = getYoutubeVideoId(clip.url);
              const watchUrl = getYoutubeWatchUrl(clip.url);
              if (!id) return null;
              return (
                <a
                  key={id}
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c1017] transition-all hover:border-[#7db5b0]/40 hover:bg-[#0e131b]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                      alt={clip.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="rounded-full bg-red-600/90 p-2.5 text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-4 w-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#a7d2ce] transition-colors line-clamp-1">
                      {clip.title}
                    </h3>
                    {clip.caption && (
                      <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {clip.caption}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Gallery images if present and no evidenceBreakdown */}
      {(!project.evidenceBreakdown || project.evidenceBreakdown.length === 0) &&
        project.images &&
        project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-base font-semibold text-white mb-4">
              Production Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-white/10"
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

      {/* 4. Compact Metadata at Bottom */}
      <div className="rounded-2xl border border-white/10 bg-[#090d14] p-5 sm:p-6 text-xs text-zinc-400">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-white/10">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Role</p>
            <p className="font-medium text-white mt-1 text-sm">{project.role}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Engine</p>
            <p className="font-medium text-[#7db5b0] mt-1 text-sm">{project.engine || "Proprietary"}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Platform</p>
            <p className="font-medium text-white mt-1 text-sm">{project.platform || "Console / PC"}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Client / Studio</p>
            <p className="font-medium text-white mt-1 text-sm">{project.client || "Sparx*"}</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-1">Tech Stack:</span>
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[11px] font-normal border-white/10 bg-white/[0.03] text-zinc-300"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-zinc-400">
              Production Credit: Credited under{" "}
              <span className="text-zinc-200 font-medium">
                {project.slug === "malignant"
                  ? "Buzzkill Interactive / Upwork"
                  : project.client
                  ? `Sparx* / ${project.client}`
                  : "Sparx* - A Virtuos Studio"}
              </span>
            </p>
            {project.steamUrl && (
              <a
                href={project.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/10 transition-colors"
              >
                Steam Store
                <ArrowUpRight className="h-3 w-3 text-[#7db5b0]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
