import {
  BookOpenText,
  Code2,
  Gauge,
  type LucideIcon,
  Sparkles,
  Workflow,
} from "lucide-react";

import type { KnowledgePillarSlug } from "@/types/learning";

export interface KnowledgePillarMeta {
  slug: KnowledgePillarSlug;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  concepts: string[];
  icon: LucideIcon;
}

export const SHADER_KNOWLEDGE_PILLARS: KnowledgePillarMeta[] = [
  {
    slug: "foundations",
    title: "Shader Foundations",
    eyebrow: "Math and mental models",
    summary: "Start with vectors, normals, UV logic, and the core questions a shader keeps answering.",
    description:
      "This pillar builds the intuition behind masks, lighting, view direction, and the decisions you make before writing code.",
    concepts: ["Vectors", "Normals", "UV logic", "Masks", "Build mindset"],
    icon: BookOpenText,
  },
  {
    slug: "languages",
    title: "HLSL / GLSL",
    eyebrow: "Code building blocks",
    summary: "Learn the syntax, data flow, and reusable patterns that appear in real shader code.",
    description:
      "Focus on data types, functions, coordinate spaces, and how graph logic maps cleanly into HLSL or GLSL snippets.",
    concepts: ["Types", "Functions", "Coordinate spaces", "Sampling", "Node-to-code thinking"],
    icon: Code2,
  },
  {
    slug: "optimization",
    title: "Optimization Thinking",
    eyebrow: "Production judgment",
    summary: "Treat optimization as measured tradeoffs, not random graph cleanup.",
    description:
      "Profile first, identify real GPU cost, and design scalable fallbacks instead of deleting the visual goal blindly.",
    concepts: ["Profiling", "Overdraw", "Texture cost", "Fallbacks", "Validation"],
    icon: Gauge,
  },
  {
    slug: "tricks",
    title: "Tricks and Patterns",
    eyebrow: "Reusable effect ideas",
    summary: "Collect the small patterns that repeatedly unlock readable, flexible effects.",
    description:
      "Build a toolbox of rim masks, distortion ideas, stylized shaping tricks, and production-safe shortcuts you can reuse.",
    concepts: ["Fresnel", "Distortion", "Posterize", "Edge masks", "Reusable snippets"],
    icon: Sparkles,
  },
];

export const SHADER_START_HERE_STEPS: Array<{
  title: string;
  description: string;
  href: string;
}> = [
  {
    title: "1. Foundations first",
    description: "Get comfortable with vectors, normals, masks, and the directional questions shaders keep asking.",
    href: "/learn/shaders#foundations",
  },
  {
    title: "2. Learn HLSL / GLSL",
    description: "Translate graph logic into code so you can read and write shader instructions with confidence.",
    href: "/learn/shaders#languages",
  },
  {
    title: "3. Build from a visual goal",
    description: "Break an effect into shape, motion, masking, color, and blend decisions before touching polish.",
    href: "/learn/start-here#build-flow",
  },
  {
    title: "4. Optimize with evidence",
    description: "Profile first, then decide whether the cost comes from overdraw, texture work, or shader math.",
    href: "/learn/shaders#optimization",
  },
  {
    title: "5. Keep a tricks library",
    description: "Collect the repeatable patterns that speed up iteration when you need a readable effect quickly.",
    href: "/learn/shaders#tricks",
  },
];

export const SHADER_BUILD_FLOW: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Define the visual goal",
    description: "Name the effect in plain language first: what should the player notice, and what should remain subtle?",
    icon: Workflow,
  },
  {
    title: "Split the effect into systems",
    description: "Break it into masks, motion, lighting, distortion, color, and blend behavior before writing code.",
    icon: BookOpenText,
  },
  {
    title: "Build the cheapest readable version",
    description: "Start with a rough version that proves the idea before adding extra layers or expensive polish.",
    icon: Code2,
  },
  {
    title: "Check cost and readability",
    description: "Measure whether overdraw, texture fetches, or repeated math are pushing the shader out of budget.",
    icon: Gauge,
  },
  {
    title: "Save the reusable trick",
    description: "If part of the effect is broadly useful, turn it into a named pattern you can reuse later.",
    icon: Sparkles,
  },
];

export const START_HERE_RULES = [
  "Do not start with visual polish. Start with the cheapest version that proves the idea.",
  "When you learn a new concept, tie it to a production question: what decision does this help me make?",
  "Collect small shader tricks only after you understand the math or logic that powers them.",
];

export function getKnowledgePillar(slug: KnowledgePillarSlug) {
  return SHADER_KNOWLEDGE_PILLARS.find((pillar) => pillar.slug === slug) ?? null;
}
