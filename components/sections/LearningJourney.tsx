"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Milestone } from "@/types";
import { DEFAULT_MILESTONES } from "@/lib/mockData";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const PAD_START = 14;
const PAD_END = 86;
const HEAD_START = 6;
const HEAD_END = 94;
const LIT_FADE_IN_FRACTION = 0.06;
const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (x: number) => x * x * (3 - 2 * x);

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function slugify(m: Milestone) {
  return `${m.date}-${m.title}`.replace(/\s+/g, "-").toLowerCase();
}
function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(orientation: portrait)");
    const update = () => setIsPortrait(mql.matches);

    update();
    setMounted(true);

    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  return { isPortrait, mounted };
}
function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 16 16"
      className="h-3 w-3"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
function MilestoneCardBody({
  milestone,
  active,
}: {
  milestone: Milestone;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `milestone-panel-${slugify(milestone)}`;

  return (
    <>
      <span
        className={cn(
          "block text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500",
          active ? "text-mist" : "text-zinc-500"
        )}
      >
        {milestone.date}
      </span>

      <span
        className={cn(
          "mt-1 block text-[13px] font-semibold leading-tight transition-colors duration-500",
          active ? "text-foregroundbg-foreground" : "text-zinc-300"
        )}
      >
        {milestone.title}
      </span>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "mt-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-300",
          active ? "text-mist hover:text-foregroundbg-foreground" : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        {open ? "Show Less" : "Show More"}
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <span className="mt-1.5 block text-[11px] leading-snug text-zinc-400">
            {milestone.description}
          </span>
        </div>
      </div>
    </>
  );
}

export function TimelineHorizontal({
  milestones = DEFAULT_MILESTONES,
  className,
  scrollYProgress,
}: {
  milestones?: Milestone[];
  className?: string;
  scrollYProgress: MotionValue<number>;
}) {
  const count = milestones.length;
  const positions = useMemo(() => {
    if (count <= 1) {
      return milestones.map(() => (PAD_START + PAD_END) / 2);
    }

    return milestones.map((_, i) =>
      r2(PAD_START + (PAD_END - PAD_START) * (i / (count - 1)))
    );
  }, [count, milestones]);

  const head = useMotionValue(0);
  const lit = useMotionValue(0);
  const headPct = useTransform(head, (v) =>
    r2(HEAD_START + (HEAD_END - HEAD_START) * v)
  );
  const headStr = useTransform(headPct, (p) => `${p}%`);
  const [activeCount, setActiveCount] = useState(0);
  const lastActive = useRef(-1);

  useMotionValueEvent(scrollYProgress, "change", (raw) => {
    const p = smoothstep(clamp01(raw));
    const l = Math.min(1, p / LIT_FADE_IN_FRACTION);

    head.set(p);
    lit.set(l);

    const reach = HEAD_START + (HEAD_END - HEAD_START) * p;
    let c = 0;
    for (const pos of positions) {
      if (pos <= reach) c++;
    }

    if (c !== lastActive.current) {
      lastActive.current = c;
      setActiveCount(c);
    }
  });

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-foregroundbg-foreground/10 bg-background ",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5 sm:px-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-mist/70">
            Platform roadmap
          </p>
          <h3 className="mt-1.5 text-sm font-semibold text-foregroundbg-foreground sm:text-base">
            Shipping through 2026
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-foregroundbg-foreground/10 bg-background/60 px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-mist"
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-mist" />
          </span>
          <span className="text-[11px] font-medium tabular-nums text-zinc-300">
            {activeCount} / {count} shipped
          </span>
        </div>
      </div>

      <div className="no-scrollbar relative flex-1 overflow-x-auto">
        <div className="relative h-full w-full zoom-125 lg:zoom-150">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <div className="absolute inset-0 bg-foreground/10" />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: headStr,
                opacity: lit,
                background: "linear-gradient(to right, rgba(157,196,221,0.15), #9dc4dd 60%, #9dc4dd)",
                boxShadow: "0 0 12px rgba(157,196,221,0.55)",
              }}
            />
          </div>

          <motion.div
            className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: headStr, opacity: lit }}
          >
            <motion.span
              className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(157,196,221,0.55), transparent 70%)",
              }}
              animate={{ scale: [1, 2.1], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <span
              className="block h-2.5 w-2.5 rounded-full bg-foreground"
              style={{ boxShadow: "0 0 10px 2px rgba(157,196,221,0.9)" }}
            />
          </motion.div>

          {milestones.map((milestone, i) => {
            const side: "top" | "bottom" = i % 2 === 0 ? "top" : "bottom";
            const active = i < activeCount;

            return (
              <HorizontalNode
                key={slugify(milestone)}
                milestone={milestone}
                left={positions[i]}
                side={side}
                active={active}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HorizontalNode({
  milestone,
  left,
  side,
  active,
}: {
  milestone: Milestone;
  left: number;
  side: "top" | "bottom";
  active: boolean;
}) {
  const isTop = side === "top";

  return (
    <>
      <div
        className="absolute z-10 w-36 -translate-x-1/2 lg:w-48"
        style={
          isTop
            ? { left: `${left}%`, bottom: "calc(50% + 28px)" }
            : { left: `${left}%`, top: "calc(50% + 28px)" }
        }
      >
        <motion.div
          className="relative overflow-hidden rounded-xl border p-3 backdrop-blur-sm"
          initial={false}
          animate={{
            y: active ? (isTop ? -4 : 4) : 0,
            borderColor: active ? "rgba(157,196,221,0.45)" : "rgba(255,255,255,0.08)",
            backgroundColor: active ? "rgba(19,19,30,0.92)" : "rgba(13,13,20,0.65)",
            boxShadow: active
              ? "0 14px 34px -14px rgba(157,196,221,0.55)"
              : "0 0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <motion.span
            className="absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-mist to-transparent"
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          />

          <MilestoneCardBody milestone={milestone} active={active} />
        </motion.div>
      </div>

      <motion.div
        className="absolute z-0 w-px -translate-x-1/2"
        style={
          isTop
            ? { left: `${left}%`, bottom: "50%", height: "28px" }
            : { left: `${left}%`, top: "50%", height: "28px" }
        }
        initial={false}
        animate={{
          backgroundColor: active ? "rgba(124,108,255,0.5)" : "rgba(255,255,255,0.09)",
        }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />

      <div
        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${left}%` }}
      >
        {active && (
          <motion.span
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "rgba(157,196,221,0.35)" }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.div
          className="relative flex h-3 w-3 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            borderColor: active ? "rgba(169,157,255,0.9)" : "rgba(255,255,255,0.2)",
            backgroundColor: active ? "#9dc4dd" : "#0b0b10",
            boxShadow: active
              ? "0 0 10px 1px rgba(157,196,221,0.7)"
              : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <motion.span
            className="h-1 w-1 rounded-full bg-foreground"
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
        </motion.div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Vertical timeline — portrait phones / portrait tablets only               */
/* -------------------------------------------------------------------------- */

function TimelineVertical({
  milestones = DEFAULT_MILESTONES,
  className,
}: {
  milestones?: Milestone[];
  className?: string;
}) {
  const count = milestones.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // Natural page scroll (no sticky pin on mobile) driving a smooth 0→1 reveal
  // as the section moves through the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const smoothProgress = useTransform(scrollYProgress, (raw) => smoothstep(clamp01(raw)));

  const [activeCount, setActiveCount] = useState(0);
  const lastActive = useRef(-1);

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const c = Math.round(clamp01(p) * count);
    if (c !== lastActive.current) {
      lastActive.current = c;
      setActiveCount(c);
    }
  });

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-foregroundbg-foreground/10 bg-background",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-mist/70">
            Platform roadmap
          </p>
          <h3 className="mt-1.5 text-sm font-semibold text-foregroundbg-foreground">
            Shipping through 2026
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-foregroundbg-foreground/10 bg-background/60 px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-mist"
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-mist" />
          </span>
          <span className="text-[11px] font-medium tabular-nums text-zinc-300">
            {activeCount} / {count} shipped
          </span>
        </div>
      </div>

      <div ref={containerRef} className="relative mx-auto w-full max-w-sm px-6 py-10">
        {milestones.map((milestone, i) => (
          <VerticalNode
            key={slugify(milestone)}
            milestone={milestone}
            active={i < activeCount}
            isFirst={i === 0}
            isLast={i === count - 1}
          />
        ))}
      </div>
    </div>
  );
}

function VerticalNode({
  milestone,
  active,
  isFirst,
  isLast,
}: {
  milestone: Milestone;
  active: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* connector coming down from the previous dot */}
      {!isFirst && (
        <motion.div
          className="w-px"
          style={{ height: 24 }}
          initial={false}
          animate={{
            backgroundColor: active ? "rgba(124,108,255,0.5)" : "rgba(255,255,255,0.09)",
          }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />
      )}

      {/* dot */}
      <div className="relative z-20 flex h-3 w-3 items-center justify-center">
        {active && (
          <motion.span
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "rgba(157,196,221,0.35)" }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.div
          className="relative flex h-3 w-3 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            borderColor: active ? "rgba(169,157,255,0.9)" : "rgba(255,255,255,0.2)",
            backgroundColor: active ? "#9dc4dd" : "#0b0b10",
            boxShadow: active ? "0 0 10px 1px rgba(157,196,221,0.7)" : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <motion.span
            className="h-1 w-1 rounded-full bg-foreground"
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
        </motion.div>
      </div>

      {/* connector from dot down to the card */}
      <motion.div
        className="w-px"
        style={{ height: 24 }}
        initial={false}
        animate={{
          backgroundColor: active ? "rgba(124,108,255,0.5)" : "rgba(255,255,255,0.09)",
        }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />

      {/* card */}
      <motion.div
        className="relative w-full overflow-hidden rounded-xl border p-3 backdrop-blur-sm"
        initial={false}
        animate={{
          borderColor: active ? "rgba(157,196,221,0.45)" : "rgba(255,255,255,0.08)",
          backgroundColor: active ? "rgba(19,19,30,0.92)" : "rgba(13,13,20,0.65)",
          boxShadow: active ? "0 14px 34px -14px rgba(157,196,221,0.55)" : "0 0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <motion.span
          className="absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-mist to-transparent"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />

        <MilestoneCardBody milestone={milestone} active={active} />
      </motion.div>

      {!isLast && (
        <motion.div
          className="w-px"
          style={{ height: 24 }}
          initial={false}
          animate={{
            backgroundColor: active ? "rgba(124,108,255,0.5)" : "rgba(255,255,255,0.09)",
          }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: picks horizontal (landscape/desktop) or vertical (portrait)      */
/* -------------------------------------------------------------------------- */

export function LearningJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { isPortrait, mounted } = useIsPortrait();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  if (isPortrait) {
    return (
      <section
        id="experience"
        className="relative border-y border-border-strong bg-background"
      >
        <div className="container-px mx-auto w-full max-w-6xl py-10">
          <TimelineVertical milestones={DEFAULT_MILESTONES} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={trackRef}
      className="reveal-group relative border-y border-border-strong bg-background"
      style={{ height: mounted ? "300vh" : undefined }}
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden py-10">
        <div className="container-px mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden">
          <TimelineHorizontal
            scrollYProgress={scrollYProgress}
            className="flex-1"
          />
        </div>
      </div>
    </section>
  );
}
