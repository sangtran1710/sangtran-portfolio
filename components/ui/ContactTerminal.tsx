"use client";

import { useState } from "react";
import { Copy, Check, Terminal, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SOCIALS, SITE } from "@/data/portfolio";

export function ContactTerminal({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl p-0 border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden gap-0 rounded-lg">
        <DialogHeader className="bg-[#171717] px-4 py-3 border-b border-white/5 flex flex-row items-center space-y-0">
          <div className="flex gap-2 mr-4 mt-0.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <DialogTitle className="flex items-center gap-2 text-xs font-mono text-stone-400 m-0 leading-none">
            <Terminal className="w-3.5 h-3.5" />
            guest@sangtran: ~
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 font-mono text-sm leading-relaxed text-stone-300">
          <p className="text-stone-500">
            $ init_contact_module --verbose
            <br />
            [OK] Connection established.
          </p>
          <br />
          <p>
            <span className="text-primary">const</span> contact_info = {"{"}
          </p>
          <div className="pl-6 flex flex-col gap-2 my-2">
            <div className="flex items-start group">
              <span className="text-[#a6e22e]">email</span>: 
              <button
                onClick={handleCopyEmail}
                className="ml-2 px-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2"
                title="Copy email"
              >
                &quot;{SITE.email}&quot;
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
                )}
              </button>
            </div>
            <div className="flex items-start group">
              <span className="text-[#a6e22e]">linkedin</span>: 
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2"
              >
                &quot;sang-tran-94686b160&quot;
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
              </a>
            </div>
            <div className="flex items-start group">
              <span className="text-[#a6e22e]">resume</span>: 
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-1 text-[#e6db74] hover:bg-white/10 rounded outline-none focus:outline-none focus-visible:ring-0 transition-colors flex items-center gap-2"
              >
                &quot;download_pdf()&quot;
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
              </a>
            </div>
          </div>
          <p>{"};"}</p>
          <br />
          <p className="text-stone-500 animate-pulse">_</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
