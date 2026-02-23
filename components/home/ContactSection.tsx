"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, SOCIALS } from "@/data/portfolio";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-border/60 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(var(--muted)) 0%, hsl(var(--background)) 50%, hsl(var(--muted)/0.5) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 py-24 lg:py-32">
        <ScrollReveal variant="scaleUp">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
            <motion.p
              className="section-label mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              Get in Touch
            </motion.p>

            <TextReveal
              text="Open to new opportunities"
              as="h2"
              className="section-title mb-4"
              offset={["start 0.9", "start 0.55"]}
            />

            <motion.p
              className="text-muted-foreground text-sm mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              Full-time & freelance.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              {[
                {
                  href: `mailto:${SITE.email}`,
                  label: SITE.email,
                  Icon: Mail,
                  className: "gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
                  iconWrap: "bg-white/20",
                },
                {
                  href: SOCIALS.linkedin,
                  label: "LinkedIn",
                  Icon: Linkedin,
                  className: "gap-2.5 border-2 hover:bg-muted hover:scale-[1.02] transition-all duration-300",
                  iconWrap: "bg-[#0A66C2]/10 text-[#0A66C2]",
                },
                {
                  href: SOCIALS.github,
                  label: "GitHub",
                  Icon: Github,
                  className: "gap-2.5 border-2 hover:bg-muted hover:scale-[1.02] transition-all duration-300",
                  iconWrap: "bg-zinc-800 text-white",
                },
              ].map(({ href, label, Icon, className, iconWrap }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                >
                  <Button asChild size="lg" variant={i === 0 ? "default" : "outline"} className={className}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconWrap}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      {label}
                      {href.startsWith("http") && <ExternalLink className="h-4 w-4 ml-0.5 opacity-70" strokeWidth={1.5} />}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
