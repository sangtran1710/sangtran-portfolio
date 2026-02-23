import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SKILL_GROUPS } from "@/data/portfolio";

const TOP_SKILLS = [
  "Niagara (UE5)",
  "Houdini VFX",
  "HLSL",
  "Unreal Engine 5",
  "Python",
  "Blender",
  "Substance Designer",
  "After Effects",
  "Maya",
  "VEX",
  "PBR Workflows",
  "Pipeline Automation",
];

export default function SkillsSnapshot() {
  return (
    <section id="skills" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Toolkit
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Core Skills</h2>
          </div>
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Full profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {TOP_SKILLS.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="px-3 py-1.5 text-sm font-normal hover:border-primary hover:text-primary transition-colors cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Skill categories breakdown */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.slice(0, 3).map((group) => (
            <div key={group.name}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {group.name}
              </h3>
              <ul className="space-y-1.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
