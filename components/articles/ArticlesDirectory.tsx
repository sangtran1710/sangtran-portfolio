"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatDateByLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
    ? "Ghi chép thực chiến về Niagara VFX, shader HLSL, toán mô phỏng và công cụ pipeline trong game AAA."
    : "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools.";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-white bg-[#1c212c]">
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="mb-12 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5eb3ab]">
            {isVi ? "GHI CHÉP THỰC CHIẾN" : "TECHNICAL JOURNAL & LAB NOTES"}
          </span>
          <h1 className="mt-2 text-4xl font-kanit font-normal tracking-tight text-white sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            {subtitleText}
          </p>
        </header>

        {/* Clean Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#364156]/60 pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "all"
                ? "border-b-2 border-[#5eb3ab] font-medium text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <span>{isVi ? "Tất cả" : "All Notes"}</span>
            <span className="ml-1.5 text-slate-500">({allPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("tools")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "tools"
                ? "border-b-2 border-[#5eb3ab] font-medium text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <span>{isVi ? "Công cụ & Pipeline" : "Tools & Pipeline"}</span>
            <span className="ml-1.5 text-slate-500">({toolPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("math")}
            className={cn(
              "px-4 py-1.5 text-xs font-mono transition-colors",
              activeTab === "math"
                ? "border-b-2 border-[#5eb3ab] font-medium text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <span>{isVi ? "Toán cho VFX" : "Math for VFX"}</span>
            <span className="ml-1.5 text-slate-500">({mathPosts.length})</span>
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
                      <div className="relative h-56 w-full overflow-hidden rounded-lg border border-[#364156]/70 bg-[#161a23] transition-colors duration-300 group-hover:border-[#5eb3ab]/60">
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
                        <span className="uppercase tracking-[0.14em] text-[#5eb3ab]">
                          {categoryBadge}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-400">{formatDateByLocale(post.date, locale)}</span>
                      </div>

                      <h2 className="mt-2 text-xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-[#5eb3ab] font-kanit">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-300 line-clamp-2">
                          {post.description}
                        </p>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <p className="mt-3 text-xs font-mono text-slate-400">
                          {post.tags.slice(0, 4).join(" · ")}
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
