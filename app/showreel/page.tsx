import type { Metadata } from "next";
import ShowreelPageClient from "@/components/showreel/ShowreelPageClient";

export const metadata: Metadata = {
  title: "Showreel",
  description: "VFX Reel 2025 - Real-time VFX · AAA · Cinematic",
};

export default function ShowreelPage() {
  return <ShowreelPageClient />;
}
