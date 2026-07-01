"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, Tag } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatDateByLocale } from "@/lib/i18n";

export function ArticlesDirectory({ posts }: { posts: BlogPostMeta[] }) {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const shaderLexPost = posts.find((post) => post.slug === "ue5-material-library-portal");
  const blogPosts = posts.filter((post) => post.slug !== "ue5-material-library-portal");

  const headingText = isVi ? "Ghi chú & Bài viết" : "Articles";
  const shaderLexDescription = isVi
    ? "Thư mục tra cứu nhanh HLSL & Unreal Engine Material của tôi. Được thiết kế tối giản để phục vụ công việc và tra cứu nhanh khi đang làm dự án."
    : "My personal reference sheets for UE5 materials and HLSL shaders. Built for rapid lookdev prototyping and quick node-graph lookup.";

  const recentWritingHeading = isVi ? "Bài viết gần đây" : "Recent writing";

  return (
    <div className="min-h-screen bg-[#f6f2eb] pt-28 pb-20 text-slate-700">
      <main className="mx-auto max-w-[72rem] px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-slate-900">
              {copy.nav.home}
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{copy.blog.title}</span>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f8e89]">
            {isVi ? "Kho tài liệu" : "Articles Library"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {copy.blog.intro}
          </p>
        </header>

        {/* Simplified ShaderLex Card */}
        <section className="mb-14 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.03)] hover:border-stone-300/80 transition-all duration-300">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4f8e89]">
                  {isVi ? "Tài liệu kỹ thuật" : "Technical reference"}
                </p>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  ShaderLex
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                  {shaderLexDescription}
                </p>
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/materials/index.html"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#5c9d98] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(92,157,152,0.18)] transition-all hover:scale-[1.01] hover:bg-[#538f8a]"
                  >
                    {isVi ? "Mở ShaderLex" : "Open ShaderLex"}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  {shaderLexPost && (
                    <Link
                      href={`/blog/${shaderLexPost.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-stone-300 hover:text-slate-900 transition-colors shadow-sm"
                    >
                      {isVi ? "Xem tổng quan" : "Read overview"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Link href="/materials/ue5.html" className="transition hover:text-[#5c9d98]">
                    {isVi ? "Cổng UE5" : "UE5 Hub"}
                  </Link>
                  <span className="text-stone-300">|</span>
                  <Link href="/materials/style/style-roadmap.html" className="transition hover:text-[#5c9d98]">
                    {isVi ? "Lộ trình phong cách" : "Style Roadmap"}
                  </Link>
                  <span className="text-stone-300">|</span>
                  <Link href="/materials/recipes/magic-energy.html" className="transition hover:text-[#5c9d98]">
                    {isVi ? "Công thức mẫu" : "Sample Recipe"}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/materials/index.html"
              className="relative hidden min-h-[260px] border-l border-stone-100 lg:block bg-stone-50"
              aria-label="Open ShaderLex"
            >
              <Image
                src="/assets/materials/style/anime-cel-shader-pilot-02.png"
                alt="ShaderLex material library visual preview"
                fill
                className="object-cover opacity-85 transition hover:opacity-100 duration-300"
                sizes="380px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10" />
            </Link>
          </div>
        </section>

        {/* Blog Posts list */}
        <section id="blog" className="scroll-mt-28">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f8e89]">
                Blog
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {recentWritingHeading}
              </h2>
            </div>
          </div>

          {blogPosts.length === 0 ? (
            <p className="text-sm text-slate-500">{copy.common.noPosts}</p>
          ) : (
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-stone-300 hover:-translate-y-0.5"
                >
                  <Link href={`/blog/${post.slug}`} className="grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)]">
                    {post.thumbnail && (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-stone-200/60 bg-stone-50">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                          sizes="(max-width: 640px) 100vw, 220px"
                        />
                      </div>
                    )}

                    <div className="min-w-0 self-center py-1">
                      {post.tags?.length > 0 && (
                        <div className="mb-3 flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-slate-400" />
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <h3 className="mb-2.5 text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-[#5c9d98]">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <time dateTime={post.date}>
                          {formatDateByLocale(post.date, locale)}
                        </time>
                        {post.readTime && (
                          <>
                            <span>/</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              {post.readTime} {copy.common.dateReadSuffix}
                            </span>
                          </>
                        )}
                        <span className="ml-auto flex items-center gap-1 font-semibold text-[#4f8e89] transition-colors group-hover:text-[#5c9d98]">
                          {isVi ? "Đọc tiếp" : "Read"}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
