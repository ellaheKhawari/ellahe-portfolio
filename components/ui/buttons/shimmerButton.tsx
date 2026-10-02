"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "light";
};

const variants = {
  dark: {
    button: "border-white/15 bg-ink text-foreground hover:bg-background",
    shimmer:
      "bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)]",
  },
  light: {
    button: "border-black/10 bg-white text-neutral-900 hover:bg-neutral-100",
    shimmer:
      "bg-[linear-gradient(110deg,transparent_40%,rgba(0,0,0,0.12)_50%,transparent_60%)]",
  },
} as const;

export function ShimmerButton({
  children,
  className,
  variant = "dark",
  type = "button",
  ...props
}: ShimmerButtonProps) {
  const v = variants[variant];

  return (
    <button
      type={type}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
        v.button,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-0 animate-shimmer bg-size-[200%_100%]",
          v.shimmer
        )}
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}