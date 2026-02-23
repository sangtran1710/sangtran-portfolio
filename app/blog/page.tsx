import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog — Coming soon",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-14 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8">Coming soon.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
