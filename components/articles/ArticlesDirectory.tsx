"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const articleTeasers: Record<string, string> = {
  "ue5-procedural-terminal-shader": "I rebuilt an old-screen flicker as a material—no flipbook needed.",
  "stormfront-volumetric-cloud-lightning": "A storm sky that moves and flashes without eating the frame budget.",
  "houdini-destructibles-and-vfx-pipeline": "Big Houdini sims are fun. Getting them into a game is the hard part.",
  "destructible-separate-mesh-tool": "I got tired of cleaning up fracture pieces by hand, so I made a tool.",
  "math-for-vfx-shaders": "The bits of math I keep reaching for when an effect needs to move.",
};

export function ArticlesDirectory({ posts }: { posts: BlogPostMeta[] }) {
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  // Default to "all" so Next.js static prerender generates full article cards in HTML
  const [activeTab, setActiveTab] = useState<"all" | "tools" | "math">("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "math" || tab === "tools") {
        requestAnimationFrame(() => {
          setActiveTab(tab);
        });
      }
    }
  }, []);

  const handleTabChange = (tab: "all" | "tools" | "math") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "all") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
    }
  };

  const isMathPost = (post: BlogPostMeta) =>
    post.tags.includes("Math") || post.slug.startsWith("math-");

  const toolPosts = posts.filter(
    (post) => !isMathPost(post) && post.slug !== "ue5-material-library-portal"
  );
  const mathPosts = posts.filter((post) => isMathPost(post));

  const allPosts = [...toolPosts, ...mathPosts];

  const displayedPosts = 
    activeTab === "tools" 
      ? toolPosts 
      : activeTab === "math" 
        ? mathPosts 
        : allPosts;

  const headingText = isVi ? "Ghi chép Kỹ thuật & R&D" : "Technical Notes & R&D";
  const subtitleText = isVi
    ? "Vài điều mình rút ra khi làm VFX, shader và công cụ."
    : "A few things I figured out while making VFX, shaders, and tools.";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-white bg-background">
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-kanit font-normal tracking-tight text-white sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {subtitleText}
          </p>
        </header>

        {/* Clean Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-border/60 pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "all"
                ? "border-b-2 border-primary font-medium text-white"
                : "text-muted-foreground hover:text-white"
            )}
          >
            <span>{isVi ? "Tất cả" : "All Notes"}</span>
            <span className="ml-1.5 text-quiet">({allPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("tools")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "tools"
                ? "border-b-2 border-primary font-medium text-white"
                : "text-muted-foreground hover:text-white"
            )}
          >
            <span>{isVi ? "Công cụ & Pipeline" : "Tools & Pipeline"}</span>
            <span className="ml-1.5 text-quiet">({toolPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("math")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "math"
                ? "border-b-2 border-primary font-medium text-white"
                : "text-muted-foreground hover:text-white"
            )}
          >
            <span>{isVi ? "Toán cho VFX" : "Math for VFX"}</span>
            <span className="ml-1.5 text-quiet">({mathPosts.length})</span>
          </button>
        </div>

        {/* Flat Editorial Article Grid */}
        <section>
          <div className="grid gap-10 md:grid-cols-2">
            {displayedPosts.map((post, index) => {
              const isMath = isMathPost(post);
              const isVfxStudy = post.tags.includes("VFX Study");
              const categoryBadge = isMath ? "Math for VFX" : isVfxStudy ? "VFX Study" : "Pipeline Tool";

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
                          className={cn(
                            "transition-transform duration-500 ease-out group-hover:scale-[1.02]",
                            isMath ? "object-contain p-4" : "object-cover"
                          )}
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
