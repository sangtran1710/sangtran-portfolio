"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedAbout, getLocalizedSite } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";

export default function ContactSection() {
  const { locale, copy } = useLanguage();
  const site = getLocalizedSite(locale);
  const about = getLocalizedAbout(locale);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-stone-200"
      style={{
        background:
          "linear-gradient(180deg, rgba(246,242,235,1) 0%, rgba(250,247,240,1) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#5c9d98]/8 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <ScrollReveal variant="scaleUp">
          <div className="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] border border-stone-200 bg-white px-8 py-12 text-center shadow-[0_16px_36px_rgba(15,23,42,0.05)] sm:px-12 sm:py-16">
            <motion.div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#5c9d98]/10 text-[#4f8e89]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
            <TextReveal
              text={copy.home.contactTitle}
              as="h2"
              className="section-title mb-4 max-w-2xl text-slate-950"
              offset={["start 0.9", "start 0.55"]}
            />

            <motion.p
              className="mb-10 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {copy.home.contactBody}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              {[
                {
                  href: `mailto:${site.email}`,
                  label: site.email,
                  Icon: Mail,
                  className:
                    "h-auto gap-3 rounded-full border border-[#5c9d98]/15 bg-[#5c9d98] px-4 py-3 text-primary-foreground shadow-[0_12px_28px_rgba(92,157,152,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#538f8a]",
                  iconWrap: "shrink-0 bg-white/20",
                },
                {
                  href: SOCIALS.linkedin,
                  label: "LinkedIn",
                  Icon: Linkedin,
                  className:
                    "h-auto gap-3 rounded-full border border-stone-200 bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:scale-[1.02] hover:border-teal-200 hover:bg-stone-50",
                  iconWrap: "shrink-0 bg-[#0A66C2]/10 text-[#0A66C2]",
                },
                {
                  href: SOCIALS.github,
                  label: "GitHub",
                  Icon: Github,
                  className:
                    "h-auto gap-3 rounded-full border border-stone-200 bg-white px-4 py-3 text-slate-800 transition-all duration-300 hover:scale-[1.02] hover:border-teal-200 hover:bg-stone-50",
                  iconWrap: "shrink-0 bg-zinc-900 text-white",
                },
              ].map(({ href, label, Icon, className, iconWrap }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                >
                  <Button
                    asChild
                    variant={i === 0 ? "default" : "outline"}
                    className={className}
                  >
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${iconWrap}`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="text-sm font-medium">{label}</span>
                      {href.startsWith("http") && (
                        <ExternalLink
                          className="ml-0.5 h-3.5 w-3.5 opacity-60"
                          strokeWidth={1.5}
                        />
                      )}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary/70" />
                {site.email}
              </a>
              <span className="hidden sm:inline text-border">/</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary/70" />
                {about.location}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
