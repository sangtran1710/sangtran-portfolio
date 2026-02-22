import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FEATURED_PROJECTS } from "@/data/portfolio";

const CATEGORY_LABELS: Record<string, string> = {
  aaa: "AAA",
  realtime: "Real-time",
  cinematic: "Cinematic",
  igaming: "iGaming",
};

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Selected Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        </div>
        <Link
          href="/projects"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative h-52 overflow-hidden bg-muted">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {CATEGORY_LABELS[cat] ?? cat}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {project.role} · {project.year}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:hidden text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
