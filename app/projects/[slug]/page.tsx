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

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
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
          {project.role} &middot; {project.year}
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

      {/* Additional images */}
      {project.images && project.images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {project.images.map((img, i) => (
            <div key={i} className="relative h-48 overflow-hidden rounded-lg bg-muted">
              <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
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

        {/* Sidebar */}
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

          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium mt-0.5">{project.role}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Year</p>
              <p className="text-sm font-medium mt-0.5">{project.year}</p>
            </div>
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
