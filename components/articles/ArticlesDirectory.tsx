"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calculator, Wrench, Layers } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatDateByLocale } from "@/lib/i18n";

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

  const headingText = isVi ? "Ghi chú kỹ thuật" : "Technical Notes";
  const subtitleText = isVi
    ? "Những điều tôi học được khi làm VFX, mày mò shader, toán và tự viết công cụ cho công việc."
    : "Things I've learned while making VFX, figuring out shaders and math, and building little tools along the way.";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-foreground bg-background">
      <main className="mx-auto max-w-[72rem] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-xl">
          <h1 className="text-4xl font-kanit font-medium tracking-tight text-foreground sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {subtitleText}
          </p>
        </header>

        {/* Tab Filters */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
              activeTab === "all"
                ? "bg-[#5c9d98] text-white shadow-sm"
                : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{isVi ? "Tất cả" : "All Notes"}</span>
            <span className="ml-0.5 rounded-full bg-black/20 px-1.5 py-0.2 text-[11px]">
              {allPosts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("tools")}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
              activeTab === "tools"
                ? "bg-[#5c9d98] text-white shadow-sm"
                : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>{isVi ? "Công cụ & Pipeline" : "Tools & Pipeline"}</span>
            <span className="ml-0.5 rounded-full bg-black/20 px-1.5 py-0.2 text-[11px]">
              {toolPosts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("math")}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
              activeTab === "math"
                ? "bg-[#5c9d98] text-white shadow-sm"
                : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>{isVi ? "Toán cho VFX" : "Math for VFX"}</span>
            <span className="ml-0.5 rounded-full bg-black/20 px-1.5 py-0.2 text-[11px]">
              {mathPosts.length}
            </span>
          </button>
        </div>

        {/* Post Grid */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {displayedPosts.map((post, index) => {
              const isMath = isMathPost(post);
              const isVfxStudy = post.tags.includes("VFX Study");
              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04] duration-300"
                >
                  {/* Thumbnail rendering */}
                  {post.thumbnail && (
                    <div className={`relative h-48 w-full overflow-hidden border-b border-white/10 ${
                      isMath ? "bg-[#070b11]" : "bg-black/40"
                    }`}>
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        priority={index === 0}
                        className={`${
                          isMath 
                            ? "object-contain p-2 opacity-95 group-hover:scale-[1.02]" 
                            : "object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02]"
                        } transition-all duration-500`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                          isMath
                            ? "bg-teal-500/10 text-[#5c9d98] border border-teal-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          {isMath ? "Math for VFX" : isVfxStudy ? "VFX Study" : "Pipeline Tool"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span>{formatDateByLocale(post.date, locale)}</span>
                      </div>

                      <h3 className="mt-4 text-xl font-medium tracking-tight text-white group-hover:text-primary transition-colors font-kanit">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>

                      {post.description && (
                        <p className="mt-2.5 text-sm text-stone-400 line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-stone-400 bg-white/5 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
