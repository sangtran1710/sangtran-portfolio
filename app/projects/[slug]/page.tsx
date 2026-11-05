import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, Sparkles, Layers, Cpu, Flame, Video } from "lucide-react";
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
  const heroLoopItem = wolverineItems.find((i) => i.title.includes("Helix Engine")) || wolverineItems[0];
  const inEngineAssetItem = wolverineItems.find((i) =>
    i.title.includes("Mutant Teleport") || i.title.includes(".visualeffect")
  );
  const pyroLoopItem = wolverineItems.find((i) => i.title.includes("Warehouse")) || wolverineItems[1];
  const creditsItem = wolverineItems.find((i) => i.title.includes("Credits"));
  const referenceFootageItems = wolverineItems.filter((i) =>
    ["Official gameplay", "Behind-the-Scenes", "Aggressive & Stealth", "Cinematic Cutscenes"].some((k) =>
      i.title.toLowerCase().includes(k.toLowerCase())
    )
  );
  const combatLoopItems = wolverineItems.filter(
    (i) => i.loopVideo && i !== heroLoopItem && i !== pyroLoopItem && i !== creditsItem
  );

  // =========================================================================
  // HKIA T2 LED / BEHANCE ART-DIRECTED CINEMATIC CASE STUDY: WOLVERINE
  // Full-bleed widescreen visuals, frameless media, editorial typography
  // =========================================================================
  // =========================================================================
  // BEHANCE-STYLE CLEAN ARTWORK SHOWCASE: WOLVERINE
  // Quiet typography, auto-looping visuals, zero AI-filler text, zero clutter
  // =========================================================================
  if (isWolverineBehance) {
    return (
      <article className="w-full bg-[#07090D] text-foreground pb-24 pt-20 sm:pt-24">
        {/* HEADER */}
        <header className="mx-auto max-w-6xl px-6 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              All Work
            </Link>
            {project.mobyGamesUrl && (
              <a
                href={project.mobyGamesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                MobyGames Credit
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map((cat) => (
              <Badge key={cat} variant="secondary" className="bg-white/10 text-white text-[11px] font-mono border-0">
                {CATEGORY_LABELS[cat] ?? cat}
              </Badge>
            ))}
            {project.engine && (
              <Badge variant="outline" className="border-primary/40 text-primary text-[11px] font-mono">
                {project.engine}
              </Badge>
            )}
            {project.platform && (
              <Badge variant="outline" className="border-white/20 text-muted-foreground text-[11px] font-mono">
                {project.platform}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-kanit font-extrabold uppercase tracking-tight text-white mb-3">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-light">
            {getProjectByline(project)} · {project.duration ?? project.year}
          </p>

          <p className="max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed mt-6">
            Real-time gameplay and cinematic visual effects for Marvel&apos;s Wolverine on PlayStation 5.
            Authored combat impact VFX, volumetric explosion simulations, environmental destruction, and proprietary engine particle systems.
          </p>

          {project.mobyGamesUrl && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={project.mobyGamesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-mono font-medium text-white hover:bg-primary/20 hover:border-primary transition-all shadow-sm"
              >
                <span>Verified Game Credit on MobyGames</span>
              </a>
            </div>
          )}
        </header>

        {/* 1. HERO KEY VISUAL (Helix Engine Chamber Activation) */}
        {heroLoopItem && (
          <section aria-label="Helix Engine VFX" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
              <BreakdownMedia
                image={heroLoopItem.image}
                loopVideo={heroLoopItem.loopVideo}
                video={heroLoopItem.video}
                title={heroLoopItem.title}
                link={heroLoopItem.link}
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm sm:text-base font-medium text-white/90">
                {heroLoopItem.title}
              </h3>
            </div>
          </section>
        )}

        {/* 2. IN-ENGINE PROPRIETARY VFX ASSET SHOWCASE (Compact Editorial Bento Card) */}
        {inEngineAssetItem && (
          <section aria-label="In-Engine VFX Authoring" className="mx-auto max-w-5xl px-4 sm:px-8 mb-20 sm:mb-28">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 shadow-lg">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Technical Copy & YouTube Action */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span>Proprietary Engine Asset · Insomniac</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-kanit">
                      Mutant Teleport Recharging
                    </h2>

                    <div className="mt-2.5 mb-3.5 inline-block">
                      <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[11px] text-neutral-300">
                        enm_htcmutant_teleport_recharging_purple.visualeffect
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                      Direct viewport capture from Insomniac&apos;s proprietary 3D <code className="text-white/90 font-mono text-xs">.visualeffect</code> editor (Dock Window 20). Authored character-bound energy ribbons, adapted luminance curves, and charging dissipation for real-time PS5 execution.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-neutral-500">
                      <span className="rounded bg-black/40 border border-white/5 px-2 py-0.5">Near: 0.0</span>
                      <span className="rounded bg-black/40 border border-white/5 px-2 py-0.5">Far: 10000.0</span>
                      <span className="rounded bg-black/40 border border-white/5 px-2 py-0.5">Lum: 11.36</span>
                      <span className="rounded bg-black/40 border border-white/5 px-2 py-0.5 text-primary/80">Real-Time PS5 Budget</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <a
                      href="https://www.youtube.com/watch?v=_g9fzTlKCVQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-medium text-white transition-all shadow-[0_4px_16px_rgba(220,38,38,0.35)] hover:shadow-[0_6px_24px_rgba(220,38,38,0.55)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg className="h-3.5 w-3.5 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Watch Full Breakdown on YouTube</span>
                      <span className="font-mono text-[11px] opacity-75">(4:33)</span>
                    </a>
                  </div>
                </div>

                {/* Compact, Crisp Image Card (Native resolution, zero low-res blur) */}
                <div className="lg:col-span-7">
                  <a
                    href="https://www.youtube.com/watch?v=_g9fzTlKCVQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[1000/515] w-full max-w-[580px] mx-auto overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(88,207,200,0.15)] hover:-translate-y-0.5"
                  >
                    <Image
                      src={inEngineAssetItem.image}
                      alt={inEngineAssetItem.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 580px"
                    />

                    {/* YouTube Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-all duration-300 group-hover:bg-black/10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500">
                        <Play className="ml-0.5 h-6 w-6 fill-white text-white transition-colors" />
                      </div>
                    </div>

                    {/* Window Title Header Pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white/80 border border-white/10 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Dock Window 20: 3D Viewport</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. SIMULATION BREAKDOWN (Trask Warehouse Fireball) */}
        {pyroLoopItem && (
          <section aria-label="Warehouse Simulation VFX" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black">
              <BreakdownMedia
                image={pyroLoopItem.image}
                loopVideo={pyroLoopItem.loopVideo}
                video={pyroLoopItem.video}
                title={pyroLoopItem.title}
                link={pyroLoopItem.link}
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm sm:text-base font-medium text-white/90">
                {pyroLoopItem.title}
              </h3>
            </div>
          </section>
        )}

        {/* 3. COMBAT & GAMEPLAY CAPTURES */}
        <section aria-label="Cinematic & Combat VFX Breakdown" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              Cinematic VFX, Project Context & Credits
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Looping in-engine cinematic & destruction captures.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
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
                <div className="mt-2.5 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h3 className="text-sm font-medium text-white/90">
                    {item.title}
                  </h3>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-muted-foreground hover:text-primary hover:underline underline-offset-2 transition-colors flex items-center gap-1"
                    >
                      Footage
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PRODUCTION STILLS & IN-ENGINE LIGHTING (ArtBlast Gallery) */}
        <section aria-label="Production Stills & Visual Development" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              Production Stills & Environment Volumetrics
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              High-resolution in-engine frames, dynamic lighting & architectural destruction.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                src: "/images/projects/wolverine/wolverine-artblast-hangar.webp",
                title: "Trask Research Facility & Volumetric Hangar",
                dim: "2560 × 1440",
              },
              {
                src: "/images/projects/wolverine/wolverine-artblast-explosion.webp",
                title: "High-Density Industrial Blast Compound",
                dim: "2560 × 1440",
              },
              {
                src: "/images/projects/wolverine/wolverine-madripoor.webp",
                title: "Madripoor Underworld Environment & Night Lighting",
                dim: "1600 × 900",
              },
              {
                src: "/images/projects/wolverine/wolverine-action.webp",
                title: "Visceral Combat Stance & Silhouette Lighting",
                dim: "1600 × 900",
              },
            ].map((still, idx) => (
              <figure key={idx} className="group flex flex-col justify-between">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
                  <Image
                    src={still.src}
                    alt={still.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 1400px"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h3 className="text-sm font-medium text-white/90">
                    {still.title}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {still.dim}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. FULL SHOWREEL (55s) */}
        {embedUrl && (
          <section aria-label="Master VFX Showreel" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
            <div className="mb-6">
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
                Master VFX Showreel (55s)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Compiled gameplay and cinematic VFX sequences on PlayStation 5.
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

        {/* 5. IN-GAME CREDITS & REFERENCE ARCHIVE */}
        <section aria-label="In-Game Proof & References" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-24 sm:mb-32">
          <div className="mb-6">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              In-Game End Credits & Reference Footage
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Official production verification and reference combat development archives.
            </p>
          </div>

          {/* Featured In-Game End Credits Frame */}
          {creditsItem && (
            <div className="mb-10">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-primary/30 bg-black">
                <BreakdownMedia
                  image={creditsItem.image}
                  loopVideo={creditsItem.loopVideo}
                  video={creditsItem.video}
                  title={creditsItem.title}
                  link={creditsItem.link}
                />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm sm:text-base font-medium text-white">
                    {creditsItem.title}
                  </h3>
                  {creditsItem.tag && (
                    <span className="rounded bg-primary/20 border border-primary/30 px-2 py-0.5 text-xs font-mono text-primary font-medium">
                      {creditsItem.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {creditsItem.link && (
                    <a
                      href={creditsItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/20 shrink-0"
                    >
                      Verify on YouTube
                    </a>
                  )}
                  {project.mobyGamesUrl && (
                    <a
                      href={project.mobyGamesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 shrink-0"
                    >
                      MobyGames Credit
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4-Card Reference Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {referenceFootageItems.map((refItem, idx) => (
              <a
                key={idx}
                href={refItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition-all hover:border-primary/50 hover:bg-white/[0.04]"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-black border border-white/10">
                  <Image
                    src={refItem.image}
                    alt={refItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-1">
                    {refItem.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    Public Footage
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 6. PRODUCTION COLOPHON / TECH SPECS */}
        <footer className="mx-auto max-w-5xl px-6 pt-12 border-t border-white/15">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Role</p>
              <p className="font-medium text-white mt-1 text-sm">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Engine</p>
              <p className="font-medium text-white mt-1 text-sm">{project.engine || "Proprietary Engine"}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Platform</p>
              <p className="font-medium text-white mt-1 text-sm">{project.platform || "PlayStation 5"}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Studio / Client</p>
              <p className="font-medium text-white mt-1 text-sm">
                {project.studio ? `${project.studio} / ${project.client}` : project.client}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mr-1.5">Tools:</span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Production Credit:{" "}
                <span className="text-white font-medium">
                  {project.productionCredit ?? "Sparx* (Virtuos) for Insomniac Games"}
                </span>
              </p>
              {project.mobyGamesUrl && (
                <a
                  href={project.mobyGamesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Verified on MobyGames
                </a>
              )}
            </div>
          </div>
        </footer>
      </article>
    );
  }

  return (
    <article className="w-full bg-[#07090D] text-foreground pb-24 pt-20 sm:pt-24">
      {/* 1. TOP BREADCRUMB / ACTION BAR */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-6 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          All Work
        </Link>
        <div className="flex items-center gap-4">
          {project.mobyGamesUrl && (
            <a
              href={project.mobyGamesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              MobyGames Credit
            </a>
          )}
          {project.steamUrl && (
            <a
              href={project.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Official Store
            </a>
          )}
        </div>
      </div>

      {/* 2. EDITORIAL HERO HEADER */}
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-12 sm:pt-16 sm:pb-16 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="bg-white/10 text-white text-[11px] font-mono border-0">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
          {project.engine && (
            <Badge variant="outline" className="border-primary/40 text-primary text-[11px] font-mono">
              {project.engine}
            </Badge>
          )}
          {project.platform && (
            <Badge variant="outline" className="border-white/20 text-muted-foreground text-[11px] font-mono">
              {project.platform}
            </Badge>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-kanit font-extrabold uppercase tracking-tight text-white mb-3">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground font-light">
          {getProjectByline(project)} · {project.duration ?? project.year}
        </p>

        {(project.description || project.workSummary) && (
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed mt-6">
            {project.description || project.workSummary}
          </p>
        )}

        {project.mobyGamesUrl && (
          <div className="mt-6 flex justify-center">
            <a
              href={project.mobyGamesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-mono font-medium text-white hover:bg-primary/20 hover:border-primary transition-all shadow-sm"
            >
              <span>Verified Game Credit on MobyGames</span>
            </a>
          </div>
        )}
      </header>

      {/* 3. EVIDENCE BREAKDOWN (Full-bleed widescreen cards) */}
      {project.evidenceBreakdown && project.evidenceBreakdown.length > 0 && (
        <section aria-label="Production Breakdown" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              {project.slug === "spider-man-2"
                ? "Cinematic VFX, Project Context & Credits"
                : "Production Breakdown"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              {project.slug === "spider-man-2"
                ? "Real-time gameplay captures, environmental destruction & in-game credits."
                : "In-engine captures, fluid simulations & real-time visual assets."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {project.evidenceBreakdown.map((item, i) => (
              <figure
                key={i}
                className={`flex flex-col justify-between ${
                  project.evidenceBreakdown!.length % 2 !== 0 && i === project.evidenceBreakdown!.length - 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
                  <BreakdownMedia
                    image={item.image}
                    loopVideo={item.loopVideo}
                    video={item.video}
                    title={item.title}
                    link={item.link}
                  />
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                    <h3 className="text-sm font-medium text-white/90">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">
                        · {item.tag}
                      </span>
                    )}
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[11px] font-mono transition-colors flex items-center gap-1 shrink-0 ${
                        item.link.includes("mobygames")
                          ? "text-primary hover:text-white font-medium"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.link.includes("mobygames") ? "MobyGames Credit" : "Footage"}
                    </a>
                  ) : item.timestamps && item.timestamps.length > 0 ? (
                    <div className="flex items-center gap-2">
                      {item.timestamps.map((ts, idx) => (
                        <a
                          key={idx}
                          href={ts.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-primary-hover hover:underline flex items-center gap-0.5"
                        >
                          {ts.time}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </figcaption>
                {item.caption && (
                  <p className="mt-1 text-xs text-neutral-400 font-light leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 4. BREAKDOWN CLIPS (e.g. Fortnite: 6 responsive clips in grid) */}
      {project.breakdownClips && project.breakdownClips.length > 0 && (
        <section aria-label="Selected Breakdown Clips" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              Selected Breakdown Clips
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              High-tempo live gameplay captures, animated pop-up graphics & stylized Niagara effects.
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
                  className="group flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
                    <Image
                      src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                      alt={clip.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <div className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-3 text-white shadow-xl group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all">
                        <Play className="h-4 w-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-b border-white/10 pb-2.5">
                    <h3 className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors">
                      {clip.title}
                    </h3>
                    <span className="text-[11px] font-mono text-muted-foreground group-hover:text-white transition-colors flex items-center gap-1">
                      Watch
                    </span>
                  </div>
                  {clip.caption && (
                    <p className="mt-1 text-xs text-neutral-400 font-light leading-relaxed">
                      {clip.caption}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. MASTER VFX REEL OR HERO DISPLAY */}
      {embedUrl ? (
        <section aria-label="Master VFX Reel" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
          <div className="mb-6">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              Master VFX Reel
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              High-definition in-engine sequences and gameplay montage.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
            <ProjectVideo
              embedUrl={embedUrl}
              watchUrl={project.watchUrl || (project.videoUrl ? getYoutubeWatchUrl(project.videoUrl) : "")}
              poster={project.videoPoster || project.thumbnail || "/images/NWA.jpg"}
              title={project.title}
              videoTitle={project.videoTitle}
            />
          </div>
        </section>
      ) : !project.evidenceBreakdown || project.evidenceBreakdown.length === 0 ? (
        project.thumbnail ? (
          <section aria-label="Hero Showcase" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1400px"
              />
            </div>
          </section>
        ) : null
      ) : null}

      {/* 6. PRODUCTION GALLERY */}
      {project.images && project.images.length > 0 && (!project.evidenceBreakdown || project.evidenceBreakdown.length === 0) && (
        <section aria-label="Production Gallery" className="mx-auto max-w-[1440px] px-4 sm:px-8 mb-20 sm:mb-28">
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-kanit">
              Production Gallery
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              High-resolution in-engine captures, material passes & visual development frames.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((img, i) => (
              <figure key={i} className="group flex flex-col justify-between">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-white/5">
                  <Image
                    src={img}
                    alt={`${project.title} Capture ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h3 className="text-sm font-medium text-white/90">
                    {project.title} Frame
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Shot {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 7. PRODUCTION SCOPE & MANDATE */}
      <section aria-label="Production Scope & Mandate" className="mx-auto max-w-4xl px-6 mb-20 sm:mb-28">
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
            Production Scope & Mandate
          </h2>
          <div className="space-y-4">
            {project.contributions.map((item, i) => (
              <p key={i} className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {item}
              </p>
            ))}
          </div>

          {technicalNotes.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Technical Notes
              </h3>
              <div className="space-y-2">
                {technicalNotes.slice(0, 3).map((note, i) => (
                  <p key={i} className="text-sm text-neutral-400 font-light leading-relaxed">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. STUDIO COLOPHON FOOTER */}
      <footer className="mx-auto max-w-5xl px-6 pt-16 mt-20 border-t border-white/15">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-xs">
          <div>
            <span className="text-neutral-500 font-mono uppercase tracking-widest block mb-1">
              Role
            </span>
            <span className="text-white font-medium text-sm">{project.role}</span>
          </div>
          <div>
            <span className="text-neutral-500 font-mono uppercase tracking-widest block mb-1">
              Engine
            </span>
            <span className="text-primary font-medium text-sm">
              {project.engine || "Proprietary"}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-mono uppercase tracking-widest block mb-1">
              Platform
            </span>
            <span className="text-white font-medium text-sm">
              {project.platform || "Console / PC"}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-mono uppercase tracking-widest block mb-1">
              {project.studio
                ? project.projectType === "film"
                  ? "Studio / Release"
                  : "Studio / Client"
                : "Client"}
            </span>
            <span className="text-white font-medium text-sm">
              {project.studio ? `${project.studio} / ${project.client}` : project.client}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mr-2">
              Tech:
            </span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Production Credit:{" "}
              <span className="text-white font-medium">
                {project.productionCredit ??
                  (project.role.toLowerCase().includes("freelance")
                    ? `Freelance / ${project.client}`
                    : project.client
                    ? `Credited under Sparx* / ${project.client}`
                    : "Sparx* - A Virtuos Studio")}
              </span>
            </p>
            {project.mobyGamesUrl && (
              <a
                href={project.mobyGamesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                MobyGames Credit
              </a>
            )}
            {project.steamUrl && (
              <a
                href={project.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                Steam
              </a>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
