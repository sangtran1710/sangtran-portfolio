import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="panel p-10 text-center">
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">That lesson or route does not exist yet.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Try the library or jump directly into a practice session while we keep growing the public knowledge vault.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-teal-100"
          >
            Open library
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Open practice
          </Link>
        </div>
      </div>
    </div>
  );
}
