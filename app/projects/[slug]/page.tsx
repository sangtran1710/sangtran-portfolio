import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Play, Sparkles, Layers, Cpu, Flame, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectVideo from "@/components/projects/ProjectVideo";
import BreakdownMedia from "@/components/projects/BreakdownMedia";
import { PROJECTS, getProjectByline } from "@/data/portfolio";
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
  const image = project.thumbnail || "/images/og-main.jpg";
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
  if (url.startsWith("/")) return url;
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return `https://www.youtube.com/embed/${url}`;
  return url;
}

function getYoutubeVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
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

  // Dedicated Behance-style editorial rhythm for Wolverine
  const isWolverineBehance = project.slug === "wolverine" && !!project.evidenceBreakdown;

  // Separate Wolverine items into thematic Behance blocks
  const wolverineItems = project.evidenceBreakdown || [];
  const heroLoopItem = wolverineItems[0]; // Helix Engine Chamber Activation
  const pyroLoopItem = wolverineItems[1]; // Trask Warehouse Volumetric Fireball
  const combatLoopItems = wolverineItems.slice(2, 7); // Electric Shockwave, Building Collapse, Outpost, Blood, TK Barrier
  const referenceFootageItems = wolverineItems.slice(7, 11); // Gameplay, BTS, Combat, Cutscenes
  const creditsItem = wolverineItems[11]; // In-Game End Credits

  // =========================================================================
  // HKIA T2 LED / BEHANCE ART-DIRECTED CINEMATIC CASE STUDY: WOLVERINE
  // Full-bleed widescreen visuals, frameless media, editorial typography
  // =========================================================================
  if (isWolverineBehance) {
    return (
      <article className="w-full bg-[#07090D] text-foreground pb-24 pt-4 selection:bg-primary/30">
        {/* 1. EDITORIAL HEADER & TITLE */}
        <header className="mx-auto max-w-6xl px-6 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All Work
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.categories.map((cat) => (
              <Badge key={cat} variant="secondary" className="bg-white/10 text-white text-[11px] font-mono border-0 tracking-wider">
                {CATEGORY_LABELS[cat] ?? cat}
              </Badge>
            ))}
            {project.engine && (
              <Badge variant="outline" className="border-primary/40 text-primary text-[11px] font-mono tracking-wider">
                {project.engine}
              </Badge>
            )}
            {project.platform && (
              <Badge variant="outline" className="border-white/20 text-muted-foreground text-[11px] font-mono tracking-wider">
                {project.platform}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-kanit font-extrabold uppercase tracking-tight text-white mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-light tracking-wide">
            {getProjectByline(project)} · {project.duration ?? project.year}
          </p>
        </header>

        {/* 2. HERO KEY VISUAL (Widescreen 1440px Frameless) */}
        {heroLoopItem && (
          <section aria-label="Hero VFX Asset Loop" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
              <BreakdownMedia
                image={heroLoopItem.image}
                loopVideo={heroLoopItem.loopVideo}
                video={heroLoopItem.video}
                title={heroLoopItem.title}
                link={heroLoopItem.link}
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest uppercase text-primary font-semibold">
                  01 / KEY VISUAL
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {heroLoopItem.title}
                </h3>
                {heroLoopItem.tag && (
                  <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono text-primary font-medium">
                    {heroLoopItem.tag}
                  </span>
                )}
              </div>
              {heroLoopItem.caption && (
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl text-left sm:text-right leading-relaxed">
                  {heroLoopItem.caption}
                </p>
              )}
            </div>
          </section>
        )}

        {/* 3. EDITORIAL MANIFESTO 01 (Production Mandate & Creative Scope) */}
        <section
          aria-label="Production Mandate & Creative Scope"
          className="mx-auto max-w-5xl px-6 mb-24 sm:mb-32"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-primary font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            01 / Production Mandate & Creative Scope
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-kanit">
            Real-Time Gameplay & Cinematic VFX on PS5
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-300 font-light mb-14 max-w-3xl">
            Senior VFX Artist at Sparx* - A Virtuos Studio, delivering real-time gameplay and cinematic visual effects for Insomniac Games. Designed, simulated, and integrated combat systems, environmental destruction, and dynamic atmospheric elements targeting rock-solid 60 FPS performance on PlayStation 5.
          </p>
          <div className="grid gap-8 sm:grid-cols-3 border-t border-white/10 pt-8">
            {project.contributions.map((c, idx) => (
              <div key={idx} className="flex flex-col justify-between">
                <span className="text-[11px] font-mono text-primary uppercase tracking-widest mb-3">
                  Core Mandate 0{idx + 1}
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SIMULATION BREAKDOWN (Widescreen 1440px Frameless) */}
        {pyroLoopItem && (
          <section aria-label="Simulation & Pyro Breakdown" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
              <BreakdownMedia
                image={pyroLoopItem.image}
                loopVideo={pyroLoopItem.loopVideo}
                video={pyroLoopItem.video}
                title={pyroLoopItem.title}
                link={pyroLoopItem.link}
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  02 / SIMULATION & PYRO
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {pyroLoopItem.title}
                </h3>
                {pyroLoopItem.tag && (
                  <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-400 font-medium">
                    {pyroLoopItem.tag}
                  </span>
                )}
              </div>
              {pyroLoopItem.caption && (
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl text-left sm:text-right leading-relaxed">
                  {pyroLoopItem.caption}
                </p>
              )}
            </div>
          </section>
        )}

        {/* 5. EDITORIAL MANIFESTO 02 (Simulation Workflows & Engine Profiling) */}
        <section
          aria-label="Simulation Workflows & Engine Profiling"
          className="mx-auto max-w-5xl px-6 mb-24 sm:mb-32"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-primary font-semibold mb-4">
            <Layers className="h-3.5 w-3.5" />
            02 / Simulation Workflows & Engine Profiling
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-kanit">
            Houdini Pyro Pipelines & In-Engine Constraints
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-300 font-light mb-14 max-w-3xl">
            Simulation workflows developed in Houdini and EmberGen, packed into optimized vector displacement textures, flipbooks, and vertex animation meshes for Insomniac&apos;s proprietary engine. Executed continuous GPU profiling passes to eliminate overdraw hotspots in tight combat arenas.
          </p>
          <div className="grid gap-8 sm:grid-cols-3 border-t border-white/10 pt-8">
            {technicalNotes.map((note, idx) => (
              <div key={idx} className="flex flex-col justify-between">
                <span className="text-[11px] font-mono text-primary uppercase tracking-widest mb-3">
                  Constraint 0{idx + 1}
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. REAL-TIME GAMEPLAY & COMBAT CAPTURES (Behance Rhythm Gallery) */}
        <section aria-label="Cinematic & Combat VFX Breakdown" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-28 sm:mb-36">
          <div className="max-w-5xl mb-12">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-primary font-semibold mb-3">
              <Flame className="h-3.5 w-3.5" />
              Real-Time Gameplay & Combat Captures
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 font-kanit">
              Cinematic VFX, Project Context & Credits
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Handled cinematic & gameplay VFX shots. Looping real-time combat & destruction captures.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {combatLoopItems.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between ${
                  i === combatLoopItems.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
                  <BreakdownMedia
                    image={item.image}
                    loopVideo={item.loopVideo}
                    video={item.video}
                    title={item.title}
                    link={item.link}
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between border-b border-white/10 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-primary-hover">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  {item.caption && (
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {item.caption}
                    </p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline"
                    >
                      Source Footage
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FULL SHOWREEL PRESENTATION (Master Reel 55s) */}
        {embedUrl && (
          <section aria-label="Master VFX Showreel" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-28 sm:mb-36">
            <div className="max-w-5xl mb-10">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-primary font-semibold mb-3">
                <Video className="h-3.5 w-3.5" />
                03 / Full Showreel Presentation
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 font-kanit">
                Master VFX Showreel (55s)
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-light">
                Complete compiled reel featuring high-pace gameplay and cinematic VFX sequences on PlayStation 5.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
              <ProjectVideo
                embedUrl={embedUrl}
                watchUrl={project.watchUrl || getYoutubeWatchUrl(project.videoUrl!)}
                poster={project.videoPoster || project.thumbnail || "/images/NWA.jpg"}
                title={project.title}
                videoTitle={project.videoTitle}
              />
            </div>
          </section>
        )}

        {/* 8. IN-GAME ATTRIBUTION & REFERENCE ARCHIVE */}
        <section aria-label="In-Game Proof & References" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-28 sm:mb-36">
          <div className="max-w-5xl mb-10">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-primary font-semibold mb-3">
              <Cpu className="h-3.5 w-3.5" />
              04 / In-Game Attribution & References
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 font-kanit">
              In-Game End Credits & Reference Footage
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Official production verification and reference combat development archives.
            </p>
          </div>

          {/* Featured In-Game End Credits Frame */}
          {creditsItem && (
            <div className="mb-14">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-primary/30 bg-black">
                <BreakdownMedia
                  image={creditsItem.image}
                  loopVideo={creditsItem.loopVideo}
                  video={creditsItem.video}
                  title={creditsItem.title}
                  link={creditsItem.link}
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {creditsItem.title}
                    </h3>
                    {creditsItem.tag && (
                      <span className="rounded bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-xs font-mono text-primary font-medium">
                        {creditsItem.tag}
                      </span>
                    )}
                  </div>
                  {creditsItem.caption && (
                    <p className="text-xs sm:text-sm text-neutral-400 font-light">
                      {creditsItem.caption}
                    </p>
                  )}
                </div>
                {creditsItem.link && (
                  <a
                    href={creditsItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-primary/20 shrink-0"
                  >
                    Verify on YouTube
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 4-Card Reference Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {referenceFootageItems.map((refItem, idx) => (
              <a
                key={idx}
                href={refItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-primary/50 hover:bg-white/[0.05]"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-black border border-white/10">
                  <Image
                    src={refItem.image}
                    alt={refItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <Play className="h-4 w-4 fill-white text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                    {refItem.title}
                  </h4>
                  <p className="mt-1.5 text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    Public Footage
                    <ArrowUpRight className="h-3 w-3 text-quiet group-hover:text-primary transition-colors" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 9. PRODUCTION COLOPHON / TECH SPECS */}
        <footer className="mx-auto max-w-5xl px-6 pt-16 border-t border-white/15">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Role</p>
              <p className="font-medium text-white mt-1.5 text-sm">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Engine</p>
              <p className="font-medium text-white mt-1.5 text-sm">{project.engine || "Proprietary Engine"}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Platform</p>
              <p className="font-medium text-white mt-1.5 text-sm">{project.platform || "PlayStation 5"}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Studio / Client</p>
              <p className="font-medium text-white mt-1.5 text-sm">
                {project.studio ? `${project.studio} / ${project.client}` : project.client}
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mr-2">Tech Stack:</span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded border border-white/10 bg-white/[0.03] text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Production Credit:{" "}
              <span className="text-white font-medium">
                {project.productionCredit ?? "Sparx* (Virtuos) for Insomniac Games"}
              </span>
            </p>
          </div>
        </footer>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
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
            <Badge variant="outline" className="border-primary/40 text-primary text-xs">
              {project.engine}
            </Badge>
          )}
          {project.platform && (
            <Badge variant="outline" className="border-white/20 text-muted-foreground text-xs">
              {project.platform}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {getProjectByline(project)} · {project.duration ?? project.year}
        </p>
      </div>

      {/* =========================================================================
         STANDARD / FALLBACK BREAKDOWN LAYOUT (For other projects)
         ========================================================================= */}
      {project.evidenceBreakdown && project.evidenceBreakdown.length > 0 ? (
          <>
            {/* 1. Selected Breakdown (GIFs / Micro-loops) */}
            <div className="mb-12">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {project.slug === "spider-man-2"
                      ? "Project Context & Credits"
                      : "Selected Breakdown"}
                  </h2>
                  {project.slug === "spider-man-2" && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Public footage shown for project context.
                    </p>
                  )}
                </div>
                {project.steamUrl && (
                  <a
                    href={project.steamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Official Steam Store
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                  </a>
                )}
              </div>

              <div className="space-y-8">
                {project.evidenceBreakdown.map((item, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
                  >
                    <BreakdownMedia
                      image={item.image}
                      loopVideo={item.loopVideo}
                      video={item.video}
                      title={item.title}
                      link={item.link}
                    />
                    {!item.imageOnly && (
                      <figcaption className="border-t border-border bg-section p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-base font-semibold text-white">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {item.tag && (
                              <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-primary-hover">
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.caption && (
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.caption}
                          </p>
                        )}
                        {item.timestamps && item.timestamps.length > 0 && (
                          <div className="mt-4 pt-3.5 border-t border-white/5">
                            <div className="text-[11px] font-mono text-quiet mb-2 uppercase tracking-wider">
                              Timestamps
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.timestamps.map((ts, idx) => (
                                <a
                                  key={idx}
                                  href={ts.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                                >
                                  <Play className="h-3 w-3 fill-primary text-primary group-hover:scale-110 transition-transform" />
                                  <span className="font-mono text-primary-hover font-semibold">{ts.time}</span>
                                  <span className="text-muted-foreground group-hover:text-white">{ts.label}</span>
                                  <ArrowUpRight className="h-3 w-3 text-quiet group-hover:text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>

            {/* 2. Editorial: My Contribution & Technical Notes */}
            <div className="mb-14 space-y-8 max-w-3xl">
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-3">
                  My Contribution
                </h2>
                <div className="space-y-2">
                  {project.contributions.map((item, i) => (
                    <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {technicalNotes.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-3">
                    Technical Notes
                  </h3>
                  <div className="space-y-2">
                    {technicalNotes.slice(0, 3).map((note, i) => (
                      <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Full Video Showreel */}
            {embedUrl ? (
              <div className="mb-14">
                <div className="mb-4">
                  <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-1">
                    Master VFX Showreel
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Complete compiled reel featuring high-pace gameplay and cinematic VFX sequences.
                  </p>
                </div>
                <ProjectVideo
                  embedUrl={embedUrl}
                  watchUrl={project.watchUrl || getYoutubeWatchUrl(project.videoUrl!)}
                  poster={project.videoPoster || project.thumbnail || "/images/NWA.jpg"}
                  title={project.title}
                  videoTitle={project.videoTitle}
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            {/* Hero Video embed or banner image (for projects without breakdown items) */}
            {embedUrl ? (
              <div className="mb-10">
                <ProjectVideo
                  embedUrl={embedUrl}
                  watchUrl={project.watchUrl || getYoutubeWatchUrl(project.videoUrl!)}
                  poster={project.videoPoster || project.thumbnail || "/images/NWA.jpg"}
                  title={project.title}
                  videoTitle={project.videoTitle}
                />
              </div>
            ) : project.thumbnail ? (
              <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl bg-section mb-10 border border-white/10">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}

            {/* Editorial: My Contribution & Technical Notes */}
            <div className="mb-14 space-y-8 max-w-3xl">
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-3">
                  My Contribution
                </h2>
                <div className="space-y-2">
                  {project.contributions.map((item, i) => (
                    <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {technicalNotes.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white mb-3">
                    Technical Notes
                  </h3>
                  <div className="space-y-2">
                    {technicalNotes.slice(0, 3).map((note, i) => (
                      <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      {/* Breakdown clips (e.g. Fortnite: 5-6 premier clips in responsive grid) */}
      {project.breakdownClips && project.breakdownClips.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-white">
              Selected Breakdown Clips
            </h2>
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
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-border-hover hover:bg-card"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-section">
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
                    <h3 className="text-sm font-semibold text-white group-hover:text-primary-hover transition-colors line-clamp-1">
                      {clip.title}
                    </h3>
                    {clip.caption && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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
                  className="relative aspect-video overflow-hidden rounded-xl bg-section border border-border"
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
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 text-xs text-muted-foreground mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-quiet">Role</p>
            <p className="font-medium text-white mt-1 text-sm">{project.role}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-quiet">Engine</p>
            <p className="font-medium text-primary mt-1 text-sm">{project.engine || "Proprietary"}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-quiet">Platform</p>
            <p className="font-medium text-white mt-1 text-sm">{project.platform || "Console / PC"}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-quiet">
              {project.studio ? project.projectType === "film" ? "Studio / Release" : "Studio / Client" : "Client"}
            </p>
            <p className="font-medium text-white mt-1 text-sm">
              {project.studio ? `${project.studio} / ${project.client}` : project.client}
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-quiet mr-1">Tech Stack:</span>
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[11px] font-normal border-white/10 bg-white/[0.03] text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-muted-foreground">
              Production Credit:{" "}
              <span className="text-foreground font-medium">
                {project.productionCredit ??
                  (project.role.toLowerCase().includes("freelance")
                    ? `Freelance / ${project.client}`
                    : project.client
                    ? `Credited under Sparx* / ${project.client}`
                    : "Sparx* - A Virtuos Studio")}
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
                <ArrowUpRight className="h-3 w-3 text-primary" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
