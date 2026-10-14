"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ViewProjectCursorProvider } from "@/components/cursor/ViewProjectCursorContext";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = contentRef.current?.animate(
      [{ opacity: 0.65 }, { opacity: 1 }],
      { duration: 180, easing: "ease-out" }
    );
    return () => animation?.cancel();
  }, [pathname]);

  return (
    <ViewProjectCursorProvider>
      <div ref={contentRef}>{children}</div>
    </ViewProjectCursorProvider>
  );
}
