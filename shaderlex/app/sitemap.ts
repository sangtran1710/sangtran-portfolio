import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/topics";
import { getAllLessons, getTopics } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/learn", "/learn/start-here", "/practice", "/progress"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const topicRoutes = getTopics().flatMap((topic) => [
    {
      url: `${SITE_URL}/learn/${topic.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/practice/${topic.slug}`,
      lastModified: new Date(),
    },
  ]);

  const lessonRoutes = getAllLessons().map((lesson) => ({
    url: `${SITE_URL}/learn/${lesson.topic}/${lesson.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...topicRoutes, ...lessonRoutes];
}
