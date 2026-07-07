"use client";

import {
  siPlaystation,
  siEpicgames,
  siSony,
  siNetflix,
  siUnrealengine,
} from "simple-icons";

export default function RunningTicker() {
  const tickerItems = [
    { name: "MARVEL'S SPIDER-MAN 2", path: siPlaystation.path, scale: 1.1 },
    { name: "SONY INTERACTIVE ENTERTAINMENT", path: siSony.path, scale: 1.8 },
    { name: "FORTNITE", path: siEpicgames.path, scale: 0.95 },
    { name: "EPIC GAMES", path: siEpicgames.path, scale: 0.95 },
    { name: "UNTIL DAWN", path: siPlaystation.path, scale: 1.1 },
    { name: "NEW WORLD", path: null },
    { name: "AMAZON GAMES", path: null },
    { name: "NETFLIX", path: siNetflix.path, scale: 0.9 },
    { name: "UNREAL ENGINE 5", path: siUnrealengine.path, scale: 1.15 },
    { name: "NIAGARA FLUIDS", path: null },
    { name: "HLSL SHADERS", path: null },
    { name: "HOUDINI ENGINE", path: null },
    { name: "REAL-TIME VFX", path: null },
  ];

  // Duplicate items to ensure seamless scrolling loop
  const scrollItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-white/5 bg-[#05080c] py-4">
      {/* Left & Right gradient fade overlays for high-end cinematic feel */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#05080c] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#05080c] to-transparent" />

      <div className="relative flex w-full items-center overflow-hidden">
        {/* Scrolling container - Slowed down to 60s for premium readability */}
        <div 
          className="flex w-max animate-marquee gap-10 whitespace-nowrap"
          style={{
            animationDuration: "60s"
          }}
        >
          {scrollItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500 transition-colors duration-300 hover:text-white group cursor-default"
            >
              {item.path && (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0 opacity-40 text-stone-500 transition-all duration-300 group-hover:text-[#5c9d98] group-hover:opacity-100"
                  style={{
                    transform: `scale(${item.scale || 1})`,
                  }}
                  aria-hidden="true"
                >
                  <path d={item.path} />
                </svg>
              )}
              <span>{item.name}</span>
              <span className="text-[#5c9d98] font-bold select-none ml-6">{"//"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
