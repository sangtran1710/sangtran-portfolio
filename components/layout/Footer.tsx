"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground sm:px-8 lg:px-12">
        <p className="font-sans">
          &copy; {year} Henry Tran
        </p>
      </div>
    </footer>
  );
}
