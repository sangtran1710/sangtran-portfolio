import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image = post.thumbnail || "/images/NWA.jpg";
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${post.title} article preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(image)],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-6">

        {/* Back */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Tag className="h-3 w-3 text-zinc-600 shrink-0" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Meta bar */}
          <div className="flex items-center gap-4 text-xs text-zinc-600 border-b border-zinc-800 pb-8">
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
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose prose-invert prose-zinc max-w-none
          prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-zinc-200
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[15px]
          prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline
          prose-strong:text-zinc-200 prose-strong:font-semibold
          prose-code:text-teal-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
          prose-blockquote:border-l-teal-500 prose-blockquote:text-zinc-400
          prose-hr:border-zinc-800
          prose-li:text-zinc-400 prose-li:leading-relaxed
          prose-ul:my-4 prose-ol:my-4
        ">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-zinc-500 hover:text-teal-400 transition-colors"
          >
            View my work &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
