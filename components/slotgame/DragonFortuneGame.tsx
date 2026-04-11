"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import * as PIXI from "pixi.js";

// ─── Config ───────────────────────────────────────────────────────────────
const REELS       = 5;
const ROWS        = 3;
const STRIP_LEN   = 24;   // symbols per virtual reel strip
const STAGGER_MS  = 280;  // ms between each reel stopping
const SYM_RATIO   = 0.80; // symbol size relative to cell

// ─── Symbol Definitions ───────────────────────────────────────────────────
const SYMBOLS = [
  { id: "dragon",  weight: 1, pays: { 3:50, 4:100, 5:200 }, isWild:false, isScatter:false },
  { id: "coin",    weight: 2, pays: { 3:20, 4:50,  5:100 }, isWild:false, isScatter:false },
  { id: "gem",     weight: 2, pays: { 3:15, 4:30,  5:60  }, isWild:false, isScatter:false },
  { id: "lantern", weight: 3, pays: { 3:10, 4:20,  5:40  }, isWild:false, isScatter:false },
  { id: "fan",     weight: 4, pays: { 3:5,  4:10,  5:20  }, isWild:false, isScatter:false },
  { id: "ingot",   weight: 4, pays: { 3:3,  4:8,   5:15  }, isWild:false, isScatter:false },
  { id: "wild",    weight: 1, pays: {},                      isWild:true,  isScatter:false },
  { id: "scatter", weight: 1, pays: {},                      isWild:false, isScatter:true  },
] as const;

type SymId = typeof SYMBOLS[number]["id"];

const POOL: SymId[] = SYMBOLS.flatMap(s => Array(s.weight).fill(s.id)) as SymId[];
const randSym = (): SymId => POOL[Math.floor(Math.random() * POOL.length)];
const makeGrid = (): SymId[][] =>
  Array.from({ length: REELS }, () => Array.from({ length: ROWS }, randSym));

// ─── Paylines ─────────────────────────────────────────────────────────────
const PAYLINES: [number, number][][] = [
  [[0,1],[1,1],[2,1],[3,1],[4,1]],
  [[0,0],[1,0],[2,0],[3,0],[4,0]],
  [[0,2],[1,2],[2,2],[3,2],[4,2]],
  [[0,0],[1,1],[2,2],[3,1],[4,0]],
  [[0,2],[1,1],[2,0],[3,1],[4,2]],
  [[0,0],[1,1],[2,0],[3,1],[4,0]],
  [[0,2],[1,1],[2,2],[3,1],[4,2]],
  [[0,1],[1,0],[2,1],[3,0],[4,1]],
  [[0,1],[1,2],[2,1],[3,2],[4,1]],
  [[0,0],[1,2],[2,0],[3,2],[4,0]],
];

// ─── Win Evaluation ───────────────────────────────────────────────────────
interface WinResult { totalWin: number; winCells: Set<string>; freeSpinsAwarded: number; }

function evalWin(grid: SymId[][], bet: number): WinResult {
  let totalWin = 0;
  const winCells = new Set<string>();
  for (const line of PAYLINES) {
    const syms = line.map(([r, row]) => grid[r][row]);
    const base = syms.find(s => !SYMBOLS.find(x => x.id === s)!.isWild && !SYMBOLS.find(x => x.id === s)!.isScatter);
    if (!base) continue;
    let count = 0;
    for (const s of syms) {
      if (s === base || SYMBOLS.find(x => x.id === s)!.isWild) count++;
      else break;
    }
    if (count >= 3) {
      const mult = (SYMBOLS.find(x => x.id === base)!.pays as Record<number, number>)[count] ?? 0;
      const win = bet * mult;
      if (win > 0) { totalWin += win; line.slice(0, count).forEach(([r, row]) => winCells.add(`${r},${row}`)); }
    }
  }
  let sc = 0;
  for (let r = 0; r < REELS; r++)
    for (let row = 0; row < ROWS; row++)
      if (grid[r][row] === "scatter") { sc++; winCells.add(`${r},${row}`); }
  return { totalWin, winCells, freeSpinsAwarded: sc >= 3 ? sc * 3 : 0 };
}

