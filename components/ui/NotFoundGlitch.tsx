"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/store";
import { NotFoundStageProps } from "@/types";

function NotFoundStage({ className, children }: NotFoundStageProps) {
  return (
    <section
      className={cn(
        "flex min-h-130 w-full flex-col items-center justify-center gap-8 px-6 py-20 text-center",
        className,
      )}
    >
      {children}
    </section>
  );
}

function NotFoundActions({
  homeHref,
  homeLabel,
  browseHref,
  browseLabel,
}: {
  homeHref: string;
  homeLabel: string;
  browseHref: string;
  browseLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={homeHref}
        className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform active:scale-[0.97]"
      >
        {homeLabel}
      </a>
      <a
        href={browseHref}
        className="inline-flex h-10 items-center justify-center rounded-full border border-border-strong bg-card px-5 text-sm font-medium text-foreground transition-transform hover:bg-background-elevated active:scale-[0.97]"
      >
        {browseLabel}
      </a>
    </div>
  );
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/\\";
const SCRAMBLE_MS = 700;
const TICK_MS = 45;

function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) return;

    const chars = text.split("");
    const start = performance.now();
    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (now - last >= TICK_MS) {
        last = now;
        const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
        const settled = Math.floor(progress * chars.length);
        setDisplay(
          chars
            .map((ch, i) =>
              i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );
      }
      if (now - start < SCRAMBLE_MS) {
        raf = requestAnimationFrame(loop);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);

  return <span className="tabular-nums">{display}</span>;
}

export function NotFoundGlitch() {
  const { t } = useDictionary();

  return (
    <NotFoundStage>
      <div className="group relative select-none font-mono font-bold leading-none tracking-tighter text-foreground text-[clamp(5rem,18vw,11rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-[#ff5b7f] opacity-0 mix-blend-screen transition-[transform,opacity] duration-150 ease-out group-hover:translate-x-0.75 group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text="404" />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-mist opacity-0 mix-blend-screen transition-[transform,opacity] duration-150 ease-out group-hover:-translate-x-0.75 group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text="404" />
        </span>
        <h1 className="relative">
          <Scramble text="404" />
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-foreground">{t.notFound.title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{t.notFound.description}</p>
      </div>

      <NotFoundActions
        homeHref="/"
        homeLabel={t.notFound.home}
        browseHref="/#projects"
        browseLabel={t.notFound.browse}
      />
    </NotFoundStage>
  );
}
