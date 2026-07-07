import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticlesDirectory } from "@/components/articles/ArticlesDirectory";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles, production notes, and ShaderLex: a UE5 material library for technical art, shaders, VFX, and Unreal Engine workflows.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles - Henry Tran",
    description:
      "Articles, production notes, and ShaderLex: a UE5 material library for technical art, shaders, VFX, and Unreal Engine workflows.",
    url: "/articles",
    type: "website",
    images: ["/assets/materials/style/anime-cel-shader-pilot-02.png"],
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