// ─── Web Audio Synth (no files needed) ────────────────────────────────────
let _actx: AudioContext | null = null;
const getACtx = () => {
  if (!_actx) _actx = new AudioContext();
  if (_actx.state === "suspended") _actx.resume();
  return _actx;
};
const tone = (freq: number, vol: number, dur: number, type: OscillatorType = "sine", delay = 0) => {
  try {
    const ctx = getACtx();
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime + delay);
    g.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + dur + 0.01);
  } catch { /* AudioContext blocked */ }
};
const sfxReelStop  = (r: number) => tone(190 + r * 25, 0.12, 0.07, "triangle");
const sfxCoin      = (delay = 0)  => tone(880 + Math.random() * 180, 0.14, 0.09, "sine", delay);
const sfxWin       = (mult: number) => {
  const seq = mult >= 20 ? [523,659,784,1047] : mult >= 10 ? [523,659,784] : [659,784];
  seq.forEach((f, i) => tone(f, 0.22, 0.22, "sine", i * 0.11));
};

// ─── PixiJS Reel Data ─────────────────────────────────────────────────────
interface PixiReel {
  container: PIXI.Container;
  sprites:   PIXI.Sprite[];
  blur:      PIXI.BlurFilter;
  strip:     SymId[];
  position:  number; // current strip offset (grows each spin)
}

