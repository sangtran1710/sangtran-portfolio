"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";

const articleTeasers: Record<string, string> = {
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

  const headingText = isVi ? "Ghi chép Kỹ thuật" : "Technical Notes";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-white bg-background">
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="mb-10 max-w-2xl border-b border-border pb-6">
          <h1 className="text-4xl font-kanit font-normal tracking-tight text-white sm:text-5xl">
            {headingText}
          </h1>
        </header>

        {/* Flat Editorial Article Grid */}
        <section>
          <div className="grid gap-10 md:grid-cols-2">
            {displayedPosts.map((post, index) => {
              const isVfxStudy = post.tags.includes("VFX Study");
              const categoryBadge = isVfxStudy ? "VFX Study" : "Pipeline Tool";

              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Thumbnail - Flat, crisp border */}
                    {post.thumbnail && (
                      <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border/70 bg-section transition-colors duration-300 group-hover:border-primary/60">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <div className="pt-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="uppercase tracking-[0.14em] text-primary">
                          {categoryBadge}
                        </span>
                        <span className="text-quiet">/</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="mt-2 text-xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-primary font-kanit">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {articleTeasers[post.slug] ?? post.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
