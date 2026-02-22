import type { Metadata } from "next";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import {
  ABOUT,
  SOCIALS,
  SITE,
  SKILL_GROUPS,
  EDUCATION,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.bio[0],
};

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.989 2.134 1.989.93 0 1.524-.406 1.720-1H23.726zm-7.714-3.99h4.229c-.108-1.14-.71-1.99-2.013-1.99-1.28 0-1.994.717-2.216 1.99zM3 15.997h4.5c1.396 0 2.2-.628 2.2-1.706 0-1.14-.748-1.694-2.2-1.694H3v3.4zm0-5.997h4.1c1.244 0 2.05-.508 2.05-1.66C9.15 7.138 8.39 6.6 7.1 6.6H3V10z" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-16 lg:grid-cols-3">
        {/* Left sidebar */}
        <aside className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              About
            </p>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Sang Tran</h1>
            <p className="text-muted-foreground text-sm">Senior VFX Artist</p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {ABOUT.location}
          </div>

          {/* Social links */}
          <div className="space-y-2.5">
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4 text-primary" />
              LinkedIn
            </a>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4 text-primary" />
              GitHub
            </a>
            <a
              href={SOCIALS.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-primary"><BehanceIcon /></span>
              Behance
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              {SITE.email}
            </a>
          </div>

          <Button asChild className="w-full gap-2">
            <a href={SOCIALS.resume} target="_blank" rel="noopener noreferrer">
              Download Resume
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>

          {/* Education */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-medium">{edu.school}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground/70">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Bio */}
          <section>
            <h2 className="text-xl font-semibold mb-5">{ABOUT.title}</h2>
            <div className="space-y-4">
              {ABOUT.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <Separator />

          {/* Experience */}
          <section>
            <h2 className="text-xl font-semibold mb-8">Experience</h2>
            <ExperienceTimeline />
          </section>

          <Separator />

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Skills</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {SKILL_GROUPS.map((group) => (
                <div key={group.name}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
