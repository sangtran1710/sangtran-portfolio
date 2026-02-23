"use client";

const STUDIOS = [
  "PLAYSTATION",
  "MARVEL",
  "EPIC GAMES",
  "INSOMNIAC GAMES",
  "AMAZON GAMES",
  "SONY INTERACTIVE",
];

export default function StudioLogoStrip() {
  const items = [...STUDIOS, ...STUDIOS];

  return (
    <section className="border-y border-border/60 bg-muted/20 py-8">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 mb-6">
          Shipped titles in collaboration with
        </p>
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden" aria-hidden="true">
        <div className="marquee-inner">
          {items.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center shrink-0 h-10 px-6 rounded-lg border border-border/40 bg-background"
            >
              <span className="text-xs font-bold tracking-widest text-foreground/40 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
