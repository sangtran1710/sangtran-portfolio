"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS, SITE } from "@/data/portfolio";

const ArtstationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M2.17 329.83L156.4 83.2h28.18L448.24 448H276.53L175.7 329.83H2.17zM294.67 83.2l53.94 92.17 84.18 143.92H510L365.17 83.2H294.67zM189.65 352.55L244.3 448H121.2l-51.3-89.84h119.75z" />
  </svg>
);

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M198 124c23.2 0 42.4 4.8 57.6 14.4s22.8 24.8 22.8 45.6c0 14.4-4.8 26.8-14.4 37.2s-22.8 17.6-39.6 21.6c20.8 4 36.8 13.6 48 28.8s16.8 33.6 16.8 55.2c0 26.4-8.8 48-26.4 64.8S220 418 190.8 418H44V124h154zm-20 108c11.2 0 20-2.8 26.4-8.4s9.6-13.6 9.6-24c0-10.4-3.2-18-9.6-22.8s-15.2-7.2-26.4-7.2h-74v62.4h74zm8 124c12.8 0 22.8-3.2 30-9.6s10.8-15.2 10.8-26.4c0-10.4-3.6-20-10.8-26.4s-17.2-9.6-30-9.6h-82.8V356H186zm282-124c16.8 0 31.6 3.6 44.4 10.8S534.8 250 542 264c7.2 14 10.8 30.4 10.8 49.2 0 6.4-.4 12-1.2 16.8H372.4c2.4 17.6 9.6 30.8 21.6 39.6s26.8 13.2 44.4 13.2c15.2 0 28.4-3.6 39.6-10.8s18.4-16.8 21.6-28.8h56.4c-6.4 23.2-19.6 41.6-39.6 55.2S471.6 420 440 420c-25.6 0-48.4-5.6-68.4-16.8s-35.6-27.2-46.8-48c-11.2-20.8-16.8-45.2-16.8-73.2 0-27.2 5.6-51.2 16.8-72s27.2-36.8 48-48 44-16.8 69.6-16.8c25.6 0 46.8 5.6 63.6 16.8s26.8 27.2 30 48H442.8zM418.8 180H498v-20h-79.2v20zm-46.8 93.6h111.6c-2.4-14.4-8-25.2-16.8-32.4S446.8 230 435.6 230c-12 0-22.4 3.6-31.2 10.8S391.6 258 388.8 273.6z" />
  </svg>
);

export default function SocialStrip() {
  const { copy } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the hero section (~450px)
      setVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      href: SOCIALS.artstation,
      icon: ArtstationIcon,
      label: "ArtStation",
      color: "hover:text-[#00B0FF] hover:border-[#00B0FF]/40 hover:shadow-[0_0_15px_rgba(0,176,255,0.15)]",
    },
    {
      href: SOCIALS.behance,
      icon: BehanceIcon,
      label: "Behance",
      color: "hover:text-[#0057ff] hover:border-[#0057ff]/40 hover:shadow-[0_0_15px_rgba(0,87,255,0.15)]",
    },
    {
      href: SOCIALS.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_0_15px_rgba(10,102,194,0.15)]",
    },
    {
      href: SOCIALS.github,
      icon: Github,
      label: "GitHub",
      color: "hover:text-white hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    },
    {
      href: `mailto:${SITE.email}`,
      icon: Mail,
      label: "Email",
      color: "hover:text-[#5c9d98] hover:border-[#5c9d98]/40 hover:shadow-[0_0_15px_rgba(92,157,152,0.15)]",
    },
    {
      href: SOCIALS.resume,
      icon: FileText,
      label: "Resume",
      color: "hover:text-[#5c9d98] hover:border-[#5c9d98]/40 hover:shadow-[0_0_15px_rgba(92,157,152,0.15)]",
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-[84px] right-6 z-40 hidden md:flex flex-col gap-3"
          aria-label={copy.common.socialLinks}
        >
          {socialLinks.map(({ href, icon: Icon, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-center text-stone-400 transition-all duration-300 ${color}`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.8} />
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
