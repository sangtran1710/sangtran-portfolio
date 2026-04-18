import type { MetadataRoute } from "next";
import { PROJECTS, RND_PROJECTS } from "@/data/portfolio";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/showreel"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/articles"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS
    .filter((project) => !project.link)
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: project.isFeatured ? 0.85 : 0.7,
    }));

  const rndRoutes: MetadataRoute.Sitemap = RND_PROJECTS
    .filter((project) => project.link.startsWith("/rnd/"))
    .map((project) => ({
      url: absoluteUrl(project.link),
      lastModified: now,
      changeFrequency: "yearly",
      priority: project.group === "vfx" ? 0.55 : 0.45,
    }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const materialRoutes: MetadataRoute.Sitemap = [
    "/materials/index.html",
    "/materials/ue5.html",
    "/materials/style/style-roadmap.html",
    "/materials/style/stylized.html",
    "/materials/style/semi-realistic.html",
    "/materials/style/realistic.html",
    "/materials/recipes/magic-energy.html",
    "/materials/recipes/portal-vortex.html",
    "/materials/recipes/shield-force-field.html",
    "/materials/recipes/stylized-water-foam.html",
    "/materials/recipes/terrain-layer-blend.html",
    "/materials/recipes/realistic-pbr-surface.html",
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "/materials/index.html" ? 0.65 : 0.45,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...rndRoutes,
    ...blogRoutes,
    ...materialRoutes,
  ];
}
