import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Celestial Legion — Xianxia Combat VFX",
  description:
    "A real-time combat VFX study and technical art test built in Unreal Engine Niagara for an unannounced Chinese fantasy project, featuring talisman rune seals, golden radiance, and mass celestial legion summoning.",
  alternates: {
    canonical: "/rnd/celestial-legion-vfx",
  },
  openGraph: {
    title: "Celestial Legion — Xianxia Combat VFX | Henry Tran",
    description:
      "Breakdown of Eastern fantasy combat VFX, talisman seal shaders, sequencer choreography, and Niagara legion summoning in Unreal Engine.",
    url: "/rnd/celestial-legion-vfx",
    images: ["/projects/celestial-legion-vfx/poster.jpg"],
  },
};

const facts = [
  { label: "Role", value: "VFX and Technical Artist" },
  { label: "Origin / Scope", value: "Outsource Production Test (Mid 2024)" },
  { label: "Built with", value: "Unreal Engine 5, Niagara, Sequencer" },
];

const systems = [
  {
    title: "Taoist Rune Seal & Qi Channeling",
    body: "A cylindrical rotating talisman rune seal orbiting the Taoist sage, constructed with scrolling emissive UVs and dynamic radial glow to signal skill initialization.",
  },
  {
    title: "Ascension & Radiant Energy Burst",
    body: "The elder ascends skyward as a blinding burst of golden qi erupts, combining directional light streaks, ascending gold embers, and dramatic camera framing.",
  },
  {
    title: "Celestial Legion Summoning",
    body: "A massive formation of glowing golden armored phantom warriors spawned across the platform grid, simultaneously kneeling and rising in battle-ready stance.",
  },
];

export default function CelestialLegionVfxPage() {
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
            <p className="text-sm text-teal-400">Outsource Production Test, Mid 2024</p>
            <h1 className="mt-3 max-w-4xl font-kanit text-5xl font-light leading-none sm:text-6xl lg:text-7xl">
              Celestial Legion VFX
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            A stylized Eastern fantasy combat VFX study exploring talisman seal mechanics,
            radiant golden qi, and large-scale phantom army summoning in Unreal Engine.
          </p>
        </div>

        <dl className="mt-12 grid border-y border-white/10 sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="py-5 sm:border-r sm:border-white/10 sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="text-xs text-white/45">{fact.label}</dt>
              <dd className="mt-1 text-sm text-white/85">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Video Showcase */}
      <section aria-label="Celestial Legion VFX showcase" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/projects/celestial-legion-vfx/poster.jpg"
          >
            <source src="/projects/celestial-legion-vfx/showcase.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </section>

      {/* Systems Breakdown */}
      <section className="bg-[#f4f5f6] text-[#14181d]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">What I built</h2>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              Commissioned as a technical art test for an unannounced Chinese action RPG, this piece
              treats ultimate ability visual design as a coordinated choreography between character animation,
              emissive material effects, camera timing, and particle performance.
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

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <figure>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                <Image
                  src="/projects/celestial-legion-vfx/celestial-soldiers.jpg"
                  alt="Summoned golden celestial warrior legion in battle formation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-black/50">
                Low-angle view of the golden celestial army emerging simultaneously across the field.
              </figcaption>
            </figure>

            <figure>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                <Image
                  src="/projects/celestial-legion-vfx/poster.jpg"
                  alt="Taoist sage raising hand with radiant golden rays and rotating talisman ring"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-black/50">
                Taoist elder channeling radiant golden qi with rotating rune seal ring.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Technical Decisions */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">
              Technical decisions
            </h2>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-medium text-teal-300">Large-scale particle instancing & draw calls</h3>
              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                Spawning a dense legion of phantom warriors requires careful budget control. Instead of instantiating
                heavy skeletal meshes, the formation uses Niagara mesh particles with baked animation poses and shared
                material instances. This drastically minimizes CPU draw call overhead while keeping the army visually imposing.
              </p>
            </div>
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-lg font-medium text-teal-300">Sequencer choreography & animation timing</h3>
              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                The entire sequence is driven through Unreal Sequencer to tightly align camera cuts, particle burst cues,
                and character animation. The rune circle winds up first, followed by the ascension leap, climaxing with the
                ground-level reveal of the summoned army.
              </p>
            </div>
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-lg font-medium text-teal-300">Emissive balance & overdraw management</h3>
              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                Golden effects in night/dark settings easily lead to excessive post-process bloom blowout and overdraw.
                Intensity curves were calibrated so the rune scripts maintain sharp readability without blinding the camera,
                and particle boundaries were trimmed to reduce wasteful translucent blending.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
              <Image
                src="/projects/celestial-legion-vfx/rune-circle.jpg"
                alt="Rotating talisman rune seal around character"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/45">
              Cylindrical talisman rune ring with custom scrolling UV and emissive pulse.
            </figcaption>
          </figure>

          <figure>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
              <Image
                src="/projects/celestial-legion-vfx/army-array.jpg"
                alt="Bird-eye view of celestial army formation on platform"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white/45">
              High-angle view demonstrating the multi-row grid alignment of the summoned legion.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Next Pass */}
      <section className="border-t border-white/10 bg-[#0b0e12]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <h2 className="font-kanit text-3xl font-light leading-tight sm:text-4xl">Future Polish</h2>
          <p className="max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            For full gameplay integration, the next pass would incorporate custom cracked-earth ground decals under
            each summoned soldier, audio-reactive haptic timing, and dynamic disintegration dissolve shaders when the
            army executes its coordinated strike.
          </p>
        </div>
      </section>
    </article>
  );
}
