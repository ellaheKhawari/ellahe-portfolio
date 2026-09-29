"use client";

import { cn } from "@/lib/utils";

export function ShimmerButton({ children, className, onClick }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-line bg-surface px-6 py-3 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]",
        className )}
    >
      <span
        className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.35),55%,transparent)] bg-size-[200%_100%]"
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
