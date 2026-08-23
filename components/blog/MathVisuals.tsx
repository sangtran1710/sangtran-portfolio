"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function useVisibleAnimationTime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || prefersReducedMotion) return;

    let animationFrameId = 0;
    let startTime = 0;
    let lastUpdate = 0;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      if (now - lastUpdate >= 1000 / 30) {
        setTime((now - startTime) / 1000);
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      } else if (!entry.isIntersecting) {
        stop();
      }
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [prefersReducedMotion]);

  return { containerRef, time: prefersReducedMotion ? 0 : time };
}

function svgNumber(value: number) {
  return value.toFixed(4);
}

export const DotProductVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const angle = (Math.sin(time * Math.PI * 0.4) + 1) * 90;

  // Vector A is fixed. Vector B rotates.
  // Base length 100
  const vecA = { x: 100, y: 0 };
  const rad = (angle * Math.PI) / 180;
  const vecB = { x: Math.cos(rad) * 100, y: Math.sin(rad) * 100 };
  
  // Projection of B onto A
  const projection = vecB.x; 

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0%,transparent_70%)] pointer-events-none" />
      <svg width="300" height="200" viewBox="-50 -100 200 200" className="overflow-visible">
        {/* Grid */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="-50" y1="0" x2="150" y2="0" />
          <line x1="0" y1="-100" x2="0" y2="100" />
        </g>
        
        {/* Projection Line */}
        <line x1={vecB.x} y1={vecB.y} x2={vecB.x} y2="0" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="0" y1="0" x2={projection} y2="0" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="8" strokeLinecap="round" />

        {/* Vector A */}
        <g transform="translate(0,0)">
          <line x1="0" y1="0" x2={vecA.x} y2={vecA.y} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <polygon points="0,-4 8,0 0,4" transform={`translate(${vecA.x}, ${vecA.y})`} fill="#fff" />
          <text x={vecA.x + 15} y="5" fill="#fff" fontSize="12" fontFamily="monospace">Vector A</text>
        </g>

        {/* Vector B */}
        <g transform="translate(0,0)">
          <line x1="0" y1="0" x2={vecB.x} y2={vecB.y} stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
          <polygon points="0,-4 8,0 0,4" transform={`translate(${vecB.x}, ${vecB.y}) rotate(${angle})`} fill="#14b8a6" />
          <text x={vecB.x + 10} y={vecB.y - 10} fill="#14b8a6" fontSize="12" fontFamily="monospace">Vector B</text>
        </g>

        {/* Angle Arc */}
        <path d={`M 30 0 A 30 30 0 0 ${angle > 0 ? 1 : 0} ${Math.cos(rad)*30} ${Math.sin(rad)*30}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Info */}
        <text x="-40" y="-80" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="monospace">
          Dot Product: {(Math.cos(rad)).toFixed(2)}
        </text>
      </svg>
    </div>
  );
};

export const SineWaveVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const offset = time * Math.PI * 2;

  const points = Array.from({ length: 200 }).map((_, i) => {
    const x = i * 2;
    const y = Math.sin((i / 20) - offset) * 40;
    return `${x},${svgNumber(y)}`;
  }).join(" ");

  const cosinePoints = Array.from({ length: 200 }).map((_, i) => {
    const x = i * 2;
    const y = Math.cos((i / 20) - offset) * 40;
    return `${x},${svgNumber(y)}`;
  }).join(" ");

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] pointer-events-none" />
      <svg width="400" height="150" viewBox="0 -75 400 150" className="overflow-visible">
        {/* Grid */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="0" y1="0" x2="400" y2="0" />
          <line x1="200" y1="-75" x2="200" y2="75" />
        </g>
        
        {/* Waves */}
        <polyline points={points} fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={cosinePoints} fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Labels */}
        <text x="10" y="-50" fill="#14b8a6" fontSize="12" fontFamily="monospace">Sine</text>
        <text x="10" y="-35" fill="#a855f7" fontSize="12" fontFamily="monospace">Cosine</text>
      </svg>
    </div>
  );
};

export const MathGridBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[0] opacity-20" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent"></div>
    </div>
  );
};

export const CrossProductVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const rotation = time * Math.PI * 0.5;

  // Simulate 3D rotation
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);
  
  // Vector A (Forward/X) - fixed in local space, but rotated
  const ax = cosR * 80;
  const ay = sinR * 20;
  
  // Vector B (Right/Y)
  const bx = -sinR * 80;
  const by = cosR * 20;

  // Vector C (Up/Z) - Cross product is always up in this simple representation
  const cx = 0;
  const cy = -80;

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] pointer-events-none" />
      <svg width="300" height="200" viewBox="-150 -120 300 200" className="overflow-visible">
        {/* Origin */}
        <circle cx="0" cy="0" r="4" fill="#fff" />
        
        {/* Vector A (Red) */}
        <g>
          <line x1="0" y1="0" x2={ax} y2={ay} stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          <polygon points="-4,-4 8,0 -4,4" transform={`translate(${ax}, ${ay}) rotate(${Math.atan2(ay, ax) * 180 / Math.PI})`} fill="#f43f5e" />
          <text x={ax + 10} y={ay + 10} fill="#f43f5e" fontSize="12" fontFamily="monospace">Vector A</text>
        </g>

        {/* Vector B (Blue) */}
        <g>
          <line x1="0" y1="0" x2={bx} y2={by} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <polygon points="-4,-4 8,0 -4,4" transform={`translate(${bx}, ${by}) rotate(${Math.atan2(by, bx) * 180 / Math.PI})`} fill="#3b82f6" />
          <text x={bx + 10} y={by + 10} fill="#3b82f6" fontSize="12" fontFamily="monospace">Vector B</text>
        </g>

        {/* Vector C - Cross Product (Green) */}
        <g>
          <line x1="0" y1="0" x2={cx} y2={cy} stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          <polygon points="-6,-4 10,0 -6,4" transform={`translate(${cx}, ${cy}) rotate(-90)`} fill="#10b981" />
          <text x={cx + 10} y={cy - 10} fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">A × B</text>
        </g>
        
        {/* Info */}
        <text x="-140" y="-100" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">
          Cross Product: Orthogonal to A and B
        </text>
      </svg>
    </div>
  );
};

export const StepVsSmoothstepVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const progress = (Math.sin(time * Math.PI / 3) + 1) / 2;

  const threshold = 0.5;
  const stepValue = progress >= threshold ? 1 : 0;
  
  // smoothstep(0.4, 0.6, x)
  const min = 0.4;
  const max = 0.6;
  let smoothValue = 0;
  if (progress <= min) smoothValue = 0;
  else if (progress >= max) smoothValue = 1;
  else {
    const t = (progress - min) / (max - min);
    smoothValue = t * t * (3 - 2 * t);
  }

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,transparent_70%)] pointer-events-none" />
      <svg width="400" height="150" viewBox="0 -20 400 150" className="overflow-visible">
        {/* Grid */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="0" y1="100" x2="400" y2="100" />
          <line x1="0" y1="0" x2="400" y2="0" />
          <line x1="200" y1="-20" x2="200" y2="120" strokeDasharray="4 4" stroke="rgba(255,255,255,0.2)" />
          <text x="205" y="-10" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">Threshold 0.5</text>
        </g>
        
        {/* Input X indicator */}
        <line x1={progress * 400} y1="-20" x2={progress * 400} y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <circle cx={progress * 400} cy="100" r="4" fill="#fff" />
        
        {/* Lines */}
        <path d="M 0 100 L 200 100 L 200 0 L 400 0" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 0 100 L 160 100 C 180 100, 220 0, 240 0 L 400 0" fill="none" stroke="#eab308" strokeWidth="3" />
        
        {/* Current Values */}
        <circle cx={progress * 400} cy={100 - stepValue * 100} r="6" fill="#ef4444" />
        <circle cx={progress * 400} cy={100 - smoothValue * 100} r="6" fill="#eab308" />

        {/* Labels */}
        <text x="10" y="20" fill="#ef4444" fontSize="12" fontFamily="monospace">Step: {stepValue.toFixed(2)}</text>
        <text x="10" y="40" fill="#eab308" fontSize="12" fontFamily="monospace">Smoothstep: {smoothValue.toFixed(2)}</text>
        <text x="10" y="60" fill="#fff" fontSize="12" fontFamily="monospace">Input X: {progress.toFixed(2)}</text>
      </svg>
    </div>
  );
};
// --- UV MATH VISUALS ---
export const UvCartesianVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const phase = time * Math.PI * 0.5;
  const pos = {
    x: (Math.sin(phase) + 1) / 2,
    y: (Math.cos(phase) + 1) / 2,
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      <svg width="240" height="240" viewBox="-20 -20 240 240" className="overflow-visible">
        <defs>
          <linearGradient id="uvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="200" height="200" fill="url(#uvGradient)" opacity="0.2" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        
        {/* Grid */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
          <line x1="50" y1="0" x2="50" y2="200" />
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="150" y1="0" x2="150" y2="200" />
          <line x1="0" y1="50" x2="200" y2="50" />
          <line x1="0" y1="100" x2="200" y2="100" />
          <line x1="0" y1="150" x2="200" y2="150" />
        </g>

        <text x="-15" y="-5" fill="rgba(255,255,255,0.5)" fontSize="10">(0,0)</text>
        <text x="205" y="-5" fill="#ef4444" fontSize="10">U (1,0)</text>
        <text x="-15" y="215" fill="#22c55e" fontSize="10">V (0,1)</text>

        <circle cx={pos.x * 200} cy={pos.y * 200} r="6" fill="#3b82f6" />
        <line x1="0" y1={pos.y * 200} x2={pos.x * 200} y2={pos.y * 200} stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
        <line x1={pos.x * 200} y1="0" x2={pos.x * 200} y2={pos.y * 200} stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />

        <text x="10" y="230" fill="#fff" fontSize="14" fontFamily="monospace">
          UV: [{pos.x.toFixed(2)}, {pos.y.toFixed(2)}]
        </text>
      </svg>
    </div>
  );
};

export const UvPanningVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();

  const offset = (time * 50) % 100;

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-hidden border border-white/10">
        <defs>
          <pattern id="checker" x={offset} y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="rgba(255,255,255,0.1)" />
            <rect x="20" width="20" height="20" fill="rgba(255,255,255,0.2)" />
            <rect y="20" width="20" height="20" fill="rgba(255,255,255,0.2)" />
            <rect x="20" y="20" width="20" height="20" fill="rgba(255,255,255,0.1)" />
          </pattern>
        </defs>
        <rect width="300" height="100" fill="url(#checker)" />
        <text x="150" y="55" fill="#fff" fontSize="16" fontFamily="monospace" textAnchor="middle" className="drop-shadow-md">
          UV + (Time * Speed)
        </text>
      </svg>
    </div>
  );
};

export const UvDistortionVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
        <g stroke="rgba(20,184,166,0.5)" strokeWidth="2" fill="none">
          {Array.from({ length: 11 }).map((_, i) => {
            const y = i * 20;
            const d = Array.from({ length: 21 }).map((_, j) => {
              const x = j * 10;
              const noiseX = Math.sin(y * 0.05 + time * 2) * 10;
              const noiseY = Math.cos(x * 0.05 + time * 1.5) * 10;
              return `${j === 0 ? 'M' : 'L'} ${svgNumber(x + noiseX)} ${svgNumber(y + noiseY)}`;
            }).join(" ");
            return <path key={`h-${i}`} d={d} />;
          })}
          {Array.from({ length: 11 }).map((_, i) => {
            const x = i * 20;
            const d = Array.from({ length: 21 }).map((_, j) => {
              const y = j * 10;
              const noiseX = Math.sin(y * 0.05 + time * 2) * 10;
              const noiseY = Math.cos(x * 0.05 + time * 1.5) * 10;
              return `${j === 0 ? 'M' : 'L'} ${svgNumber(x + noiseX)} ${svgNumber(y + noiseY)}`;
            }).join(" ");
            return <path key={`v-${i}`} d={d} />;
          })}
        </g>
      </svg>
    </div>
  );
};

// --- SPATIAL MASKS VISUALS ---
export const SphericalMaskVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const angle = time * Math.PI * 0.5;
  const animatedDistance = 60 + Math.sin(time * Math.PI * 0.65) * 55;
  const pos = {
    x: Math.cos(angle) * animatedDistance,
    y: Math.sin(angle) * animatedDistance,
  };

  const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
  const radius = 100;
  const maskValue = Math.max(0, 1 - distance / radius);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <svg width="300" height="300" viewBox="-150 -150 300 300" className="overflow-visible">
        <circle cx="0" cy="0" r={radius} fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
        <circle cx="0" cy="0" r="4" fill="#ef4444" />
        <text x="10" y="-10" fill="#ef4444" fontSize="12">Center (WorldSpace)</text>

        <circle cx={pos.x} cy={pos.y} r="6" fill="#fff" />
        <line x1="0" y1="0" x2={pos.x} y2={pos.y} stroke="#fff" strokeWidth="2" opacity="0.5" />
        
        <text x="-140" y="130" fill="#fff" fontSize="14" fontFamily="monospace">
          Distance: {distance.toFixed(0)}
        </text>
        <text x="-140" y="150" fill="#ef4444" fontSize="14" fontFamily="monospace">
          Mask Value: {maskValue.toFixed(2)}
        </text>
      </svg>
    </div>
  );
};

export const WorldPositionOffsetVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <svg width="400" height="200" viewBox="0 -100 400 200" className="overflow-visible">
        <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4" />
        {Array.from({ length: 21 }).map((_, i) => {
          const x = i * 20;
          const y = Math.sin(x * 0.05 - time * 3) * 40;
          return (
            <g key={i}>
              <line x1={x} y1="0" x2={x} y2={y} stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
              <circle cx={x} cy={y} r="4" fill="#3b82f6" />
            </g>
          );
        })}
        <path d={`M 0 ${Math.sin(-time * 3) * 40} ` + Array.from({length: 20}).map((_, i) => `L ${(i+1)*20} ${Math.sin((i+1)*20*0.05 - time*3)*40}`).join(' ')} fill="none" stroke="#fff" strokeWidth="2" />
        <text x="10" y="-80" fill="#fff" fontSize="14" fontFamily="monospace">
          WPO = VertexNormal * Sin(Time)
        </text>
      </svg>
    </div>
  );
};

export const DepthFadeVisual = () => {
  const { containerRef, time } = useVisibleAnimationTime();
  const pos = Math.sin(time * Math.PI * 0.5) * 50;

  const wallY = 0;
  const particleY = pos;
  const depthDiff = Math.max(0, particleY - wallY);
  const fadeDistance = 40;
  const opacity = Math.min(1, depthDiff / fadeDistance);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800 my-8 overflow-hidden relative">
      <svg width="300" height="200" viewBox="-150 -100 300 200" className="overflow-visible">
        {/* Wall */}
        <rect x="-150" y="-10" width="300" height="20" fill="rgba(255,255,255,0.1)" stroke="#fff" strokeWidth="2" />
        <text x="-140" y="-15" fill="#fff" fontSize="12">Solid Wall (Scene Depth)</text>

        {/* Camera Ray */}
        <line x1="0" y1="100" x2="0" y2="-100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2" />
        <text x="5" y="90" fill="rgba(255,255,255,0.4)" fontSize="10">Camera Ray</text>

        {/* Particle Sprite */}
        <circle cx="0" cy={particleY} r="30" fill={`rgba(20,184,166,${particleY > wallY ? opacity : 0})`} stroke="#14b8a6" strokeWidth="2" />
        <line x1="-30" y1={particleY} x2="30" y2={particleY} stroke="#14b8a6" strokeWidth="2" />
        
        {/* Indicator */}
        {particleY > wallY && (
          <line x1="40" y1={wallY} x2="40" y2={particleY} stroke="#ef4444" strokeWidth="2" />
        )}
        
        <text x="-140" y="80" fill="#fff" fontSize="14" fontFamily="monospace">
          Depth Difference: {particleY > wallY ? depthDiff.toFixed(0) : '0 (Occluded)'}
        </text>
        <text x="-140" y="100" fill="#14b8a6" fontSize="14" fontFamily="monospace">
          Alpha (Opacity): {particleY > wallY ? opacity.toFixed(2) : '0.00'}
        </text>
      </svg>
    </div>
  );
};
