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

const ArtstationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <path d="M2.17 329.83L156.4 83.2h28.18L448.24 448H276.53L175.7 329.83H2.17zM294.67 83.2l53.94 92.17 84.18 143.92H510L365.17 83.2H294.67zM189.65 352.55L244.3 448H121.2l-51.3-89.84h119.75z" />
  </svg>
);

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <path d="M198 124c23.2 0 42.4 4.8 57.6 14.4s22.8 24.8 22.8 45.6c0 14.4-4.8 26.8-14.4 37.2s-22.8 17.6-39.6 21.6c20.8 4 36.8 13.6 48 28.8s16.8 33.6 16.8 55.2c0 26.4-8.8 48-26.4 64.8S220 418 190.8 418H44V124h154zm-20 108c11.2 0 20-2.8 26.4-8.4s9.6-13.6 9.6-24c0-10.4-3.2-18-9.6-22.8s-15.2-7.2-26.4-7.2h-74v62.4h74zm8 124c12.8 0 22.8-3.2 30-9.6s10.8-15.2 10.8-26.4c0-10.4-3.6-20-10.8-26.4s-17.2-9.6-30-9.6h-82.8V356H186zm282-124c16.8 0 31.6 3.6 44.4 10.8S534.8 250 542 264c7.2 14 10.8 30.4 10.8 49.2 0 6.4-.4 12-1.2 16.8H372.4c2.4 17.6 9.6 30.8 21.6 39.6s26.8 13.2 44.4 13.2c15.2 0 28.4-3.6 39.6-10.8s18.4-16.8 21.6-28.8h56.4c-6.4 23.2-19.6 41.6-39.6 55.2S471.6 420 440 420c-25.6 0-48.4-5.6-68.4-16.8s-35.6-27.2-46.8-48c-11.2-20.8-16.8-45.2-16.8-73.2 0-27.2 5.6-51.2 16.8-72s27.2-36.8 48-48 44-16.8 69.6-16.8c25.6 0 46.8 5.6 63.6 16.8s26.8 27.2 30 48H442.8zM418.8 180H498v-20h-79.2v20zm-46.8 93.6h111.6c-2.4-14.4-8-25.2-16.8-32.4S446.8 230 435.6 230c-12 0-22.4 3.6-31.2 10.8S391.6 258 388.8 273.6z" />
  </svg>
);

export default function ContactSection() {
  const { locale, copy } = useLanguage();
  const site = getLocalizedSite(locale);
  const about = getLocalizedAbout(locale);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-[#070a0f]"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#5c9d98]/4 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <ScrollReveal variant="scaleUp">
          <div className="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md px-8 py-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:px-12 sm:py-16">
            <motion.div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#5c9d98]/10 text-[#5c9d98]"
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
              className="section-title mb-4 max-w-2xl text-white"
              offset={["start 0.9", "start 0.55"]}
            />

            <motion.p
              className="mb-10 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base"
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
                    "h-auto gap-3 rounded-full border border-[#5c9d98]/20 bg-[#5c9d98] px-4 py-3 text-white shadow-[0_12px_28px_rgba(92,157,152,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#538f8a]",
                  iconWrap: "shrink-0 bg-white/20",
                },
                {
                  href: SOCIALS.artstation,
                  label: "ArtStation",
                  Icon: ArtstationIcon,
                  className:
                    "h-auto gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-stone-300 transition-all duration-300 hover:scale-[1.02] hover:border-[#5c9d98]/50 hover:bg-white/10 hover:text-white",
                  iconWrap: "shrink-0 bg-[#131722]/20 text-[#131722] hover:text-[#00B0FF] dark:text-[#00B0FF]/80",
                },
                {
                  href: SOCIALS.behance,
                  label: "Behance",
                  Icon: BehanceIcon,
                  className:
                    "h-auto gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-stone-300 transition-all duration-300 hover:scale-[1.02] hover:border-[#5c9d98]/50 hover:bg-white/10 hover:text-white",
                  iconWrap: "shrink-0 bg-[#0057ff]/10 text-[#0057ff]",
                },
                {
                  href: SOCIALS.linkedin,
                  label: "LinkedIn",
                  Icon: Linkedin,
                  className:
                    "h-auto gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-stone-300 transition-all duration-300 hover:scale-[1.02] hover:border-[#5c9d98]/50 hover:bg-white/10 hover:text-white",
                  iconWrap: "shrink-0 bg-[#0A66C2]/20 text-[#0A66C2]",
                },
                {
                  href: SOCIALS.github,
                  label: "GitHub",
                  Icon: Github,
                  className:
                    "h-auto gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-stone-300 transition-all duration-300 hover:scale-[1.02] hover:border-[#5c9d98]/50 hover:bg-white/10 hover:text-white",
                  iconWrap: "shrink-0 bg-stone-900 text-white border border-white/10",
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
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#5c9d98]" />
                {site.email}
              </a>
              <span className="hidden sm:inline text-stone-700">/</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#5c9d98]" />
                {about.location}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
