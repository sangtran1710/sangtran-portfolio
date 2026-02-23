import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PROJECTS } from "@/data/portfolio";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
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

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const embedUrl = project.videoUrl ? getYoutubeEmbedUrl(project.videoUrl) : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/projects"
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
