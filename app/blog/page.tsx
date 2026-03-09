import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Sang Tran",
  description:
    "Articles on real-time VFX, After Effects scripting, Unreal Engine, Houdini, and technical art. Practical notes from AAA game production.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">
            Blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Notes & Articles
          </h1>
          <p className="text-zinc-400 max-w-xl leading-relaxed">
            Practical write-ups on VFX tooling, After Effects scripting, Unreal
            Engine, and technical art. Things I figured out and thought were
            worth writing down.
          </p>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <p className="text-zinc-500 text-sm">No posts yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-800/60">
            {posts.map((post) => (
              <article key={post.slug} className="group py-8 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-3">
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

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white leading-snug mb-2 group-hover:text-teal-400 transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta */}
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
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} read
                        </span>
                      </>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-teal-500 group-hover:text-teal-400 transition-colors font-medium">
                      Read
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
