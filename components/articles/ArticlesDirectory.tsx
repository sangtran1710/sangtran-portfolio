import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export function ArticlesDirectory() {
  const posts = getAllPosts();
  const shaderLexPost = posts.find((post) => post.slug === "ue5-material-library-portal");
  const blogPosts = posts.filter((post) => post.slug !== "ue5-material-library-portal");
  const latestBlog = blogPosts[0];

  return (
    <div className="min-h-screen bg-[#06080c] pt-28 pb-20 text-white">
      <main className="mx-auto max-w-[72rem] px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-300">Articles</span>
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-400">
            Articles Library
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Articles
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Field notes, technical breakdowns, and ShaderLex, my UE5 material
            library for material recipes and lookdev references.
          </p>
        </header>

        <section className="mb-14 overflow-hidden rounded-3xl border border-teal-400/20 bg-[#081114] shadow-[0_24px_90px_rgba(20,184,166,0.1)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="p-7 sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
                Featured resource
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ShaderLex
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-300">
                A practical UE5 material library for stylized, anime, cel shader,
                semi-realistic, and realistic workflows. Use it when you need to
                rebuild material logic quickly.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/materials/index.html"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
                >
                  Open ShaderLex
                  <ExternalLink className="h-4 w-4" />
                </Link>
                {shaderLexPost && (
                  <Link
                    href={`/blog/${shaderLexPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-teal-400/25 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-teal-300/50 hover:text-white"
                  >
                    Read overview
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
                <Link href="/materials/ue5.html" className="transition hover:text-teal-300">
                  UE5 hub
                </Link>
                <Link href="/materials/style/style-roadmap.html" className="transition hover:text-teal-300">
                  Style roadmap
                </Link>
                <Link href="/materials/recipes/magic-energy.html" className="transition hover:text-teal-300">
                  Sample recipe
                </Link>
              </div>
            </div>

            <Link
              href="/materials/index.html"
              className="relative hidden min-h-[260px] border-l border-teal-400/10 lg:block"
              aria-label="Open ShaderLex"
            >
              <Image
                src="/assets/materials/style/anime-cel-shader-pilot-02.png"
                alt="ShaderLex material library visual preview"
                fill
                className="object-cover opacity-70 transition hover:opacity-90"
                sizes="380px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081114] to-transparent" />
            </Link>
          </div>
        </section>

        <section id="blog" className="scroll-mt-28">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600">
                Blog
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Recent writing
              </h2>
            </div>
          </div>

          {blogPosts.length === 0 ? (
            <p className="text-sm text-zinc-500">No blog articles yet.</p>
          ) : (
            <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group transition hover:bg-white/[0.035]"
                >
                  <Link href={`/blog/${post.slug}`} className="grid gap-5 p-4 sm:grid-cols-[220px_minmax(0,1fr)]">
                    {post.thumbnail && (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800/70">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 260px"
                        />
                      </div>
                    )}

                      <div className="min-w-0 self-center py-1">
                        {post.tags?.length > 0 && (
                          <div className="mb-3 flex items-center gap-1.5">
                            <Tag className="h-3 w-3 text-zinc-600" />
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-medium uppercase tracking-widest text-zinc-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                        <h3 className="mb-2 text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-teal-300">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                          {post.description}
                        </p>
                      <div className="flex items-center gap-4 text-xs text-zinc-600">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        {post.readTime && (
                          <>
                            <span>/</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime} read
                            </span>
                          </>
                        )}
                        <span className="ml-auto flex items-center gap-1 font-medium text-teal-500 transition-colors group-hover:text-teal-300">
                          Read
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
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
