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
  const isFirstMount = useRef(true);

  useLayoutEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = contentRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" }
    );
    return () => animation?.cancel();
  }, [pathname]);

  return (
    <ViewProjectCursorProvider>
      <div ref={contentRef}>{children}</div>
    </ViewProjectCursorProvider>
  );
}
