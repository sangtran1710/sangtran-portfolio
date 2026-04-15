import { BookOpenText, Languages, type LucideIcon } from "lucide-react";

import type { TopicSlug } from "@/types/learning";

export const PROGRESS_STORAGE_KEY = "shaderlex-progress-v1";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function shuffleArray<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function formatTopicLabel(topic: TopicSlug | string) {
  switch (topic) {
    case "shaders":
      return "Shader Systems";
    case "english":
      return "Technical English";
    default:
      return "Archived track";
  }
}

export function getTopicIcon(topic: TopicSlug | string): LucideIcon {
  switch (topic) {
    case "shaders":
      return BookOpenText;
    case "english":
      return Languages;
    default:
      return BookOpenText;
  }
}

export function getTopicMetricBarClass(topic: TopicSlug | string) {
  switch (topic) {
    case "shaders":
      return "bg-teal-300/80";
    case "english":
      return "bg-amber-300/80";
    default:
      return "bg-slate-400/70";
  }
}

export function getTopicMetricFillClass(topic: TopicSlug | string) {
  switch (topic) {
    case "shaders":
      return "bg-teal-300";
    case "english":
      return "bg-amber-300";
    default:
      return "bg-slate-300";
  }
}
