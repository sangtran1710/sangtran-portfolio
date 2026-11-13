"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";

const articleTeasers: Record<string, string> = {
  "waterfall-channel-flow": "Houdini-authored meshes, vertex masks, and procedural COP2 textures for real-time water.",
  "ue5-procedural-terminal-shader": "Procedural CRT screen flicker shader in Unreal Engine 5.",
  "stormfront-volumetric-cloud-lightning": "Volumetric storm clouds and dynamic lightning system.",
  "houdini-destructibles-and-vfx-pipeline": "Optimizing Houdini destruction simulations for real-time engines.",
  "destructible-separate-mesh-tool": "Python tool isolating fracture seams and generating emitter cards.",
};

export function ArticlesDirectory({ posts }: { posts: BlogPostMeta[] }) {
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  const displayedPosts = posts.filter(
    (post) => post.slug !== "math-for-vfx-shaders" && post.slug !== "ue5-material-library-portal"
  );

  const headingText = isVi ? "Nghiên cứu VFX" : "VFX Studies";

  return (
    <div className="min-h-screen pt-32 pb-20 text-white bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-sans font-normal tracking-tight text-white">
            {headingText}
          </h1>
        </header>

        <section>
          <div className="grid gap-10 md:grid-cols-2">
            {displayedPosts.map((post, index) => {
              const isVfxStudy = post.tags.includes("VFX Study");
              const categoryLabel = isVfxStudy
                ? "VFX study"
                : post.tags.includes("Pipeline Tools")
                  ? "Pipeline tool"
                  : "Pipeline study";

              return (
                <article key={post.slug} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.thumbnail && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/80 bg-section">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          priority={index === 0}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <div className="pt-4">
                      <h2 className="font-sans text-xl font-normal tracking-tight text-white group-hover:underline underline-offset-4">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-1.5 text-base leading-relaxed text-muted-foreground line-clamp-2">
                          {articleTeasers[post.slug] ?? post.description}
                        </p>
                      )}

                      <p className="mt-2 text-[13px] text-muted-foreground">
                        {categoryLabel}
                        {post.readTime ? ` · ${post.readTime}` : ""}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
