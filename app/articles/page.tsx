import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticlesDirectory } from "@/components/articles/ArticlesDirectory";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Production notes on real-time VFX, shaders, and technical art workflows.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles - Henry Tran",
    description:
      "Production notes on real-time VFX, shaders, and technical art workflows.",
    url: "/articles",
    type: "website",
    images: ["/images/NWA.jpg"],
  },
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ArticlesDirectory posts={posts} />
    </Suspense>
  );
}
