import { EXPERIENCES } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";

export default function ExperienceTimeline() {
  return (
    <div className="space-y-0">
      {EXPERIENCES.map((exp, i) => (
        <div key={i} className="relative flex gap-6">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-primary mt-1 flex-shrink-0 ring-4 ring-primary/10" />
            {i < EXPERIENCES.length - 1 && (
              <div className="w-px flex-1 bg-border mt-2 mb-0" />
            )}
          </div>

          {/* Content */}
          <div className={`pb-10 flex-1 ${i === EXPERIENCES.length - 1 ? "pb-0" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-base">{exp.role}</h3>
                <p className="text-sm text-primary font-medium">{exp.company}</p>
              </div>
              <Badge variant="outline" className="text-xs font-normal flex-shrink-0">
                {exp.duration}
              </Badge>
            </div>

            <ul className="mt-3 space-y-2">
              {exp.responsibilities.map((item, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-muted-foreground/70">
              {exp.technologies}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
