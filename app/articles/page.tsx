import type { Metadata } from "next";
import { ArticlesDirectory } from "@/components/articles/ArticlesDirectory";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Notes from my VFX work: shaders, math, Houdini, and the tools I build along the way.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles - Henry Tran",
    description:
      "Notes from my VFX work: shaders, math, Houdini, and the tools I build along the way.",
    url: "/articles",
    type: "website",
    images: ["/images/NWA.jpg"],
  },
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  return <ArticlesDirectory posts={posts} />;
}
