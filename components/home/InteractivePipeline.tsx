"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function InteractivePipeline() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  // Metrics (Static showcase of AAA workflow capacity)
  const autoValue = "98%";
  const autoLabel = isVi ? "Tự động hóa" : "Automated";
  const visValue = "AAA Cinematic";
  const visLabel = isVi ? "Đồ họa Cao cấp" : "AAA Render";
  const perfValue = "60 FPS";
  const perfLabel = isVi ? "Mượt mà & Tối ưu" : "Optimized AAA";

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5c9d98] mb-1">
            {isVi ? "QUY TRÌNH HỆ THỐNG KỸ THUẬT" : "TECHNICAL PIPELINE WORKFLOW"}
          </h3>
          <p className="text-xs text-stone-400 max-w-xl">
            {isVi 
              ? "Cách các tài nguyên tự động hóa từ Houdini, custom shaders và hạt Niagara được đồng bộ và tối ưu hóa đến màn hình game."
              : "How procedural assets from Houdini, custom shaders, and Niagara systems are integrated and optimized for the final game runtime."}
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex gap-4 border-l border-white/10 pl-0 md:pl-6">
          <div className="text-left">
            <span className="block text-[10px] uppercase tracking-wider text-stone-500">
              {isVi ? "Tự động hóa" : "Automation"}
            </span>
            <span className="text-sm font-bold text-green-400">
              {autoValue}
            </span>
          </div>
          <div className="text-left">
            <span className="block text-[10px] uppercase tracking-wider text-stone-500">
              {isVi ? "Đồ họa" : "Visual Quality"}
            </span>
            <span className="text-sm font-bold text-green-400">
              {visValue}
            </span>
          </div>
          <div className="text-left">
            <span className="block text-[10px] uppercase tracking-wider text-stone-500">
              {isVi ? "Hiệu năng" : "Performance"}
            </span>
            <span className="text-sm font-bold text-green-400">
              {perfValue}
            </span>
          </div>
        </div>
      </div>

      {/* The Visual Sandbox - Fixed dimensions for perfect SVG path alignment */}
      <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-white/5 bg-[#05080c]/90 py-4">
        <div className="relative w-[720px] h-[240px] mx-auto shrink-0 select-none">
          
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />

          {/* Wires (SVG paths connecting nodes) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Glow Paths */}
            <path d="M 200 60 C 240 60, 240 120, 280 120" fill="none" stroke="#5c9d98" strokeWidth="6" className="opacity-10 blur-sm" />
            <path d="M 200 180 C 240 180, 240 120, 280 120" fill="none" stroke="#5c9d98" strokeWidth="6" className="opacity-10 blur-sm" />
            <path d="M 440 120 L 520 120" fill="none" stroke="#5c9d98" strokeWidth="6" className="opacity-10 blur-sm" />

            {/* Core Lines */}
            <path d="M 200 60 C 240 60, 240 120, 280 120" fill="none" stroke="#5c9d98" strokeWidth="1.5" className="opacity-40" />
            <path d="M 200 180 C 240 180, 240 120, 280 120" fill="none" stroke="#5c9d98" strokeWidth="1.5" className="opacity-40" />
            <path d="M 440 120 L 520 120" fill="none" stroke="#5c9d98" strokeWidth="1.5" className="opacity-40" />

            {/* Input & Output Pins (Visual Graph Nodes Connector Dots) */}
            <circle cx="200" cy="60" r="3.5" fill="#5c9d98" stroke="#05080c" strokeWidth="1.5" className="opacity-80" />
            <circle cx="200" cy="180" r="3.5" fill="#5c9d98" stroke="#05080c" strokeWidth="1.5" className="opacity-80" />
            <circle cx="280" cy="120" r="3.5" fill="#5c9d98" stroke="#05080c" strokeWidth="1.5" className="opacity-80" />
            <circle cx="440" cy="120" r="3.5" fill="#5c9d98" stroke="#05080c" strokeWidth="1.5" className="opacity-80" />
            <circle cx="520" cy="120" r="3.5" fill="#5c9d98" stroke="#05080c" strokeWidth="1.5" className="opacity-80" />

            {/* Flowing Data Particles */}
            <circle r="3" fill="#5c9d98" className="animate-flow-slow" style={{ offsetPath: "path('M 200 60 C 240 60, 240 120, 280 120')" }} />
            <circle r="3" fill="#5c9d98" className="animate-flow-slow" style={{ offsetPath: "path('M 200 180 C 240 180, 240 120, 280 120')" }} />
            <circle r="3.5" fill="#5c9d98" className="animate-flow-fast" style={{ offsetPath: "path('M 440 120 L 520 120')" }} />
          </svg>

          {/* Node 1: Houdini */}
          <div className="absolute left-[40px] top-[30px] w-[160px] h-[60px] rounded-lg border border-[#5c9d98]/20 bg-[#070a0f]/80 p-2.5 shadow-md flex flex-col justify-center transition-colors duration-300 hover:border-[#5c9d98]/40">
            <span className="block text-[8px] font-mono font-bold tracking-widest text-[#5c9d98]">PROCEDURAL</span>
            <span className="block text-xs font-semibold text-white mt-0.5">HOUDINI PIPELINE</span>
            <span className="block text-[9px] text-stone-500 mt-1 font-mono leading-none">Auto Asset Generator</span>
          </div>

          {/* Node 2: HLSL */}
          <div className="absolute left-[40px] top-[150px] w-[160px] h-[60px] rounded-lg border border-[#5c9d98]/20 bg-[#070a0f]/80 p-2.5 shadow-md flex flex-col justify-center transition-colors duration-300 hover:border-[#5c9d98]/40">
            <span className="block text-[8px] font-mono font-bold tracking-widest text-[#5c9d98]">SHADER LOGIC</span>
            <span className="block text-xs font-semibold text-white mt-0.5">MATERIAL SHADERS</span>
            <span className="block text-[9px] text-stone-500 mt-1 font-mono leading-none">Shader Graph Math</span>
          </div>

          {/* Node 3: Niagara */}
          <div className="absolute left-[280px] top-[90px] w-[160px] h-[60px] rounded-lg border border-[#5c9d98]/20 bg-[#070a0f]/80 p-2.5 shadow-md flex flex-col justify-center transition-colors duration-300 hover:border-[#5c9d98]/40">
            <span className="block text-[8px] font-mono font-bold tracking-widest text-[#5c9d98]">SIMULATION</span>
            <span className="block text-xs font-semibold text-white mt-0.5">NIAGARA VFX</span>
            <span className="block text-[9px] text-stone-500 mt-1 font-mono leading-none">Particle Physics Solvers</span>
          </div>

          {/* Node 4: Game Runtime */}
          <div className="absolute left-[520px] top-[90px] w-[160px] h-[60px] rounded-lg border border-white/10 bg-[#070a0f]/80 p-2.5 shadow-md flex flex-col justify-center transition-colors duration-300 hover:border-white/20">
            <span className="block text-[8px] font-mono font-bold tracking-widest text-stone-500">RUNTIME DISPLAY</span>
            <span className="block text-xs font-semibold text-white mt-0.5">GAME RUNTIME</span>
            <span className="block text-[9px] text-green-400 mt-1 font-mono leading-none font-bold">Stable 60 FPS (Optimized)</span>
          </div>

        </div>
      </div>
    </div>
  );
}
