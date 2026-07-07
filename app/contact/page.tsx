"use client";

import { useState } from "react";
import { Copy, Check, Terminal, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SOCIALS, SITE } from "@/data/portfolio";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#030508] overflow-hidden pt-20">
      <ParticleBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-6 text-sm font-mono text-[#5c9d98] hover:text-[#7acac3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ..
        </Link>

        <div className="border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-xl">
          <div className="bg-[#171717]/95 px-4 py-3 border-b border-white/5 flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <Terminal className="w-3.5 h-3.5" />
              guest@henrytran: ~/contact
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          <div className="p-8 font-mono text-[15px] sm:text-base leading-relaxed text-stone-300">
            <p className="text-stone-500">
              $ init_contact_module --verbose
              <br />
              [OK] Node graph background initialized.
              <br />
              [OK] Connection established.
            </p>
            <br />
            <p>
              <span className="text-primary">const</span> contact_info = {"{"}
            </p>
            <div className="pl-6 sm:pl-8 flex flex-col gap-3 my-4">
              <div className="flex items-start group">
                <span className="text-[#a6e22e] mt-1">email</span><span className="mt-1">:</span> 
                <button
                  onClick={handleCopyEmail}
                  className="ml-2 px-2 py-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2 cursor-pointer break-all text-left"
                  title="Copy email"
                >
                  &quot;{SITE.email}&quot;
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                  )}
                </button>
              </div>
              <div className="flex items-start group">
                <span className="text-[#a6e22e] mt-1">artstation</span><span className="mt-1">:</span> 
                <a
                  href={SOCIALS.artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-2 py-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2 cursor-pointer break-all text-left"
                >
                  &quot;minhsang11&quot;
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                </a>
              </div>
              <div className="flex items-start group">
                <span className="text-[#a6e22e] mt-1">behance</span><span className="mt-1">:</span> 
                <a
                  href={SOCIALS.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-2 py-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2 cursor-pointer break-all text-left"
                >
                  &quot;sangtranminh&quot;
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                </a>
              </div>
              <div className="flex items-start group">
                <span className="text-[#a6e22e] mt-1">linkedin</span><span className="mt-1">:</span> 
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-2 py-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2 cursor-pointer break-all text-left"
                >
                  &quot;sang-tran-94686b160&quot;
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                </a>
              </div>
              <div className="flex items-start group">
                <span className="text-[#a6e22e] mt-1">resume</span><span className="mt-1">:</span> 
                <a
                  href={SOCIALS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-2 py-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2 cursor-pointer break-all text-left"
                >
                  &quot;download_pdf()&quot;
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                </a>
              </div>
            </div>
            <p>{"};"}</p>
            <br />
            <p className="text-stone-500 flex items-center gap-2">
              <span className="text-[#5c9d98]">guest@henrytran</span>:<span>~/contact$</span>
              <span className="w-2.5 h-5 bg-stone-400 animate-pulse inline-block" />
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
