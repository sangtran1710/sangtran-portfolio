"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Code, Calculator } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatDateByLocale } from "@/lib/i18n";

export function ArticlesDirectory({ posts }: { posts: BlogPostMeta[] }) {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQuery = searchParams?.get("tab");

  // Derive activeTab directly from URL, no useEffect cascading renders
  const activeTab = tabQuery === "shaderlex" || tabQuery === "math" ? tabQuery : "articles";

  const handleTabChange = (tab: "articles" | "shaderlex" | "math") => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (tab === "shaderlex" || tab === "math") {
      params.set("tab", tab);
    } else {
      params.delete("tab");
    }
    
    const query = params.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    router.replace(newUrl, { scroll: false });
  };

  const shaderLexSlugs = ["cel-shade", "gerstner-waves", "vortex-polar", "depth-fade", "pom-mapping", "flow-map"];
  const mathSlugs = [
    "math-essential-functions", 
    "math-uv-coordinates", 
    "math-dot-product", 
    "math-spatial-masks",
    "math-cross-product"
  ];
  
  const blogPosts = posts.filter(
    (post) => !shaderLexSlugs.includes(post.slug) && !mathSlugs.includes(post.slug) && post.slug !== "ue5-material-library-portal"
  );
  const mathPosts = posts.filter((post) => mathSlugs.includes(post.slug))
    .sort((a, b) => mathSlugs.indexOf(a.slug) - mathSlugs.indexOf(b.slug));

  const headingText = isVi ? "Ghi chú" : "Notes";

  // Light, visual-focused catalog for ShaderLex (details are inside the deep-dive articles)
  const shaderRecipes = [
    {
      id: "cel-shade",
      category: "Stylized Rendering",
      name: "Anime Cel Shading & Rim",
      image: "/images/shaderlex/cel_shade.svg",
      shortDesc: "Clean anime toon shading with NdotL step math, custom specular, and silhouette Fresnel rim outlines.",
    },
    {
      id: "gerstner-waves",
      category: "Vertex Animation",
      name: "Gerstner Waves displacement",
      image: "/images/shaderlex/gerstner_wave.svg",
      shortDesc: "Trochoidal wave calculations in World Position Offset to create physical wave peaks and fluid ocean displacement.",
    },
    {
      id: "vortex-polar",
      category: "Math & UV Distortion",
      name: "Polar Coordinate Vortex",
      image: "/images/shaderlex/vortex_polar.svg",
      shortDesc: "Converts Cartesian UV space into Polar coords to animate spiral swirl portal vortexes without centering pinch artifacts.",
    },
    {
      id: "depth-fade",
      category: "Translucency & VFX",
      name: "Depth Fade Soft Particle",
      image: "/images/shaderlex/depth_fade.svg",
      shortDesc: "Uses Scene Depth buffer comparison to dynamically blend transparent VFX cards with solid geometry, removing hard edges.",
    },
    {
      id: "pom-mapping",
      category: "Advanced Materials",
      name: "Parallax Occlusion Mapping",
      image: "/images/shaderlex/pom_mapping.svg",
      shortDesc: "Simulates actual 3D relief depth and self-occlusion on flat polygons via pixel shader heightmap ray-marching.",
    },
    {
      id: "flow-map",
      category: "Math & UV Distortion",
      name: "Flow Map UV Distortion",
      image: "/images/shaderlex/flow_map.svg",
      shortDesc: "Animate liquid, fire, or lava flows using a 2D vector flow map texture with phase-swapped panning.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 text-foreground bg-background">
      <main className="mx-auto max-w-[72rem] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-xl">
          <h1 className="text-4xl font-kanit font-medium tracking-tight text-foreground sm:text-5xl">
            {headingText}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {isVi 
              ? "Ghi chép về shader, VFX và công cụ kỹ thuật."
              : "Notes on shaders, VFX, and technical art."}
          </p>
        </header>

        <div className="mb-8 grid grid-cols-3 border-b border-white/10">
          <button
            onClick={() => handleTabChange("articles")}
            className={`flex items-center justify-center px-1 sm:px-4 py-3 sm:py-3.5 text-center text-[10px] sm:text-[12px] font-semibold uppercase leading-tight tracking-wider transition-all border-b-2 ${
              activeTab === "articles"
                ? "border-primary text-white bg-white/[0.02]"
                : "border-transparent text-stone-500 hover:text-stone-300"
            }`}
          >
            {isVi ? "Bài Viết" : "Articles"}
          </button>
          <button
            onClick={() => handleTabChange("shaderlex")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-3 sm:py-3.5 text-center text-[10px] sm:text-[12px] font-semibold uppercase leading-tight tracking-wider transition-all border-b-2 ${
              activeTab === "shaderlex"
                ? "border-primary text-white bg-white/[0.02]"
                : "border-transparent text-stone-500 hover:text-stone-300"
            }`}
          >
            <Code className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">ShaderLex Recipes</span>
            <span className="sm:hidden">ShaderLex</span>
          </button>
          <button
            onClick={() => handleTabChange("math")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-3 sm:py-3.5 text-center text-[10px] sm:text-[12px] font-semibold uppercase leading-tight tracking-wider transition-all border-b-2 ${
              activeTab === "math"
                ? "border-primary text-white bg-white/[0.02]"
                : "border-transparent text-stone-500 hover:text-stone-300"
            }`}
          >
            <Calculator className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Math for VFX</span>
            <span className="sm:hidden">Math</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "articles" && (
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04] duration-300"
                >
                  {/* Thumbnail rendering */}
                  {post.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/10 bg-black/40">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span>{formatDateByLocale(post.date, locale)}</span>
                      </div>

                      <h3 className="mt-4 text-xl font-medium tracking-tight text-white group-hover:text-primary transition-colors font-kanit">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "shaderlex" && (
          <section>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shaderRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04] duration-300"
                >
                  <div>
                    {/* Visual Preview */}
                    {recipe.image && (
                      <div className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-[#070b11]">
                        <Image
                          src={recipe.image}
                          alt={recipe.name}
                          fill
                          className="object-contain p-2 opacity-95 group-hover:scale-[1.02] transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <span className="text-[11px] font-medium text-[#7db5b0]">
                        {recipe.category}
                      </span>
                      
                      <h3 className="mt-3 text-lg font-medium text-white group-hover:text-primary transition-colors font-kanit tracking-tight">
                        <Link href={`/blog/${recipe.id}`}>
                          <span className="absolute inset-0" />
                          {recipe.name}
                        </Link>
                      </h3>

                    </div>
                  </div>

                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "math" && (
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              {mathPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04] duration-300"
                >
                  {post.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/10 bg-[#070b11]">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-contain p-2 opacity-95 group-hover:scale-[1.02] transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-[#7db5b0]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span>Math</span>
                      </div>

                      <h3 className="mt-4 text-xl font-medium tracking-tight text-white group-hover:text-primary transition-colors font-kanit">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>

                    </div>
                  </div>
                  
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
