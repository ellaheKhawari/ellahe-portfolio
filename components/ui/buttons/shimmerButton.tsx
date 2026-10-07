"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "light";
  loading?: boolean;
};

const variants = {
  dark: {
    button: "border-white/15 bg-ink text-foreground hover:bg-background",
    shimmer:
      "bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)]",
  },
  light: {
    button: "border-background! bg-neutral-100 text-neutral-900 hover:bg-neutral-100",
    shimmer:
      "bg-[linear-gradient(110deg,transparent_40%,rgba(0,0,0,0.12)_50%,transparent_60%)]",
  },
} as const;

export function ShimmerButton({
  children,
  className,
  variant = "dark",
  type = "button",
  loading = false,
  disabled,
  ...props
}: ShimmerButtonProps) {
  const v = variants[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100",
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
      <span className="relative z-10 flex items-center gap-2">
        {loading && (
          <svg
            className="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 0 1 8-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
}