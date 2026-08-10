import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Youtube } from "lucide-react";

export const metadata: Metadata = {
  title: "Erlangmon VFX",
  description:
    "A stylized character VFX study built in Unreal Engine with Niagara, custom materials, animation timing, and mobile performance in mind.",
  openGraph: {
    title: "Erlangmon VFX | Henry Tran",
    description:
      "A breakdown of stylized character effects, custom shading, timing integration, and mobile optimization.",
    images: ["/projects/erlangmon-vfx/poster.jpg"],
  },
};

const facts = [
  { label: "Role", value: "VFX and Technical Artist" },
  { label: "Target", value: "Mobile stylized RPG" },
  { label: "Built with", value: "Unreal Engine, Niagara, Blender" },
];

const systems = [
  {
    title: "Buff aura",
    body: "A ground decal, spear-tip beam, and expanding rings give the buff a readable silhouette without hiding the character.",
  },
  {
    title: "Skill slash",
    body: "A straight-UV slash mesh combines a cyan core, eroded gold edge, and a brief wolf-head flash for a clear impact beat.",
  },
  {
    title: "Character shading",
    body: "An unlit master material layers cel shading, Fresnel rim light, and scrolling noise so the character and effects share one visual language.",
  },
];

export default function ErlangmonVfxPage() {
  return (
    <article className="bg-[#070a0f] text-white">
      <header className="mx-auto max-w-7xl px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:px-10">
        <Link
          href="/portfolio#rnd"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to experiments
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="text-sm text-primary">Personal VFX study, 2026</p>
            <h1 className="mt-3 max-w-4xl font-kanit text-5xl font-light leading-none sm:text-6xl lg:text-7xl">
              Erlangmon VFX
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            A compact character-effects package built around clear combat timing,
            reusable materials, and a mobile-friendly render budget.
          </p>
        </div>

        <dl className="mt-12 grid border-y border-white/10 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="py-5 sm:border-r sm:border-white/10 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <dt className="text-xs text-white/45">{fact.label}</dt>
              <dd className="mt-1 text-sm text-white/85">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-label="Erlangmon VFX showcase" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <video
          className="aspect-video w-full rounded-md border border-white/10 bg-black object-cover"
          controls
          playsInline
          preload="metadata"
          poster="/projects/erlangmon-vfx/poster.jpg"
        >
          <source src="/projects/erlangmon-vfx/showcase.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <div className="mt-4 flex justify-end">
          <a
            href="https://www.youtube.com/watch?v=-Fa3KLNeicA&t=17s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border-b border-white/30 text-sm text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Youtube className="h-4 w-4" aria-hidden="true" />
            Watch on YouTube
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="bg-[#f4f5f6] text-[#14181d]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">What I built</h2>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              I treated the brief as a small production pipeline rather than a single effect.
              The result combines three readable VFX systems with a shared shading setup and
              timing controls that can be tuned without rebuilding each variant.
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-t border-black/15 pt-10 md:grid-cols-3">
            {systems.map((system) => (
              <div key={system.title}>
                <h3 className="font-kanit text-2xl font-light">{system.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{system.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <figure>
              <div className="relative aspect-[807/659] overflow-hidden rounded-md bg-black">
                <Image
                  src="/projects/erlangmon-vfx/cel-shading.webp"
                  alt="Erlangmon character with blue cel shading and Fresnel rim light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 62vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-black/50">
                Character look development using the shared unlit material.
              </figcaption>
            </figure>

            <figure>
              <div className="relative aspect-[686/680] overflow-hidden rounded-md bg-black">
                <Image
                  src="/projects/erlangmon-vfx/buff-aura.webp"
                  alt="Erlangmon character standing inside cyan buff rings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-black/50">
                The buff stays low and open around the character silhouette.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">
              Technical decisions
            </h2>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-medium">One control path for timing and color</h3>
              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                Slash variants share a global color curve, while gameplay timing offsets the
                attack effects by 1.31 seconds to meet the animation contact point. Buff effects
                remain immediate, so each gameplay event keeps its intended response.
              </p>
            </div>
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-lg font-medium">Mobile-aware geometry and overdraw</h3>
              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                Tight slash and ring meshes reduce unused translucent coverage. I checked the
                result with Unreal&apos;s Shader Complexity and Overdraw views, then kept the effect
                layers focused on the silhouette and impact frames that matter most.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <figure>
            <div className="relative aspect-[1898/1023] overflow-hidden rounded-md border border-white/10 bg-black">
              <Image
                src="/projects/erlangmon-vfx/material-graph.webp"
                alt="Unreal Engine material graph used for Erlangmon VFX"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/45">Shared material controls.</figcaption>
          </figure>

          <figure>
            <div className="relative aspect-[1904/926] overflow-hidden rounded-md border border-white/10 bg-black">
              <Image
                src="/projects/erlangmon-vfx/niagara-system.webp"
                alt="Unreal Engine Niagara system for the Erlangmon effect"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/45">Niagara system assembly.</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0b0e12]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">Next pass</h2>
          <p className="max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            I would push the electricity around the spear tip, test cheaper blend modes where
            the silhouette allows it, and give the final color and timing curves one more polish
            pass. Those changes would add energy without making the effect busier.
          </p>
        </div>
      </section>
    </article>
  );
}
