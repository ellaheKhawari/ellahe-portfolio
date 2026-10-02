"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { House } from "lucide-react"; 

export function BackToProjects({ label = "Back to projects" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const touch = useRef(false);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 4000);
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <Link
      ref={ref}
      href="/#projects"
      aria-label={label}
      data-open={open}
      onPointerDown={(e) => (touch.current = e.pointerType !== "mouse")}
      onClick={(e) => {
        if (touch.current && !open) {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className="group fixed inset-e-[clamp(1rem,3vw,2rem)] bottom-[clamp(1rem,3vw,2rem)] z-50 flex h-12 items-center rounded-full bg-ink px-3.5 text-foreground shadow-lg outline-offset-2 transition-transform hover:scale-105 focus-visible:outline-2"
    >
      <House className="size-5 shrink-0" aria-hidden />
      <span className="max-w-0 overflow-hidden text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ms-2 group-hover:max-w-48 group-hover:opacity-100 group-focus-visible:ms-2 group-focus-visible:max-w-48 group-focus-visible:opacity-100 group-data-[open=true]:ms-2 group-data-[open=true]:max-w-48 group-data-[open=true]:opacity-100">
        {label}
      </span>
    </Link>
  );
}
