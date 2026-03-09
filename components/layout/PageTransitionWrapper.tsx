"use client";

import { usePathname } from "next/navigation";
import PageTransition from "@/components/animations/PageTransition";
import { ViewProjectCursorProvider } from "@/components/cursor/ViewProjectCursorContext";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ViewProjectCursorProvider>
      <PageTransition key={pathname}>{children}</PageTransition>
    </ViewProjectCursorProvider>
  );
}
