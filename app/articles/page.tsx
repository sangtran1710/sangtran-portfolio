import type { Metadata } from "next";
import { ArticlesDirectory } from "@/components/articles/ArticlesDirectory";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Technical Notes & R&D",
  description:
    "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Technical Notes & Shader R&D | Henry Tran",
    description:
      "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
    url: "/articles",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Notes & Shader R&D by Henry Tran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Notes & Shader R&D | Henry Tran",
    description:
      "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
    images: ["/images/og-main.jpg"],
  },
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  return <ArticlesDirectory posts={posts} />;
}
