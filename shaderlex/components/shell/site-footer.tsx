import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-200">ShaderLex</p>
          <p>Standalone learning site for shader study, production language, and technical English practice.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/learn" className="transition hover:text-white">
            Library
          </Link>
          <Link href="/practice" className="transition hover:text-white">
            Practice
          </Link>
          <Link href="/progress" className="transition hover:text-white">
            Progress
          </Link>
        </div>
      </div>
    </footer>
  );
}
