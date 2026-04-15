"use client";

import { ViewProjectCursorProvider } from "@/components/cursor/ViewProjectCursorContext";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewProjectCursorProvider>{children}</ViewProjectCursorProvider>;
}
