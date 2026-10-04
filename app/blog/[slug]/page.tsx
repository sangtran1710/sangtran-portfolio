import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/seo";
import { 
  DotProductVisual, SineWaveVisual, CrossProductVisual, StepVsSmoothstepVisual, MathGridBackground,
  UvCartesianVisual, UvPanningVisual, UvDistortionVisual, 
  SphericalMaskVisual, WorldPositionOffsetVisual, DepthFadeVisual
} from "@/components/blog/MathVisuals";
import {
  VideoPlayer,
  TextureCard,
  TextureGallery,
  ProductionNotice,
} from "@/components/blog/HoudiniVisuals";

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
    <div className="min-h-screen bg-background pt-28 pb-24 relative overflow-hidden">
      <MathGridBackground />
      <div className="mx-auto max-w-2xl px-6 relative z-10">

        {/* Back */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm text-quiet hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <Tag className="h-3.5 w-3.5 text-quiet shrink-0 mr-0.5" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border bg-section px-2.5 py-0.5 text-xs font-mono text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Meta bar */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-8">
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
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[15px]
          prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-primary prose-code:bg-section prose-code:border prose-code:border-border prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-section prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
          prose-hr:border-border
          prose-li:text-muted-foreground prose-li:leading-relaxed
          prose-ul:my-4 prose-ol:my-4
        ">
          <MDXRemote source={post.content} components={{ 
            DotProductVisual, SineWaveVisual, CrossProductVisual, StepVsSmoothstepVisual,
            UvCartesianVisual, UvPanningVisual, UvDistortionVisual, 
            SphericalMaskVisual, WorldPositionOffsetVisual, DepthFadeVisual,
            VideoPlayer, TextureCard, TextureGallery, ProductionNotice
          }} />
        </div>

        <aside className="mt-16 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Want to talk through any of this?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            If you have a question about a setup, need a hand with a technical problem, or spotted something I should fix, send me a note.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Question about ${post.title}`)}`}
            className="mt-5 inline-flex rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            Email me ↗
          </a>
        </aside>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm text-quiet hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-quiet hover:text-teal-400 transition-colors"
          >
            View my work &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
