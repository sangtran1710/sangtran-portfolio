import { BarChart3, BookOpenText, BrainCircuit, Languages, type LucideIcon, ScanSearch } from "lucide-react";

import type { TopicMeta } from "@/types/learning";

export const SITE_NAME = "ShaderLex";
export const SITE_TAGLINE = "Personal learning system for shader craft, production language, and technical English.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Library" },
  { href: "/practice", label: "Practice" },
  { href: "/progress", label: "Progress" },
] as const;

export const TOPICS: TopicMeta[] = [
  {
    slug: "shaders",
    name: "Shader Systems",
    shortName: "Shaders",
    tagline: "HLSL, math intuition, and optimization habits that scale to senior work.",
    description:
      "Work through vector math, surface logic, frame-time thinking, and production-minded shader decisions with concise notes and active recall.",
    seoDescription:
      "Learn HLSL, shader math, and optimization patterns through public notes and practical quiz sessions.",
    color: "from-cyan-400/30 via-teal-400/20 to-transparent",
    accent: "text-cyan-300",
    outcomes: [
      "Understand the math behind dot products, normals, and coordinate spaces.",
      "Explain optimization tradeoffs using production language instead of vague guesses.",
      "Build a reusable mental checklist for debugging and profiling shaders.",
    ],
    practiceFocus: ["HLSL syntax", "Vector math", "Optimization heuristics"],
  },
  {
    slug: "english",
    name: "Technical English",
    shortName: "English",
    tagline: "Interview-ready answers for technical art, pipelines, and collaboration.",
    description:
      "Practice concise, credible English answers for interviews, reviews, and cross-discipline communication with direct feedback loops.",
    seoDescription:
      "Practice technical English for technical artists with interview prompts, vocabulary drills, and structured feedback.",
    color: "from-amber-300/25 via-orange-400/15 to-transparent",
    accent: "text-amber-200",
    outcomes: [
      "Answer behavioral and technical questions with clear structure.",
      "Use professional terminology without sounding scripted.",
      "Translate hands-on production experience into recruiter-friendly language.",
    ],
    practiceFocus: ["Behavioral answers", "Pipeline communication", "Industry terminology"],
  },
];

export const PRODUCT_MODULES: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Knowledge Vault",
    description: "Markdown-based atomic notes with code blocks, formulas, and fast navigation by topic.",
    icon: BookOpenText,
  },
  {
    title: "Challenge Engine",
    description: "Randomized multiple-choice sessions that force recall instead of passive rereading.",
    icon: BrainCircuit,
  },
  {
    title: "Answer Scanner",
    description: "The frontend submits attempts while the backend keeps the answer key and scans the result on submit.",
    icon: ScanSearch,
  },
  {
    title: "Learning Progress",
    description: "Session history and score trends stored locally for quick self-review and momentum tracking.",
    icon: BarChart3,
  },
];

export const FEATURE_CALLOUTS: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Shader-first study path",
    description: "Built around HLSL, optimization, and technical art rather than generic programming tutorials.",
    icon: BookOpenText,
  },
  {
    title: "English that sounds senior",
    description: "Focus on phrasing decisions, tradeoffs, and collaboration language you actually need in interviews.",
    icon: Languages,
  },
  {
    title: "Server-side checking flow",
    description: "Answer keys stay in backend quiz files while the client only receives the practice questions.",
    icon: BrainCircuit,
  },
];
