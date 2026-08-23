import { Boxes, ChevronRight, Cpu, GitBranch } from "lucide-react";

const PIPELINE_STEPS = [
  { name: "Houdini", detail: "Simulation", icon: Boxes },
  { name: "Particle systems", detail: "Real-time FX", icon: Cpu },
  { name: "Client engine", detail: "Integration", icon: GitBranch },
];

export default function VfxAnatomy() {
  return (
    <section
      className="mb-10 overflow-hidden rounded-2xl border border-border bg-muted/20"
      data-testid="vfx-anatomy"
      aria-labelledby="vfx-anatomy-title"
    >
      <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <h2 id="vfx-anatomy-title" className="text-lg font-semibold">
          Production pipeline
        </h2>
        <p className="text-sm text-muted-foreground">Proprietary engine</p>
      </div>

      <div className="grid gap-3 px-5 py-6 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:px-7 sm:py-7">
        {PIPELINE_STEPS.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div key={step.name} className="contents">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <StepIcon className="mb-5 h-5 w-5 text-primary" aria-hidden="true" />
                <p className="font-medium">{step.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
              </div>
              {index < PIPELINE_STEPS.length - 1 && (
                <ChevronRight
                  className="hidden h-4 w-4 text-muted-foreground/50 sm:block"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border px-5 py-4 text-sm text-muted-foreground sm:px-7">
        <span>PS5 performance target</span>
        <span>Perforce delivery</span>
      </div>
    </section>
  );
}
