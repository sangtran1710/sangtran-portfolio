"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calculator, Wrench, Layers } from "lucide-react";
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

  const headingText = isVi ? "Ghi chú kỹ thuật & R&D" : "Technical Notes & R&D";
  const subtitleText = isVi
    ? "Ghi chép thực chiến về Niagara VFX, shader HLSL, toán mô phỏng và công cụ pipeline trong game AAA."
    : "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools.";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-white bg-[#0e1117]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5eb3ab]">
              {"// KNOWLEDGE BASE & LAB NOTES"}
            </span>
          </div>
          <h1 className="text-4xl font-kanit font-medium tracking-tight text-white sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            {subtitleText}
          </p>
        </header>

        {/* Flat Technical Tab Filters */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-[#242b38] pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md border transition-colors",
              activeTab === "all"
                ? "bg-[#181e28] text-white border-[#5eb3ab]"
                : "bg-[#11141a] text-slate-400 border-[#242b38] hover:border-slate-600 hover:text-slate-200"
            )}
          >
            <Layers className="h-3.5 w-3.5 text-[#5eb3ab]" />
            <span>{isVi ? "TẤT CẢ" : "ALL NOTES"}</span>
            <span className="font-mono text-[10px] text-slate-500">[{allPosts.length}]</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("tools")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md border transition-colors",
              activeTab === "tools"
                ? "bg-[#181e28] text-white border-[#5eb3ab]"
                : "bg-[#11141a] text-slate-400 border-[#242b38] hover:border-slate-600 hover:text-slate-200"
            )}
          >
            <Wrench className="h-3.5 w-3.5 text-[#5eb3ab]" />
            <span>{isVi ? "CÔNG CỤ & PIPELINE" : "TOOLS & PIPELINE"}</span>
            <span className="font-mono text-[10px] text-slate-500">[{toolPosts.length}]</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("math")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md border transition-colors",
              activeTab === "math"
                ? "bg-[#181e28] text-white border-[#5eb3ab]"
                : "bg-[#11141a] text-slate-400 border-[#242b38] hover:border-slate-600 hover:text-slate-200"
            )}
          >
            <Calculator className="h-3.5 w-3.5 text-[#5eb3ab]" />
            <span>{isVi ? "TOÁN CHO VFX" : "MATH FOR VFX"}</span>
            <span className="font-mono text-[10px] text-slate-500">[{mathPosts.length}]</span>
          </button>
        </div>

        {/* Precision Post Grid */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {displayedPosts.map((post, index) => {
              const isMath = isMathPost(post);
              const isVfxStudy = post.tags.includes("VFX Study");
              const categoryBadge = isMath ? "Math for VFX" : isVfxStudy ? "VFX Study" : "Pipeline Tool";

              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#242b38] bg-[#151921] transition-colors duration-200 hover:border-[#3b475c] hover:bg-[#181d27]"
                >
                  {/* Thumbnail rendering - Clean and unmuted */}
                  {post.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-[#242b38] bg-[#0e1117]">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        priority={index === 0}
                        className={cn(
                          "transition-transform duration-300 group-hover:scale-[1.02]",
                          isMath ? "object-contain p-3" : "object-cover"
                        )}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        <span className="rounded-sm border border-[#242b38] bg-[#0e1117] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#5eb3ab]">
                          [{categoryBadge.toUpperCase()}]
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">{formatDateByLocale(post.date, locale)}</span>
                      </div>

                      <h3 className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-[#5eb3ab] transition-colors font-kanit">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>

                      {post.description && (
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-[#242b38]">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-[#242b38] bg-[#0e1117] px-2 py-0.5 text-[10px] font-mono text-slate-400"
                        >
                          #{tag}
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
