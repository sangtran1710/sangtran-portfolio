"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertOctagon, CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react";

export default function QualityGatePreview() {
  const [mode, setMode] = useState<"blocked" | "ready">("blocked");

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c1017]">
      {/* Tab Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#121822] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          {mode === "blocked" ? (
            <ShieldAlert className="h-5 w-5 text-rose-400" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          )}
          <span className="font-kanit text-lg font-medium text-white">
            Interactive Asset QC Check
          </span>
        </div>

        <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setMode("blocked")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              mode === "blocked"
                ? "bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <AlertOctagon className="h-3.5 w-3.5 text-rose-400" />
            Errors Found (Blocked)
          </button>
          <button
            type="button"
            onClick={() => setMode("ready")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              mode === "ready"
                ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            All Passed (Ready)
          </button>
        </div>
      </div>

      {/* Screen Preview */}
      <div className="relative aspect-[16/9] w-full bg-black">
        <Image
          src={
            mode === "blocked"
              ? "/projects/vfx-flow/showcase_asset_qc_blocked.png"
              : "/projects/vfx-flow/showcase_asset_qc_ready.png"
          }
          alt={
            mode === "blocked"
              ? "VFX Flow Asset QC Gate Blocked state showing naming violations"
              : "VFX Flow Asset QC Gate Ready state showing all rules verified"
          }
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Explanation Banner */}
      <div className="border-t border-white/10 bg-[#0f141c] p-5 sm:p-6">
        {mode === "blocked" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              Status: 1 Error, 1 Warning — Submission Locked
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">
              The automated scan flagged a disallowed <code className="text-rose-300 bg-rose-950/60 px-1 py-0.5 rounded">_vfx</code> substring 
              in <code className="text-zinc-200">fire_pillar_vfx</code>, and marked particle capacity at <code className="text-amber-300 bg-amber-950/60 px-1 py-0.5 rounded">RISK (&gt;30k budget)</code>. 
              The tool locks the changelist creation button until naming errors are resolved, preventing bad commits from reaching the Perforce mainline.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Status: Ready — All Checks Passed
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">
              All 8 naming conventions, required <code className="text-emerald-300 bg-emerald-950/60 px-1 py-0.5 rounded">.thumbnail</code> presence, 
              parent <code className="text-emerald-300 bg-emerald-950/60 px-1 py-0.5 rounded">.assetkit</code> hierarchy, and particle count budgets 
              are verified. The changelist staging action unlocks and pre-formats the dual-format commit description automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