// ─── Component ────────────────────────────────────────────────────────────
export default function DragonFortuneGame() {
  const [balance,    setBalance]    = useState(200);
  const [bet,        setBet]        = useState(1);
  const [lastWin,    setLastWin]    = useState(0);
  const [freeSpins,  setFreeSpins]  = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoSpin,   setAutoSpin]   = useState(false);
  const [totalSpins, setTotalSpins] = useState(0);
  const [spinPressed,setSpinPressed]= useState(false);
  const [showBigWin, setShowBigWin] = useState<"big"|"super"|"mega"|null>(null);
  const [pixiReady,  setPixiReady]  = useState(false);

  const pixiRef    = useRef<HTMLDivElement>(null);
  const appRef     = useRef<PIXI.Application | null>(null);
  const reelsRef   = useRef<PixiReel[]>([]);
  const spinRef    = useRef(false);
  const autoRef    = useRef(false);

  useEffect(() => {
    autoRef.current = autoSpin;
  }, [autoSpin]);

  // ── PixiJS Bootstrap ──────────────────────────────────────────────────
  useEffect(() => {
    if (!pixiRef.current) return;
    const el    = pixiRef.current;
    let app: PIXI.Application;
    let gone    = false;

    (async () => {
      app = new PIXI.Application();
      const W      = el.clientWidth || 600;
      const CELL_W = W / REELS;
      const CELL_H = Math.round(CELL_W * 1.08);  // slightly tall cells
      const H      = CELL_H * ROWS;

      await app.init({
        width: W, height: H,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });
      if (gone) {
        try { app.destroy(); } catch { /* init was partial — ignore */ }
        return;
      }

      el.appendChild(app.canvas as HTMLCanvasElement);
      appRef.current = app;

      // Load all symbol textures in one batch
      await PIXI.Assets.load(
        SYMBOLS.map(s => ({ alias: s.id, src: `/slotgame/sym_${s.id}.png` }))
      );
      if (gone) return;

      // Build reel containers
      const reels: PixiReel[] = [];
      for (let r = 0; r < REELS; r++) {
        const container = new PIXI.Container();
        container.x = r * CELL_W;

        // Virtual symbol strip
        const strip: SymId[] = Array.from({ length: STRIP_LEN }, randSym);

        // ROWS + 2 sprites: 1 buffer top, ROWS visible, 1 buffer bottom
        const sprites: PIXI.Sprite[] = [];
        for (let i = 0; i < ROWS + 2; i++) {
          const sp  = new PIXI.Sprite(PIXI.Assets.get(strip[i % STRIP_LEN]));
          const sz  = CELL_W * SYM_RATIO;
          sp.width  = sz; sp.height = sz;
          sp.anchor.set(0.5);
          sp.x = CELL_W / 2;
          sp.y = (i - 1) * CELL_H + CELL_H / 2;
          container.addChild(sp);
          sprites.push(sp);
        }

        const blur = new PIXI.BlurFilter();
        blur.strength = 0;
        container.filters = [blur];

        app.stage.addChild(container);
        reels.push({ container, sprites, blur, strip, position: 0 });
      }

      reelsRef.current = reels;

      // Ticker: update sprite textures & y-positions from reel.position
      app.ticker.add(() => {
        const CH = app.screen.height / ROWS;
        for (const reel of reelsRef.current) {
          const offset  = reel.position % 1;
          const base    = Math.floor(reel.position);
          for (let i = 0; i < reel.sprites.length; i++) {
            const sp  = reel.sprites[i];
            const idx = ((base + i) % reel.strip.length + reel.strip.length) % reel.strip.length;
            sp.texture = PIXI.Assets.get(reel.strip[idx]);
            sp.y       = (i - 1 + offset) * CH + CH / 2;
          }
        }
      });

      setPixiReady(true);
    })();

    return () => {
      gone = true;
      // Remove canvas from DOM manually first, then destroy safely
      if (appRef.current) {
        try {
          const canvas = appRef.current.canvas as HTMLCanvasElement | null;
          if (canvas?.parentElement) canvas.parentElement.removeChild(canvas);
          appRef.current.destroy();
        } catch { /* PixiJS v8 may throw if init was interrupted */ }
        appRef.current = null;
      }
      reelsRef.current = [];
    };
  }, []);

  // ── GSAP Reel Spin ────────────────────────────────────────────────────
  const spinReel = useCallback((r: number, finalCol: SymId[], stopDelayMs: number): Promise<void> => {
    return new Promise(resolve => {
      const reel = reelsRef.current[r];
      if (!reel) { resolve(); return; }

      // Plant final symbols into strip at landing position
      const landPos = Math.ceil(reel.position) + 22;
      for (let row = 0; row < ROWS; row++) {
        const idx = ((landPos + 1 + row) % reel.strip.length + reel.strip.length) % reel.strip.length;
        reel.strip[idx] = finalCol[row];
      }

      // Last 2 reels get anticipation: slower + more dramatic ease
      const isAnticipation = r >= REELS - 2;
      const duration = 0.9 + r * 0.18 + (isAnticipation ? 0.55 : 0);
      let lastPos = reel.position;

      gsap.to(reel, {
        position: landPos,
        duration,
        ease: isAnticipation ? "power2.inOut" : "power4.out",
        delay: stopDelayMs / 1000,
        onUpdate() {
          const vel         = Math.abs(reel.position - lastPos) * 60;
          lastPos           = reel.position;
          reel.blur.strength = Math.min(12, vel * 0.9);
        },
        onComplete() {
          reel.blur.strength = 0;
          sfxReelStop(r);
          // Landing bounce — animate the whole container down then back
          gsap.fromTo(
            reel.container,
            { y: reel.container.y + 12 },
            { y: reel.container.y, duration: 0.28, ease: "bounce.out" }
          );
          resolve();
        },
      });
    });
  }, []);

  // ── PixiJS Coin Burst ─────────────────────────────────────────────────
  const spawnCoins = useCallback((count = 50) => {
    const app = appRef.current;
    if (!app) return;
    const W = app.screen.width, H = app.screen.height;
    const colors = [0xFFD700, 0xFFA500, 0xFF8C00, 0xFFEC8B, 0xDAA520];

    for (let i = 0; i < count; i++) {
      const coin  = new PIXI.Graphics();
      const size  = 5 + Math.random() * 6;
      coin.ellipse(0, 0, size, size * 0.64)
          .fill(colors[Math.floor(Math.random() * colors.length)]);
      coin.x      = W * 0.05 + Math.random() * W * 0.9;
      coin.y      = -10 - Math.random() * 25;
      coin.zIndex = 50;
      app.stage.addChild(coin);

      gsap.to(coin, {
        x: coin.x + (Math.random() - 0.5) * 160,
        y: H + 30,
        rotation: Math.random() * Math.PI * 8,
        alpha: 0,
        duration: 1.1 + Math.random() * 0.9,
        ease: "power1.in",
        delay: Math.random() * 0.35,
        onComplete() { app.stage.removeChild(coin); coin.destroy(); },
      });
      if (i < 9) sfxCoin(i * 0.07 + Math.random() * 0.03);
    }
  }, []);

  // ── PixiJS Win Highlight ──────────────────────────────────────────────
  const highlightWins = useCallback((cells: Set<string>) => {
    const app = appRef.current;
    if (!app || !cells.size) return;
    const CW = app.screen.width / REELS, CH = app.screen.height / ROWS;
    const glows: PIXI.Graphics[] = [];

    cells.forEach(key => {
      const [r, row] = key.split(",").map(Number);
      const g = new PIXI.Graphics();
      g.roundRect(r * CW + 4, row * CH + 4, CW - 8, CH - 8, 8)
       .stroke({ color: 0xFFD700, width: 2.5 });
      g.alpha   = 0;
      g.zIndex  = 10;
      app.stage.addChild(g);
      glows.push(g);
    });

    gsap.to(glows, {
      alpha: 1, yoyo: true, repeat: 7, duration: 0.22,
      ease: "power1.inOut",
      onComplete() { glows.forEach(g => { app.stage.removeChild(g); g.destroy(); }); },
    });
  }, []);

  // ── Main Spin ─────────────────────────────────────────────────────────
  const doSpin = useCallback(async () => {
    if (spinRef.current) return;
    const isFree = freeSpins > 0;
    if (!isFree && balance < bet) return;

    spinRef.current = true;
    setIsSpinning(true); setLastWin(0); setShowBigWin(null);
    setTotalSpins(s => s + 1);
    if (isFree) setFreeSpins(f => f - 1); else setBalance(b => b - bet);

    const result = makeGrid();

    await Promise.all(
      Array.from({ length: REELS }, (_, r) => spinReel(r, result[r], r * STAGGER_MS))
    );
    await new Promise<void>(res => setTimeout(res, 100));

    const { totalWin, winCells: wc, freeSpinsAwarded } = evalWin(result, bet);
    if (totalWin > 0) {
      setLastWin(totalWin); setBalance(b => b + totalWin);
      highlightWins(wc);
      const mult = totalWin / bet;
      if      (mult >= 30) { setShowBigWin("mega");  spawnCoins(120); sfxWin(30); }
      else if (mult >= 20) { setShowBigWin("super"); spawnCoins(80);  sfxWin(20); }
      else if (mult >= 10) { setShowBigWin("big");   spawnCoins(55);  sfxWin(10); }
      else                 {                          spawnCoins(28);  sfxWin(1);  }
    }
    if (freeSpinsAwarded > 0) setFreeSpins(f => f + freeSpinsAwarded);

    spinRef.current = false;
    setIsSpinning(false);
  }, [balance, bet, freeSpins, spinReel, spawnCoins, highlightWins]);

  useEffect(() => {
    if (!isSpinning && autoRef.current) {
      const t = setTimeout(() => { if (autoRef.current) doSpin(); }, 700);
      return () => clearTimeout(t);
    }
  }, [isSpinning, doSpin]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); doSpin(); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [doSpin]);

  const canSpin = !isSpinning && (freeSpins > 0 || balance >= bet);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full bg-zinc-950 flex flex-col items-center overflow-hidden py-6 px-4">

      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/slotgame/bg_main.png" alt="" fill className="object-cover opacity-55" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:"linear-gradient(rgba(255,200,0,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,200,0,0.5) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
      </div>

      {/* Big Win Overlay */}
      <AnimatePresence>
        {showBigWin && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setShowBigWin(null)}>
            <motion.div initial={{ scale:0.3, rotate:-8 }} animate={{ scale:1, rotate:0 }}
              exit={{ scale:1.4, opacity:0 }} transition={{ type:"spring", stiffness:300, damping:20 }}
              className="text-center select-none">
              <motion.p className="text-5xl sm:text-7xl font-black uppercase tracking-[0.15em] mb-4"
                style={{ color: showBigWin==="mega"?"#FF4500":showBigWin==="super"?"#FF8C00":"#FFD700", textShadow:"0 0 60px currentColor" }}
                animate={{ scale:[1,1.06,1] }} transition={{ repeat:Infinity, duration:0.55 }}>
                {showBigWin==="mega"?"MEGA WIN!":showBigWin==="super"?"SUPER WIN!":"BIG WIN!"}
              </motion.p>
              <motion.p className="text-7xl sm:text-9xl font-black text-white tabular-nums"
                style={{ textShadow:"0 0 50px rgba(255,215,0,0.9)" }}
                animate={{ scale:[1,1.04,1] }} transition={{ repeat:Infinity, duration:0.4, delay:0.1 }}>
                +{lastWin}
              </motion.p>
              <p className="mt-6 text-white/30 text-xs uppercase tracking-widest">tap to continue</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cabinet */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="rounded-2xl overflow-hidden border border-yellow-700/40"
          style={{ boxShadow:"0 0 80px rgba(180,120,0,0.25),0 0 0 1px rgba(255,180,0,0.08) inset" }}>

          {/* Top Bar */}
          <div className="bg-gradient-to-r from-yellow-950/80 via-zinc-900/90 to-yellow-950/80 border-b border-yellow-800/30 px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image src="/slotgame/ui/logo_title.png" alt="Dragon Fortune" fill className="object-contain" priority />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-black tracking-[0.14em] uppercase text-yellow-400 leading-tight"
                  style={{ textShadow:"0 0 20px rgba(255,160,0,0.5)" }}>Dragon Fortune</h1>
                <p className="text-[9px] text-yellow-700/60 uppercase tracking-[0.2em]">
                  5 Reels · 10 Lines · Free Spins
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">Balance</p>
              <motion.p key={balance} initial={{ color:"#FFD700", scale:1.15 }} animate={{ color:"#FBBF24", scale:1 }}
                transition={{ duration:0.4 }}
                className="text-xl sm:text-2xl font-black text-yellow-400 tabular-nums leading-none">
                {balance}<span className="text-xs font-normal text-yellow-700/60 ml-1">CR</span>
              </motion.p>
            </div>
          </div>

          {/* ── PixiJS Reel Canvas ── */}
          <div className="relative bg-zinc-900/95 overflow-hidden">
            {/* Reel bg texture */}
            <div className="absolute inset-0 opacity-25">
              <Image src="/slotgame/reel_bg.png" alt="" fill className="object-cover" />
            </div>
            {/* Cabinet frame overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/slotgame/frame_cabinet.png" alt="" className="w-full h-full opacity-80" style={{ objectFit:"fill" }} />
            </div>
            {/* PixiJS mounts here — canvas auto-sized by app.init */}
            <div ref={pixiRef} className="relative z-0 w-full" style={{ lineHeight:0 }} />
            {!pixiReady && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ minHeight:180 }}>
                <span className="text-yellow-500/50 text-xs uppercase tracking-widest animate-pulse">
                  Initialising WebGL…
                </span>
              </div>
            )}
          </div>

          {/* Win Strip */}
          <div className="h-10 bg-black/60 border-y border-yellow-900/20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {lastWin > 0 ? (
                <motion.span key={`w-${lastWin}`} initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                  className="text-sm font-black text-yellow-400 uppercase tracking-[0.2em]"
                  style={{ textShadow:"0 0 16px rgba(255,200,0,0.6)" }}>WIN · {lastWin} CR</motion.span>
              ) : freeSpins > 0 ? (
                <motion.span key="fs" animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:1, repeat:Infinity }}
                  className="text-sm font-bold text-teal-400 uppercase tracking-widest">🎁 Free Spins: {freeSpins}</motion.span>
              ) : (
                <span className="text-[9px] text-white/20 uppercase tracking-[0.35em]">
                  {isSpinning ? "· · · · ·" : "Good luck!"}
                </span>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image src="/slotgame/ui/panel_bottom.png" alt="" fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-black/45" />
            </div>
            <div className="relative px-5 py-4 flex items-center gap-3 sm:gap-5">
              {/* Bet */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[8px] text-white/40 uppercase tracking-[0.28em]">Bet / Line</span>
                <div className="flex gap-1.5">
                  {[1, 5, 10].map(b => (
                    <button key={b} onClick={() => !isSpinning && setBet(b)} disabled={isSpinning}
                      className={`flex-1 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all border
                        ${bet===b ? "bg-yellow-500 text-zinc-900 border-yellow-400 shadow-[0_0_14px_rgba(255,165,0,0.5)]"
                                  : "bg-black/40 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/70"}
                        disabled:opacity-40 disabled:cursor-not-allowed`}>{b}</button>
                  ))}
                </div>
              </div>

              {/* Spin Button */}
              <button onClick={() => canSpin && doSpin()} disabled={!canSpin}
                onMouseDown={() => setSpinPressed(true)} onMouseUp={() => setSpinPressed(false)}
                onMouseLeave={() => setSpinPressed(false)}
                onTouchStart={() => setSpinPressed(true)} onTouchEnd={() => setSpinPressed(false)}
                className="relative shrink-0 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ filter: canSpin ? "drop-shadow(0 0 20px rgba(255,140,0,0.55))" : "none" }}>
                <Image src={spinPressed && canSpin ? "/slotgame/ui/btn_spin_pressed.png" : "/slotgame/ui/btn_spin.png"}
                  alt="Spin" fill className="object-contain"
                  style={{ transform: spinPressed && canSpin ? "scale(0.94)" : "scale(1)", transition:"transform 0.07s" }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.span className="font-black text-[10px] tracking-[0.1em] uppercase text-white drop-shadow-lg"
                    animate={isSpinning ? { rotate:360 } : {}}
                    transition={isSpinning ? { duration:0.5, repeat:Infinity, ease:"linear" } : {}}>
                    {isSpinning ? "⟳" : freeSpins > 0 ? "FREE" : ""}
                  </motion.span>
                </div>
              </button>

              {/* Auto Spin */}
              <div className="flex flex-col gap-2 flex-1 items-end">
                <span className="text-[8px] text-white/40 uppercase tracking-[0.28em]">Auto Spin</span>
                <button onClick={() => setAutoSpin(a => !a)}
                  className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all border w-full
                    ${autoSpin ? "bg-teal-500 text-zinc-900 border-teal-400 shadow-[0_0_14px_rgba(20,184,166,0.4)]"
                               : "bg-black/40 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/70"}`}>
                  {autoSpin ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black/50 px-5 py-2 flex items-center justify-between">
            <span className="text-[8px] text-white/20 uppercase tracking-[0.28em]">
              10 Paylines · Wild · Scatter · Free Spins
            </span>
            <span className="text-[8px] text-white/20 uppercase tracking-[0.28em]">
              Space to Spin
            </span>
          </div>
        </div>

        {/* Paytable */}
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {SYMBOLS.slice(0, 8).map(sym => (
            <div key={sym.id} className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image src={`/slotgame/sym_${sym.id}.png`} alt={sym.id} fill className="object-contain" />
              </div>
              {!sym.isWild && !sym.isScatter && (
                <span className="text-[7px] text-yellow-600 tabular-nums">
                  ×{(sym.pays as Record<number,number>)[3] ?? 0}
                </span>
              )}
              {sym.isWild    && <span className="text-[7px] text-teal-500">Wild</span>}
              {sym.isScatter && <span className="text-[7px] text-purple-400">Free</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
