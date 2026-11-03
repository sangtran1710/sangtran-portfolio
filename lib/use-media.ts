"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  window.addEventListener("resize", callback);

  return () => {
    mql.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 768;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Detects whether the user is on a desktop device that supports hover
 * and fine pointer interactions (mouse / trackpad).
 *
 * Returns `false` on mobile phones, tablets, touchscreens, or during SSR.
 * This guarantees zero video decoding overhead and pure static image rendering on mobile.
 */
export function useCanHover(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
