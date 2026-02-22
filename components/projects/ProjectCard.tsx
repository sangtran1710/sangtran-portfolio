import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/portfolio";

const CATEGORY_LABELS: Record<string, string> = {
  aaa: "AAA",
  realtime: "Real-time",
  cinematic: "Cinematic",
  igaming: "iGaming",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
        </div>

        <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">
          {project.role} · {project.year}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
