"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useTransform, type MotionValue} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectTimelineCardProps, ProjectYear, SegmentOption, YearPanel } from "@/types";

const THUMB_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  layoutId,
  fluid = false,
  ariaLabel = "Select an option",
  className,
}: {
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  layoutId?: string;
  fluid?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const reactId = useId();
  const thumbId = layoutId ?? `segmented-thumb-${reactId}`;
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.id);
  const active = value ?? internal;

  function select(id: string) {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-[14px] border border-white/10 bg-black/40 p-1",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.5)]",
        fluid && "flex w-full",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.id === active;
        const Icon = opt.icon;
        return (
          <motion.button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(opt.id)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            className={cn(
              "relative flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[13px] font-medium",
              "outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand/50",
              fluid && "flex-1",
              isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={thumbId}
                transition={THUMB_SPRING}
                className={cn(
                  "absolute inset-0 rounded-[10px] border border-white/10",
                  "bg-linear-to-b from-white/13 to-white/5 backdrop-blur-md",
                  "shadow-[0_1px_1px_rgba(0,0,0,0.6),0_6px_16px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.16)]"
                )}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {Icon && (
                <Icon
                  size={15}
                  strokeWidth={2.25}
                  className={cn(
                    "shrink-0 transition-colors duration-200",
                    isActive ? "text-brand-soft" : "text-current"
                  )}
                />
              )}
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

const YEAR_PANELS: YearPanel[] = [
  { id: "2023", year: 2023, label: "2023", value: "$38K", caption: "first full year", delta: "12%", up: true },
  { id: "2024", year: 2024, label: "2024", value: "$126K", caption: "vs 2023", delta: "231%", up: true },
  { id: "2025", year: 2025, label: "2025", value: "$540K", caption: "vs 2024", delta: "328%", up: true },
  { id: "2026", year: 2026, label: "2026", value: "$1.48M", caption: "vs 2025", delta: "174%", up: true },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const CHART_W = 320;
const CHART_H = 110;
const CHART_PAD = 16;
const POINTS = 24;
const CURVE = (() => {
  const pts = Array.from({ length: POINTS }, (_, i) => {
    const t = i / (POINTS - 1);
    const v = Math.min(
      1,
      Math.max(0, 1 - Math.pow(1 - t, 1.8) + Math.sin(t * 13) * 0.05 * (1 - t))
    );
    return {
      t,
      x: t * CHART_W,
      y: CHART_H - (CHART_PAD + v * (CHART_H - CHART_PAD * 2)),
    };
  });
  const line = "M " + pts.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ");
  return {
    line,
    area: `${line} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`,
    xs: pts.map((p) => p.t),
    dotY: pts.map((p) => `${((p.y / CHART_H) * 100).toFixed(2)}%`),
  };
})();

function ScrollChart({ progress }: { progress: MotionValue<number> }) {
  const gid = useId().replace(/:/g, "");
  const clipW = useTransform(progress, (v) => v * CHART_W);
  const dotLeft = useTransform(progress, (v) => `${v * 100}%`);
  const dotTop = useTransform(progress, CURVE.xs, CURVE.dotY);

  return (
    <div
      role="img"
      aria-label="Growth chart that fills as you scroll through the timeline"
      className="relative h-30 w-full"
    >
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${gid}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9dc4dd" />
            <stop offset="100%" stopColor="#87bee2" />
          </linearGradient>
          <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87bee2" stopOpacity={0.26} />
            <stop offset="100%" stopColor="#87bee2" stopOpacity={0} />
          </linearGradient>
          <clipPath id={`${gid}-clip`}>
            <motion.rect x={0} y={-20} height={CHART_H + 40} width={clipW} />
          </clipPath>
        </defs>

        <path
          d={CURVE.line}
          fill="none"
          stroke="#676b6c"
          strokeOpacity={0.4}
          strokeWidth={1.5}
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
        />
        <g clipPath={`url(#${gid}-clip)`}>
          <path d={CURVE.area} fill={`url(#${gid}-fill)`} />
          <path
            d={CURVE.line}
            fill="none"
            stroke={`url(#${gid}-stroke)`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <motion.div
        aria-hidden
        style={{ left: dotLeft, top: dotTop }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-mist shadow-[0_0_10px_2px_rgba(135,190,226,0.55)]" />
      </motion.div>
    </div>
  );
}

export default function ProjectTimelineCard({ activeYear, progress, onSelectYear, className }: ProjectTimelineCardProps) {
  const reduced = useReducedMotion();
  const panel = YEAR_PANELS.find((p) => p.year === activeYear) ?? YEAR_PANELS[0];

  return (
    <div
      className={cn(
        "relative flex w-full max-w-100 flex-col overflow-hidden rounded-2xl border border-border bg-background p-5 sm:p-6",
        "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -20%, rgba(157,196,221,0.14), transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Revenue</span>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-mist" />
          <span className="text-[11px] font-medium text-muted-foreground">Yearly</span>
        </div>
      </div>

      <div className="relative mt-4">
        <SegmentedControl
          options={YEAR_PANELS}
          value={panel.id}
          onChange={(id) => onSelectYear?.(Number(id) as ProjectYear)}
          fluid
          ariaLabel="Project year"
        />
      </div>

      <div className="relative mt-5 h-14">
        <AnimatePresence initial={false}>
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
            className="absolute inset-0 flex items-end justify-between"
          >
            <div>
              <div className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
                {panel.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{panel.caption}</div>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium tabular-nums",
                panel.up
                  ? "border-mistext-mist/25 bg-mistext-mist/10 text-mist"
                  : "border-steel/40 bg-steel/10 text-muted-foreground"
              )}
            >
              {panel.up ? (
                <ArrowUpRight size={13} strokeWidth={2.5} />
              ) : (
                <ArrowDownRight size={13} strokeWidth={2.5} />
              )}
              {panel.delta}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-4">
        <ScrollChart progress={progress} />
      </div>
    </div>
  );
}
